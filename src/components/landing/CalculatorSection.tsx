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
      className="relative overflow-hidden bg-[var(--ink)]"
      ariaLabelledBy="calculator-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(55% 45% at 10% 0%, rgba(240,90,24,0.28), transparent 60%), radial-gradient(45% 40% at 95% 20%, rgba(26,74,120,0.3), transparent 55%)",
        }}
      />
      <div className="relative">
        <Reveal>
          <SectionHeading
            id="calculator-title"
            title={dict.calculator.title}
            subtitle={dict.calculator.subtitle}
            tone="dark"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="calc-shell mt-10 p-1 sm:p-1.5">
            <CalculatorForm dict={dict} locale={locale} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
