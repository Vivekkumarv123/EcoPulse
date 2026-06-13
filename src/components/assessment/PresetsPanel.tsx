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
      <span className="mb-2 block text-sm font-medium text-slate-300">Quick Presets</span>
      <div className="flex flex-wrap gap-2">
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
            className="rounded border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-3 py-1 text-sm text-slate-200 transition-colors hover:border-[rgba(255,255,255,0.12)] focus:ring-2 focus:ring-emerald-500"
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}


