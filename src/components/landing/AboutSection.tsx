import type { Dictionary } from "@/lib/i18n/types";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

type AboutSectionProps = {
  dict: Dictionary;
};

export function AboutSection({ dict }: AboutSectionProps) {
  const [lead, ...stages] = dict.about.paragraphs;

  return (
    <Section
      id={LANDING_SECTION_IDS.about}
      ariaLabelledBy="about-title"
      className="relative !bg-transparent"
      containerClassName=""
    >
      <Reveal variant="blur">
        <div className="flex flex-col gap-6 border-b border-white/12 pb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:pb-12">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.28em] text-[var(--accent)] uppercase">
              <span className="h-px w-10 bg-[var(--accent)]" aria-hidden="true" />
              {dict.about.eyebrow}
            </p>
            <h2
              id="about-title"
              className="mt-4 font-display text-[2.6rem] leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.5rem]"
            >
              {dict.about.title}
            </h2>
          </div>
          {lead ? (
            <p className="max-w-2xl text-lg font-medium leading-8 text-white/88 sm:text-xl sm:leading-9 lg:max-w-xl">
              {lead}
            </p>
          ) : null}
        </div>
      </Reveal>

      <Stagger as="ol" className="mt-0 grid gap-0 sm:grid-cols-2" stagger={0.07}>
        {stages.map((paragraph, index) => (
          <StaggerItem
            key={paragraph}
            as="li"
            variant={index % 2 === 0 ? "left" : "right"}
            className={`group relative flex h-full min-h-[11rem] flex-col gap-4 border-b border-white/10 p-6 sm:min-h-[13rem] sm:p-8 ${
              index % 2 === 0 ? "sm:border-r" : ""
            } ${index >= 2 ? "sm:border-b-0" : ""}`}
          >
            <span className="font-mono text-sm tracking-[0.2em] text-[var(--accent)] tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-base leading-8 text-white/70 transition-colors duration-300 group-hover:text-white/90 sm:text-lg sm:leading-8">
              {paragraph}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
