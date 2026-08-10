"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { localePath, sectionHref } from "@/lib/i18n/paths";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { MobileNav } from "@/components/landing/MobileNav";
import { BrandLogo } from "@/components/brand/BrandLogo";

type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(LANDING_SECTION_IDS.hero);
    if (!hero) return undefined;

    const headerEl = document.querySelector(".site-header");
    const headerOffsetPx = Math.round(
      headerEl?.getBoundingClientRect().height || 68,
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSolid(!(entry?.isIntersecting ?? false));
      },
      {
        root: null,
        rootMargin: `-${headerOffsetPx}px 0px 0px 0px`,
        threshold: 0,
      },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const links = [
    { href: sectionHref(LANDING_SECTION_IDS.about), label: dict.nav.about },
    { href: sectionHref(LANDING_SECTION_IDS.services), label: dict.nav.services },
    { href: sectionHref(LANDING_SECTION_IDS.process), label: dict.nav.process },
    { href: sectionHref(LANDING_SECTION_IDS.whyUs), label: dict.nav.whyUs },
    { href: sectionHref(LANDING_SECTION_IDS.apply), label: dict.nav.apply },
  ] as const;

  const overHero = !solid;

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-40 ${solid ? "is-solid" : "is-over-hero"}`}
    >
      <Container className="relative flex h-[var(--header-height)] items-center justify-between gap-4">
        <a
          href={localePath(locale)}
          className={`inline-flex items-center gap-2.5 transition-colors ${
            overHero ? "text-white" : "text-[var(--ink)]"
          }`}
          aria-label={dict.site.brand}
        >
          <BrandLogo size="sm" priority className="translate-y-px" />
        </a>

        <nav aria-label={dict.a11y.mainNav} className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors ${
                overHero
                  ? "text-white/70 hover:bg-white/10 hover:text-white"
                  : "text-[var(--muted)] hover:bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] hover:text-[var(--ink)]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LocaleSwitcher
              locale={locale}
              label={dict.a11y.language}
              variant={overHero ? "dark" : "light"}
            />
          </div>
          <div className="hidden sm:block">
            <ButtonLink href={sectionHref(LANDING_SECTION_IDS.calculator)} size="sm">
              {dict.nav.calculator}
            </ButtonLink>
          </div>
          <MobileNav locale={locale} dict={dict} tone={overHero ? "dark" : "light"} />
        </div>
      </Container>
    </header>
  );
}
