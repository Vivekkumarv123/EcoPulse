"use client";

import { useContext, useMemo, useState, useCallback } from "react";
import {
  FootprintStateContext,
  FootprintDispatchContext
} from "@/components/providers/AppProvider";
import { calculateEntryCarbon, computeBreakdown } from "@/lib/calculator";
import { CarbonCategory } from "@/types";
import { PAGINATION } from "@/lib/formConstants";
import { usePagination } from "@/hooks/usePagination";
import { useInsights } from "@/hooks/useInsights";

/**
 * Hook: useFootprint
 *
 * Provides application footprint state selectors, derived data (breakdown, insights),
 * pagination and helper actions. This hook is intentionally read-only for state and
 * exposes dispatch methods from the `AppProvider`.
 *
 * @returns Read-only state slices and action dispatchers for the footprint app
 */
export function useFootprint() {
  const state = useContext(FootprintStateContext);
  const dispatch = useContext(FootprintDispatchContext);

  if (!state || !dispatch) {
    throw new Error("useFootprint must be used within an AppProvider");
  }

  const { entries, targets, settings, goals, challenges } = state;

  // Filtering state
  const [selectedCategory, setSelectedCategory] = useState<CarbonCategory | "all">("all");

  /**
   * Calculates carbon entry.
   */
  const calculateCarbon = useCallback(
    (category: CarbonCategory, value: number, option?: string): number => {
      return calculateEntryCarbon(category, value, option);
    },
    []
  );

  // Filtered entries memoized
  const filteredEntries = useMemo(() => {
    if (selectedCategory === "all") {
      return entries;
    }
    return entries.filter((entry) => entry.category === selectedCategory);
  }, [entries, selectedCategory]);

  const { currentPage, totalPages, paginated, goToPage } = usePagination(
    filteredEntries,
    PAGINATION.ITEMS_PER_PAGE
  );
  const paginatedEntries = paginated;
  const changePage = useCallback(
    (page: number) => {
      goToPage(page);
    },
    [goToPage]
  );

  /**
   * Category breakdown.
   */
  const breakdown = useMemo(() => computeBreakdown(entries), [entries]);

  /**
   * Insights generation.
   */
  const insights = useInsights(breakdown);

  // Calculate goal progress dynamically
  const goalsWithProgress = useMemo(
    () =>
      goals.map((g) => {
        const current = breakdown[g.category];
        const progress =
          g.targetValue > 0 ? Math.min(100, Math.round((current / g.targetValue) * 100)) : 0;
        return { ...g, progress };
      }),
    [goals, breakdown]
  );

  return {
    entries,
    targets,
    settings,
    goals: goalsWithProgress,
    challenges,
    selectedCategory,
    setSelectedCategory,
    currentPage,
    totalPages,
    paginatedEntries,
    changePage,
    breakdown,
    insights,
    calculateCarbon,
    ...dispatch
  };
}
