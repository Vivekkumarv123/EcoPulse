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
      className="w-full rounded bg-emerald-600 text-white px-3 py-2 hover:bg-emerald-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
}
