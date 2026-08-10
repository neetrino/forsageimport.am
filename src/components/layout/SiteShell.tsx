import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { LandingRevealProvider } from "@/components/landing/LandingRevealContext";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";

type SiteShellProps = {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
};

export function SiteShell({ locale, dict, children }: SiteShellProps) {
  return (
    <LandingRevealProvider>
      <SkipToContent label={dict.a11y.skipToContent} />
      <SiteHeader locale={locale} dict={dict} />
      <main id="main-content" className="flex-1 bg-[var(--landing-canvas)]">
        {children}
      </main>
      <SiteFooter locale={locale} dict={dict} />
    </LandingRevealProvider>
  );
}
