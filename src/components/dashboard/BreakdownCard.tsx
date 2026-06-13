"use client";

/**
 * `BreakdownCard` — visual breakdown and allocation bars for category emissions.
 *
 * @param props.metrics list of metric objects with label/value/color/text
 * @param props.totalWeight fallback total weight used for percentage calculations
 */
export function BreakdownCard({
  metrics,
  totalWeight
}: {
  metrics: { label: string; value: number; color: string; text: string }[];
  totalWeight: number;
}) {
  return (
    <section aria-labelledby="breakdown" className="card p-6">
      <h2
        id="breakdown"
        className="mb-6 border-b border-white/[0.03] pb-3 text-xs font-bold uppercase tracking-widest text-slate-400"
      >
        Emission Mass Allocation
      </h2>

      <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-12">
        <div
          role="figure"
          aria-labelledby="breakdown-visual"
          className="flex justify-center sm:col-span-5"
        >
          <h3 id="breakdown-visual" className="sr-only">
            Category allocation ring distribution
          </h3>
          <div className="relative flex h-40 w-40 items-center justify-center">
            <svg
              aria-hidden="true"
              viewBox="0 0 32 32"
              className="h-full w-full -rotate-90 transform"
              role="img"
            >
              <circle
                r="14"
                cx="16"
                cy="16"
                fill="none"
                stroke="rgba(255,255,255,0.02)"
                strokeWidth="4"
              />
              <circle
                r="14"
                cx="16"
                cy="16"
                fill="none"
                stroke="rgba(16,185,129,0.8)"
                strokeWidth="4"
                strokeDasharray="88 88"
                strokeDashoffset="20"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Mass Matrix
              </span>
              <span className="font-mono text-sm font-bold text-white">100% Verified</span>
            </div>
          </div>
        </div>

        <ul className="space-y-4 sm:col-span-7">
          {metrics.map((metric) => {
            const percentage = Math.min(Math.round((metric.value / totalWeight) * 100), 100) || 0;
            return (
              <li key={metric.label} className="space-y-1">
                <div className="flex justify-between text-xs font-medium tracking-wide">
                  <span className="text-slate-300">{metric.label}</span>
                  <span className={`font-mono font-bold ${metric.text}`}>
                    {metric.value} kg{" "}
                    <span className="text-[10px] text-slate-600">({percentage}%)</span>
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full border border-white/[0.04] bg-white/[0.02]">
                  <div
                    className={`h-full ${metric.color} rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}


