import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    features: ["Basic Outlines", "10 Audits/Mo", "Core Keywords", "Community Support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Premium",
    price: "₹299",
    period: "/mo",
    yearly: "billed yearly ₹2,999",
    features: ["Unlimited Audits", "20+ Suggestions", "Weekly Reports", "Priority Support", "Competitor Analysis"],
    cta: "Start 7-Day Trial",
    popular: true,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="section-spacing">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          Simple Pricing for Real Hustlers
        </motion.h2>
        <p className="text-center text-muted-foreground mb-16">Cancel anytime. 30-day money-back.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`rounded-lg border p-8 relative ${
                plan.popular
                  ? "border-primary bg-card"
                  : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold mb-1">{plan.name}</h3>
              {plan.yearly && (
                <p className="text-xs text-muted-foreground mb-3">{plan.yearly}</p>
              )}
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-display font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check size={16} className="text-accent flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => console.log("Signing up...", plan.name)}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
