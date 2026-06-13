"use client";

import { useMemo } from "react";
import type { Insight } from "@/types";
import { INSIGHT_THRESHOLDS, INSIGHT_IDS } from "@/lib/formConstants";

/**
 * useInsights
 *
 * Generates insight cards based on category breakdowns.
 * Extracted from `useFootprint` to separate presentation and business rules.
 *
 * @param breakdown Object with transport/food/energy/waste/total numbers
 * @returns readonly Insight[]
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function useInsights(breakdown: { transport: number; food: number; energy: number; waste: number; total: number }) {
  return useMemo<readonly Insight[]>(() => {
    const list: Insight[] = [];

    if (breakdown.transport > INSIGHT_THRESHOLDS.TRANSPORT_HIGH) {
      list.push({
        id: INSIGHT_IDS.TRANSPORT_HIGH,
        title: "High Transportation Footprint",
        message: "Your transportation carbon footprint is high. Biking, walking, or using public transit once a week can reduce this significantly.",
        impactLevel: "high",
        actionText: "Log a Transit Action"
      });
    }

    if (breakdown.food > INSIGHT_THRESHOLDS.FOOD_HIGH) {
      list.push({
        id: INSIGHT_IDS.FOOD_HIGH,
        title: "Reduce Diet Footprint",
        message: "Diet is a major factor. Trying a vegetarian menu for three days a week can cut food emissions by almost 30%.",
        impactLevel: "medium",
        actionText: "Try Vegan Choice"
      });
    }

    if (breakdown.energy > INSIGHT_THRESHOLDS.ENERGY_HIGH) {
      list.push({
        id: INSIGHT_IDS.ENERGY_HIGH,
        title: "Energy Efficiency Tip",
        message: "Unplugging unused chargers and electronics can prevent standby energy drain.",
        impactLevel: "medium",
        actionText: "Save Electricity"
      });
    }

    if (list.length === 0) {
      list.push({
        id: INSIGHT_IDS.WELCOME,
        title: "Welcome to EcoPulse!",
        message: "Start logging your actions (transport, food, energy, waste) to see your carbon analysis and personal savings recommendations here.",
        impactLevel: "low",
        actionText: "Log First Action"
      });
    }

    return list as readonly Insight[];
  }, [breakdown]);
}
