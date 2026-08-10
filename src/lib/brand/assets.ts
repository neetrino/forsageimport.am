/**
 * Brand assets live on Cloudflare R2 (WebP only).
 * Prefer NEXT_PUBLIC_R2_PUBLIC_URL; fall back to the project public bucket URL
 * so CI/local builds never fail when the env var is unset (public CDN, not a secret).
 */

export const DEFAULT_R2_PUBLIC_URL =
  "https://pub-a25eabdea077451bb669dbbc8035ab25.r2.dev";

function normalizePublicBase(raw: string | undefined): string | null {
  const trimmed = raw?.trim();
  if (!trimmed || trimmed === "undefined" || trimmed === "null") {
    return null;
  }

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }
    return `${url.origin}${url.pathname}`.replace(/\/$/, "");
  } catch {
    return null;
  }
}

function assetsBaseUrl(): string {
  return (
    normalizePublicBase(process.env.NEXT_PUBLIC_R2_PUBLIC_URL) ??
    DEFAULT_R2_PUBLIC_URL
  );
}

export function brandAsset(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${assetsBaseUrl()}${normalized}`;
}

const base = assetsBaseUrl();

export const BRAND_LOGO = {
  webp: `${base}/brand/forsage-logo.webp`,
  faviconWebp: `${base}/brand/forsage-favicon.webp`,
  iconWebp: `${base}/brand/icon.webp`,
  appleIconWebp: `${base}/brand/apple-icon.webp`,
  width: 1613,
  height: 1623,
  alt: "Forsage Import",
} as const;

/** Cycling Photoroom cutouts for the hero (transparent background). */
export const HERO_CARS = [
  {
    id: "orange-coupe",
    webp: `${base}/brand/cars/hero-car-01.webp`,
    width: 1036,
    height: 471,
    alt: "Orange sports coupe",
  },
  {
    id: "black-sedan",
    webp: `${base}/brand/cars/hero-car-02.webp`,
    width: 1043,
    height: 523,
    alt: "Black luxury sedan",
  },
  {
    id: "white-suv",
    webp: `${base}/brand/cars/hero-car-03.webp`,
    width: 1049,
    height: 513,
    alt: "White performance SUV",
  },
] as const;
