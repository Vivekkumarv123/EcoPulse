"use client";

/**
 * `SelectField` — accessible select field with label and optional hint.
 *
 * @param props.id unique identifier for the select field
 * @param props.label label text
 * @param props.value selected value
 * @param props.onChange callback invoked on selection change
 * @param props.options list of select options
 * @param props.helpText optional supporting hint text
 * @param props.wrapperClassName optional wrapper className
 */
export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  helpText,
  wrapperClassName = ""
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  helpText?: string;
  wrapperClassName?: string;
}) {
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="block text-xs font-medium text-slate-300 mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded border border-white/[0.08] bg-slate-950/10 text-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText ? <p className="text-[11px] text-slate-500 mt-2">{helpText}</p> : null}
    </div>
  );
}
