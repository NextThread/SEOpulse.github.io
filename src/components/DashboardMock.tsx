export default function DashboardMock() {
  const keywords = [
    { term: "SEO audit tool India", vol: "2.4K", diff: "Low" },
    { term: "content optimizer AI", vol: "1.8K", diff: "Med" },
    { term: "Tripura tourism blog", vol: "890", diff: "Low" },
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-6 md:p-8 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-center">
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
          {keywords.map((kw) => (
            <div
              key={kw.term}
              className="flex items-center justify-between rounded-md border border-border px-4 py-2.5"
            >
              <span className="text-sm font-medium">{kw.term}</span>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{kw.vol}/mo</span>
                <span className={`px-2 py-0.5 rounded-full font-medium ${kw.diff === "Low" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                  {kw.diff}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
