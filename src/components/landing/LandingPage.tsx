import dynamic from "next/dynamic";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { LandingBody } from "@/components/landing/LandingBody";
import { AboutSection } from "@/components/landing/AboutSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { WhyUsSection } from "@/components/landing/WhyUsSection";

const CalculatorSection = dynamic(
  () =>
    import("@/components/landing/CalculatorSection").then(
      (mod) => mod.CalculatorSection,
    ),
  {
    loading: () => (
      <div
        id="calculator"
        className="landing-curve scroll-mt-[var(--scroll-margin)] min-h-[32rem]"
        aria-hidden="true"
      />
    ),
  },
);

const ApplicationSection = dynamic(
  () =>
    import("@/components/landing/ApplicationSection").then(
      (mod) => mod.ApplicationSection,
    ),
  {
    loading: () => (
      <div
        id="apply"
        className="landing-curve scroll-mt-[var(--scroll-margin)] min-h-[28rem]"
        aria-hidden="true"
      />
    ),
  },
);

type LandingPageProps = {
  dict: Dictionary;
  locale: Locale;
};

export function LandingPage({ dict, locale }: LandingPageProps) {
  return (
    <>
      <HeroSection dict={dict} />
      <LandingBody>
        <AboutSection dict={dict} />
        <ServicesSection dict={dict} />
        <HowItWorksSection dict={dict} />
        <CalculatorSection dict={dict} locale={locale} />
        <WhyUsSection dict={dict} />
        <ApplicationSection dict={dict} locale={locale} />
      </LandingBody>
    </>
  );
}
