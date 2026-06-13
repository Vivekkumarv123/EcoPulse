"use client";

import { useContext, useMemo, useState, useCallback } from "react";
import { FootprintStateContext, FootprintDispatchContext } from "@/components/providers/AppProvider";
import { MULTIPLIER_CACHE, MULTIPLIER_DEFAULTS } from "@/lib/calculator";
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
 * Time Complexity: Derived values use memoization; most ops are O(1) or O(N) for lists
 * Space Complexity: O(1) additional per hook instance
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
   * Calculates carbon entry with memoized lookups.
   * @optimized Uses cached multiplier lookups and early returns
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  const calculateCarbon = useCallback((category: CarbonCategory, value: number, option?: string): number => {
    const multipliers = MULTIPLIER_CACHE.get(category);
    if (!multipliers) return 0;

    const cleanOption = option?.trim().toLowerCase();
    const defaultKey = MULTIPLIER_DEFAULTS[category];
    const factor = (cleanOption && cleanOption in multipliers)
      ? multipliers[cleanOption as keyof typeof multipliers]
      : multipliers[defaultKey as keyof typeof multipliers];

    // Ensure factor is defined (type guard)
    if (factor === undefined) return 0;

    return Number((value * factor).toFixed(2));
  }, []);

  // Filtered entries memoized
  const filteredEntries = useMemo(() => {
    if (selectedCategory === "all") {
      return entries;
    }
    return entries.filter((entry) => entry.category === selectedCategory);
  }, [entries, selectedCategory]);

  const { currentPage, totalPages, paginated, goToPage } = usePagination(filteredEntries, PAGINATION.ITEMS_PER_PAGE);
  const paginatedEntries = paginated;
  const changePage = useCallback((page: number) => {
    goToPage(page);
  }, [goToPage]);

  /**
   * Category breakdown with optimized accumulation.
   * @optimized Uses single-pass accumulation
   * Time Complexity: O(N)
   * Space Complexity: O(1)
   */
  const breakdown = useMemo(() => {
    const result = {
      transport: 0,
      food: 0,
      energy: 0,
      waste: 0
    };

    for (const entry of entries) {
      if (entry.category in result) {
        result[entry.category as keyof typeof result] += entry.carbonValue;
      }
    }

    // Single precision pass
    for (const key in result) {
      result[key as keyof typeof result] = Number(
        result[key as keyof typeof result].toFixed(2)
      );
    }

    return {
      ...result,
      total: Number(
        Object.values(result).reduce((sum, val) => sum + val, 0).toFixed(2)
      )
    };
  }, [entries]);

  /**
   * Insights generation with optimized rule evaluation.
   * @optimized Early exit on default insight, precomputed thresholds
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  const insights = useInsights(breakdown);

  // Calculate goal progress dynamically
  const goalsWithProgress = useMemo(() => goals.map((g) => {
    const current = breakdown[g.category];
    const progress = g.targetValue > 0 ? Math.min(100, Math.round((current / g.targetValue) * 100)) : 0;
    return { ...g, progress };
  }), [goals, breakdown]);

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
