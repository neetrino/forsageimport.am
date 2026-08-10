import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { en } from "@/lib/i18n/dictionaries/en";
import { hy } from "@/lib/i18n/dictionaries/hy";
import { ru } from "@/lib/i18n/dictionaries/ru";

const dictionaries: Record<Locale, Dictionary> = {
  hy,
  ru,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
