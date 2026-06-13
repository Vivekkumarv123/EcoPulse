"use client";

import { RECENT_LEDGER_MAX } from "@/lib/formConstants";

/**
 * `RecentLedger` — shows the latest entries ledger list.
 *
 * @param props.entries array of entry objects to display
 */
export function RecentLedger({
  entries
}: {
  entries: readonly {
    id: string;
    category: string;
    description: string;
    date: string;
    carbonValue: number;
    value: number;
  }[];
}) {
  return (
    <section aria-labelledby="recent" className="card p-6">
      <div className="mb-4 flex items-center justify-between border-b border-white/[0.03] pb-4">
        <h2 id="recent" className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Historical Activity Ledger
        </h2>
        <span className="font-mono text-[10px] uppercase text-slate-600">
          showing latest {RECENT_LEDGER_MAX} sequences
        </span>
      </div>

      <div className="overflow-x-auto">
        <ul className="min-w-[500px] divide-y divide-white/[0.03]">
          {entries.slice(0, RECENT_LEDGER_MAX).map((e) => (
            <li
              key={e.id}
              className="group -mx-2 flex items-center justify-between rounded-lg px-2 py-3.5 transition-colors hover:bg-white/[0.005]"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-md border border-white/[0.05] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-slate-400 transition-colors group-hover:border-emerald-500/30">
                  {e.category}
                </div>
                <div>
                  <div className="text-xs font-bold tracking-tight text-slate-200">
                    {e.description}
                  </div>
                  <div className="mt-0.5 text-[10px] font-medium text-slate-500">
                    {new Date(e.date).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono text-xs font-black text-white">
                  {e.carbonValue} kg CO₂e
                </div>
                <div className="mt-0.5 font-mono text-[10px] text-slate-500">{e.value} units</div>
              </div>
            </li>
          ))}
          {entries.length === 0 && (
            <li className="py-8 text-center text-xs font-medium text-slate-500">
              No telemetry sequences detected. Initialize standard carbon calculation matrices to
              populate database rows.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}


