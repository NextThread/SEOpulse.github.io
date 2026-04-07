import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import PaymentModal from "@/components/PaymentModal";

const plans = [
  {
    name: "Free",
    priceUsd: "$0",
    priceInr: "₹0",
    period: "",
    features: [
      "1 Premium SEO Audit",
      "Full Score Report",
      "8 Actionable Suggestions",
      "Core Keyword Analysis",
    ],
    cta: "Get Started",
    popular: false,
    highlight: "Experience the full power — once.",
    isPaid: false,
  },
  {
    name: "Monthly",
    priceUsd: "$3",
    priceInr: "₹249",
    period: "/mo",
    features: [
      "Unlimited Audits",
      "20+ Suggestions per Audit",
      "Competitor Analysis",
      "Weekly SEO Reports",
      "Priority Support",
    ],
    cta: "Start Monthly",
    popular: true,
    highlight: null,
    isPaid: true,
  },
  {
    name: "Half-Yearly",
    priceUsd: "$10",
    priceInr: "₹849",
    period: "/6 mo",
    features: [
      "Everything in Monthly",
      "Save 44% vs Monthly",
      "Content Calendar AI",
      "Bulk URL Audits",
      "Custom Reports",
    ],
    cta: "Best Value",
    popular: false,
    highlight: null,
    isPaid: true,
  },
  {
    name: "Yearly",
    priceUsd: "$15",
    priceInr: "₹1,249",
    period: "/yr",
    features: [
      "Everything in Half-Yearly",
      "Save 58% vs Monthly",
      "White-label Reports",
      "API Access",
      "Dedicated Account Manager",
      "Team Collaboration",
    ],
    cta: "Go Annual",
    popular: false,
    highlight: null,
    isPaid: true,
  },
];

export default function PricingSection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paymentPlan, setPaymentPlan] = useState<{ name: string; priceUsd: string; priceInr: string } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  const handlePlanClick = (plan: typeof plans[0]) => {
    if (!plan.isPaid) {
      if (!user) navigate("/signup");
      return;
    }
    if (!user) { navigate("/login"); return; }
    setPaymentPlan({ name: plan.name, priceUsd: plan.priceUsd, priceInr: plan.priceInr });
  };

  return (
    <section ref={sectionRef} id="pricing" className="section-spacing relative overflow-hidden">
      {/* Parallax bg element */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/3 blur-3xl pointer-events-none"
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary mb-4"
          >
            <Sparkles size={14} /> Simple & Transparent
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-muted-foreground text-lg">Cancel anytime. 30-day money-back guarantee.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -10, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              className={`rounded-2xl border p-6 relative group transition-all duration-300 ${
                plan.popular
                  ? "border-primary bg-card shadow-xl shadow-primary/10 scale-[1.02]"
                  : "border-border bg-card hover:shadow-xl hover:border-primary/20"
              }`}
            >
              {plan.popular && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1"
                >
                  <Star size={12} fill="currentColor" /> Most Popular
                </motion.span>
              )}
              <h3 className="font-display text-xl font-bold mb-1">{plan.name}</h3>
              {plan.highlight && <p className="text-xs text-accent font-medium mb-3">{plan.highlight}</p>}
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-display font-bold">{plan.priceUsd}</span>
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
                className={`w-full rounded-xl ${plan.popular ? "bg-gradient-to-r from-primary to-accent hover:opacity-90 border-0" : ""}`}
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handlePlanClick(plan)}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      <PaymentModal open={!!paymentPlan} onClose={() => setPaymentPlan(null)} plan={paymentPlan} />
    </section>
  );
}
