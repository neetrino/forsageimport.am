# 23 — API Contracts

Audit date: 2026-08-10 (updated Phase 4)

---

## Rule

Document **only real endpoints**.

---

## UI routes

| Method | Path | Auth | Role | Notes |
| --- | --- | --- | --- | --- |
| GET | `/` | Public | Visitor | Redirects to `/hy` via `src/proxy.ts` |
| GET | `/[locale]` | Public | Visitor | Landing page (`hy` \| `ru` \| `en`) |

---

## `POST /api/leads`

| Field | Value |
| --- | --- |
| AUTH | Public |
| ROLE | Visitor |
| REQUEST | JSON `{ name, phone, message?, locale, website?, openedAt }` |
| VALIDATION | name/phone required; phone 8–15 digits; message ≤2000; locale ∈ hy\|ru\|en; honeypot empty; openedAt ≥ ~1.2s age |
| RESPONSE | `200 { ok: true, delivery: "email" \| "log" \| "ignored" }` |
| ERRORS | `400`, `403 FORBIDDEN_ORIGIN`, `413 BODY_TOO_LARGE`, `415 UNSUPPORTED_MEDIA_TYPE`, `429 RATE_LIMITED`, `502 DELIVERY_FAILED`, `405` on GET |
| SIDE EFFECTS | Sends email via Resend when configured; otherwise structured server log |
| USED BY | `ApplicationSection` |
| RATE LIMIT | IP + phone keys (`LEAD_RATE_LIMIT_*`) |
| ABUSE CONTROLS | Origin allowlist, honeypot, fast-submit guard, body size cap |

Evidence: `src/app/api/leads/route.ts`
