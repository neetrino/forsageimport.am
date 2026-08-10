type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
  now?: number;
};

/**
 * Simple in-process sliding fixed-window limiter.
 * Good enough for single-instance / low-traffic MVP.
 * Replace with Upstash Redis for multi-region production scale.
 */
export function consumeRateLimit(options: RateLimitOptions): RateLimitResult {
  const now = options.now ?? Date.now();
  const existing = buckets.get(options.key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(options.key, {
      count: 1,
      resetAt: now + options.windowMs,
    });
    return {
      allowed: true,
      remaining: Math.max(0, options.limit - 1),
      retryAfterSec: Math.ceil(options.windowMs / 1000),
    };
  }

  if (existing.count >= options.limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  buckets.set(options.key, existing);
  return {
    allowed: true,
    remaining: Math.max(0, options.limit - existing.count),
    retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

/** Test helper */
export function resetRateLimitBuckets(): void {
  buckets.clear();
}
