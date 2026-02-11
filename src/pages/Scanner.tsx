import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText, Scan, Sparkles, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HeizenButton } from "@/components/ui/heizen-button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ChatbotPreview } from "@/components/landing/ChatbotPreview";

// Mock data for analysis results
const mockAnalysis = {
    keywords: ["Machine Learning", "Neural Networks", "Computer Vision", "Transformer Architecture"],
    intent: "Academic Research / Technical Implementation",
    score: 85,
    embeddingMatch: "High correlation with 'Deep Learning in Medical Imaging' cluster.",
    suggestions: [
        "Add more citations from 2024-2025 to increase currency score.",
        "Elaborate on the 'Methodology' section, specifically regarding data preprocessing.",
        "Consider adding a comparative analysis with existing SOTA models."
    ]
};

export default function Scanner() {
    const [file, setFile] = useState<File | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<typeof mockAnalysis | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const uploadedFile = acceptedFiles[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            startScan();
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "text/plain": [".txt", ".md"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
        },
        maxFiles: 1
    });

    const startScan = () => {
        setIsScanning(true);
        setProgress(0);
        setResult(null);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsScanning(false);
                    setResult(mockAnalysis);
                    return 100;
                }
                return prev + 2; // Simulate scanning progress
            });
        }, 50);
    };

    const resetScanner = () => {
        setFile(null);
        setResult(null);
        setProgress(0);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 pt-32 pb-20 relative">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl mix-blend-multiply animate-blob" />
                    <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
                    <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000" />
                </div>

                <div className="max-w-6xl mx-auto space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-editorial text-5xl md:text-6xl font-bold text-slate-900 tracking-tight"
                        >
                            Semantic Scanner
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
                        >
                            Upload your documentation. Our global archive engine will analyze semantic structure, originality, and citation quality in real-time.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Main Scanner Card */}
                        <div className="lg:col-span-8">
                            <AnimatePresence mode="wait">
                                {!file ? (
                                    <motion.div
                                        key="upload"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-2 border border-white/20 shadow-xl shadow-slate-200/40 ring-1 ring-slate-100"
                                    >
                                        <div
                                            {...getRootProps()}
                                            className={cn(
                                                "min-h-[500px] rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-500 group relative overflow-hidden",
                                                isDragActive
                                                    ? "border-indigo-500 bg-indigo-50/30"
                                                    : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50/50"
                                            )}
                                        >
                                            <input {...getInputProps()} />

                                            {/* Grid Pattern */}
                                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                                            <div className="relative z-10 flex flex-col items-center gap-6 p-8 text-center max-w-md">
                                                <div className="h-24 w-24 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_20px_40px_rgb(79,70,229,0.15)] transition-all duration-500 ring-1 ring-slate-100/50">
                                                    <UploadCloud className={cn("h-10 w-10 transition-colors duration-500", isDragActive ? "text-indigo-600 fill-indigo-100" : "text-slate-400 group-hover:text-indigo-500")} />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="font-editorial text-2xl font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                                                        {isDragActive ? "Drop to Analyze" : "Upload Document"}
                                                    </h3>
                                                    <p className="text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
                                                        Drag and drop your PDF, DOCX, or TXT file here.
                                                        <br /><span className="text-xs opacity-70">Max size 10MB.</span>
                                                    </p>
                                                </div>
                                                <HeizenButton variant="editorial" className="mt-4 pointer-events-none shadow-lg shadow-indigo-500/20">
                                                    Browse Files
                                                </HeizenButton>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="analysis"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-6"
                                    >
                                        {/* Scanning State */}
                                        {isScanning ? (
                                            <div className="bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden text-center min-h-[500px] flex flex-col items-center justify-center">
                                                <div className="h-24 w-24 rounded-full bg-indigo-50 flex items-center justify-center mb-8 relative">
                                                    <div className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-indigo-500 animate-spin" />
                                                    <Scan className="h-10 w-10 text-indigo-600" />
                                                </div>
                                                <h3 className="font-editorial text-3xl font-bold text-slate-900 mb-3">
                                                    Analyzing Structure...
                                                </h3>
                                                <p className="text-slate-500 mb-10 text-lg">
                                                    Extracting semantic layers and intent vectors.
                                                </p>
                                                <div className="w-full max-w-sm space-y-3">
                                                    <Progress value={progress} className="h-2.5 bg-slate-100" />
                                                    <div className="flex justify-between text-xs font-medium font-mono text-slate-400">
                                                        <span>INITIALIZING</span>
                                                        <span>{progress}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Results View */
                                            <div className="space-y-6">
                                                {/* File Header */}
                                                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                                            <FileText className="h-7 w-7 text-indigo-600" />
                                                        </div>
                                                        <div className="text-left">
                                                            <h4 className="font-bold text-slate-900 text-lg">{file.name}</h4>
                                                            <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB • Semantic Scan Complete</p>
                                                        </div>
                                                    </div>
                                                    <HeizenButton variant="ghost" size="sm" onClick={resetScanner} className="text-slate-500 hover:text-slate-900">
                                                        Scan Another
                                                    </HeizenButton>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Key Insights Card */}
                                                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-[4rem]" />
                                                        <div className="flex items-center gap-3 mb-6 relative z-10">
                                                            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                                                                <Sparkles className="h-5 w-5" />
                                                            </div>
                                                            <h3 className="font-bold text-slate-900">Key Terms</h3>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2 relative z-10">
                                                            {result?.keywords.map(k => (
                                                                <span key={k} className="px-3 py-1.5 bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-100">
                                                                    {k}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Score Card */}
                                                    <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl shadow-slate-900/10 flex flex-col justify-between relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
                                                        <div className="relative z-10 flex justify-between items-start">
                                                            <h3 className="font-bold text-indigo-200">Uniqueness</h3>
                                                            <CheckCircle2 className="h-6 w-6 text-green-400" />
                                                        </div>
                                                        <div className="relative z-10 mt-4">
                                                            <div className="text-6xl font-editorial font-bold tracking-tighter">
                                                                {result?.score}%
                                                            </div>
                                                            <p className="text-indigo-200 text-sm mt-1">Global Archive Match</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Suggestions Card */}
                                                {result?.suggestions && (
                                                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                                                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                                            Upgrade Recommendations
                                                        </h3>
                                                        <div className="space-y-3">
                                                            {result.suggestions.map((suggestion, i) => (
                                                                <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50/50 border border-slate-100 text-slate-600 text-sm leading-relaxed">
                                                                    <span className="font-bold text-indigo-500">0{i + 1}</span>
                                                                    {suggestion}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 relative">
                            <div className="sticky top-32">
                                <div className="absolute -inset-4 bg-gradient-to-b from-slate-100/50 to-transparent blur-xl -z-10 rounded-[3rem]" />
                                <ChatbotPreview />
                                <p className="text-center text-xs text-slate-400 mt-6 max-w-xs mx-auto">
                                    Our AI assistant analyzes your document in real-time, offering instant structural feedback and citation checking.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
