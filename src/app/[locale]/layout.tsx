import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Exo_2,
  IBM_Plex_Mono,
  Noto_Sans_Armenian,
  Rubik,
} from "next/font/google";
import { locales, type Locale, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteShell } from "@/components/layout/SiteShell";

/** Modern geometric Armenian sans — body copy */
const bodyHy = Noto_Sans_Armenian({
  variable: "--font-body-hy",
  subsets: ["armenian", "latin"],
  weight: ["400", "500", "600", "700"],
});

/** Same family, heavier optical role for headlines (no serif) */
const displayHy = Noto_Sans_Armenian({
  variable: "--font-display-hy",
  subsets: ["armenian", "latin"],
  weight: ["600", "700", "800", "900"],
});

/** Clean geometric UI sans with Cyrillic */
const bodyIntl = Rubik({
  variable: "--font-body-intl",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

/** Automotive / kinetic display with Cyrillic */
const displayIntl = Exo_2({
  variable: "--font-display-intl",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    return { title: "Forsage Import" };
  }

  const dict = getDictionary(rawLocale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    icons: {
      icon: [
        { url: "/brand/forsage-favicon.webp", type: "image/webp" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    alternates: {
      languages: {
        hy: "/hy",
        ru: "/ru",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${bodyHy.variable} ${bodyIntl.variable} ${displayHy.variable} ${displayIntl.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteShell locale={locale} dict={dict}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
