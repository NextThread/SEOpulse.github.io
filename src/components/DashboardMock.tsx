import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, BarChart3, Zap, Target, Globe } from "lucide-react";

const keywords = [
  { term: "SEO audit tool", vol: "2.4K", diff: "Low", change: "+12%", icon: Target, trend: [30, 45, 42, 55, 68, 72, 85] },
  { term: "content optimizer AI", vol: "1.8K", diff: "Med", change: "+8%", icon: Zap, trend: [20, 35, 30, 40, 52, 60, 65] },
  { term: "keyword research tool", vol: "3.1K", diff: "Low", change: "+15%", icon: Globe, trend: [40, 38, 50, 55, 70, 78, 90] },
  { term: "rank tracker free", vol: "4.2K", diff: "High", change: "+5%", icon: BarChart3, trend: [50, 48, 52, 58, 55, 62, 60] },
];

function MiniTrendLine({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 60;
  const h = 24;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg width={w} height={h} className="flex-shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DashboardMock() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-border bg-card p-6 md:p-8 max-w-4xl mx-auto shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-8 items-start relative">
        {/* Score gauge */}
        <div className="flex-shrink-0 relative w-36 h-36 mx-auto md:mx-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--accent))" strokeWidth="6" strokeLinecap="round"
              strokeDasharray="251" strokeDashoffset="38" className="animate-fill-gauge" style={{ animationFillMode: "forwards" }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-display font-bold">85</span>
            <span className="text-xs text-muted-foreground font-medium">SEO Score</span>
          </div>
        </div>

        {/* Keywords */}
        <div className="flex-1 w-full space-y-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-accent" />
              <p className="text-sm font-bold uppercase tracking-wider">Top Keywords</p>
            </div>
            <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">Live Data</span>
          </div>

          {keywords.map((kw, i) => (
            <motion.div
              key={kw.term}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.12, duration: 0.4 }}
              whileHover={{ x: 4, scale: 1.01 }}
              className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 transition-all cursor-default hover:border-primary/30 hover:shadow-md hover:bg-primary/[0.02] group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <kw.icon size={14} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold block truncate">{kw.term}</span>
                <span className="text-[11px] text-muted-foreground">{kw.vol}/mo</span>
              </div>
              <MiniTrendLine data={kw.trend} color={kw.change.startsWith("+") ? "hsl(168, 100%, 39%)" : "hsl(0, 84%, 60%)"} />
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-bold text-accent flex items-center gap-0.5">
                  <ArrowUpRight size={12} /> {kw.change}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  kw.diff === "Low" ? "bg-accent/10 text-accent" : kw.diff === "Med" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                }`}>
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
