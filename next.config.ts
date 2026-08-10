import type { NextConfig } from "next";
import { DEFAULT_R2_PUBLIC_URL } from "@/lib/brand/assets";
import {
  buildSecurityHeaders,
  withProductionHsts,
} from "@/lib/security/headers";

const isProduction = process.env.NODE_ENV === "production";

function resolveR2PublicUrl(): string {
  const configured = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim();
  if (
    configured &&
    configured !== "undefined" &&
    configured !== "null"
  ) {
    try {
      const url = new URL(configured);
      if (url.protocol === "http:" || url.protocol === "https:") {
        return `${url.origin}${url.pathname}`.replace(/\/$/, "");
      }
    } catch {
      // fall through to default
    }
  }
  return DEFAULT_R2_PUBLIC_URL;
}

const r2PublicUrl = resolveR2PublicUrl();
const parsed = new URL(r2PublicUrl);
const r2ImageOrigin = parsed.origin;
const r2Hostname = parsed.hostname;

const headersToApply = withProductionHsts(
  buildSecurityHeaders({
    imageOrigins: [r2ImageOrigin],
  }),
  isProduction,
);

const nextConfig: NextConfig = {
  // Keep the repository AGENTS.md (Cursor template) instead of Next.js agent rules.
  agentRules: false,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: r2Hostname,
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["motion", "clsx"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: Object.entries(headersToApply).map(([key, value]) => ({
          key,
          value,
        })),
      },
    ];
  },
};

export default nextConfig;
