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
    <div id="action-categories" role="tablist" aria-label="Action categories" className="flex gap-2 mb-6">
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          role="tab"
          aria-controls="assessment-panel"
          aria-selected={current === c}
          aria-label={`${c} category`}
          onClick={() => onChange(c)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onChange(c);
            }
          }}
          className={`px-3 py-2 rounded capitalize transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
            current === c ? "bg-[rgba(16,185,129,0.12)] text-emerald-300 font-medium" : "text-slate-300 hover:text-slate-200"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
