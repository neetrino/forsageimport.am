import { NextResponse } from "next/server";
import {
  consumeRateLimit,
  deliverLead,
  validateLeadInput,
} from "@/lib/leads";
import type { LeadValidationMessages } from "@/lib/leads/types";
import {
  assertJsonContentType,
  isAllowedLeadOrigin,
  isFastBotSubmit,
  phoneRateLimitKey,
  readJsonBodyLimited,
} from "@/lib/security/request-guards";

export const runtime = "nodejs";

const validationMessages: LeadValidationMessages = {
  required: "Required",
  phone: "Invalid phone",
  messageTooLong: "Message too long",
  nameTooLong: "Name too long",
};

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function rateLimitConfig() {
  const limit = Number(process.env.LEAD_RATE_LIMIT_MAX ?? "5");
  const windowMs = Number(
    process.env.LEAD_RATE_LIMIT_WINDOW_MS ?? `${15 * 60 * 1000}`,
  );
  return {
    limit: Number.isFinite(limit) && limit > 0 ? limit : 5,
    windowMs:
      Number.isFinite(windowMs) && windowMs > 0 ? windowMs : 15 * 60 * 1000,
  };
}

export function GET() {
  return NextResponse.json({ ok: false, error: "METHOD_NOT_ALLOWED" }, { status: 405 });
}

export async function POST(request: Request) {
  if (!assertJsonContentType(request)) {
    return NextResponse.json(
      { ok: false, error: "UNSUPPORTED_MEDIA_TYPE" },
      { status: 415 },
    );
  }

  if (!isAllowedLeadOrigin(request)) {
    return NextResponse.json({ ok: false, error: "FORBIDDEN_ORIGIN" }, { status: 403 });
  }

  const bodyResult = await readJsonBodyLimited(request);
  if (!bodyResult.ok) {
    const status = bodyResult.error === "BODY_TOO_LARGE" ? 413 : 400;
    return NextResponse.json({ ok: false, error: bodyResult.error }, { status });
  }

  const body = bodyResult.value;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "INVALID_BODY" }, { status: 400 });
  }

  const record = body as Record<string, unknown>;

  if (isFastBotSubmit(record.openedAt)) {
    // Soft-success: do not tip off bots
    return NextResponse.json({ ok: true, delivery: "ignored" });
  }

  const validated = validateLeadInput(
    {
      name: record.name,
      phone: record.phone,
      message: record.message,
      locale: record.locale,
      website: record.website,
    },
    validationMessages,
  );

  if (!validated.ok) {
    if (validated.spam) {
      return NextResponse.json({ ok: true, delivery: "ignored" });
    }
    return NextResponse.json(
      { ok: false, error: "VALIDATION_FAILED", fields: validated.errors },
      { status: 400 },
    );
  }

  const { limit, windowMs } = rateLimitConfig();
  const ipLimit = consumeRateLimit({
    key: `lead-ip:${clientIp(request)}`,
    limit,
    windowMs,
  });
  if (!ipLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "RATE_LIMITED", retryAfterSec: ipLimit.retryAfterSec },
      {
        status: 429,
        headers: { "Retry-After": String(ipLimit.retryAfterSec) },
      },
    );
  }

  const phoneLimit = consumeRateLimit({
    key: phoneRateLimitKey(validated.value.phone),
    limit: Math.max(3, Math.floor(limit / 2)),
    windowMs,
  });
  if (!phoneLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "RATE_LIMITED",
        retryAfterSec: phoneLimit.retryAfterSec,
      },
      {
        status: 429,
        headers: { "Retry-After": String(phoneLimit.retryAfterSec) },
      },
    );
  }

  try {
    const delivery = await deliverLead(validated.value);
    return NextResponse.json({
      ok: true,
      delivery: delivery.mode,
    });
  } catch {
    console.error("[lead] delivery failed");
    return NextResponse.json({ ok: false, error: "DELIVERY_FAILED" }, { status: 502 });
  }
}
