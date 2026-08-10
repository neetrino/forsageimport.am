import type { Locale } from "@/lib/i18n/config";
import type { LandingSectionId } from "@/types/landing";

export function localePath(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `/${locale}${normalized}`;
}

export function sectionHref(sectionId: LandingSectionId): string {
  return `#${sectionId}`;
}
