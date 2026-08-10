# 40 — Security

Audit date: 2026-08-10 (updated Phase 5)

---

## Controls implemented

| Control | Status | Evidence |
| --- | --- | --- |
| Security headers | ✅ | `next.config.ts` + `src/lib/security/headers.ts` |
| `X-Powered-By` disabled | ✅ | `poweredByHeader: false` |
| Lead origin allowlist | ✅ | `isAllowedLeadOrigin` |
| JSON content-type enforcement | ✅ | `assertJsonContentType` |
| Body size limit (8KB) | ✅ | `readJsonBodyLimited` |
| Honeypot | ✅ | `website` field |
| Fast-submit bot guard | ✅ | `openedAt` min 1.2s |
| IP rate limit | ✅ | `consumeRateLimit` |
| Phone rate limit | ✅ | `phoneRateLimitKey` |
| Dependency audit in CI | ✅ | `pnpm audit:deps` |
| `.env` gitignored | ✅ | `.gitignore` |

---

## Findings

### SEC-001 — Public marketing surface

- **Severity:** Info  
- **Status:** Accepted for MVP  
- **Mitigation:** Headers + CSP baseline  

### SEC-002 — Template secrets leftovers

- **Severity:** Low (process)  
- **Status:** Mitigated  
- **Evidence:** `.env.example` comments unused JWT/DB/R2 vars; `auditEnv` warns on unused JWT in prod  

### SEC-003 — Lead API spam / abuse

- **Severity:** High (residual)  
- **Status:** Mitigated for single-instance MVP  
- **Residual risk:** In-memory rate limit resets per instance; upgrade to Upstash for multi-region  

### SEC-004 — XSS

- **Severity:** Low  
- **Status:** Mitigated by React text rendering; no `dangerouslySetInnerHTML` in app code  

### SEC-005 — PDF abuse

- **Severity:** Low  
- **Status:** Client-side PDF only  

### SEC-006 — Dependency / supply chain

- **Severity:** Low–Medium  
- **Status:** CI runs `pnpm audit --audit-level=high`  

---

## Checklist areas (current)

| Area | Status |
| --- | --- |
| Authentication | N/A for MVP product |
| Authorization | N/A |
| CSRF-ish (mutating API) | Origin/Referer allowlist on `/api/leads` |
| CORS | Same-origin form posts; cross-origin blocked by origin guard |
| Rate limiting | IP + phone |
| Secret exposure in repo | `.env` ignored; examples contain no real secrets |
