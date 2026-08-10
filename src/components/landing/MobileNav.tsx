"use client";

import { useEffect, useId, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BrandLogo } from "@/components/brand/BrandLogo";
import {
  SectionAnchor,
  useSectionAnchor,
} from "@/components/landing/LandingRevealContext";

type MobileNavProps = {
  locale: Locale;
  dict: Dictionary;
  tone?: "light" | "dark";
};

export function MobileNav({ locale, dict, tone = "light" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const isDark = tone === "dark";
  const calculatorCta = useSectionAnchor(LANDING_SECTION_IDS.calculator);

  const links = [
    { id: LANDING_SECTION_IDS.about, label: dict.nav.about },
    { id: LANDING_SECTION_IDS.services, label: dict.nav.services },
    { id: LANDING_SECTION_IDS.process, label: dict.nav.process },
    { id: LANDING_SECTION_IDS.whyUs, label: dict.nav.whyUs },
    { id: LANDING_SECTION_IDS.calculator, label: dict.nav.calculator },
    { id: LANDING_SECTION_IDS.apply, label: dict.nav.apply },
    { id: LANDING_SECTION_IDS.contact, label: dict.nav.contact },
  ] as const;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className={`rounded-[var(--radius-sm)] border px-3 py-2 text-sm font-medium backdrop-blur-sm transition-colors ${
          isDark
            ? "border-white/25 bg-white/10 text-white hover:bg-white/15"
            : "border-[var(--line-strong)] bg-[color-mix(in_srgb,white_50%,transparent)] text-[var(--ink)]"
        }`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? dict.a11y.closeMenu : dict.a11y.openMenu}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-[color-mix(in_srgb,var(--ink)_35%,transparent)]" role="presentation">
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={dict.a11y.mainNav}
            className="absolute inset-x-0 top-0 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_92%,transparent)] px-4 py-5 shadow-[0_18px_40px_rgba(14,16,20,0.12)] backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <BrandLogo size="sm" />
              <button
                type="button"
                className="rounded-md px-3 py-2 text-sm text-[var(--muted)]"
                onClick={() => setOpen(false)}
              >
                {dict.a11y.closeMenu}
              </button>
            </div>
            <nav aria-label={dict.a11y.mainNav} className="grid gap-1">
              {links.map((link) => (
                <SectionAnchor
                  key={link.id}
                  sectionId={link.id}
                  className="rounded-md px-3 py-3 text-base text-[var(--ink)] hover:bg-[var(--surface)]"
                  onNavigate={() => setOpen(false)}
                >
                  {link.label}
                </SectionAnchor>
              ))}
            </nav>
            <div className="mt-5 border-t border-[var(--line)] pt-4">
              <LocaleSwitcher locale={locale} label={dict.a11y.language} />
              <div className="mt-4">
                <ButtonLink
                  href={calculatorCta.href}
                  onClick={(event) => {
                    calculatorCta.onClick(event);
                    setOpen(false);
                  }}
                  className="w-full"
                >
                  {dict.nav.calculator}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
