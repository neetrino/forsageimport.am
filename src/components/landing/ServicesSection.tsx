import type { Dictionary } from "@/lib/i18n/types";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type ServicesSectionProps = {
  dict: Dictionary;
};

export function ServicesSection({ dict }: ServicesSectionProps) {
  return (
    <Section
      id={LANDING_SECTION_IDS.services}
      className="section-band bg-[var(--surface)]"
      ariaLabelledBy="services-title"
    >
      <Reveal>
        <SectionHeading
          id="services-title"
          eyebrow={dict.services.eyebrow}
          title={dict.services.title}
          subtitle={dict.services.subtitle}
        />
      </Reveal>
      <ul className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {dict.services.items.map((item, index) => (
          <Reveal key={item.title} delay={0.04 * index} className="h-full">
            <li className="group relative h-full overflow-hidden border-t-2 border-[var(--accent)]/30 pt-5 transition-colors hover:border-[var(--accent)]">
              <div
                className="pointer-events-none absolute -right-6 -top-8 size-24 rounded-full bg-[color-mix(in_srgb,var(--brand-blue)_8%,transparent)] transition-transform group-hover:scale-125"
                aria-hidden="true"
              />
              <p className="font-mono text-xs tracking-[0.2em] text-[var(--accent)] uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-xl text-[var(--ink)] sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)] sm:text-base">
                {item.text}
              </p>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
