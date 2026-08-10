type FieldLabelProps = {
  htmlFor?: string;
  children: string;
};

export function FieldLabel({ htmlFor, children }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[0.8rem] font-semibold tracking-[0.01em] text-[var(--calc-label)]"
    >
      {children}
    </label>
  );
}
