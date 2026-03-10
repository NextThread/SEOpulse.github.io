import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuditModal from "@/components/AuditModal";
import DashboardMock from "@/components/DashboardMock";

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center pt-16 section-spacing"
    >
      <div className="container text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
        >
          Revolutionize Your SEO with AI-Powered Content Optimization
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Paste your URL or content – get instant audits, keyword magic, and pro
          suggestions to rank higher on Google. Free basic scans, premium for
          deep fixes. Built for creators & SMBs in India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button size="lg" onClick={() => setModalOpen(true)} className="gap-2 text-base px-8">
            Start Free Audit <ArrowRight size={18} />
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {["Powered by Grok AI", "10K+ Optimizations", "India-First Keywords"].map(
            (badge) => (
              <span
                key={badge}
                className="inline-flex items-center rounded-full bg-accent/10 text-accent px-4 py-1.5 text-xs font-semibold"
              >
                {badge}
              </span>
            )
          )}
        </motion.div>

        {/* Dashboard mock */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <DashboardMock />
        </motion.div>
      </div>

      <AuditModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
