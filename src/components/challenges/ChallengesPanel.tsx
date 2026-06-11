"use client";

import React, { useState } from "react";
import { useFootprint } from "@/hooks/useFootprint";
import { sanitizeText } from "@/lib/utils";
import { ChallengeSchema } from "@/lib/schemas";

export function ChallengesPanel() {
  const { challenges, addChallenge, completeChallenge } = useFootprint();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationDays, setDurationDays] = useState(7);

  const [challengeError, setChallengeError] = useState<string | null>(null);

  const onCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setChallengeError(null);

    const cleanTitle = sanitizeText(title || "Untitled Challenge");
    const cleanDescription = sanitizeText(description || "");
    const now = new Date().toISOString();
    const id = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : String(Date.now());
    const challenge = { id, title: cleanTitle, description: cleanDescription, durationDays, completed: false, createdAt: now };

    const validation = ChallengeSchema.safeParse(challenge);
    if (!validation.success) {
      setChallengeError(validation.error.errors.map((err) => err.message).join(", "));
      return;
    }

    addChallenge(validation.data);
    setTitle("");
    setDescription("");
    setDurationDays(7);
  };

  return (
    <section aria-labelledby="challenges" className="mt-4 card fade-in">
      <h2 id="challenges" className="text-lg font-medium text-slate-100">Challenges</h2>

      <form onSubmit={onCreate} className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div className="sm:col-span-2">
          <label htmlFor="challenge-title" className="block text-xs font-medium text-slate-300 mb-1">
            Challenge title
          </label>
          <input
            id="challenge-title"
            aria-label="Challenge title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Meatless week"
            className="w-full rounded border border-white/[0.08] bg-slate-950/10 text-slate-200 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="challenge-duration" className="block text-xs font-medium text-slate-300 mb-1">
            Duration days
          </label>
          <input
            id="challenge-duration"
            aria-label="Duration days"
            type="number"
            min={1}
            value={durationDays}
            onChange={(e) => setDurationDays(Number(e.target.value))}
            className="w-full rounded border border-white/[0.08] bg-slate-950/10 text-slate-200 px-3 py-2"
          />
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="challenge-description" className="block text-xs font-medium text-slate-300 mb-1">
            Description
          </label>
          <input
            id="challenge-description"
            aria-label="Challenge description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border border-white/[0.08] bg-slate-950/10 text-slate-200 px-3 py-2"
          />
        </div>
        <div className="sm:col-span-3">
          <button type="submit" className="mt-2 rounded bg-emerald-600 text-white px-3 py-2 hover:bg-emerald-500 transition">
            Create Challenge
          </button>
        </div>
      </form>

      <ul className="mt-4 space-y-3">
        {challengeError && <div role="alert" className="text-sm text-rose-500">{challengeError}</div>}
      {challenges.map((c) => (
          <li key={c.id} className="flex items-center justify-between p-3 border border-[rgba(255,255,255,0.02)] rounded">
            <div>
              <div className="text-sm font-medium text-slate-100">{c.title}</div>
              <div className="text-xs text-slate-400">{c.durationDays} days • {c.completed ? 'Completed' : 'Active'}</div>
            </div>
            <div className="flex items-center gap-2">
              {!c.completed && (
                <button onClick={() => completeChallenge(c.id)} className="rounded px-2 py-1 border bg-[rgba(16,185,129,0.08)] text-emerald-300">Complete</button>
              )}
              {c.completed && <span className="text-xs text-emerald-300">Done</span>}
            </div>
          </li>
        ))}
        {challenges.length === 0 && <li className="text-sm text-slate-400">No challenges yet.</li>}
      </ul>
    </section>
  );
}
