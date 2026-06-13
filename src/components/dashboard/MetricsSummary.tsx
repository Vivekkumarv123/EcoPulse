"use client";

import type { Goal, Challenge, CarbonTarget } from "@/types";

/**
 * `MetricsSummary` — small summary cards showing counts and progress.
 *
 * @param props.goals goals array
 * @param props.challenges challenges array
 * @param props.targets targets array
 */
export function MetricsSummary({
  goals,
  challenges,
  targets
}: {
  goals: readonly Goal[];
  challenges: readonly Challenge[];
  targets: readonly CarbonTarget[];
}) {
  return (
    <section aria-labelledby="dashboard-summary" className="card p-6">
      <h2
        id="dashboard-summary"
        className="mb-4 border-b border-white/[0.03] pb-3 text-xs font-bold uppercase tracking-widest text-slate-400"
      >
        Dashboard Summary
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4" role="region" aria-label="Active goals metric">
          <p className="mb-2 text-xs uppercase tracking-widest text-slate-400">Active Goals</p>
          <p className="text-2xl font-bold text-white" role="status">{goals.filter((g) => g.active).length}</p>
          <p className="mt-2 text-xs text-slate-500">of {goals.length}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4" role="region" aria-label="Goal progress metric">
          <p className="mb-2 text-xs uppercase tracking-widest text-slate-400">Goal Progress</p>
          <p className="text-2xl font-bold text-white" role="status">
            {goals.length
              ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
              : 0}
            %
          </p>
          <p className="mt-2 text-xs text-slate-500">average completion</p>
        </div>
        <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4" role="region" aria-label="Challenges completed metric">
          <p className="mb-2 text-xs uppercase tracking-widest text-slate-400">
            Challenges Completed
          </p>
          <p className="text-2xl font-bold text-white" role="status">
            {challenges.filter((c) => c.completed).length}
          </p>
          <p className="mt-2 text-xs text-slate-500">of {challenges.length}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4" role="region" aria-label="Target nodes metric">
          <p className="mb-2 text-xs uppercase tracking-widest text-slate-400">Target Nodes</p>
          <p className="text-2xl font-bold text-white" role="status">{targets.length}</p>
          <p className="mt-2 text-xs text-slate-500">categories monitored</p>
        </div>
      </div>
    </section>
  );
}


