import { Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const AITechnicianCard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm flex flex-col gap-6"
        >
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-indigo-600" />
                </div>
                <h2 className="font-editorial text-2xl font-bold text-slate-900">
                    AI Technician
                </h2>
            </div>

            {/* Body Text */}
            <p className="text-slate-600 text-lg leading-relaxed">
                I'm ready to analyze your document. I will check for:
            </p>

            {/* Checklist */}
            <ul className="space-y-3">
                {[
                    "Semantic Structure",
                    "Keyword Density",
                    "Originality Score",
                    "Citation Quality"
                ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-700 font-medium">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                        {item}
                    </li>
                ))}
            </ul>

            {/* Tip Box */}
            <div className="mt-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-1">Tip:</h3>
                <p className="text-slate-500 text-sm">
                    PDFs with clear headings yield the best results.
                </p>
            </div>
        </motion.div>
    );
};
