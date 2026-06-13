"use client";

/**
 * `CarbonScoreCard` — displays the aggregate carbon footprint index.
 *
 * @param props.total aggregated footprint total
 */
export function CarbonScoreCard({ total }: { total: number }) {
  return (
    <section aria-labelledby="score" className="card relative overflow-hidden group p-6">
      <div className="absolute -right-16 -top-16 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
      <span id="score" className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
        Aggregate Carbon Footprint Index
      </span>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-5xl font-mono font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
          {total.toLocaleString()}
        </span>
        <span className="text-sm font-bold text-slate-400 tracking-wide">kg CO₂e / period</span>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 border-t border-white/[0.03] pt-4">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Real-time time-series logging operational layer</span>
      </div>
    </section>
  );
}

export default CarbonScoreCard;
