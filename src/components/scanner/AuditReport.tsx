import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Sparkles, TrendingUp, Layers } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface AuditReportProps {
    analysis: {
        keywords: string[];
        intent: string;
        score: number;
        embeddingMatch: string;
        suggestions: string[];
    };
}

export function AuditReport({ analysis }: AuditReportProps) {
    const scoreColor = analysis.score > 80 ? "text-green-500" : analysis.score > 50 ? "text-amber-500" : "text-red-500";
    const scoreBg = analysis.score > 80 ? "bg-green-500" : analysis.score > 50 ? "bg-amber-500" : "bg-red-500";

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Score Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="md:col-span-1 bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-xl shadow-slate-900/10"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-indigo-200 mb-2">
                            <Sparkles className="h-4 w-4" />
                            <span className="text-sm font-medium uppercase tracking-wider">Uniqueness Score</span>
                        </div>
                        <div className={cn("text-7xl font-editorial font-bold tracking-tighter", scoreColor)}>
                            {analysis.score}%
                        </div>
                    </div>
                    <div className="relative z-10 mt-6">
                        <Progress value={analysis.score} className="h-2 bg-slate-800" indicatorClassName={scoreBg} />
                        <p className="text-xs text-slate-400 mt-3 font-mono">
                            COMPARED TO 1.2M+ GLOBAL ARCHIVES
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="md:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-center"
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                            <Layers className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-slate-900 text-lg">Semantic Intent Analysis</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {analysis.intent}
                            </p>
                            <div className="pt-2 flex flex-wrap gap-2">
                                {analysis.keywords.map((keyword, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600">
                                        #{keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Recommendations Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-indigo-600" />
                        Optimization Strategy
                    </h3>
                    <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">AI-GENERATED</span>
                </div>

                <div className="grid gap-4">
                    {analysis.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex gap-4 p-4 rounded-xl bg-slate-50/50 border border-slate-100 hover:border-indigo-100 transition-colors group">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-200 transition-colors">
                                {index + 1}
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed pt-1.5">
                                {suggestion}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
