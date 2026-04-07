import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, TrendingUp, Lightbulb, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Search,
    title: "Instant Keyword Engine",
    desc: "AI pulls 50+ long-tail keywords tailored to your niche. Free: Basics. Premium: Competitor gaps + volume estimates.",
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 2,
    icon: TrendingUp,
    title: "Smart Content Audits",
    desc: "Score your draft 0–100 with readability, density fixes. Premium: 20+ actionable suggestions.",
    status: "completed" as const,
    energy: 88,
  },
  {
    id: 3,
    icon: Lightbulb,
    title: "Meta & Snippet Magic",
    desc: "Auto-generate titles/descriptions with CTR previews. Voice search ready for multilingual queries.",
    status: "in-progress" as const,
    energy: 72,
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Enterprise-Ready",
    desc: "White-label reports, API access, bulk audits, and team collaboration. Built for agencies.",
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 5,
    icon: Zap,
    title: "Real-Time Analytics",
    desc: "Track rankings, traffic, and conversions in real-time with beautiful dashboards and alerts.",
    status: "pending" as const,
    energy: 40,
  },
];

export default function FeaturesSection() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => setRotationAngle((a) => (a + 0.3) % 360), 50);
    return () => clearInterval(timer);
  }, [autoRotate]);

  const toggleItem = (id: number) => {
    if (activeId === id) { setActiveId(null); setAutoRotate(true); }
    else { setActiveId(id); setAutoRotate(false); }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "border-accent bg-accent/10 text-accent";
      case "in-progress": return "border-primary bg-primary/10 text-primary";
      default: return "border-muted-foreground/30 bg-muted text-muted-foreground";
    }
  };

  return (
    <section ref={sectionRef} id="features" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ scale: bgScale, opacity: bgOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/3 blur-3xl"
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
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
            className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold text-accent mb-4"
          >
            <Zap size={14} /> Powerful Features
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Why SEOPulse AI{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Crushes
            </span>{" "}
            SEO Guesswork
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-muted-foreground max-w-xl mx-auto text-lg"
          >
            Our AI-powered platform delivers everything you need to dominate search rankings.
          </motion.p>
        </motion.div>

        {/* Orbital view for desktop */}
        <div className="hidden lg:flex justify-center items-center" style={{ minHeight: 520 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            ref={containerRef}
            className="relative"
            style={{ width: 520, height: 520 }}
            onClick={(e) => { if (e.target === e.currentTarget) { setActiveId(null); setAutoRotate(true); } }}
          >
            {/* Center hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center z-10">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                <Search size={28} className="text-primary" />
              </motion.div>
            </div>

            {/* Orbit rings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-border/30"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-border/20"
            />

            {features.map((f, i) => {
              const angle = ((i / features.length) * 360 + rotationAngle) % 360;
              const radian = (angle * Math.PI) / 180;
              const radius = 200;
              const x = radius * Math.cos(radian);
              const y = radius * Math.sin(radian);
              const isActive = activeId === f.id;
              const opacity = Math.max(0.5, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2));

              return (
                <motion.div
                  key={f.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                    zIndex: isActive ? 50 : Math.round(10 + 5 * Math.cos(radian)),
                    opacity: isActive ? 1 : opacity,
                  }}
                  onClick={(e) => { e.stopPropagation(); toggleItem(f.id); }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                    isActive ? "bg-primary text-primary-foreground scale-125 shadow-primary/30" : "bg-card border border-border hover:border-primary/50"
                  }`}>
                    <f.icon size={22} className={isActive ? "" : "text-primary"} />
                  </div>
                  <p className={`text-xs font-semibold text-center mt-2 whitespace-nowrap transition-colors ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {f.title}
                  </p>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-64 bg-card rounded-xl border border-border p-4 shadow-xl z-50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(f.status)}`}>
                          {f.status === "completed" ? "LIVE" : f.status === "in-progress" ? "BETA" : "COMING SOON"}
                        </span>
                        <span className="text-xs text-muted-foreground">Energy: {f.energy}%</span>
                      </div>
                      <h4 className="font-bold text-sm mb-1">{f.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                      <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          initial={{ width: 0 }} animate={{ width: `${f.energy}%` }} transition={{ duration: 0.8 }} />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile cards with staggered reveal */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <f.icon size={20} className="text-primary" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(f.status)}`}>
                  {f.status === "completed" ? "LIVE" : f.status === "in-progress" ? "BETA" : "SOON"}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${f.energy}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
