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
