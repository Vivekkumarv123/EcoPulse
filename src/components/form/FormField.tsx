"use client";

/**
 * `FormField` — accessible wrapper around a controlled input element.
 *
 * Use this component to keep label, hint, and input styling consistent across forms.
 *
 * @param props.id unique input identifier
 * @param props.label visible label text
 * @param props.value current field value
 * @param props.onChange callback invoked with the new string value
 * @param props.type input type attribute
 * @param props.placeholder placeholder text
 * @param props.maxLength optional maximum length for text fields
 * @param props.min optional minimum value for numeric inputs
 * @param props.max optional maximum value for numeric inputs
 * @param props.step optional step for numeric inputs
 * @param props.helpText optional hint text shown below the input
 * @param props.wrapperClassName optional wrapper class name for layout
 */
export function FormField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  maxLength,
  min,
  max,
  step,
  helpText,
  wrapperClassName = ""
}: {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: "text" | "number" | "email" | "password";
  placeholder?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
  wrapperClassName?: string;
}) {
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-slate-300">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min}
        max={max}
        step={step}
        aria-describedby={helpText ? `${id}-help` : undefined}
        className="w-full rounded border border-white/[0.08] bg-slate-950/10 px-3 py-2 text-slate-200 transition focus:ring-2 focus:ring-emerald-500"
      />
      {helpText ? (
        <p id={`${id}-help`} className="mt-2 text-[11px] text-slate-500">
          {helpText}
        </p>
      ) : null}
    </div>
  );
}
