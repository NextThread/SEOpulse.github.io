import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const stats = [
  { value: 10000, suffix: "+", label: "Optimizations Run" },
  { value: 340, suffix: "%", label: "Avg Traffic Boost" },
  { value: 85, suffix: "+", label: "SEO Score Average" },
  { value: 5000, suffix: "+", label: "Happy Creators" },
];

function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.span ref={ref}>
      {isInView ? target.toLocaleString() : "0"}
    </motion.span>
  );
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-display font-bold tracking-tight">
      {isInView ? (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <CountUp target={value} />
          <span className="text-accent">{suffix}</span>
        </motion.span>
      ) : (
        <span className="opacity-0">0{suffix}</span>
      )}
    </span>
  );
}

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -inset-y-20 bg-gradient-to-b from-background via-card to-background pointer-events-none"
      />

      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                className="text-sm text-muted-foreground mt-3 font-medium tracking-wide uppercase"
              >
                {stat.label}
              </motion.p>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-0.5 w-12 mx-auto mt-4 bg-gradient-to-r from-primary to-accent origin-left"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
        <motion.div
          initial={{ x: "100%" }}
          whileInView={{ x: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        />
      </div>
    </section>
  );
}
