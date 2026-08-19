"use client";

import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CalculatorForm } from "@/components/calculator/CalculatorForm";
import { Reveal } from "@/components/ui/Reveal";

type CalculatorSectionProps = {
  dict: Dictionary;
  locale: Locale;
};

export function CalculatorSection({ dict, locale }: CalculatorSectionProps) {
  return (
    <Section
      id={LANDING_SECTION_IDS.calculator}
      className="relative"
      ariaLabelledBy="calculator-title"
      curvedTop
    >
      <Reveal variant="clip">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="calculator-title"
            eyebrow={dict.calculator.eyebrow}
            title={dict.calculator.title}
            subtitle={dict.calculator.subtitle}
            tone="dark"
          />
          <p className="max-w-xs font-mono text-[0.7rem] leading-5 tracking-[0.14em] text-white/40 uppercase lg:pb-1 lg:text-right">
            USD · Copart / IAAI
          </p>
        </div>
      </Reveal>

      <Reveal variant="scale" delay={0.06} className="mt-10">
        <div className="calc-shell">
          <div className="calc-shell-glow" aria-hidden="true" />
          <CalculatorForm dict={dict} locale={locale} />
        </div>
      </Reveal>
    </Section>
  );
}
