import type { NextConfig } from "next";
import {
  buildSecurityHeaders,
  withProductionHsts,
} from "@/lib/security/headers";

const isProduction = process.env.NODE_ENV === "production";

const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim().replace(
  /\/$/,
  "",
);

let r2ImageOrigin: string | undefined;
let r2Hostname: string | undefined;
if (r2PublicUrl) {
  try {
    const parsed = new URL(r2PublicUrl);
    r2ImageOrigin = parsed.origin;
    r2Hostname = parsed.hostname;
  } catch {
    throw new Error(
      `NEXT_PUBLIC_R2_PUBLIC_URL is invalid: ${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}`,
    );
  }
}

const headersToApply = withProductionHsts(
  buildSecurityHeaders({
    imageOrigins: r2ImageOrigin ? [r2ImageOrigin] : [],
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
    remotePatterns: r2Hostname
      ? [
          {
            protocol: "https",
            hostname: r2Hostname,
            pathname: "/**",
          },
        ]
      : [],
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
