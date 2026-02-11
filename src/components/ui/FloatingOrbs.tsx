import { motion } from "framer-motion";

export const FloatingOrbs = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Orb 1 */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-200/20 blur-3xl"
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, -30, 30, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Orb 2 */}
            <motion.div
                className="absolute bottom-[10%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-slate-200/30 blur-3xl"
                animate={{
                    x: [0, -40, 40, 0],
                    y: [0, 40, -40, 0],
                    scale: [1, 1.2, 0.95, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            {/* Orb 3 (smaller, center-ish) */}
            <motion.div
                className="absolute top-[40%] left-[30%] w-[25vw] h-[25vw] rounded-full bg-blue-100/20 blur-3xl"
                animate={{
                    x: [0, 30, -30, 0],
                    y: [0, 50, -50, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
            />
        </div>
    );
};
