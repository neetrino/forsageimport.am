import { FieldLabel } from "@/components/calculator/FieldLabel";

type MoneyFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function MoneyField({
  id,
  name,
  label,
  value,
  onChange,
  error,
}: MoneyFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-[var(--calc-placeholder)]">
          $
        </span>
        <input
          id={id}
          name={name}
          type="number"
          min={0}
          step="1"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`calc-input w-full pl-8 ${error ? "calc-input-error" : ""}`}
          inputMode="decimal"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-[var(--danger)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
