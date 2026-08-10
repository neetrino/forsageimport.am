export const securityHeaders: Record<string, string> = buildSecurityHeaders();

export function buildSecurityHeaders(options?: {
  imageOrigins?: readonly string[];
}): Record<string, string> {
  const imageOrigins = (options?.imageOrigins ?? [])
    .map((origin) => origin.trim())
    .filter(Boolean);

  const imgSrc = ["'self'", "data:", "blob:", ...imageOrigins].join(" ");

  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "X-DNS-Prefetch-Control": "on",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Content-Security-Policy": [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      `img-src ${imgSrc}`,
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "connect-src 'self'",
    ].join("; "),
  };
}

export function withProductionHsts(
  headers: Record<string, string>,
  isProduction: boolean,
): Record<string, string> {
  if (!isProduction) return headers;
  return {
    ...headers,
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  };
}
