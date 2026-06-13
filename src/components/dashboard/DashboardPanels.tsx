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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card p-1.5 border-white/[0.03] bg-white/[0.005] rounded-3xl">
        <GoalsPanel />
      </div>
      <div className="card p-1.5 border-white/[0.03] bg-white/[0.005] rounded-3xl">
        <ChallengesPanel />
      </div>
    </div>
  );
}

export default DashboardPanels;
