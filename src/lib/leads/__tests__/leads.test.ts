import { describe, expect, it, beforeEach } from "vitest";
import { validateLeadInput } from "@/lib/leads/validate";
import {
  consumeRateLimit,
  resetRateLimitBuckets,
} from "@/lib/leads/rate-limit";

const messages = {
  required: "required",
  phone: "phone",
  messageTooLong: "long-message",
  nameTooLong: "long-name",
};

describe("validateLeadInput", () => {
  it("accepts a valid lead", () => {
    const result = validateLeadInput(
      {
        name: "Armen",
        phone: "+37499111222",
        message: "Need SUV under 15k",
        locale: "hy",
        website: "",
      },
      messages,
    );
    expect(result.ok).toBe(true);
  });

  it("rejects invalid phone and empty name", () => {
    const result = validateLeadInput(
      {
        name: "",
        phone: "123",
        message: "",
        locale: "en",
        website: "",
      },
      messages,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.name).toBeDefined();
      expect(result.errors.phone).toBeDefined();
    }
  });

  it("marks honeypot fills as spam", () => {
    const result = validateLeadInput(
      {
        name: "Bot",
        phone: "+37499111222",
        message: "",
        locale: "en",
        website: "https://spam.test",
      },
      messages,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.spam).toBe(true);
    }
  });
});

describe("consumeRateLimit", () => {
  beforeEach(() => {
    resetRateLimitBuckets();
  });

  it("allows up to limit then blocks", () => {
    const key = "lead:test-ip";
    expect(consumeRateLimit({ key, limit: 2, windowMs: 60_000 }).allowed).toBe(true);
    expect(consumeRateLimit({ key, limit: 2, windowMs: 60_000 }).allowed).toBe(true);
    expect(consumeRateLimit({ key, limit: 2, windowMs: 60_000 }).allowed).toBe(false);
  });
});
