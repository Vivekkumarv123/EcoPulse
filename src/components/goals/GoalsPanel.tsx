"use client";

import React, { useState } from "react";
import { useFootprint } from "@/hooks/useFootprint";
import { sanitizeText } from "@/lib/utils";
import { GoalSchema } from "@/lib/schemas";
import type { Goal } from "@/types";

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
    const id = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : String(Date.now());
    const goal: Goal = { id, title: cleanTitle, category, targetValue, progress: 0, active: true, createdAt: now };

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
    <section aria-labelledby="goals" className="mt-4 card fade-in">
      <h2 id="goals" className="text-lg font-medium">Goals</h2>

      <form onSubmit={onCreate} className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        <div className="sm:col-span-2">
          <label htmlFor="goal-title" className="block text-xs font-medium text-slate-300 mb-1">
            Goal title
          </label>
          <input
            id="goal-title"
            aria-label="Goal title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Reduce transport"
            className="w-full rounded border border-white/[0.08] bg-slate-950/10 text-slate-200 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="goal-category" className="block text-xs font-medium text-slate-300 mb-1">
            Category
          </label>
          <select
            id="goal-category"
            aria-label="Goal category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Goal["category"])}
            className="w-full rounded border border-white/[0.08] bg-slate-950/10 text-slate-200 px-3 py-2"
          >
            <option value="total">Total</option>
            <option value="transport">Transport</option>
            <option value="food">Food</option>
            <option value="energy">Energy</option>
            <option value="waste">Waste</option>
          </select>
        </div>
        <div>
          <label htmlFor="goal-target" className="block text-xs font-medium text-slate-300 mb-1">
            Target value
          </label>
          <input
            id="goal-target"
            aria-label="Target value"
            type="number"
            value={targetValue}
            onChange={(e) => setTargetValue(Number(e.target.value))}
            className="w-full rounded border border-white/[0.08] bg-slate-950/10 text-slate-200 px-3 py-2"
          />
        </div>
        <div className="sm:col-span-4">
          <button type="submit" className="mt-2 rounded bg-emerald-600 text-white px-3 py-2 hover:bg-emerald-500 transition">
            Create Goal
          </button>
        </div>
      </form>

      <ul className="mt-4 space-y-3">
        {goalError && <div role="alert" className="text-sm text-rose-500">{goalError}</div>}
      {goals.map((g) => (
          <li key={g.id} className="flex items-center justify-between p-3 border border-[rgba(255,255,255,0.02)] rounded">
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-100">{g.title}</div>
              <div className="text-xs text-slate-400">{g.category} • Target {g.targetValue}</div>
              <div className="mt-2 bg-[rgba(255,255,255,0.03)] rounded h-2 overflow-hidden">
                <div style={{ width: `${Math.min(100, Math.max(0, g.progress))}%` }} className="h-2 bg-[rgba(16,185,129,0.9)]"></div>
              </div>
            </div>
            <div className="flex flex-col items-end ml-4">
              <button aria-pressed={g.active} onClick={() => toggleGoalActive(g.id)} className={`px-2 py-1 rounded text-xs ${g.active ? 'bg-[rgba(16,185,129,0.14)] text-emerald-300' : 'bg-[rgba(255,255,255,0.02)] text-slate-300'}`}>{g.active ? "Active" : "Inactive"}</button>
              <div className="text-xs text-slate-400 mt-2">{g.progress}%</div>
            </div>
          </li>
        ))}
        {goals.length === 0 && <li className="text-sm text-slate-400">No goals yet.</li>}
      </ul>
    </section>
  );
}
