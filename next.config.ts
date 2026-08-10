import type { NextConfig } from "next";
import {
  securityHeaders,
  withProductionHsts,
} from "@/lib/security/headers";

const isProduction = process.env.NODE_ENV === "production";
const headersToApply = withProductionHsts(securityHeaders, isProduction);

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
      {
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
