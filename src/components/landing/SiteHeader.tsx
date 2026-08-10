"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { localePath } from "@/lib/i18n/paths";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { MobileNav } from "@/components/landing/MobileNav";
import { BrandLogo } from "@/components/brand/BrandLogo";
import {
  SectionAnchor,
  useSectionAnchor,
} from "@/components/landing/LandingRevealContext";

type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

const DARK_SECTION_IDS = [
  LANDING_SECTION_IDS.hero,
  LANDING_SECTION_IDS.about,
  LANDING_SECTION_IDS.services,
  LANDING_SECTION_IDS.process,
  LANDING_SECTION_IDS.calculator,
  LANDING_SECTION_IDS.whyUs,
  LANDING_SECTION_IDS.apply,
  LANDING_SECTION_IDS.contact,
] as const;

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const [lightText, setLightText] = useState(true);

  useEffect(() => {
    let frame = 0;
    let alive = true;

    const update = () => {
      if (!alive) return;
      const headerEl = document.querySelector(".site-header");
      const probeY = Math.round(
        (headerEl?.getBoundingClientRect().height || 88) * 0.55,
      );

      const overDark = DARK_SECTION_IDS.some((id) => {
        const section = document.getElementById(id);
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom >= probeY;
      });

      setLightText(overDark);
    };

    const onScrollOrResize = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    // Defer first paint probe past mount commit.
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      update();
    });

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    return () => {
      alive = false;
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const links = [
    { id: LANDING_SECTION_IDS.about, label: dict.nav.about },
    { id: LANDING_SECTION_IDS.services, label: dict.nav.services },
    { id: LANDING_SECTION_IDS.process, label: dict.nav.process },
    { id: LANDING_SECTION_IDS.whyUs, label: dict.nav.whyUs },
    { id: LANDING_SECTION_IDS.apply, label: dict.nav.apply },
  ] as const;
  const calculatorCta = useSectionAnchor(LANDING_SECTION_IDS.calculator);

  const tone = lightText ? "dark" : "light";

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40">
      <Container className="site-header-inner relative !pl-3 !pr-4 sm:!pl-4 sm:!pr-6 lg:!pl-5 lg:!pr-8 xl:!pl-6">
        <a
          href={localePath(locale)}
          className={`site-header-brand ${
            lightText ? "text-white" : "text-[var(--ink)]"
          }`}
          aria-label={dict.site.brand}
        >
          <BrandLogo size="header" priority className="shrink-0" />
          <span className="site-header-brand-copy">
            <span className="site-header-brand-name">{dict.site.brand}</span>
            <span
              className={`site-header-brand-tag ${
                lightText ? "text-white" : "text-[var(--muted)]"
              }`}
            >
              {dict.site.tagline}
            </span>
          </span>
        </a>

        <nav
          aria-label={dict.a11y.mainNav}
          className={`site-header-nav ${lightText ? "" : "is-light"}`}
        >
          {links.map((link) => (
            <SectionAnchor
              key={link.id}
              sectionId={link.id}
              className={`site-header-nav-link ${
                lightText ? "is-dark" : "is-light"
              }`}
            >
              {link.label}
            </SectionAnchor>
          ))}
        </nav>

        <div className="site-header-actions">
          <div className="hidden md:block">
            <LocaleSwitcher
              locale={locale}
              label={dict.a11y.language}
              variant={tone}
            />
          </div>
          <div className="hidden sm:block">
            <ButtonLink
              href={calculatorCta.href}
              onClick={calculatorCta.onClick}
              size="sm"
              className="site-header-cta"
            >
              {dict.nav.calculator}
            </ButtonLink>
          </div>
          <MobileNav locale={locale} dict={dict} tone={tone} />
        </div>
      </Container>
    </header>
  );
}
