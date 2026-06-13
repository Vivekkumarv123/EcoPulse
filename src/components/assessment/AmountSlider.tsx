"use client";

/**
 * `AmountSlider` — presentational slider control for numeric amount input.
 *
 * @param props.value current numeric value
 * @param props.onChange callback when value changes
 * @param props.min slider minimum
 * @param props.max slider maximum
 */
export function AmountSlider({
  value,
  onChange,
  min,
  max
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="amount-slider" className="mb-2 block text-sm font-medium text-slate-300">
        Amount: <span className="font-semibold text-emerald-300">{value}</span>
      </label>
      <input
        id="amount-slider"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Amount slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className="h-2 w-full cursor-pointer rounded bg-[rgba(255,255,255,0.05)]"
      />
      <div className="mt-1 flex justify-between text-xs text-slate-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}


