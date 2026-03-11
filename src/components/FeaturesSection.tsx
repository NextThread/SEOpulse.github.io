import { motion } from "framer-motion";
import { Search, TrendingUp, Lightbulb, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Instant Keyword Engine",
    desc: "AI pulls 50+ long-tail keywords tailored to your niche. Free: Basics. Premium: Competitor gaps + volume estimates.",
  },
  {
    icon: TrendingUp,
    title: "Smart Content Audits",
    desc: "Score your draft 0–100 with readability, density fixes. Premium: 20+ actionable suggestions like 'Add LSI for +15% rank boost'.",
  },
  {
    icon: Lightbulb,
    title: "Meta & Snippet Magic",
    desc: "Auto-generate titles/descriptions with CTR previews. Voice search ready for multilingual queries.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Ready",
    desc: "White-label reports, API access, bulk audits, and team collaboration. Built for agencies and growing businesses.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function FeaturesSection() {
  return (
    <section id="features" className="section-spacing">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Why SEOPulse AI Crushes SEO Guesswork
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <f.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
