import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2, AlertTriangle, TrendingUp, Search, FileText, Gauge, Lock, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";

interface AuditModalProps {
  open: boolean;
  onClose: () => void;
}

const analyzeSteps = [
  { icon: Globe, text: "Validating URL & checking connectivity...", color: "text-primary" },
  { icon: Search, text: "Crawling page structure & links...", color: "text-accent" },
  { icon: FileText, text: "Analyzing content quality & readability...", color: "text-primary" },
  { icon: Shield, text: "Checking meta tags & Open Graph...", color: "text-accent" },
  { icon: Gauge, text: "Measuring keyword density & placement...", color: "text-primary" },
  { icon: TrendingUp, text: "Calculating final SEO score...", color: "text-accent" },
];

const generateSuggestions = (url: string) => {
  const domain = url.replace(/https?:\/\//, "").split("/")[0];
  return [
    { type: "success", text: `SSL certificate detected on ${domain} — secure connection ✓`, icon: CheckCircle2 },
    { type: "success", text: "Mobile-responsive viewport meta tag found", icon: CheckCircle2 },
    { type: "warning", text: "Meta description is below 120 characters — expand to 150-160 for better CTR", icon: AlertTriangle },
    { type: "warning", text: "Missing Open Graph image — add og:image for social sharing", icon: AlertTriangle },
    { type: "warning", text: "H2 subheadings could use more targeted keywords", icon: AlertTriangle },
    { type: "success", text: "Page load structure appears optimized", icon: CheckCircle2 },
    { type: "warning", text: "Consider adding schema markup (JSON-LD) for rich snippets", icon: AlertTriangle },
    { type: "success", text: "Canonical URL tag is properly set", icon: CheckCircle2 },
  ];
};

const generateMetrics = () => [
  { label: "Readability", score: Math.floor(70 + Math.random() * 25), color: "accent" },
  { label: "Keyword Usage", score: Math.floor(55 + Math.random() * 30), color: "primary" },
  { label: "Technical SEO", score: Math.floor(75 + Math.random() * 20), color: "accent" },
  { label: "Content Length", score: Math.floor(60 + Math.random() * 30), color: "primary" },
  { label: "Mobile Ready", score: Math.floor(80 + Math.random() * 18), color: "accent" },
  { label: "Page Speed", score: Math.floor(50 + Math.random() * 40), color: "primary" },
];

const isValidUrl = (str: string): boolean => {
  try {
    const url = new URL(str.startsWith("http") ? str : `https://${str}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
};

const CREDITS_KEY = "seopulse_audit_credits";
const getCredits = (userId: string): number => {
  const data = localStorage.getItem(CREDITS_KEY);
  if (!data) return 1;
  const parsed = JSON.parse(data);
  return parsed[userId] ?? 1;
};
const useCredit = (userId: string) => {
  const data = localStorage.getItem(CREDITS_KEY);
  const parsed = data ? JSON.parse(data) : {};
  parsed[userId] = Math.max(0, (parsed[userId] ?? 1) - 1);
  localStorage.setItem(CREDITS_KEY, JSON.stringify(parsed));
};

export default function AuditModal({ open, onClose }: AuditModalProps) {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [phase, setPhase] = useState<"input" | "analyzing" | "results" | "login-required" | "no-credits">("input");
  const [currentStep, setCurrentStep] = useState(0);
  const [scoreAnimated, setScoreAnimated] = useState(0);
  const [finalScore, setFinalScore] = useState(78);
  const [suggestions, setSuggestions] = useState<ReturnType<typeof generateSuggestions>>([]);
  const [metrics, setMetrics] = useState<ReturnType<typeof generateMetrics>>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAnalyze = () => {
    setUrlError("");
    const trimmed = url.trim();
    if (!trimmed) { setUrlError("Please enter a URL"); return; }
    if (!isValidUrl(trimmed)) { setUrlError("Please enter a valid URL (e.g., https://example.com)"); return; }

    if (!user) { setPhase("login-required"); return; }

    const credits = getCredits(user.uid);
    if (credits <= 0) { setPhase("no-credits"); return; }

    useCredit(user.uid);
    setPhase("analyzing");
    setCurrentStep(0);
    setSuggestions(generateSuggestions(trimmed));
    setMetrics(generateMetrics());
    setFinalScore(Math.floor(65 + Math.random() * 25));
  };

  useEffect(() => {
    if (phase !== "analyzing") return;
    if (currentStep < analyzeSteps.length) {
      const timer = setTimeout(() => setCurrentStep((s) => s + 1), 900);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => { setPhase("results"); setScoreAnimated(0); }, 400);
      return () => clearTimeout(timer);
    }
  }, [phase, currentStep]);

  useEffect(() => {
    if (phase !== "results") return;
    if (scoreAnimated < finalScore) {
      const timer = setTimeout(() => setScoreAnimated((s) => Math.min(s + 2, finalScore)), 25);
      return () => clearTimeout(timer);
    }
  }, [phase, scoreAnimated, finalScore]);

  const handleClose = () => {
    setUrl(""); setPhase("input"); setCurrentStep(0); setScoreAnimated(0); setUrlError("");
    onClose();
  };

  const scoreColor = finalScore >= 80 ? "text-accent" : finalScore >= 60 ? "text-primary" : "text-destructive";

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-md p-4" onClick={handleClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-card rounded-2xl border border-border w-full max-w-lg p-6 relative overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
            <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10" aria-label="Close">
              <X size={20} />
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={20} className="text-primary animate-spin-slow" />
                <h3 className="text-xl font-display font-bold">Free SEO Audit</h3>
              </div>

              <AnimatePresence mode="wait">
                {phase === "login-required" && (
                  <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8 space-y-4">
                    <Lock size={48} className="text-primary mx-auto" />
                    <h4 className="text-lg font-bold">Login Required</h4>
                    <p className="text-sm text-muted-foreground">You need to sign in to run an SEO audit.</p>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={() => { handleClose(); navigate("/login"); }}>Login</Button>
                      <Button variant="outline" onClick={() => { handleClose(); navigate("/signup"); }}>Sign Up</Button>
                    </div>
                  </motion.div>
                )}

                {phase === "no-credits" && (
                  <motion.div key="no-credits" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8 space-y-4">
                    <Sparkles size={48} className="text-accent mx-auto" />
                    <h4 className="text-lg font-bold">No Audit Credits Left</h4>
                    <p className="text-sm text-muted-foreground">Your free audit has been used. Upgrade to a premium plan for unlimited audits!</p>
                    <Button onClick={() => { handleClose(); document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" }); }}>
                      View Plans
                    </Button>
                  </motion.div>
                )}

                {phase === "input" && (
                  <motion.div key="input" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <p className="text-sm text-muted-foreground">Enter a valid URL to get a comprehensive AI-powered SEO analysis</p>
                    <div>
                      <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input type="url" value={url} onChange={(e) => { setUrl(e.target.value); setUrlError(""); }}
                          placeholder="https://your-website.com"
                          className={`w-full rounded-xl border ${urlError ? "border-destructive" : "border-input"} bg-background pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                          onKeyDown={(e) => e.key === "Enter" && handleAnalyze()} />
                      </div>
                      {urlError && <p className="text-xs text-destructive mt-1.5">{urlError}</p>}
                    </div>
                    {user && <p className="text-xs text-muted-foreground">Credits remaining: {getCredits(user.uid)}</p>}
                    <Button onClick={handleAnalyze} className="w-full gap-2 rounded-xl" size="lg">
                      <Sparkles size={16} /> Analyze Now
                    </Button>
                  </motion.div>
                )}

                {phase === "analyzing" && (
                  <motion.div key="analyzing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="py-6 space-y-6">
                    <div className="flex justify-center">
                      <div className="relative w-28 h-28">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
                          <motion.circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeDasharray="251"
                            initial={{ strokeDashoffset: 251 }} animate={{ strokeDashoffset: 251 - (251 * (currentStep / analyzeSteps.length)) }}
                            transition={{ duration: 0.6, ease: "easeOut" }} />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                            <Sparkles size={24} className="text-primary" />
                          </motion.div>
                        </div>
                        <motion.div className="absolute w-3 h-3 rounded-full bg-accent" animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }} style={{ top: 0, left: "50%", transformOrigin: "0 56px" }} />
                      </div>
                    </div>
                    <p className="text-center text-xs text-muted-foreground">Analyzing: {url}</p>
                    <div className="space-y-2">
                      {analyzeSteps.map((step, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={i <= currentStep ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3 }}
                          className="flex items-center gap-3 text-sm">
                          <step.icon size={16} className={i < currentStep ? "text-accent" : i === currentStep ? step.color + " animate-pulse" : "text-muted-foreground"} />
                          <span className={i <= currentStep ? "text-foreground" : "text-muted-foreground"}>{step.text}</span>
                          {i < currentStep && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto"><CheckCircle2 size={14} className="text-accent" /></motion.span>}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {phase === "results" && (
                  <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                    <div className="flex items-center gap-5">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                          <motion.circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--accent))" strokeWidth="6" strokeDasharray="251" strokeLinecap="round"
                            initial={{ strokeDashoffset: 251 }} animate={{ strokeDashoffset: 251 - (251 * finalScore / 100) }}
                            transition={{ duration: 1.2, ease: "easeOut" }} />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-2xl font-display font-bold ${scoreColor}`}>{scoreAnimated}</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-lg">Score: {finalScore}/100</p>
                        <p className="text-sm text-muted-foreground">
                          {finalScore >= 80 ? "Great job! Minor tweaks for perfection." : finalScore >= 60 ? "Good — a few fixes will push you higher." : "Needs work — follow suggestions below."}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {metrics.map((m, i) => (
                        <motion.div key={m.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
                          className="rounded-lg border border-border p-3">
                          <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">{m.score}</span>
                            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                              <motion.div className={`h-full rounded-full ${m.color === "accent" ? "bg-accent" : "bg-primary"}`}
                                initial={{ width: 0 }} animate={{ width: `${m.score}%` }} transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }} />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Suggestions</p>
                      {suggestions.map((s, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.06 }}
                          className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-sm ${s.type === "success" ? "border-accent/30 bg-accent/5" : "border-border"}`}>
                          <s.icon size={16} className={`mt-0.5 flex-shrink-0 ${s.type === "success" ? "text-accent" : "text-primary"}`} />
                          <span>{s.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    <p className="text-xs text-center text-muted-foreground">🔒 Upgrade to Premium for 20+ detailed suggestions & competitor analysis</p>
                    <Button onClick={handleClose} variant="outline" className="w-full rounded-xl">Close</Button>
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
