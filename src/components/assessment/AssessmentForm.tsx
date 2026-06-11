"use client";

import React, { useState, useCallback, useMemo } from "react";
import { z } from "zod";
import { CarbonEntrySchema } from "@/lib/schemas";
import { CarbonCategory } from "@/types";
import { useContext } from "react";
import { FootprintDispatchContext } from "@/components/providers/AppProvider";
import { calculateEntryCarbon } from "@/lib/calculator";
import { generateUuid, sanitizeText, validateSecureInput } from "@/lib/utils";
import type { CarbonEntry } from "@/types";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  category: z.enum(["transport", "food", "energy", "waste"]),
  value: z.number().positive().max(1000),
  option: z.string().max(100).optional(),
  description: z.string().max(100).optional()
});

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

function AssessmentFormComponent() {
  const dispatch = useContext(FootprintDispatchContext);
  if (!dispatch) throw new Error("AssessmentForm must be used within AppProvider");

  const router = useRouter();

  const [category, setCategory] = useState<CarbonCategory>("transport");
  const [value, setValue] = useState<number>(10);
  const [option, setOption] = useState<string>("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [liveCarbon, setLiveCarbon] = useState<number>(() => calculateEntryCarbon(category, 10));

  /**
   * Validates form and submits entry.
   * @optimized useCallback to prevent re-binding on every render
   * Time Complexity: O(N) where N is input length for sanitization
   * Space Complexity: O(1)
   */
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Security: Input validation
    const descValidation = validateSecureInput(description, 100);
    if (!descValidation.valid) {
      setError(descValidation.error ?? "Invalid description");
      return;
    }

    const optionValidation = validateSecureInput(option, 100);
    if (!optionValidation.valid) {
      setError(optionValidation.error ?? "Invalid option");
      return;
    }

    const parsed = FormSchema.safeParse({
      category,
      value,
      option,
      description
    });

    if (!parsed.success) {
      setError(parsed.error.errors.map((x) => x.message).join(", "));
      return;
    }

    const carbonValue = calculateEntryCarbon(category, value, option);

    const entry = {
      id: generateUuid(),
      category,
      value,
      description: sanitizeText(description ?? ""),
      date: new Date().toISOString(),
      carbonValue
    } as const;

    // Validate final shape
    const validated = CarbonEntrySchema.safeParse(entry);
    if (!validated.success) {
      setError("Invalid entry data");
      return;
    }

    dispatch.addEntry(validated.data as unknown as CarbonEntry);
    router.push("/dashboard");

    // Reset
    setValue(10);
    setOption("");
    setDescription("");
    setLiveCarbon(calculateEntryCarbon(category, 10, ""));
  }, [category, value, option, description, dispatch, router]);

  /**
   * Handles category tab change with memoization.
   * @optimized useCallback prevents re-binding
   */
  const onCategoryChange = useCallback((newCategory: CarbonCategory) => {
    setCategory(newCategory);
    setLiveCarbon(calculateEntryCarbon(newCategory, value, option));
  }, [value, option]);

  /**
   * Applies preset values with input validation.
   * @optimized useCallback prevents re-binding
   */
  const onPreset = useCallback((preset: { value: number; option?: string }) => {
    setValue(preset.value);
    const newOption = preset.option ?? "";
    setOption(newOption);
    setLiveCarbon(calculateEntryCarbon(category, preset.value, newOption));
  }, [category]);

  /**
   * Updates slider value with carbon recalculation.
   * @optimized useCallback prevents re-binding
   */
  const onSlider = useCallback((v: number) => {
    setValue(v);
    setLiveCarbon(calculateEntryCarbon(category, v, option));
  }, [category, option]);

  /**
   * Updates option with carbon recalculation.
   * @optimized useCallback prevents re-binding
   */
  const onOptionChange = useCallback((newOption: string) => {
    setOption(newOption);
    setLiveCarbon(calculateEntryCarbon(category, value, newOption));
  }, [category, value]);

  /**
   * Updates description with security validation.
   * @optimized useCallback prevents re-binding
   */
  const onDescriptionChange = useCallback((newDesc: string) => {
    const validation = validateSecureInput(newDesc, 100);
    if (validation.valid) {
      setDescription(newDesc);
    }
  }, []);

  // Memoized current presets
  const currentPresets = useMemo(() => PRESETS[category], [category]);

  return (
    <form onSubmit={onSubmit} className="max-w-xl mx-auto card" aria-label="Carbon assessment form">
      <fieldset>
        <legend className="block text-lg font-semibold text-slate-100 mb-4">Log Your Carbon Action</legend>

        {/* Category tabs with accessibility */}
        <div id="action-categories" role="tablist" aria-label="Action categories" className="flex gap-2 mb-6">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-controls="assessment-panel"
              aria-selected={category === c}
              aria-label={`${c} category`}
              onClick={() => onCategoryChange(c)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onCategoryChange(c);
                }
              }}
              className={`px-3 py-2 rounded capitalize transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                category === c
                  ? "bg-[rgba(16,185,129,0.12)] text-emerald-300 font-medium"
                  : "text-slate-300 hover:text-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div id="assessment-panel" role="tabpanel" aria-labelledby="action-categories">
          {/* Quick presets */}
          <div className="mb-4">
          <label className="block text-sm font-medium text-slate-300 mb-2">Quick Presets</label>
          <div className="flex gap-2 flex-wrap">
            {currentPresets.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => onPreset(p)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onPreset(p);
                  }
                }}
                aria-label={`Preset: ${p.label}`}
                className="px-3 py-1 rounded text-sm bg-[rgba(255,255,255,0.03)] text-slate-200 border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.12)] transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Amount slider */}
        <div className="mb-4">
          <label htmlFor="amount-slider" className="block text-sm font-medium text-slate-300 mb-2">
            Amount: <span className="text-emerald-300 font-semibold">{value}</span>
          </label>
          <input
            id="amount-slider"
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => onSlider(Number(e.target.value))}
            aria-label="Amount slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            className="w-full h-2 bg-[rgba(255,255,255,0.05)] rounded cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0</span>
            <span>100</span>
          </div>
        </div>

        {/* Option input */}
        <div className="mb-4">
          <label htmlFor="option-input" className="block text-sm font-medium text-slate-300 mb-2">
            Option <span className="text-xs text-slate-500">(auto-filled by presets)</span>
          </label>
          <input
            id="option-input"
            type="text"
            value={option}
            onChange={(e) => onOptionChange(e.target.value)}
            maxLength={100}
            aria-label="Option input"
            aria-describedby="option-hint"
            className="w-full rounded border border-[rgba(255,255,255,0.1)] px-3 py-2 bg-[rgba(255,255,255,0.02)] text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            placeholder="e.g., car, vegan, electricity"
          />
          <p id="option-hint" className="text-xs text-slate-400 mt-1">
            Refines carbon calculation
          </p>
        </div>

        {/* Description input */}
        <div className="mb-4">
          <label htmlFor="description-input" className="block text-sm font-medium text-slate-300 mb-2">
            Description <span className="text-xs text-slate-500">(optional)</span>
          </label>
          <input
            id="description-input"
            type="text"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            maxLength={100}
            aria-label="Description input"
            aria-describedby="description-hint"
            className="w-full rounded border border-[rgba(255,255,255,0.1)] px-3 py-2 bg-[rgba(255,255,255,0.02)] text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            placeholder="What action did you take?"
          />
          <p id="description-hint" className="text-xs text-slate-400 mt-1">
            {description.length}/100 characters
          </p>
        </div>

        {/* Live carbon preview */}
        <div
          className="mb-4 p-3 rounded bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.1)]"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-sm text-slate-300">Carbon Impact:</p>
          <p className="text-2xl font-bold text-emerald-300">{liveCarbon} kg CO2e</p>
        </div>

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
