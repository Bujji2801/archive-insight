import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { HeizenButton } from "@/components/ui/heizen-button";
import { PhysicsDiagram } from "@/components/landing/PhysicsDiagram";
import { TrustedBy } from "@/components/landing/TrustedBy";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <ParticleCanvas />
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="text-5xl md:text-7xl font-editorial font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                The New Physics <br />
                <span className="text-slate-400">of Academic Search</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-md leading-relaxed">
                PlagioSense redefines how you verify originality.
                Using high-dimensional vector embeddings to detect semantic similarity beyond simple text matching.
              </p>

              <div className="flex flex-wrap gap-4">
                <HeizenButton
                  variant="editorial-dark"
                  size="xl"
                  onClick={() => navigate('/explore')}
                >
                  Start Exploration
                </HeizenButton>
                <HeizenButton
                  variant="editorial"
                  size="xl"
                  onClick={() => navigate('/how-to-use')}
                >
                  Read Manifesto
                </HeizenButton>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <PhysicsDiagram />
            </motion.div>
          </div>
        </div>
      </section>

      <TrustedBy />

      {/* Footer minimal */}
      <footer className="py-8 border-t border-border text-center text-sm text-muted-foreground">
        © 2026 PlagioSense. Built with Heizen Design System.
      </footer>
    </div>
  );
}

