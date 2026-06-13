"use client";
import type { Insight } from "@/types";

/**
 * `InsightsPanel` — displays a list of insight cards.
 *
 * @param props.insights array of insight objects
 */
export function InsightsPanel({ insights }: { insights: readonly Insight[] }) {
  return (
    <section aria-labelledby="insights" className="card p-6 h-full flex flex-col">
      <h2 id="insights" className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-white/[0.03] pb-3">
        AI Optimization Engine Insights
      </h2>

      <ul className="space-y-3 overflow-y-auto flex-1">
        {insights.map((i) => (
          <li
            key={i.id}
            className="p-4 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.04] rounded-xl transition duration-200 flex gap-3.5 items-start"
          >
            <div className="w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 text-xs mt-0.5">✦</div>
            <div className="space-y-1">
              <strong className="text-xs font-bold text-white tracking-tight block">{i.title}</strong>
              <p className="text-[11px] text-slate-400 leading-relaxed">{i.message}</p>
            </div>
          </li>
        ))}
        {insights.length === 0 && (
          <div className="text-center py-8 text-xs text-slate-500 font-medium">No behavioral diagnostics reported yet.</div>
        )}
      </ul>
    </section>
  );
}

export default InsightsPanel;
