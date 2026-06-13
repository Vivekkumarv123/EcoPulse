"use client";
import type { Insight } from "@/types";

/**
 * `InsightsPanel` — displays a list of insight cards.
 *
 * @param props.insights array of insight objects
 */
export function InsightsPanel({ insights }: { insights: readonly Insight[] }) {
  return (
    <section aria-labelledby="insights" className="card flex h-full flex-col p-6">
      <h2
        id="insights"
        className="mb-4 border-b border-white/[0.03] pb-3 text-xs font-bold uppercase tracking-widest text-slate-400"
      >
        AI Optimization Engine Insights
      </h2>

      <ul className="flex-1 space-y-3 overflow-y-auto">
        {insights.map((i) => (
          <li
            key={i.id}
            className="flex items-start gap-3.5 rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 transition duration-200 hover:bg-white/[0.02]"
          >
            <div
              aria-hidden="true"
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-emerald-500/20 bg-emerald-500/10 text-xs text-emerald-400"
            >
              ✦
            </div>
            <div className="space-y-1">
              <strong className="block text-xs font-bold tracking-tight text-white">
                {i.title}
              </strong>
              <p className="text-[11px] leading-relaxed text-slate-400">{i.message}</p>
            </div>
          </li>
        ))}
        {insights.length === 0 && (
          <div className="py-8 text-center text-xs font-medium text-slate-500">
            No behavioral diagnostics reported yet.
          </div>
        )}
      </ul>
    </section>
  );
}


