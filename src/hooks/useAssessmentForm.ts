"use client";

import { useCallback, useState, useContext } from "react";
import { z } from "zod";
import { CarbonEntrySchema } from "@/lib/schemas";
import { CarbonCategory } from "@/types";
import { FootprintDispatchContext } from "@/components/providers/AppProvider";
import { calculateEntryCarbon } from "@/lib/calculator";
import { generateUuid, sanitizeText, validateSecureInput } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { CarbonEntry } from "@/types";
import { FORM_LIMITS, FORM_DEFAULTS } from "@/lib/formConstants";

const FormSchema = z.object({
  category: z.enum(["transport", "food", "energy", "waste"]),
  value: z.number().positive().max(FORM_LIMITS.VALUE_MAX),
  option: z.string().max(FORM_LIMITS.OPTION_MAX).optional(),
  description: z.string().max(FORM_LIMITS.DESCRIPTION_MAX).optional()
});

/**
 * Hook: useAssessmentForm
 *
 * Encapsulates form state and business logic for the Assessment form.
 * Extracting this logic makes the UI component focused on rendering only.
 *
 * @returns {object} state and handlers required by `AssessmentForm`
 */
export function useAssessmentForm() {
  const dispatch = useContext(FootprintDispatchContext);
  if (!dispatch) throw new Error("useAssessmentForm must be used within AppProvider");

  const router = useRouter();

  const [category, setCategory] = useState<CarbonCategory>(FORM_DEFAULTS.INITIAL_CATEGORY);
  const [value, setValue] = useState<number>(FORM_DEFAULTS.INITIAL_VALUE);
  const [option, setOption] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [liveCarbon, setLiveCarbon] = useState<number>(() =>
    calculateEntryCarbon(category, FORM_DEFAULTS.INITIAL_VALUE)
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      const descValidation = validateSecureInput(description, FORM_LIMITS.DESCRIPTION_MAX);
      if (!descValidation.valid) {
        setError(descValidation.error ?? "Invalid description");
        return;
      }

      const optionValidation = validateSecureInput(option, FORM_LIMITS.OPTION_MAX);
      if (!optionValidation.valid) {
        setError(optionValidation.error ?? "Invalid option");
        return;
      }

      const parsed = FormSchema.safeParse({ category, value, option, description });
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

      const validated = CarbonEntrySchema.safeParse(entry);
      if (!validated.success) {
        setError("Invalid entry data");
        return;
      }

      dispatch.addEntry(validated.data as unknown as CarbonEntry);
      router.push("/dashboard");

      // Reset
      setValue(FORM_DEFAULTS.INITIAL_VALUE);
      setOption("");
      setDescription("");
      setLiveCarbon(calculateEntryCarbon(category, FORM_DEFAULTS.INITIAL_VALUE, ""));
    },
    [category, value, option, description, dispatch, router]
  );

  const onCategoryChange = useCallback(
    (newCategory: CarbonCategory) => {
      setCategory(newCategory);
      setLiveCarbon(calculateEntryCarbon(newCategory, value, option));
    },
    [value, option]
  );

  const onPreset = useCallback(
    (preset: { value: number; option?: string }) => {
      setValue(preset.value);
      const newOption = preset.option ?? "";
      setOption(newOption);
      setLiveCarbon(calculateEntryCarbon(category, preset.value, newOption));
    },
    [category]
  );

  const onSlider = useCallback(
    (v: number) => {
      setValue(v);
      setLiveCarbon(calculateEntryCarbon(category, v, option));
    },
    [category, option]
  );

  const onOptionChange = useCallback(
    (newOption: string) => {
      setOption(newOption);
      setLiveCarbon(calculateEntryCarbon(category, value, newOption));
    },
    [category, value]
  );

  const onDescriptionChange = useCallback((newDesc: string) => {
    const validation = validateSecureInput(newDesc, FORM_LIMITS.DESCRIPTION_MAX);
    if (validation.valid) {
      setDescription(newDesc);
    }
  }, []);

  return {
    category,
    value,
    option,
    description,
    error,
    liveCarbon,
    setCategory,
    setValue,
    setOption,
    setDescription,
    setError,
    setLiveCarbon,
    onSubmit,
    onCategoryChange,
    onPreset,
    onSlider,
    onOptionChange,
    onDescriptionChange
  } as const;
}
