import type { Dictionary } from "@/lib/i18n/types";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type AboutSectionProps = {
  dict: Dictionary;
};

export function AboutSection({ dict }: AboutSectionProps) {
  return (
    <Section id={LANDING_SECTION_IDS.about} ariaLabelledBy="about-title" className="section-band">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
        <Reveal>
          <SectionHeading
            id="about-title"
            eyebrow={dict.about.eyebrow}
            title={dict.about.title}
          />
        </Reveal>
        <div className="space-y-5 text-base leading-7 text-[var(--muted)] sm:text-lg">
          {dict.about.paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph} delay={0.05 * index}>
              <p className={index === 0 ? "text-[var(--ink)] font-medium" : undefined}>
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
