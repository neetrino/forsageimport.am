import type { Dictionary } from "@/lib/i18n/types";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { HeroSlider } from "@/components/landing/HeroSlider";

type HeroSectionProps = {
  dict: Dictionary;
};

export function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section
      id={LANDING_SECTION_IDS.hero}
      aria-labelledby="hero-brand"
      className="relative"
    >
      <HeroSlider dict={dict} />
    </section>
  );
}
