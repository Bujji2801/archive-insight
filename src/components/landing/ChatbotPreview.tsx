import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Paperclip, MoreHorizontal } from "lucide-react";

type Message = {
    id: string;
    role: "user" | "bot";
    content: string;
    isTyping?: boolean;
};

export function ChatbotPreview() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "bot",
            content: "Welcome to Parallax. I can help verify document originality and analyze semantic structure.",
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: "I've analyzed the text. The semantic density matches academic standards, but I detected a 92% similarity with a flagged dataset.",
            };
            setIsTyping(false);
            setMessages((prev) => [...prev, botMsg]);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="relative flex h-[600px] w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 transition-all hover:shadow-slate-300/50 dark:bg-slate-900 dark:border-slate-800">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-white/80 p-4 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-md shadow-slate-900/10 dark:bg-slate-100 dark:text-slate-900">
                            <Bot className="h-5 w-5" />
                        </div>
                        <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white dark:border-slate-900"></span>
                        </span>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Parallax AI</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Always active</p>
                    </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <MoreHorizontal className="h-5 w-5" />
                </button>
            </div>

            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 space-y-6 p-6 overflow-y-auto scroll-smooth relative bg-slate-50/50 dark:bg-slate-950/50"
            >
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 dark:opacity-5 pointer-events-none" />

                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`flex gap-4 relative z-10 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
                        >
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-sm ${msg.role === "user"
                                    ? "bg-slate-950 text-white border-slate-800 dark:bg-white dark:text-slate-900"
                                    : "bg-white text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                                }`}>
                                {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            </div>

                            <div className={`rounded-2xl p-4 shadow-sm text-sm leading-relaxed ${msg.role === "user"
                                    ? "bg-slate-950 text-white rounded-tr-sm dark:bg-white dark:text-slate-900"
                                    : "bg-white text-slate-700 border border-slate-200 rounded-tl-sm dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
                                }`}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex gap-4 relative z-10 max-w-[85%]"
                    >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-slate-600 border border-slate-200 shadow-sm dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                            <Sparkles className="h-4 w-4 text-indigo-500 animate-pulse" />
                        </div>
                        <div className="rounded-2xl rounded-tl-sm bg-white border border-slate-200 p-4 shadow-sm flex items-center gap-1.5 dark:bg-slate-800 dark:border-slate-700">
                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="relative flex items-center gap-2 rounded-2xl bg-slate-50 p-2 pr-3 border border-slate-100 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-200 transition-all dark:bg-slate-800 dark:border-slate-700">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-xl transition-colors dark:hover:text-slate-200 dark:hover:bg-slate-700">
                        <Paperclip className="h-5 w-5" />
                    </button>

                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
                    />

                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                        className={`group flex h-10 w-10 items-center justify-center rounded-xl transition-all shadow-sm ${inputValue.trim()
                                ? "bg-slate-950 text-white hover:bg-slate-800 hover:shadow-md dark:bg-white dark:text-slate-900"
                                : "bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500"
                            }`}
                    >
                        <Send className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${inputValue.trim() ? "" : "opacity-50"}`} />
                    </button>
                </div>
                <div className="mt-2 text-center">
                    <p className="text-[10px] text-slate-400">AI can make mistakes. Verify important information.</p>
                </div>
            </div>
        </div>
    );
}
