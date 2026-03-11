import { motion } from "framer-motion";

export default function DashboardMock() {
  const keywords = [
    { term: "SEO audit tool", vol: "2.4K", diff: "Low", change: "+12%" },
    { term: "content optimizer AI", vol: "1.8K", diff: "Med", change: "+8%" },
    { term: "keyword research tool", vol: "3.1K", diff: "Low", change: "+15%" },
  ];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-border bg-card p-6 md:p-8 max-w-3xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-accent/[0.02] pointer-events-none" />
      
      <div className="flex flex-col md:flex-row gap-8 items-center relative">
        {/* Score gauge */}
        <div className="flex-shrink-0 relative w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50" cy="50" r="40"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="8"
            />
            <circle
              cx="50" cy="50" r="40"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="251"
              strokeDashoffset="38"
              className="animate-fill-gauge"
              style={{ animationFillMode: "forwards" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-display font-bold">85</span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>

        {/* Keyword cards */}
        <div className="flex-1 w-full space-y-3">
          <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Top Keywords</p>
          {keywords.map((kw, i) => (
            <motion.div
              key={kw.term}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
              whileHover={{ x: 4, backgroundColor: "hsl(var(--muted) / 0.3)" }}
              className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5 transition-colors cursor-default"
            >
              <span className="text-sm font-medium">{kw.term}</span>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{kw.vol}/mo</span>
                <span className="text-accent font-semibold">{kw.change}</span>
                <span className={`px-2 py-0.5 rounded-full font-medium ${kw.diff === "Low" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                  {kw.diff}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
