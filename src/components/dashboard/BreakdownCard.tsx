"use client";

/**
 * `BreakdownCard` — visual breakdown and allocation bars for category emissions.
 *
 * @param props.metrics list of metric objects with label/value/color/text
 * @param props.totalWeight fallback total weight used for percentage calculations
 */
export function BreakdownCard({ metrics, totalWeight }: { metrics: { label: string; value: number; color: string; text: string }[]; totalWeight: number }) {
  return (
    <section aria-labelledby="breakdown" className="card p-6">
      <h2 id="breakdown" className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-white/[0.03] pb-3">
        Emission Mass Allocation
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
        <div role="figure" aria-labelledby="breakdown-visual" className="sm:col-span-5 flex justify-center">
          <h3 id="breakdown-visual" className="sr-only">Category allocation ring distribution</h3>
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg viewBox="0 0 32 32" className="w-full h-full -rotate-90 transform" role="img">
              <circle r="14" cx="16" cy="16" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="4" />
              <circle r="14" cx="16" cy="16" fill="none" stroke="rgba(16,185,129,0.8)" strokeWidth="4" strokeDasharray="88 88" strokeDashoffset="20" strokeLinecap="round" />
            </svg>
            <div className="absolute text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">Mass Matrix</span>
              <span className="text-sm font-mono font-bold text-white">100% Verified</span>
            </div>
          </div>
        </div>

        <ul className="sm:col-span-7 space-y-4">
          {metrics.map((metric) => {
            const percentage = Math.min(Math.round((metric.value / totalWeight) * 100), 100) || 0;
            return (
              <li key={metric.label} className="space-y-1">
                <div className="flex justify-between text-xs font-medium tracking-wide">
                  <span className="text-slate-300">{metric.label}</span>
                  <span className={`font-mono font-bold ${metric.text}`}>
                    {metric.value} kg <span className="text-slate-600 text-[10px]">({percentage}%)</span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/[0.02] border border-white/[0.04] rounded-full overflow-hidden">
                  <div className={`h-full ${metric.color} rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default BreakdownCard;
