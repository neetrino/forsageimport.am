/**
 * Brand assets live on Cloudflare R2 (WebP only).
 * Set NEXT_PUBLIC_R2_PUBLIC_URL to the public bucket/CDN base (no trailing slash).
 */

function assetsBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim().replace(/\/$/, "");
  if (!base) {
    throw new Error(
      "NEXT_PUBLIC_R2_PUBLIC_URL is required. Brand images are served from Cloudflare R2.",
    );
  }
  return base;
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
