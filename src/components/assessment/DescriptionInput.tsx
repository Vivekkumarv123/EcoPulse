"use client";

/**
 * `DescriptionInput` — controlled single-line description input with counter.
 *
 * @param props.value current value
 * @param props.onChange change handler
 * @param props.maxLength maximum length
 */
export function DescriptionInput({
  value,
  onChange,
  maxLength
}: {
  value: string;
  onChange: (v: string) => void;
  maxLength: number;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="description-input" className="mb-2 block text-sm font-medium text-slate-300">
        Description <span className="text-xs text-slate-500">(optional)</span>
      </label>
      <input
        id="description-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        aria-label="Description input"
        aria-describedby="description-hint"
        className="w-full rounded border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] px-3 py-2 text-slate-200 placeholder-slate-500 transition-all focus:border-transparent focus:ring-2 focus:ring-emerald-500"
        placeholder="What action did you take?"
      />
      <p id="description-hint" className="mt-1 text-xs text-slate-400">
        {value.length}/{maxLength} characters
      </p>
    </div>
  );
}

 

