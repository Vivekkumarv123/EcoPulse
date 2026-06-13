"use client";

import type { CarbonTarget } from "@/types";

/**
 * `DashboardTargets` — renders target summary cards on the dashboard.
 *
 * @param props.targets array of target configurations
 */
export function DashboardTargets({ targets }: { targets: readonly CarbonTarget[] }) {
  return (
    <section aria-labelledby="targets" className="card p-6">
      <h2
        id="targets"
        className="mb-4 border-b border-white/[0.03] pb-3 text-xs font-bold uppercase tracking-widest text-slate-400"
      >
        Target Summary
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" suppressHydrationWarning>
        {targets.map((target) => (
          <div
            key={`${target.category}-${target.interval}`}
            className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-slate-400">
              {target.category}
            </p>
            <p className="text-2xl font-bold text-white">{target.targetValue}</p>
            <p className="mt-2 text-xs text-slate-500">{target.interval} target</p>
          </div>
        ))}
      </div>
    </section>
  );
}


