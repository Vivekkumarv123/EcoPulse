"use client";

import React, { useMemo } from "react";
import { CarbonCategory } from "@/types";
import { useAssessmentForm } from "@/hooks/useAssessmentForm";
import { FORM_LIMITS } from "@/lib/formConstants";
import { CategoryTabs } from "./CategoryTabs";
import { PresetsPanel } from "./PresetsPanel";
import { AmountSlider } from "./AmountSlider";
import { OptionInput } from "./OptionInput";
import { DescriptionInput } from "./DescriptionInput";
import { LivePreview } from "./LivePreview";

// Performance: Memoized presets to avoid recalculation
const PRESETS: Record<CarbonCategory, readonly { readonly label: string; readonly value: number; readonly option?: string }[]> = {
  transport: [
    { label: "Short drive (5km)", value: 5, option: "car" },
    { label: "Commute (20km)", value: 20, option: "car" },
    { label: "Bus ride (10km)", value: 10, option: "bus" }
  ] as const,
  food: [
    { label: "Meat meal", value: 1, option: "meat" },
    { label: "Vegan meal", value: 1, option: "vegan" }
  ] as const,
  energy: [
    { label: "Heater (1kWh)", value: 1, option: "electricity" },
    { label: "Gas use (5kWh)", value: 5, option: "gas" }
  ] as const,
  waste: [
    { label: "Bag of waste (1kg)", value: 1, option: "landfill" },
    { label: "Recycled (1kg)", value: 1, option: "recycled" }
  ] as const
} as const;

const CATEGORIES: readonly CarbonCategory[] = ["transport", "food", "energy", "waste"] as const;

/**
 * `AssessmentForm` component
 *
 * Renders the carbon assessment UI and delegates all business logic to `useAssessmentForm`.
 * Keeps the component focused on accessibility and presentation.
 *
 * @returns JSX.Element
 */
function AssessmentFormComponent() {
  const {
    category,
    value,
    option,
    description,
    error,
    liveCarbon,
    onSubmit,
    onCategoryChange,
    onPreset,
    onSlider,
    onOptionChange,
    onDescriptionChange
  } = useAssessmentForm();

  // Memoized current presets
  const currentPresets = useMemo(() => PRESETS[category], [category]);

  return (
    <form onSubmit={onSubmit} className="max-w-xl mx-auto card" aria-label="Carbon assessment form">
      <fieldset>
        <legend className="block text-lg font-semibold text-slate-100 mb-4">Log Your Carbon Action</legend>

        <CategoryTabs categories={CATEGORIES} current={category} onChange={onCategoryChange} />

        <div id="assessment-panel" role="tabpanel" aria-labelledby="action-categories">
          <PresetsPanel presets={currentPresets} onSelect={onPreset} />

          <AmountSlider value={value} onChange={onSlider} min={FORM_LIMITS.SLIDER_MIN} max={FORM_LIMITS.SLIDER_MAX} />

          <OptionInput value={option} onChange={onOptionChange} maxLength={FORM_LIMITS.OPTION_MAX} />

          <DescriptionInput value={description} onChange={onDescriptionChange} maxLength={FORM_LIMITS.DESCRIPTION_MAX} />

          <LivePreview liveCarbon={liveCarbon} />

          {/* Error message */}
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              className="p-3 rounded bg-[rgba(225,29,72,0.1)] border border-[rgba(225,29,72,0.2)] text-rose-400 text-sm mb-4"
            >
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            aria-label="Submit carbon log"
            className="w-full inline-flex items-center justify-center rounded bg-[rgba(16,185,129,0.14)] px-4 py-2 text-emerald-300 hover:bg-[rgba(16,185,129,0.18)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Log Action
          </button>
        </div>
      </fieldset>
    </form>
  );
}

// Performance: Memoize component to prevent unnecessary re-renders
export const AssessmentForm = React.memo(AssessmentFormComponent);