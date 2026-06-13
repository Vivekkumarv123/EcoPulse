import { z } from "zod";
import {
  CarbonCategorySchema,
  CarbonEntrySchema,
  CarbonTargetSchema,
  UserSettingsSchema,
  InsightSchema,
  StorageEnvelopeSchema,
  GoalSchema,
  ChallengeSchema
} from "@/lib/schemas";

/**
 * Type aliases derived from Zod schemas used across the application.
 * These definitions centralize exported domain types for components and hooks.
 *
 * @module types
 */
/**
 * Carbon emission categories used throughout the app.
 */
export type CarbonCategory = z.infer<typeof CarbonCategorySchema>;

/**
 * Individual carbon entry logged by the user.
 */
export type CarbonEntry = Readonly<z.infer<typeof CarbonEntrySchema>>;

/**
 * Carbon target configuration per category and interval.
 */
export type CarbonTarget = Readonly<z.infer<typeof CarbonTargetSchema>>;

/**
 * Persisted user settings state.
 */
export type UserSettings = Readonly<z.infer<typeof UserSettingsSchema>>;

/**
 * Insight object used for diagnostic recommendations.
 */
export type Insight = Readonly<z.infer<typeof InsightSchema>>;

/**
 * Local storage envelope wrapper for persisted payloads.
 */
export type StorageEnvelope = Readonly<z.infer<typeof StorageEnvelopeSchema>>;

/**
 * Goal object used for long-term progress tracking.
 */
export type Goal = Readonly<z.infer<typeof GoalSchema>>;

/**
 * Challenge object representing a behavior change task.
 */
export type Challenge = Readonly<z.infer<typeof ChallengeSchema>>;
