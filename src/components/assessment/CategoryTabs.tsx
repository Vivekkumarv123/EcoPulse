"use client";
import { CarbonCategory } from "@/types";

/**
 * `CategoryTabs` — presentational tabs for selecting a `CarbonCategory`.
 *
 * @param props.categories list of categories to render
 * @param props.current currently selected category
 * @param props.onChange callback when a category is chosen
 */
export function CategoryTabs({
  categories,
  current,
  onChange
}: {
  categories: readonly CarbonCategory[];
  current: CarbonCategory;
  onChange: (c: CarbonCategory) => void;
}) {
  return (
    <div
      id="action-categories"
      role="tablist"
      aria-label="Action categories"
      className="mb-6 flex gap-2"
    >
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          role="tab"
          aria-controls="assessment-panel"
          aria-selected={current === c}
          tabIndex={current === c ? 0 : -1}
          aria-label={`${c} category`}
          onClick={() => onChange(c)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onChange(c);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              const idx = categories.indexOf(c);
              const nextIdx = (idx + 1) % categories.length;
              const nextCategory = categories[nextIdx];
              if (nextCategory) {
                onChange(nextCategory);
                const buttons =
                  event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
                    '[role="tab"]'
                  );
                buttons?.[nextIdx]?.focus();
              }
            } else if (event.key === "ArrowLeft") {
              event.preventDefault();
              const idx = categories.indexOf(c);
              const prevIdx = (idx - 1 + categories.length) % categories.length;
              const prevCategory = categories[prevIdx];
              if (prevCategory) {
                onChange(prevCategory);
                const buttons =
                  event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
                    '[role="tab"]'
                  );
                buttons?.[prevIdx]?.focus();
              }
            }
          }}
          className={`rounded px-3 py-2 capitalize transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
            current === c
              ? "bg-[rgba(16,185,129,0.12)] font-medium text-emerald-300"
              : "text-slate-300 hover:text-slate-200"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}


