"use client";

/**
 * `ButtonField` — shared button component for form actions.
 *
 * @param props.label button label text
 * @param props.type button type attribute
 * @param props.onClick click handler
 * @param props.disabled optional disabled state
 */
export function ButtonField({
  label,
  type = "button",
  onClick,
  disabled = false
}: {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded bg-emerald-600 px-3 py-2 text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
}
