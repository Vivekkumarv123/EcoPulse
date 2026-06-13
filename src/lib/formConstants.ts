/**
 * Form validation and UI constants
 *
 * Centralized constants for form limits, defaults, and styling configuration.
 * Prevents magic numbers scattered throughout components.
 *
 * NOTE: Keep values stable to preserve behavior; tests rely on these defaults.
 */
/**
 * Form validation and UI constants
 *
 * Centralized constants for form limits, defaults, and styling configuration.
 * Prevents magic numbers scattered throughout components.
 *
 * @module formConstants
 */

/**
 * Form field validation limits
 * Used in schema definitions and Zod validation
 */
export const FORM_LIMITS = {
  /** Maximum characters for description fields */
  DESCRIPTION_MAX: 100,
  /** Maximum characters for option/category fields */
  OPTION_MAX: 100,
  /** Maximum value for quantity inputs */
  VALUE_MAX: 1000,
  /** Minimum slider value */
  SLIDER_MIN: 0,
  /** Maximum slider value */
  SLIDER_MAX: 100,
  /** Maximum characters for goal/challenge titles */
  TITLE_MAX: 100,
  /** Maximum characters for challenge descriptions */
  CHALLENGE_DESCRIPTION_MAX: 300,
  /** Maximum characters for action text buttons */
  ACTION_TEXT_MAX: 50
} as const;

/**
 * Default form field values
 * Used for initial state and fallback values
 */
export const FORM_DEFAULTS = {
  /** Initial quantity value for assessment forms */
  INITIAL_VALUE: 10,
  /** Initial category selection (transport, food, energy, waste) */
  INITIAL_CATEGORY: "transport" as const,
  /** Default slider position */
  INITIAL_SLIDER: 10
} as const;

/**
 * Goal creation defaults
 * Used in GoalsPanel and goal validation
 */
export const GOAL_DEFAULTS = {
  /** Fallback title when user doesn't specify one */
  TITLE: "Untitled Goal",
  /** Default target value for new goals */
  TARGET_VALUE: 100,
  /** Default progress for new goals */
  INITIAL_PROGRESS: 0,
  /** Default active state for new goals */
  ACTIVE: true
} as const;

/**
 * Challenge creation defaults
 * Used in ChallengesPanel and challenge validation
 */
export const CHALLENGE_DEFAULTS = {
  /** Fallback title when user doesn't specify one */
  TITLE: "Untitled Challenge",
  /** Default duration in days for new challenges */
  DURATION_DAYS: 7,
  /** Fallback description when user doesn't specify one */
  DESCRIPTION: "",
  /** Default completed state for new challenges */
  COMPLETED: false
} as const;

/**
 * Color configuration for dashboard metric categories
 * Used in Dashboard component for visual breakdown display
 */
export const DASHBOARD_METRICS_COLORS = {
  TRANSPORT: {
    color: "bg-emerald-500",
    text: "text-emerald-400",
    label: "Transport"
  },
  FOOD: {
    color: "bg-teal-500",
    text: "text-teal-400",
    label: "Food"
  },
  ENERGY: {
    color: "bg-cyan-500",
    text: "text-cyan-400",
    label: "Energy"
  },
  WASTE: {
    color: "bg-indigo-500",
    text: "text-indigo-400",
    label: "Waste"
  }
} as const;

/**
 * Insight generation thresholds
 * Used by useFootprint hook to determine when insights should be displayed
 *
 * @see useFootprint.ts for usage in insight generation logic
 */
export const INSIGHT_THRESHOLDS = {
  /** CO2e threshold for showing high transportation insight */
  TRANSPORT_HIGH: 50,
  /** CO2e threshold for showing high food insight */
  FOOD_HIGH: 40,
  /** CO2e threshold for showing energy efficiency insight */
  ENERGY_HIGH: 80
} as const;

/**
 * Stable insight identifiers used across the app
 */
export const INSIGHT_IDS = {
  WELCOME: "a2e11ef6-750a-4f83-94a4-871f8a40dc40",
  TRANSPORT_HIGH: "a2e11ef6-750a-4f83-94a4-871f8a40dc41",
  FOOD_HIGH: "a2e11ef6-750a-4f83-94a4-871f8a40dc42",
  ENERGY_HIGH: "a2e11ef6-750a-4f83-94a4-871f8a40dc43"
} as const;

/**
 * Common pagination and UI sizing constants
 */
export const PAGINATION = {
  ITEMS_PER_PAGE: 10
} as const;

/**
 * Maximum number of ledger entries to show in the recent activity list.
 */
export const RECENT_LEDGER_MAX = 10;

/**
 * Error messages for form validation
 * Centralized for consistency and easy localization
 */
export const FORM_ERRORS = {
  INVALID_DESCRIPTION: "Invalid description",
  INVALID_OPTION: "Invalid option",
  INVALID_ENTRY: "Invalid entry data"
} as const;
