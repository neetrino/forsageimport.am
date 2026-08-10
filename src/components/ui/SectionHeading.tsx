type SectionHeadingProps = {
  id: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  tone?: "light" | "dark";
};

export function SectionHeading({
  id,
  title,
  subtitle,
  eyebrow,
  tone = "light",
}: SectionHeadingProps) {
  const muted = tone === "dark" ? "text-white/65" : "text-[var(--muted)]";
  const titleColor = tone === "dark" ? "text-white" : "text-[var(--ink)]";

  return (
    <header className="max-w-2xl">
      {eyebrow ? (
        <p className="inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.2em] text-[var(--accent)] uppercase">
          <span className="h-px w-6 bg-[var(--accent)]" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={`font-display text-3xl tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${titleColor} ${eyebrow ? "mt-3" : ""}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-base font-medium leading-7 sm:text-lg ${muted}`}>{subtitle}</p>
      ) : null}
    </header>
  );
}
