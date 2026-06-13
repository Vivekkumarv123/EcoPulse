"use client";

/**
 * `CarbonScoreCard` — displays the aggregate carbon footprint index.
 *
 * @param props.total aggregated footprint total
 */
export function CarbonScoreCard({ total }: { total: number }) {
  return (
    <section aria-labelledby="score" className="card group relative overflow-hidden p-6">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-500/5 blur-2xl" />
      <span
        id="score"
        className="block text-[10px] font-bold uppercase tracking-widest text-slate-500"
      >
        Aggregate Carbon Footprint Index
      </span>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text font-mono text-5xl font-black tracking-tighter text-transparent">
          {total.toLocaleString()}
        </span>
        <span className="text-sm font-bold tracking-wide text-slate-400">kg CO₂e / period</span>
      </div>
      <div className="mt-4 flex items-center gap-2 border-t border-white/[0.03] pt-4 text-xs text-slate-400">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        <span>Real-time time-series logging operational layer</span>
      </div>
    </section>
  );
}


