import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuditModal from "@/components/AuditModal";
import DashboardMock from "@/components/DashboardMock";

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center pt-16 section-spacing relative overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-3xl animate-pulse-slow" />
      </div>

      <div className="container text-center max-w-4xl relative z-10">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary mb-8"
        >
          <Sparkles size={14} className="animate-spin-slow" />
          AI-Powered SEO Optimization
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
        >
          Revolutionize Your SEO with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-gradient-x">
            AI-Powered
          </span>{" "}
          Content Optimization
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Paste your URL or content – get instant audits, keyword magic, and pro
          suggestions to rank higher on Google. Free basic scans, premium for
          deep fixes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button
            size="lg"
            onClick={() => setModalOpen(true)}
            className="gap-2 text-base px-8 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Free Audit <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {[
            { label: "10K+ Optimizations", icon: BarChart3 },
            { label: "AI-Powered Insights", icon: Sparkles },
            { label: "Lightning Fast", icon: Zap },
          ].map((badge) => (
            <motion.span
              key={badge.label}
              whileHover={{ scale: 1.05, y: -2 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 text-accent px-4 py-1.5 text-xs font-semibold cursor-default"
            >
              <badge.icon size={14} />
              {badge.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Dashboard mock */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="perspective-1000"
        >
          <DashboardMock />
        </motion.div>
      </div>

      <AuditModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
