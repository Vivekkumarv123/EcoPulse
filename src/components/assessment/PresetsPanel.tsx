"use client";

/**
 * `PresetsPanel` — renders a list of quick presets for the active category.
 *
 * @param props.presets array of preset items
 * @param props.onSelect called when a preset is activated
 */
export function PresetsPanel({
  presets,
  onSelect
}: {
  presets: readonly { readonly label: string; readonly value: number; readonly option?: string }[];
  onSelect: (p: { label: string; value: number; option?: string }) => void;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-300 mb-2">Quick Presets</label>
      <div className="flex gap-2 flex-wrap">
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => onSelect(p)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(p);
              }
            }}
            aria-label={`Preset: ${p.label}`}
            className="px-3 py-1 rounded text-sm bg-[rgba(255,255,255,0.03)] text-slate-200 border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.12)] transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PresetsPanel;
