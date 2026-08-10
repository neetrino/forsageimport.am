import type { Dictionary } from "@/lib/i18n/types";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

type HowItWorksSectionProps = {
  dict: Dictionary;
};

export function HowItWorksSection({ dict }: HowItWorksSectionProps) {
  return (
    <Section
      id={LANDING_SECTION_IDS.process}
      ariaLabelledBy="process-title"
      className="relative"
      curvedTop
    >
      <Reveal variant="left">
        <SectionHeading
          id="process-title"
          eyebrow={dict.process.eyebrow}
          title={dict.process.title}
          subtitle={dict.process.subtitle}
          tone="dark"
        />
      </Reveal>
      <Stagger
        as="ol"
        className="mt-14 grid gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10"
        stagger={0.08}
      >
        {dict.process.steps.map((step, index) => (
          <StaggerItem
            key={step}
            as="li"
            variant={index % 2 === 0 ? "up" : "scale"}
            className="relative flex gap-4 border-l-2 border-[color-mix(in_srgb,var(--accent)_55%,transparent)] pl-5"
          >
            <span
              className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-white/15 bg-white/5 font-mono text-xs font-semibold text-[var(--accent)]"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-mono text-[0.68rem] tracking-[0.16em] text-white/45 uppercase">
                {dict.process.stepLabel} {index + 1}
              </p>
              <p className="mt-2 text-base leading-7 text-white/85 sm:text-lg">{step}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
