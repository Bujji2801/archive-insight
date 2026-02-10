import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Search, BrainCircuit, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HeizenButton } from "@/components/ui/heizen-button";
import { Link } from "react-router-dom";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";

const features = [
  {
    id: 1,
    title: "Curated Discovery",
    subtitle: "Beyond Simple Search",
    description: "Navigate a vast ocean of academic knowledge with precision. Our intelligent filters allows you to dissect the archive by year, technology, or domain, ensuring you find exactly what you need, when you need it.",
    icon: Search,
    color: "text-blue-600",
    bg: "bg-blue-50",
    align: "left"
  },
  {
    id: 2,
    title: "Semantic Analysis",
    subtitle: "AI-Powered Insights",
    description: "Don't just read—understand. Our Semantic Scanner references thousands of projects to identify uniqueness gaps, potential redundancies, and innovation opportunities in real-time.",
    icon: BrainCircuit,
    color: "text-purple-600",
    bg: "bg-purple-50",
    align: "right"
  },
  {
    id: 3,
    title: "Originality Verification",
    subtitle: "Academic Integrity",
    description: "Secure your intellectual property. Generate comprehensive reports that validate your project's distinctiveness, complete with citation assistance and similarity scoring.",
    icon: ShieldCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    align: "left"
  }
];

const FeatureSection = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 150, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-[60vh] flex flex-col items-center justify-center gap-12 py-12 max-w-4xl mx-auto text-center"
    >
      {/* Text Content */}
      <div className="space-y-6 flex flex-col items-center">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${feature.bg} border border-slate-200 w-fit`}>
          <feature.icon className={`w-4 h-4 ${feature.color}`} />
          <span className={`text-xs font-bold uppercase tracking-widest ${feature.color}`}>{feature.subtitle}</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-editorial font-bold text-slate-900 leading-[1.1]">
          {feature.title}
        </h2>

        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
          {feature.description}
        </p>

        <div className="flex items-center gap-4 pt-4 opacity-50">
          <div className="h-px w-12 bg-slate-300" />
          <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">Step 0{feature.id}</span>
          <div className="h-px w-12 bg-slate-300" />
        </div>
      </div>

      {/* Visual / Mockup Area */}
      <div className="w-full max-w-2xl">
        <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xl shadow-slate-200/50 group">
          {/* Abstract shapes/UI mockup placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50" />

          <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-700">
            <div className={`w-64 h-64 rounded-full ${feature.bg} blur-3xl`} />
          </div>

          <div className="absolute inset-10 bg-white rounded-xl shadow-lg border border-slate-100 p-6 flex flex-col gap-4 transform group-hover:scale-[1.02] transition-transform duration-500">
            <div className="w-12 h-12 rounded-lg bg-slate-100" />
            <div className="h-4 w-3/4 bg-slate-100 rounded" />
            <div className="h-4 w-1/2 bg-slate-100 rounded" />
            <div className="flex-1 bg-slate-50 rounded-lg mt-4 border border-slate-100 border-dashed" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function HowToUse() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-white relative selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ParticleCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
      </div>

      <main className="relative z-10">
        {/* Cinematic Hero */}
        <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <h1 className="text-6xl md:text-8xl font-editorial font-bold text-slate-900 tracking-tight leading-[0.9]">
              Research <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Reimagined</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
              An elegant workflow designed for the modern academic. <br className="hidden md:block" />
              Powerful insights, delivered with simplicity.
            </p>
          </motion.div>
        </section>

        {/* Narrative Section */}
        <section className="container mx-auto px-6 md:px-12 py-8">
          {features.map((feature, index) => (
            <FeatureSection key={feature.id} feature={feature} index={index} />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
