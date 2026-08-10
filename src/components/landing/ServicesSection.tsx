import type { Dictionary } from "@/lib/i18n/types";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

type ServicesSectionProps = {
  dict: Dictionary;
};

export function ServicesSection({ dict }: ServicesSectionProps) {
  return (
    <Section
      id={LANDING_SECTION_IDS.services}
      className="relative"
      ariaLabelledBy="services-title"
      curvedTop
    >
      <Reveal variant="clip">
        <div className="grid gap-6 border-b border-white/15 pb-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-12 lg:pb-12">
          <div>
            <p className="inline-flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.28em] text-[var(--accent)] uppercase">
              <span className="h-px w-10 bg-[var(--accent)]" aria-hidden="true" />
              {dict.services.eyebrow}
            </p>
            <h2
              id="services-title"
              className="mt-4 font-display text-[2.6rem] leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.4rem]"
            >
              {dict.services.title}
            </h2>
          </div>
          <p className="max-w-xl text-lg font-medium leading-8 text-white/65 sm:text-xl sm:leading-9 lg:justify-self-end lg:text-right">
            {dict.services.subtitle}
          </p>
        </div>
      </Reveal>

      <Stagger as="ol" className="mt-0" stagger={0.06} delayChildren={0.06}>
        {dict.services.items.map((item, index) => (
          <StaggerItem
            key={item.title}
            as="li"
            variant="up"
            className="group relative grid gap-3 border-b border-white/10 py-7 sm:grid-cols-[5.5rem_minmax(0,0.9fr)_minmax(0,1.2fr)] sm:items-baseline sm:gap-8 sm:py-8 lg:gap-12"
          >
            <span className="font-mono text-sm tracking-[0.22em] text-[var(--accent)] tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-xl text-white transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-2xl">
              {item.title}
            </h3>
            <p className="text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              {item.text}
            </p>
            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-x-100 sm:col-span-3"
              aria-hidden="true"
            />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
