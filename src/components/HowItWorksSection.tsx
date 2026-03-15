import { motion } from "framer-motion";
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
  return (
    <section className="section-spacing bg-card relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-accent tracking-wider uppercase">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Optimize in 3 Clicks – No Tech Skills Needed
          </h2>
        </motion.div>

        <div className="relative">
          {/* Animated connecting line - desktop */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-2 bg-primary/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          </div>
          {/* Mobile vertical line */}
          <div className="md:hidden absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-2 bg-primary/10 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-accent to-primary rounded-full"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 relative z-10 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow"
                >
                  <step.icon size={24} className="text-primary-foreground" />
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-primary/40"
                    animate={{ scale: [1, 1.3, 1.3], opacity: [0.6, 0, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  />
                </motion.div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                  Step {i + 1}
                </span>
                <h3 className="font-display text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
