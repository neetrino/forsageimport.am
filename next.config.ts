import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the repository AGENTS.md (Cursor template) instead of Next.js agent rules.
  agentRules: false,
};

export default nextConfig;
