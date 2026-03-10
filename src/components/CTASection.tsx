import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="section-spacing bg-primary">
      <div className="container text-center">
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="secondary"
            className="text-base px-8"
            onClick={() => console.log("Signing up...")}
          >
            Free Trial
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
          >
            Book Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
