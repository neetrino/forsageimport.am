import { describe, expect, it } from "vitest";
import {
  assertJsonContentType,
  isFastBotSubmit,
  phoneRateLimitKey,
} from "@/lib/security/request-guards";
import { auditEnv } from "@/lib/security/env-audit";

describe("assertJsonContentType", () => {
  it("accepts application/json", () => {
    const request = new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
    });
    expect(assertJsonContentType(request)).toBe(true);
  });

  it("rejects other content types", () => {
    const request = new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "content-type": "text/plain" },
    });
    expect(assertJsonContentType(request)).toBe(false);
  });
});

describe("isFastBotSubmit", () => {
  it("flags missing or too-fast timestamps", () => {
    const now = 1_000_000;
    expect(isFastBotSubmit(undefined, { now, minMs: 1200 })).toBe(true);
    expect(isFastBotSubmit(now - 200, { now, minMs: 1200 })).toBe(true);
    expect(isFastBotSubmit(now - 2000, { now, minMs: 1200 })).toBe(false);
  });
});

describe("phoneRateLimitKey", () => {
  it("normalizes to trailing digits", () => {
    expect(phoneRateLimitKey("+1 (555) 123-4567")).toBe("lead-phone:5551234567");
  });
});

describe("auditEnv", () => {
  it("requires APP_URL in production", () => {
    const issues = auditEnv({ NODE_ENV: "production" } as NodeJS.ProcessEnv);
    expect(issues.some((issue) => issue.code === "MISSING_APP_URL")).toBe(true);
  });
});
