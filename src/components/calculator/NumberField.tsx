import { FieldLabel } from "@/components/calculator/FieldLabel";

type NumberFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  step?: string;
  error?: string;
};

export function NumberField({
  id,
  name,
  label,
  value,
  onChange,
  min = 0,
  step = "1",
  error,
}: NumberFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        name={name}
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`calc-input w-full ${error ? "calc-input-error" : ""}`}
        inputMode="numeric"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-[var(--danger)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
