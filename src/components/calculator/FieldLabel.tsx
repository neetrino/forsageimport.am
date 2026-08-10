type FieldLabelProps = {
  htmlFor?: string;
  children: string;
};

export function FieldLabel({ htmlFor, children }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-[var(--calc-label)]">
      {children}
    </label>
  );
}
