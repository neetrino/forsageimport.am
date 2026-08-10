# 23 — API Contracts

Audit date: 2026-08-10

---

## Rule

Document **only real endpoints**. Do not invent APIs.

---

## Current endpoints

**None found.**

Searched for:

- `src/app/api/**`
- Route Handler exports
- Server Actions used as HTTP API

Result: `NOT FOUND`

---

## Next.js page routes (UI only)

| Method | Path | Auth | Role | Notes |
| --- | --- | --- | --- | --- |
| GET | `/` | Public | Visitor | Renders placeholder home — not a JSON API |

---

## Future endpoints

Will be added here **only after** implementation. Candidates under discussion (not contracts yet):

- `POST /api/leads` — if FORM-001 stores/emails leads
- `POST /api/calculate` — if server-side rates required
- `POST /api/calculate/pdf` — if server PDF required

Until then, calculator is expected to be client-side (`NEEDS VERIFICATION` of formula secrecy).
