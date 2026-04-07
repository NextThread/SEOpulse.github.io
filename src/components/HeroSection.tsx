import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuditModal from "@/components/AuditModal";
import DashboardMock from "@/components/DashboardMock";

// Floating particles
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -60 - Math.random() * 80, 0],
            x: [0, (Math.random() - 0.5) * 60, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1 + Math.random(), 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated grid background
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const blobX = useTransform(mouseX, [0, window.innerWidth], [-30, 30]);
  const blobY = useTransform(mouseY, [0, window.innerHeight], [-30, 30]);

  useEffect(() => {
    const handler = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  const wordVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 20, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
      transition: { delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  };

  const titleWords = "Revolutionize Your SEO with".split(" ");

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center pt-16 section-spacing relative overflow-hidden"
    >
      <GridBackground />
      <Particles />

      {/* Animated background blobs following mouse */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ x: blobX, y: blobY }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl animate-float"
        />
        <motion.div
          style={{ x: useTransform(blobX, v => -v), y: useTransform(blobY, v => -v) }}
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl animate-float-delayed"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-3xl animate-pulse-slow" />
      </div>

      <div className="container text-center max-w-4xl relative z-10">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary mb-8 animate-border-glow"
        >
          <Sparkles size={14} className="animate-spin-slow" />
          AI-Powered SEO Optimization
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-accent"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Staggered word-by-word title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
          <br className="hidden md:block" />
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x inline-block"
          >
            AI-Powered
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="inline-block"
          >
            Content Optimization
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Paste your URL or content – get instant audits, keyword magic, and pro
          suggestions to rank higher on Google. Free basic scans, premium for
          deep fixes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              onClick={() => setModalOpen(true)}
              className="gap-2 text-base px-8 group relative overflow-hidden animate-glow-pulse"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Free Audit <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4 }}
              />
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {[
            { label: "10K+ Optimizations", icon: BarChart3 },
            { label: "AI-Powered Insights", icon: Sparkles },
            { label: "Lightning Fast", icon: Zap },
          ].map((badge, i) => (
            <motion.span
              key={badge.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.08, y: -3, boxShadow: "0 8px 25px -8px hsl(var(--accent) / 0.3)" }}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 text-accent px-4 py-1.5 text-xs font-semibold cursor-default border border-accent/10 hover:border-accent/30 transition-all"
            >
              <badge.icon size={14} />
              {badge.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Dashboard mock with perspective */}
        <motion.div
          initial={{ opacity: 0, y: 80, rotateX: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="perspective-1000"
        >
          <DashboardMock />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>

      <AuditModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
