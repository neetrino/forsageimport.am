import type { LabeledOption } from "@/lib/i18n/types";
import { FieldLabel } from "@/components/calculator/FieldLabel";

type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  options: readonly LabeledOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function SelectField({
  id,
  name,
  label,
  placeholder,
  options,
  value,
  onChange,
  error,
}: SelectFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`calc-input calc-select w-full appearance-none pr-10 ${error ? "calc-input-error" : ""}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[var(--calc-placeholder)]"
        >
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-[var(--danger)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
