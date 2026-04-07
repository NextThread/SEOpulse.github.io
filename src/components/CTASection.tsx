import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="py-4 md:py-8 relative">
      <motion.div
        style={{ scale }}
        className="container"
      >
        <div className="relative rounded-3xl bg-primary overflow-hidden px-8 py-20 md:py-28">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              style={{ y: bgY }}
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary-foreground/5 blur-3xl"
            />
            {/* Floating sparkles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: `${10 + i * 12}%`, top: `${15 + (i % 3) * 25}%` }}
                animate={{
                  y: [0, -25, 0],
                  opacity: [0.15, 0.5, 0.15],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
              >
                <Sparkles size={10 + i * 2} className="text-primary-foreground/20" />
              </motion.div>
            ))}
          </div>

          <div className="text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4"
            >
              Ready to Rank #1?{" "}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="block md:inline"
              >
                Start Optimizing Today.
              </motion.span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-primary-foreground/80 mb-10 text-lg"
            >
              Join 5K+ creators boosting traffic 2x.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Button
                size="lg"
                variant="secondary"
                className="text-base px-8 gap-2 group rounded-xl"
                onClick={scrollToContact}
              >
                Contact Us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
