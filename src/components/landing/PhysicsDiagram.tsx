import { motion } from "framer-motion";

export function PhysicsDiagram() {
    return (
        <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-3xl bg-surface border border-border/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/20 group">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            {/* Central Node */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-xl ring-1 ring-slate-900/5 backdrop-blur-3xl group-hover:scale-110 transition-transform duration-500"
            >
                <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </div>
            </motion.div>

            {/* Orbiting Nodes */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute h-full w-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                >
                    <motion.div
                        className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center"
                        style={{
                            marginLeft: `${(i + 1) * 80}px`,
                        }}
                    >
                        <div className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-indigo-500' : i === 1 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    </motion.div>
                </motion.div>
            ))}

            {/* Connection Lines (Static for now, could be SVG paths) */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none">
                <circle cx="50%" cy="50%" r="80" fill="none" stroke="currentColor" className="text-slate-200/50" strokeDasharray="4 4" />
                <circle cx="50%" cy="50%" r="160" fill="none" stroke="currentColor" className="text-slate-200/30" />
                <circle cx="50%" cy="50%" r="240" fill="none" stroke="currentColor" className="text-slate-200/20" />
            </svg>

            <div className="absolute bottom-6 left-6 text-xs font-mono text-muted-foreground bg-white/50 backdrop-blur px-2 py-1 rounded">
                FIG 1.0: SEMANTIC SEARCH TOPOLOGY
            </div>
        </div>
    );
}
