import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ClipboardPaste, Brain, Rocket } from "lucide-react";

const steps = [
  {
    icon: ClipboardPaste,
    title: "Paste Content/URL",
    desc: "Drop your blog post or site link. AI scans in seconds.",
  },
  {
    icon: Brain,
    title: "Get AI Insights",
    desc: "See score, metrics, and actionable tips. Premium unlocks the full suite.",
  },
  {
    icon: Rocket,
    title: "Apply & Rank",
    desc: "Export fixes to Docs/WordPress. Watch traffic climb.",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section ref={sectionRef} className="section-spacing relative overflow-hidden">
      {/* Parallax bg */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -inset-y-20 bg-card pointer-events-none"
      />

      {/* Top decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-left"
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-accent tracking-wider uppercase">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3">
            Optimize in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              3 Clicks
            </span>
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">No tech skills needed</p>
        </motion.div>

        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary/20 via-accent/40 to-primary/20"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center text-center relative group"
              >
                {/* Step number */}
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -top-3 -right-2 md:right-auto md:-top-4 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center z-20"
                >
                  {i + 1}
                </motion.span>

                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-8 relative z-10 shadow-xl shadow-primary/20 group-hover:shadow-primary/40 transition-shadow"
                >
                  <step.icon size={28} className="text-primary-foreground" />
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-primary/30"
                    animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
                  />
                </motion.div>

                <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground max-w-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
