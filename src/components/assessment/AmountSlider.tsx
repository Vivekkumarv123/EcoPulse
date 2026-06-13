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
      <label htmlFor="amount-slider" className="block text-sm font-medium text-slate-300 mb-2">
        Amount: <span className="text-emerald-300 font-semibold">{value}</span>
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
        className="w-full h-2 bg-[rgba(255,255,255,0.05)] rounded cursor-pointer"
      />
      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default AmountSlider;
