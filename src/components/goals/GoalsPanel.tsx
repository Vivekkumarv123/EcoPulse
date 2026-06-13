"use client";

import { useState } from "react";
import { useFootprint } from "@/hooks/useFootprint";
import { sanitizeText, generateUuid } from "@/lib/utils";
import { GoalSchema } from "@/lib/schemas";
import type { Goal } from "@/types";
import { FormField } from "@/components/form/FormField";
import { SelectField } from "@/components/form/SelectField";
import { ButtonField } from "@/components/form/ButtonField";

/**
 * `GoalsPanel` — UI for creating and displaying user goals.
 * Manages quick goal creation and displays progress using data from `useFootprint`.
 *
 * @returns JSX.Element
 */
export function GoalsPanel() {
  const { goals, addGoal, toggleGoalActive } = useFootprint();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Goal["category"]>("total");
  const [targetValue, setTargetValue] = useState(100);

  const [goalError, setGoalError] = useState<string | null>(null);

  const onCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setGoalError(null);

    const cleanTitle = sanitizeText(title || "Untitled Goal");
    const now = new Date().toISOString();
    const id = generateUuid();
    const goal: Goal = {
      id,
      title: cleanTitle,
      category,
      targetValue,
      progress: 0,
      active: true,
      createdAt: now
    };

    const validation = GoalSchema.safeParse(goal);
    if (!validation.success) {
      setGoalError(validation.error.errors.map((err) => err.message).join(", "));
      return;
    }

    addGoal(validation.data);
    setTitle("");
    setTargetValue(100);
  };

  return (
    <section aria-labelledby="goals" className="card fade-in mt-4">
      <h2 id="goals" className="text-lg font-medium">
        Goals
      </h2>

      <form onSubmit={onCreate} className="mt-3 grid grid-cols-1 items-end gap-4 sm:grid-cols-4">
        <FormField
          id="goal-title"
          label="Goal title"
          value={title}
          onChange={setTitle}
          placeholder="e.g., Reduce transport"
          wrapperClassName="sm:col-span-2"
        />
        <SelectField
          id="goal-category"
          label="Category"
          value={category}
          onChange={(value) => setCategory(value as Goal["category"])}
          options={[
            { value: "total", label: "Total" },
            { value: "transport", label: "Transport" },
            { value: "food", label: "Food" },
            { value: "energy", label: "Energy" },
            { value: "waste", label: "Waste" }
          ]}
        />
        <FormField
          id="goal-target"
          label="Target value"
          value={targetValue}
          onChange={(value) => setTargetValue(Number(value))}
          type="number"
        />
        <div className="sm:col-span-4">
          <ButtonField type="submit" label="Create Goal" />
        </div>
      </form>

      <ul className="mt-4 space-y-3" aria-label="Goals list">
        {goalError && (
          <div role="alert" aria-live="assertive" className="text-sm text-rose-500">
            {goalError}
          </div>
        )}
        {goals.map((g) => (
          <li
            key={g.id}
            className="flex items-center justify-between rounded border border-[rgba(255,255,255,0.02)] p-3"
          >
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-100">{g.title}</div>
              <div className="text-xs text-slate-400">
                {g.category} • Target {g.targetValue}
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded bg-[rgba(255,255,255,0.03)]">
                <div
                  style={{ width: `${Math.min(100, Math.max(0, g.progress))}%` }}
                  className="h-2 bg-[rgba(16,185,129,0.9)]"
                ></div>
              </div>
            </div>
            <div className="ml-4 flex flex-col items-end">
              <button
                aria-pressed={g.active}
                aria-label={`Toggle active state for goal: ${g.title}`}
                onClick={() => toggleGoalActive(g.id)}
                className={`rounded px-2 py-1 text-xs ${g.active ? "bg-[rgba(16,185,129,0.14)] text-emerald-300" : "bg-[rgba(255,255,255,0.02)] text-slate-300"}`}
              >
                {g.active ? "Active" : "Inactive"}
              </button>
              <div className="mt-2 text-xs text-slate-400">{g.progress}%</div>
            </div>
          </li>
        ))}
        {goals.length === 0 && <li className="text-sm text-slate-400">No goals yet.</li>}
      </ul>
    </section>
  );
}
