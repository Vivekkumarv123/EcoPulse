"use client";

import React, { createContext, useState, useCallback, useMemo, useEffect } from "react";
import { CarbonEntry, CarbonTarget, UserSettings, Goal, Challenge } from "@/types";
import { safeStorageParser, saveToStorage } from "@/lib/utils";
import { CarbonEntrySchema, CarbonTargetSchema, UserSettingsSchema, GoalSchema, ChallengeSchema } from "@/lib/schemas";
import { z } from "zod";
import { INITIAL_USER_SETTINGS, DEFAULT_TARGETS } from "@/lib/constants";

function usePersistentState<T>(key: string, schema: z.ZodType<T>, defaultValue: T) {
  const [state, setState] = useState<T>(() =>
    safeStorageParser(key, schema, defaultValue)
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    saveToStorage(key, state);
  }, [key, schema, state]);

  return [state, setState] as const;
}

/**
 * Global footprint state exposed by the application provider.
 * Contains persisted entries, targets, settings, goals, and challenges.
 */
export interface FootprintState {
  readonly entries: readonly CarbonEntry[];
  readonly targets: readonly CarbonTarget[];
  readonly settings: UserSettings;
  readonly goals: readonly Goal[];
  readonly challenges: readonly Challenge[];
}

/**
 * Dispatch actions exposed by the application provider.
 * These handlers mutate the footprint state in a safe and persistent way.
 */
export interface FootprintDispatch {
  readonly addEntry: (entry: CarbonEntry) => void;
  readonly deleteEntry: (id: string) => void;
  readonly updateTarget: (target: CarbonTarget) => void;
  readonly updateSettings: (settings: Partial<UserSettings>) => void;
  readonly resetAll: () => void;
  readonly addGoal: (goal: import("@/types").Goal) => void;
  readonly toggleGoalActive: (id: string) => void;
  readonly addChallenge: (challenge: import("@/types").Challenge) => void;
  readonly completeChallenge: (id: string) => void;
}

/**
 * Context exposing read-only footprint state.
 */
export const FootprintStateContext = createContext<FootprintState | undefined>(undefined);

/**
 * Context exposing footprint dispatch actions.
 */
export const FootprintDispatchContext = createContext<FootprintDispatch | undefined>(undefined);

const ENTRIES_KEY = "ecopulse_entries";
const TARGETS_KEY = "ecopulse_targets";
const SETTINGS_KEY = "ecopulse_settings";
const GOALS_KEY = "ecopulse_goals";
const CHALLENGES_KEY = "ecopulse_challenges";

const defaultTargetsList: readonly CarbonTarget[] = [
  { targetValue: DEFAULT_TARGETS.total, category: "total", interval: "weekly" },
  { targetValue: DEFAULT_TARGETS.transport, category: "transport", interval: "weekly" },
  { targetValue: DEFAULT_TARGETS.food, category: "food", interval: "weekly" },
  { targetValue: DEFAULT_TARGETS.energy, category: "energy", interval: "weekly" },
  { targetValue: DEFAULT_TARGETS.waste, category: "waste", interval: "weekly" }
];

const EntriesSchema = z.array(CarbonEntrySchema);
const TargetsSchema = z.array(CarbonTargetSchema);
const GoalsSchema = z.array(GoalSchema);
const ChallengesSchema = z.array(ChallengeSchema);

/**
 * Application-wide context provider.
 *
 * Manages entries, targets, user settings, goals, and challenges with
 * safe persistence to localStorage. Exposes `FootprintStateContext` and
 * `FootprintDispatchContext` for consumers.
 *
 * @param children React children nodes
 * @returns JSX.Element
 */
export function AppProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [entries, setEntries] = usePersistentState(ENTRIES_KEY, EntriesSchema, []);
  const [targets, setTargets] = usePersistentState(TARGETS_KEY, TargetsSchema, defaultTargetsList);
  const [settings, setSettings] = usePersistentState(SETTINGS_KEY, UserSettingsSchema, INITIAL_USER_SETTINGS);
  const [goals, setGoals] = usePersistentState(GOALS_KEY, GoalsSchema, []);
  const [challenges, setChallenges] = usePersistentState(CHALLENGES_KEY, ChallengesSchema, []);

  const addEntry = useCallback((entry: CarbonEntry) => {
    setEntries((prev) => [entry, ...prev]);
  }, [setEntries]);

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((item) => item.id !== id));
  }, [setEntries]);

  const updateTarget = useCallback((target: CarbonTarget) => {
    setTargets((prev) =>
      prev.map((item) =>
        item.category === target.category && item.interval === target.interval ? target : item
      )
    );
  }, [setTargets]);

  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, [setSettings]);

  const resetAll = useCallback(() => {
    setEntries([]);
    setTargets(defaultTargetsList);
    setSettings(INITIAL_USER_SETTINGS);
    setGoals([]);
    setChallenges([]);
  }, [setEntries, setTargets, setSettings, setGoals, setChallenges]);

  const addGoal = useCallback((goal: Goal) => {
    setGoals((prev) => [goal, ...prev]);
  }, [setGoals]);

  const toggleGoalActive = useCallback((id: string) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, active: !g.active } : g)));
  }, [setGoals]);

  const addChallenge = useCallback((challenge: Challenge) => {
    setChallenges((prev) => [challenge, ...prev]);
  }, [setChallenges]);

  const completeChallenge = useCallback((id: string) => {
    setChallenges((prev) => prev.map((c) => (c.id === id ? { ...c, completed: true } : c)));
  }, [setChallenges]);

  const stateWithExtras = useMemo<FootprintState>(() => ({ entries, targets, settings, goals, challenges }), [entries, targets, settings, goals, challenges]);
  const dispatchVal = useMemo<FootprintDispatch>(() => ({
    addEntry,
    deleteEntry,
    updateTarget,
    updateSettings,
    resetAll,
    addGoal,
    toggleGoalActive,
    addChallenge,
    completeChallenge
  }), [addEntry, deleteEntry, updateTarget, updateSettings, resetAll, addGoal, toggleGoalActive, addChallenge, completeChallenge]);

  return (
    <FootprintStateContext.Provider value={stateWithExtras}>
      <FootprintDispatchContext.Provider value={dispatchVal}>
        {children}
      </FootprintDispatchContext.Provider>
    </FootprintStateContext.Provider>
  );
}
