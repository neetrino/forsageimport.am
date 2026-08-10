import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { AboutSection } from "@/components/landing/AboutSection";
import { ApplicationSection } from "@/components/landing/ApplicationSection";
import { CalculatorSection } from "@/components/landing/CalculatorSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { WhyUsSection } from "@/components/landing/WhyUsSection";

type LandingPageProps = {
  dict: Dictionary;
  locale: Locale;
};

export function LandingPage({ dict, locale }: LandingPageProps) {
  return (
    <>
      <HeroSection dict={dict} />
      <AboutSection dict={dict} />
      <ServicesSection dict={dict} />
      <HowItWorksSection dict={dict} />
      <CalculatorSection dict={dict} locale={locale} />
      <WhyUsSection dict={dict} />
      <ApplicationSection dict={dict} locale={locale} />
    </>
  );
}
