import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    features: [
      "1 Free Audit (Premium Quality)",
      "Full SEO Score Report",
      "3 Actionable Suggestions",
      "Core Keyword Analysis",
    ],
    cta: "Get Started",
    popular: false,
    highlight: "Experience the full power — once.",
  },
  {
    name: "Monthly",
    price: "₹299",
    period: "/mo",
    features: [
      "Unlimited Audits",
      "20+ Suggestions per Audit",
      "Competitor Analysis",
      "Weekly SEO Reports",
      "Priority Support",
    ],
    cta: "Start 7-Day Trial",
    popular: true,
    highlight: null,
  },
  {
    name: "Half-Yearly",
    price: "₹999",
    period: "/6 mo",
    features: [
      "Everything in Monthly",
      "Save 44% vs Monthly",
      "Content Calendar AI",
      "Bulk URL Audits",
      "Priority Support",
      "Custom Reports",
    ],
    cta: "Best Value",
    popular: false,
    highlight: null,
  },
  {
    name: "Yearly",
    price: "₹1,499",
    period: "/yr",
    features: [
      "Everything in Half-Yearly",
      "Save 58% vs Monthly",
      "White-label Reports",
      "API Access",
      "Dedicated Account Manager",
      "Custom Integrations",
      "Team Collaboration",
    ],
    cta: "Go Annual",
    popular: false,
    highlight: null,
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`rounded-xl border p-6 relative group transition-shadow duration-300 ${
                plan.popular
                  ? "border-primary bg-card shadow-lg shadow-primary/10 scale-[1.02]"
                  : "border-border bg-card hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold mb-1">{plan.name}</h3>
              {plan.highlight && (
                <p className="text-xs text-accent font-medium mb-3">{plan.highlight}</p>
              )}
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-display font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-accent flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${plan.popular ? "bg-gradient-to-r from-primary to-accent hover:opacity-90 border-0" : ""}`}
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
