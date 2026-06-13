"use client";

import { GoalsPanel } from "@/components/goals/GoalsPanel";
import { ChallengesPanel } from "@/components/challenges/ChallengesPanel";

/**
 * `DashboardPanels` — layout wrapper for Goals and Challenges cards.
 *
 * Keeps dashboard page markup focused on high-level composition.
 */
export function DashboardPanels() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="card rounded-3xl border-white/[0.03] bg-white/[0.005] p-1.5">
        <GoalsPanel />
      </div>
      <div className="card rounded-3xl border-white/[0.03] bg-white/[0.005] p-1.5">
        <ChallengesPanel />
      </div>
    </div>
  );
}


