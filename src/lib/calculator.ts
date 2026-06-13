import { CARBON_MULTIPLIERS } from "./constants";
import type { CarbonCategory } from "@/types";
import type { CarbonEntry } from "@/types";

/**
 * Default multiplier options for each carbon category.
 * Used as fallback when user-selected option is not found.
 *
 * @constant
 */
export const MULTIPLIER_DEFAULTS: Record<CarbonCategory, string> = {
  transport: "car",
  food: "balanced",
  energy: "electricity",
  waste: "landfill"
} as const;

/**
 * Memoized cache of multipliers for each carbon category.
 */
export const MULTIPLIER_CACHE = new Map<CarbonCategory, Record<string, number>>([
  ["transport", CARBON_MULTIPLIERS.transport],
  ["food", CARBON_MULTIPLIERS.food],
  ["energy", CARBON_MULTIPLIERS.energy],
  ["waste", CARBON_MULTIPLIERS.waste]
] as const);

/**
 * Calculates carbon entry with memoized multiplier cache.
 */
export function calculateEntryCarbon(
  category: CarbonCategory,
  value: number,
  option?: string
): number {
  const multipliers = MULTIPLIER_CACHE.get(category);
  if (!multipliers) return 0;

  const cleanOption = option?.trim().toLowerCase();
  const defaultKey = MULTIPLIER_DEFAULTS[category];
  const factor =
    cleanOption && cleanOption in multipliers
      ? multipliers[cleanOption as keyof typeof multipliers]
      : multipliers[defaultKey as keyof typeof multipliers];

  // Guard against undefined factor (should not happen with valid data, but type-safe)
  if (factor === undefined) return 0;

  return Number((value * factor).toFixed(2));
}

/**
 * Computes carbon breakdown by category.
 *
 * @param entries Array of carbon entries to aggregate.
 */
export function computeBreakdown(entries: readonly CarbonEntry[]) {
  const breakdown = {
    transport: 0,
    food: 0,
    energy: 0,
    waste: 0
  };

  for (const entry of entries) {
    if (entry.category in breakdown) {
      breakdown[entry.category as keyof typeof breakdown] += entry.carbonValue;
    }
  }

  for (const key in breakdown) {
    breakdown[key as keyof typeof breakdown] = Number(
      breakdown[key as keyof typeof breakdown].toFixed(2)
    );
  }

  const total = Number(
    Object.values(breakdown)
      .reduce((sum, val) => sum + val, 0)
      .toFixed(2)
  );

  return {
    ...breakdown,
    total
  };
}

/**
 * Computes percentage breakdown with zero-division safety.
 */
export function percentageBreakdown(breakdown: ReturnType<typeof computeBreakdown>) {
  const { total } = breakdown;

  if (total === 0) {
    return {
      transport: 0,
      food: 0,
      energy: 0,
      waste: 0
    } as const;
  }

  const ratio = 100 / total;

  return {
    transport: Number((breakdown.transport * ratio).toFixed(1)),
    food: Number((breakdown.food * ratio).toFixed(1)),
    energy: Number((breakdown.energy * ratio).toFixed(1)),
    waste: Number((breakdown.waste * ratio).toFixed(1))
  } as const;
}

const RATING_THRESHOLDS = [
  { max: 50, label: "Excellent" as const, score: 95 },
  { max: 150, label: "Good" as const, score: 80 },
  { max: 300, label: "Average" as const, score: 60 },
  { max: 500, label: "High" as const, score: 40 },
  { max: Infinity, label: "Very High" as const, score: 20 }
] as const;

/**
 * Calculates sustainability rating based on total carbon.
 */
export function sustainabilityRating(totalKg: number) {
  for (const { max, label, score } of RATING_THRESHOLDS) {
    if (totalKg <= max) {
      return { label, score } as const;
    }
  }
  // This should never happen due to Infinity threshold
  return { label: "Very High" as const, score: 20 } as const;
}
