"use client";

import { RECENT_LEDGER_MAX } from "@/lib/formConstants";

/**
 * `RecentLedger` — shows the latest entries ledger list.
 *
 * @param props.entries array of entry objects to display
 */
export function RecentLedger({ entries }: { entries: readonly { id: string; category: string; description: string; date: string; carbonValue: number; value: number }[] }) {
  return (
    <section aria-labelledby="recent" className="card p-6">
      <div className="flex items-center justify-between border-b border-white/[0.03] pb-4 mb-4">
        <h2 id="recent" className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Historical Activity Ledger
        </h2>
        <span className="text-[10px] font-mono text-slate-600 uppercase">showing latest {RECENT_LEDGER_MAX} sequences</span>
      </div>

      <div className="overflow-x-auto">
        <ul className="divide-y divide-white/[0.03] min-w-[500px]">
          {entries.slice(0, RECENT_LEDGER_MAX).map((e) => (
            <li key={e.id} className="py-3.5 flex justify-between items-center group hover:bg-white/[0.005] px-2 -mx-2 rounded-lg transition-colors">
              <div className="flex items-center gap-4">
                <div className="px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/[0.05] text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide group-hover:border-emerald-500/30 transition-colors">
                  {e.category}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200 tracking-tight">{e.description}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-medium">{new Date(e.date).toLocaleString()}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono font-black text-white">{e.carbonValue} kg CO₂e</div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5">{e.value} units</div>
              </div>
            </li>
          ))}
          {entries.length === 0 && (
            <li className="py-8 text-center text-xs text-slate-500 font-medium">
              No telemetry sequences detected. Initialize standard carbon calculation matrices to populate database rows.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

export default RecentLedger;
