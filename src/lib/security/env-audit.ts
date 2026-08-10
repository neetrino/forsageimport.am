/**
 * Production env hygiene checks (no secret values logged).
 */
export type EnvIssue = {
  code: string;
  level: "error" | "warn";
  message: string;
};

export function auditEnv(
  env: NodeJS.ProcessEnv = process.env,
): EnvIssue[] {
  const issues: EnvIssue[] = [];
  const isProd = env.NODE_ENV === "production";

  if (env.JWT_SECRET && !env.JWT_SECRET.includes("change-this")) {
    issues.push({
      code: "UNUSED_JWT_PRESENT",
      level: "warn",
      message:
        "JWT_SECRET is set but auth is out of MVP scope. Remove unused secrets from production env.",
    });
  }

  if (isProd) {
    if (!env.APP_URL) {
      issues.push({
        code: "MISSING_APP_URL",
        level: "error",
        message: "APP_URL is required in production for origin checks.",
      });
    }

    if (!env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim()) {
      issues.push({
        code: "MISSING_R2_PUBLIC_URL",
        level: "error",
        message:
          "NEXT_PUBLIC_R2_PUBLIC_URL is required so brand WebP assets can load from R2.",
      });
    }

    const hasResend = Boolean(env.RESEND_API_KEY?.trim());
    const hasLeadTo = Boolean(
      env.LEAD_TO_EMAIL?.trim() || env.NEXT_PUBLIC_CONTACT_EMAIL?.trim(),
    );
    if (hasResend !== hasLeadTo || (hasResend && !env.RESEND_FROM_EMAIL?.trim())) {
      issues.push({
        code: "LEAD_EMAIL_MISCONFIG",
        level: "warn",
        message:
          "Lead email delivery looks incomplete. Set RESEND_API_KEY, RESEND_FROM_EMAIL, and LEAD_TO_EMAIL together.",
      });
    }
  }

  return issues;
}
