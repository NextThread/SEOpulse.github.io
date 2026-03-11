import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-spacing bg-primary relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary-foreground/5 blur-3xl" />
      </div>
      <div className="container text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4"
        >
          Ready to Rank #1? Start Optimizing Today.
        </motion.h2>
        <p className="text-primary-foreground/80 mb-8 text-lg">
          Join 5K+ creators boosting traffic 2x.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="text-base px-8 gap-2 group"
          onClick={scrollToContact}
        >
          Contact Us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
}
