import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import {
  Exo_2,
  IBM_Plex_Mono,
  Noto_Sans_Armenian,
  Rubik,
} from "next/font/google";
import { locales, type Locale, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { BRAND_LOGO } from "@/lib/brand/assets";
import { SiteShell } from "@/components/layout/SiteShell";

/** Explicit viewport — Yandex and some Chromium forks mis-scale without it. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const bodyHy = Noto_Sans_Armenian({
  variable: "--font-body",
  subsets: ["armenian", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const displayHy = Noto_Sans_Armenian({
  variable: "--font-display",
  subsets: ["armenian", "latin"],
  weight: ["700", "800"],
  display: "swap",
  preload: true,
});

const bodyIntl = Rubik({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const displayIntl = Exo_2({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800"],
  display: "swap",
  preload: true,
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
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
        { url: BRAND_LOGO.faviconWebp, type: "image/webp" },
        { url: BRAND_LOGO.iconWebp, type: "image/webp", sizes: "32x32" },
      ],
      apple: [
        {
          url: BRAND_LOGO.appleIconWebp,
          sizes: "180x180",
          type: "image/webp",
        },
      ],
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

function fontClassName(locale: Locale): string {
  const pair =
    locale === "hy"
      ? `${bodyHy.variable} ${displayHy.variable}`
      : `${bodyIntl.variable} ${displayIntl.variable}`;
  return `${pair} ${monoFont.variable}`;
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
      className={`${fontClassName(locale)} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteShell locale={locale} dict={dict}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
