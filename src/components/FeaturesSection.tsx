import { motion } from "framer-motion";
import { Search, TrendingUp, Lightbulb, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Instant Keyword Engine",
    desc: "AI pulls 50+ long-tails tailored to your niche (e.g., Tripura tourism). Free: Basics. Premium: Competitor gaps + volume estimates.",
  },
  {
    icon: TrendingUp,
    title: "Smart Content Audits",
    desc: "Score your draft 0–100 with readability, density fixes. Premium: 20+ actionable suggestions like 'Add LSI for +15% rank boost'.",
  },
  {
    icon: Lightbulb,
    title: "Meta & Snippet Magic",
    desc: "Auto-generate titles/descriptions with CTR previews. Voice search ready for Hindi/English queries.",
  },
  {
    icon: ShieldCheck,
    title: "India-Optimized",
    desc: "GST-compliant exports, local trends (Assamese/Bengali keywords for NE creators). No fluff, just results.",
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
              className="rounded-lg border border-border bg-card p-6 hover:border-muted-foreground/30 transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <f.icon size={20} className="text-primary" />
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
