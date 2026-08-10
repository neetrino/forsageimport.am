const DEFAULT_MAX_BODY_BYTES = 8_192;

export function assertJsonContentType(request: Request): boolean {
  const contentType = request.headers.get("content-type") ?? "";
  return contentType.toLowerCase().includes("application/json");
}

export function isAllowedLeadOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    // Same-origin fetch from some browsers may omit Origin; require Host match via Referer fallback
    const referer = request.headers.get("referer");
    if (!referer) return false;
    return isSameSiteUrl(referer, request);
  }
  return isSameSiteUrl(origin, request);
}

function isSameSiteUrl(candidate: string, request: Request): boolean {
  try {
    const url = new URL(candidate);
    const host = request.headers.get("host");
    if (!host) return false;

    const appUrl = process.env.APP_URL?.trim();
    if (appUrl) {
      const allowed = new URL(appUrl);
      if (url.host === allowed.host) return true;
    }

    return url.host === host;
  } catch {
    return false;
  }
}

export async function readJsonBodyLimited(
  request: Request,
  maxBytes = DEFAULT_MAX_BODY_BYTES,
): Promise<
  | { ok: true; value: unknown }
  | { ok: false; error: "BODY_TOO_LARGE" | "INVALID_JSON" }
> {
  const raw = await request.text();
  if (raw.length > maxBytes) {
    return { ok: false, error: "BODY_TOO_LARGE" };
  }
  try {
    return { ok: true, value: raw ? JSON.parse(raw) : null };
  } catch {
    return { ok: false, error: "INVALID_JSON" };
  }
}

export function isFastBotSubmit(
  openedAtRaw: unknown,
  options?: { minMs?: number; now?: number },
): boolean {
  const minMs = options?.minMs ?? 1_200;
  const now = options?.now ?? Date.now();
  const openedAt =
    typeof openedAtRaw === "number"
      ? openedAtRaw
      : typeof openedAtRaw === "string"
        ? Number(openedAtRaw)
        : Number.NaN;

  if (!Number.isFinite(openedAt)) return true;
  if (openedAt > now + 5_000) return true; // clock skew / forged future
  return now - openedAt < minMs;
}

export function phoneRateLimitKey(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `lead-phone:${digits.slice(-10)}`;
}
