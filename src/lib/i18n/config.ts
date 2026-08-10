export const locales = ["hy", "ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "hy";

export const localeLabels: Record<Locale, string> = {
  hy: "Հայերեն",
  ru: "Русский",
  en: "English",
};

export const localeShortLabels: Record<Locale, string> = {
  hy: "HY",
  ru: "RU",
  en: "EN",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
