import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuditModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuditModal({ open, onClose }: AuditModalProps) {
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(false);

  const handleAnalyze = () => {
    if (!url.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResults(true);
    }, 3000);
  };

  const handleClose = () => {
    setUrl("");
    setAnalyzing(false);
    setResults(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-card rounded-lg border border-border w-full max-w-lg p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-display font-bold mb-4">Free SEO Audit</h3>

            {!analyzing && !results && (
              <div className="space-y-4">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste your URL or content here..."
                  className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="URL or content to audit"
                />
                <Button onClick={handleAnalyze} className="w-full" size="lg">
                  Analyze
                </Button>
              </div>
            )}

            {analyzing && (
              <div className="py-8 space-y-6">
                {/* Drawing animation */}
                <div className="flex justify-center">
                  <div className="relative w-24 h-24">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="6"
                      />
                      <circle
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray="251"
                        strokeDashoffset="251"
                        className="animate-draw-line"
                        style={{ animationDuration: "2s" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-center text-sm text-muted-foreground">
                  <AnalyzingStep text="Analyzing Readability..." delay={0} />
                  <AnalyzingStep text="Finding Keywords..." delay={1000} />
                  <AnalyzingStep text="Checking Snippets..." delay={2000} />
                </div>
              </div>
            )}

            {results && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--accent))" strokeWidth="8" strokeDasharray="251" strokeDashoffset="55" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-display font-bold">78</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">Score: 78/100</p>
                    <p className="text-sm text-muted-foreground">Good – a few fixes will push you higher</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Suggestions</p>
                  {[
                    "Add 3 LSI keywords for +12% rank boost",
                    "Meta description too short – expand to 155 chars",
                    "H2 tags missing – add subheadings for structure",
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-md border border-border px-3 py-2 text-sm">
                      <span className="text-accent font-bold mt-0.5">→</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={handleClose} variant="outline" className="w-full">
                  Close
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AnalyzingStep({ text, delay }: { text: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  useState(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  });

  // Use effect instead
  if (!visible) {
    setTimeout(() => setVisible(true), delay);
  }

  return (
    <p className={`transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
      {text}
    </p>
  );
}
