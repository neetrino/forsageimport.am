type SkipToContentProps = {
  label: string;
  targetId?: string;
};

export function SkipToContent({ label, targetId = "main-content" }: SkipToContentProps) {
  return (
    <a href={`#${targetId}`} className="skip-link">
      {label}
    </a>
  );
}
