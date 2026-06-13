"use client";

import { useState } from "react";
import { useFootprint } from "@/hooks/useFootprint";
import { sanitizeText, generateUuid } from "@/lib/utils";
import { ChallengeSchema } from "@/lib/schemas";
import { CHALLENGE_DEFAULTS } from "@/lib/formConstants";
import { FormField } from "@/components/form/FormField";
import { ButtonField } from "@/components/form/ButtonField";

/**
 * `ChallengesPanel` — UI for creating and listing user challenges.
 * Handles local form state and delegates persistence to `useFootprint`.
 *
 * @returns JSX.Element
 */
export function ChallengesPanel() {
  const { challenges, addChallenge, completeChallenge } = useFootprint();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationDays, setDurationDays] = useState<number>(CHALLENGE_DEFAULTS.DURATION_DAYS);

  const [challengeError, setChallengeError] = useState<string | null>(null);

  const onCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setChallengeError(null);

    const cleanTitle = sanitizeText(title || CHALLENGE_DEFAULTS.TITLE);
    const cleanDescription = sanitizeText(description || "");
    const now = new Date().toISOString();
    const id = generateUuid();
    const challenge = {
      id,
      title: cleanTitle,
      description: cleanDescription,
      durationDays,
      completed: false,
      createdAt: now
    };

    const validation = ChallengeSchema.safeParse(challenge);
    if (!validation.success) {
      setChallengeError(validation.error.errors.map((err) => err.message).join(", "));
      return;
    }

    addChallenge(validation.data);
    setTitle("");
    setDescription("");
    setDurationDays(CHALLENGE_DEFAULTS.DURATION_DAYS);
    setChallengeError(null);
  };

  return (
    <section aria-labelledby="challenges" className="card fade-in mt-4">
      <h2 id="challenges" className="text-lg font-medium text-slate-100">
        Challenges
      </h2>

      <form onSubmit={onCreate} className="mt-3 grid grid-cols-1 items-end gap-4 sm:grid-cols-3">
        <FormField
          id="challenge-title"
          label="Challenge title"
          value={title}
          onChange={setTitle}
          placeholder="e.g., Meatless week"
          wrapperClassName="sm:col-span-2"
        />
        <FormField
          id="challenge-duration"
          label="Duration days"
          type="number"
          value={durationDays}
          onChange={(value) => setDurationDays(Number(value))}
          min={1}
          helpText="Duration in days for the challenge"
        />
        <FormField
          id="challenge-description"
          label="Description"
          value={description}
          onChange={setDescription}
          helpText="Optional description for your challenge"
          wrapperClassName="sm:col-span-3"
        />
        <div className="sm:col-span-3">
          <ButtonField type="submit" label="Create Challenge" />
        </div>
      </form>

      <ul className="mt-4 space-y-3" aria-label="Challenges list">
        {challengeError && (
          <div role="alert" aria-live="assertive" className="text-sm text-rose-500">
            {challengeError}
          </div>
        )}
        {challenges.map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between rounded border border-[rgba(255,255,255,0.02)] p-3"
          >
            <div>
              <div className="text-sm font-medium text-slate-100">{c.title}</div>
              <div className="text-xs text-slate-400">
                {c.durationDays} days • {c.completed ? "Completed" : "Active"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!c.completed && (
                <button
                  onClick={() => completeChallenge(c.id)}
                  aria-label={`Complete challenge: ${c.title}`}
                  className="rounded border bg-[rgba(16,185,129,0.08)] px-2 py-1 text-emerald-300"
                >
                  Complete
                </button>
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
