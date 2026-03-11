import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2, AlertTriangle, TrendingUp, Search, FileText, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuditModalProps {
  open: boolean;
  onClose: () => void;
}

const analyzeSteps = [
  { icon: Search, text: "Crawling page structure...", color: "text-primary" },
  { icon: FileText, text: "Analyzing content quality...", color: "text-accent" },
  { icon: Gauge, text: "Measuring keyword density...", color: "text-primary" },
  { icon: TrendingUp, text: "Calculating SEO score...", color: "text-accent" },
];

const suggestions = [
  { type: "success", text: "Strong headline with primary keyword — great job!", icon: CheckCircle2 },
  { type: "warning", text: "Add 3 LSI keywords for +12% rank boost", icon: AlertTriangle },
  { type: "warning", text: "Meta description too short — expand to 155 chars", icon: AlertTriangle },
  { type: "warning", text: "H2 tags missing — add subheadings for structure", icon: AlertTriangle },
  { type: "success", text: "Mobile-friendly layout detected", icon: CheckCircle2 },
  { type: "success", text: "Image alt tags properly configured", icon: CheckCircle2 },
];

const metrics = [
  { label: "Readability", score: 82, color: "accent" },
  { label: "Keyword Usage", score: 68, color: "primary" },
  { label: "Technical SEO", score: 91, color: "accent" },
  { label: "Content Length", score: 74, color: "primary" },
];

export default function AuditModal({ open, onClose }: AuditModalProps) {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<"input" | "analyzing" | "results">("input");
  const [currentStep, setCurrentStep] = useState(0);
  const [scoreAnimated, setScoreAnimated] = useState(0);

  const handleAnalyze = () => {
    if (!url.trim()) return;
    setPhase("analyzing");
    setCurrentStep(0);
  };

  useEffect(() => {
    if (phase !== "analyzing") return;
    if (currentStep < analyzeSteps.length) {
      const timer = setTimeout(() => setCurrentStep((s) => s + 1), 800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setPhase("results");
        setScoreAnimated(0);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [phase, currentStep]);

  // Animate score counting
  useEffect(() => {
    if (phase !== "results") return;
    const target = 78;
    if (scoreAnimated < target) {
      const timer = setTimeout(() => setScoreAnimated((s) => Math.min(s + 2, target)), 30);
      return () => clearTimeout(timer);
    }
  }, [phase, scoreAnimated]);

  const handleClose = () => {
    setUrl("");
    setPhase("input");
    setCurrentStep(0);
    setScoreAnimated(0);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-md p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-card rounded-2xl border border-border w-full max-w-lg p-6 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient border glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={20} className="text-primary animate-spin-slow" />
                <h3 className="text-xl font-display font-bold">Free SEO Audit</h3>
              </div>

              <AnimatePresence mode="wait">
                {phase === "input" && (
                  <motion.div
                    key="input"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <p className="text-sm text-muted-foreground">
                      Enter your URL to get a comprehensive AI-powered SEO analysis
                    </p>
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://your-website.com"
                        className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        aria-label="URL to audit"
                        onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                      />
                    </div>
                    <Button onClick={handleAnalyze} className="w-full gap-2 rounded-xl" size="lg">
                      <Sparkles size={16} /> Analyze Now
                    </Button>
                  </motion.div>
                )}

                {phase === "analyzing" && (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="py-6 space-y-6"
                  >
                    {/* Animated scanner */}
                    <div className="flex justify-center">
                      <div className="relative w-28 h-28">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
                          <motion.circle
                            cx="50" cy="50" r="40"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray="251"
                            initial={{ strokeDashoffset: 251 }}
                            animate={{ strokeDashoffset: 251 - (251 * (currentStep / analyzeSteps.length)) }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles size={24} className="text-primary" />
                          </motion.div>
                        </div>
                        {/* Orbiting dots */}
                        <motion.div
                          className="absolute w-3 h-3 rounded-full bg-accent"
                          animate={{
                            rotate: 360,
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          style={{ top: 0, left: "50%", transformOrigin: "0 56px" }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      {analyzeSteps.map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={i <= currentStep ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-3 text-sm"
                        >
                          <step.icon size={16} className={i < currentStep ? "text-accent" : i === currentStep ? step.color + " animate-pulse" : "text-muted-foreground"} />
                          <span className={i <= currentStep ? "text-foreground" : "text-muted-foreground"}>
                            {step.text}
                          </span>
                          {i < currentStep && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-auto"
                            >
                              <CheckCircle2 size={14} className="text-accent" />
                            </motion.span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {phase === "results" && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-5"
                  >
                    {/* Score */}
                    <div className="flex items-center gap-5">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                          <motion.circle
                            cx="50" cy="50" r="40"
                            fill="none"
                            stroke="hsl(var(--accent))"
                            strokeWidth="6"
                            strokeDasharray="251"
                            strokeLinecap="round"
                            initial={{ strokeDashoffset: 251 }}
                            animate={{ strokeDashoffset: 251 - (251 * 0.78) }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-display font-bold">{scoreAnimated}</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-lg">Score: 78/100</p>
                        <p className="text-sm text-muted-foreground">Good — a few fixes will push you higher</p>
                      </div>
                    </div>

                    {/* Metrics grid */}
                    <div className="grid grid-cols-2 gap-2">
                      {metrics.map((m, i) => (
                        <motion.div
                          key={m.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="rounded-lg border border-border p-3"
                        >
                          <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">{m.score}</span>
                            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full ${m.color === "accent" ? "bg-accent" : "bg-primary"}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${m.score}%` }}
                                transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Suggestions */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Suggestions</p>
                      {suggestions.map((s, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.08 }}
                          className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-sm ${
                            s.type === "success" ? "border-accent/30 bg-accent/5" : "border-border"
                          }`}
                        >
                          <s.icon
                            size={16}
                            className={`mt-0.5 flex-shrink-0 ${s.type === "success" ? "text-accent" : "text-primary"}`}
                          />
                          <span>{s.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    <p className="text-xs text-center text-muted-foreground">
                      🔒 Upgrade to Premium for 20+ detailed suggestions & competitor analysis
                    </p>

                    <Button onClick={handleClose} variant="outline" className="w-full rounded-xl">
                      Close
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
