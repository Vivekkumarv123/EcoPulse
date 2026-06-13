"use client";

/**
 * `OptionInput` — controlled text input for the option field.
 *
 * @param props.value current value
 * @param props.onChange callback for changes
 * @param props.maxLength maximum allowed length
 */
export function OptionInput({ value, onChange, maxLength }: { value: string; onChange: (v: string) => void; maxLength: number }) {
  return (
    <div className="mb-4">
      <label htmlFor="option-input" className="block text-sm font-medium text-slate-300 mb-2">
        Option <span className="text-xs text-slate-500">(auto-filled by presets)</span>
      </label>
      <input
        id="option-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        aria-label="Option input"
        aria-describedby="option-hint"
        className="w-full rounded border border-[rgba(255,255,255,0.1)] px-3 py-2 bg-[rgba(255,255,255,0.02)] text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
        placeholder="e.g., car, vegan, electricity"
      />
      <p id="option-hint" className="text-xs text-slate-400 mt-1">
        Refines carbon calculation
      </p>
    </div>
  );
}

export default OptionInput;

