"use client";

/**
 * `LivePreview` — shows the live carbon calculation result.
 *
 * @param props.liveCarbon number value to display
 */
export function LivePreview({ liveCarbon }: { liveCarbon: number }) {
  return (
    <div
      className="mb-4 p-3 rounded bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.1)]"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="text-sm text-slate-300">Carbon Impact:</p>
      <p className="text-2xl font-bold text-emerald-300">{liveCarbon} kg CO2e</p>
    </div>
  );
}

export default LivePreview;
