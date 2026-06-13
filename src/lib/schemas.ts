import { z } from "zod";
import { FORM_LIMITS } from "./formConstants";

/**
 * Zod schema definitions for domain types used across the app.
 * Each exported schema is used to derive TypeScript types in `src/types`
 * and for runtime validation when reading/writing persisted state.
 *
 * Keep schema messages stable to avoid breaking test expectations.
 */
export const CarbonCategorySchema = z.enum(["transport", "food", "energy", "waste"]);

/**
 * Schema for a user-submitted carbon entry.
 * Validates id, category, value, description, date and computed carbonValue.
 */
export const CarbonEntrySchema = z.object({
  id: z.string().uuid(),
  category: CarbonCategorySchema,
  value: z.number().nonnegative("Value must be a non-negative number"),
  description: z.string().max(FORM_LIMITS.DESCRIPTION_MAX, `Description must be ${FORM_LIMITS.DESCRIPTION_MAX} characters or fewer`).trim(),
  date: z.string().datetime("Date must be a valid ISO 8601 datetime string"),
  carbonValue: z.number().nonnegative("Carbon value must be a non-negative number")
});

/**
 * Schema for configured carbon targets per category and interval.
 */
export const CarbonTargetSchema = z.object({
  targetValue: z.number().positive("Target value must be a positive number"),
  category: z.enum(["total", "transport", "food", "energy", "waste"]),
  interval: z.enum(["weekly", "monthly", "yearly"])
});

/**
 * Schema for simple user settings persisted in localStorage.
 */
export const UserSettingsSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  language: z.enum(["en", "es", "fr"]),
  onboardingCompleted: z.boolean()
});

/**
 * Insight schema describing diagnostic suggestions shown in the UI.
 */
export const InsightSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(100, "Title must be 100 characters or fewer"),
  message: z.string().max(300, "Message must be 300 characters or fewer"),
  impactLevel: z.enum(["low", "medium", "high"]),
  actionText: z.string().max(50, "Action text must be 50 characters or fewer")
});

/**
 * Goal schema for tracking long-term targets and progress.
 */
export const GoalSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(100),
  category: CarbonCategorySchema.or(z.literal("total")),
  targetValue: z.number().positive(),
  progress: z.number().min(0).max(100),
  active: z.boolean(),
  createdAt: z.string().datetime()
});

/**
 * Challenge schema for short-lived behavior-change campaigns.
 */
export const ChallengeSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(100),
  description: z.string().max(300),
  durationDays: z.number().int().positive(),
  completed: z.boolean(),
  createdAt: z.string().datetime()
});

/**
 * Storage envelope schema used for localStorage persistence wrappers.
 */
export const StorageEnvelopeSchema = z.object({
  version: z.number().int().positive("Version must be a positive integer"),
  payload: z.unknown()
});
