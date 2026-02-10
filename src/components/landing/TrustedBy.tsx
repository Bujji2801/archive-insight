import { motion } from "framer-motion";

const brands = [
    "MIT Technology Review",
    "Stanford Archive",
    "CERN OpenData",
    "IEEE Xplore",
    "ArXiv.org",
    "JSTOR",
];

export function TrustedBy() {
    return (
        <div className="w-full py-12 border-y border-border/40 bg-surface/50">
            <div className="container px-4 md:px-6">
                <p className="text-center text-xs font-mono text-muted-foreground mb-8 tracking-widest uppercase">
                    Trusted by leading research institutions
                </p>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-x-16 grayscale opacity-60">
                    {brands.map((brand) => (
                        <motion.div
                            key={brand}
                            whileHover={{ opacity: 1, scale: 1.05 }}
                            className="text-sm font-semibold text-slate-800"
                        >
                            {brand}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
