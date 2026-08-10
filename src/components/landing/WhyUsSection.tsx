import type { Dictionary } from "@/lib/i18n/types";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type WhyUsSectionProps = {
  dict: Dictionary;
};

export function WhyUsSection({ dict }: WhyUsSectionProps) {
  return (
    <Section
      id={LANDING_SECTION_IDS.whyUs}
      className="section-band bg-[var(--surface)]"
      ariaLabelledBy="why-us-title"
    >
      <Reveal>
        <SectionHeading
          id="why-us-title"
          eyebrow={dict.whyUs.eyebrow}
          title={dict.whyUs.title}
          subtitle={dict.whyUs.subtitle}
        />
      </Reveal>
      <ul className="mt-14 grid gap-8 sm:grid-cols-2">
        {dict.whyUs.items.map((item, index) => (
          <Reveal key={item.title} delay={0.05 * index}>
            <li className="relative max-w-md border-l-2 border-[var(--accent)] pl-5 sm:pl-6">
              <p className="font-mono text-xs tracking-[0.2em] text-[var(--brand-blue)] uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-2xl text-[var(--ink)] sm:text-3xl">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-[var(--muted)]">{item.text}</p>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
