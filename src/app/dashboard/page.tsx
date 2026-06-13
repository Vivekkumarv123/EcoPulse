"use client";

/**
 * Dashboard page — primary analytics workspace composed of small, focused presentational
 * components like `CarbonScoreCard`, `BreakdownCard`, and `InsightsPanel`.
 */
import { useFootprint } from "@/hooks/useFootprint";
import { DASHBOARD_METRICS_COLORS } from "@/lib/formConstants";
import { CarbonScoreCard } from "@/components/dashboard/CarbonScoreCard";
import { BreakdownCard } from "@/components/dashboard/BreakdownCard";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";
import { MetricsSummary } from "@/components/dashboard/MetricsSummary";
import { RecentLedger } from "@/components/dashboard/RecentLedger";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardTargets } from "@/components/dashboard/DashboardTargets";
import { DashboardPanels } from "@/components/dashboard/DashboardPanels";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { breakdown, insights, entries, targets, goals, challenges } = useFootprint();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main id="main-content" className="mx-auto w-full max-w-7xl space-y-8 px-6 py-10">
        <header className="flex flex-col justify-between gap-4 border-b border-white/[0.04] pb-6 sm:flex-row sm:items-center">
          <div>
            <div className="h-3 w-32 animate-pulse rounded bg-white/5" />
            <div className="mt-2 h-8 w-64 animate-pulse rounded bg-white/5" />
          </div>
        </header>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div className="h-44 animate-pulse rounded-3xl border border-white/[0.04] bg-white/[0.01]" />
          </div>
        </div>
      </main>
    );
  }

  // Normalize metrics safely for chart distributions or calculate fallback metrics
  const totalWeight = breakdown.total || 1;
  const metrics = [
    {
      label: "Transport",
      value: breakdown.transport || 0,
      color: DASHBOARD_METRICS_COLORS.TRANSPORT.color,
      text: DASHBOARD_METRICS_COLORS.TRANSPORT.text
    },
    {
      label: "Food",
      value: breakdown.food || 0,
      color: DASHBOARD_METRICS_COLORS.FOOD.color,
      text: DASHBOARD_METRICS_COLORS.FOOD.text
    },
    {
      label: "Energy",
      value: breakdown.energy || 0,
      color: DASHBOARD_METRICS_COLORS.ENERGY.color,
      text: DASHBOARD_METRICS_COLORS.ENERGY.text
    },
    {
      label: "Waste",
      value: breakdown.waste || 0,
      color: DASHBOARD_METRICS_COLORS.WASTE.color,
      text: DASHBOARD_METRICS_COLORS.WASTE.text
    }
  ];

  return (
    <main id="main-content" className="fade-in mx-auto w-full max-w-7xl space-y-8 px-6 py-10">
      <DashboardHeader />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <CarbonScoreCard total={breakdown.total} />
          <BreakdownCard metrics={metrics} totalWeight={totalWeight} />
        </div>
        <div className="lg:col-span-5">
          <InsightsPanel insights={insights} />
        </div>
      </div>

      <MetricsSummary goals={goals} challenges={challenges} targets={targets} />

      <DashboardTargets targets={targets} />

      <DashboardPanels />

      <RecentLedger entries={entries} />
    </main>
  );
}
