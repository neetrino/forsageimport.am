# 21 — Backend

Audit date: 2026-08-10

---

## Current reality

**No application backend modules exist.**

| Area | Status |
| --- | --- |
| NestJS / separate API | `NOT FOUND` |
| Next.js Route Handlers (`src/app/api`) | `NOT FOUND` |
| Server Actions | `NOT FOUND` |
| Controllers / services / repositories | `NOT FOUND` |
| DTO / zod validation (server) | `NOT FOUND` |
| Guards / interceptors / middleware (authz) | `NOT FOUND` |
| Jobs / queues / websockets | `NOT FOUND` |
| Email sending code | `NOT FOUND` |
| PDF server generation | `NOT FOUND` |

Evidence: dependency list only includes Next/React; empty `src/lib`; no `api` routes.

---

## Spec implication

DOCX describes a marketing landing + calculator. Backend is **optional** unless:

- lead form must email/store submissions,
- calculator rates must be secret/server-managed,
- PDF must be generated server-side.

These decisions are `NEEDS VERIFICATION`.

---

## If MVP needs minimal backend (proposed)

| Module | Responsibility |
| --- | --- |
| `app/api/leads` (optional) | Accept lead payload, validate, send email |
| `app/api/calc` (optional) | Only if formulas/rates must stay server-side |
| `app/api/pdf` (optional) | Server PDF if client PDF insufficient |

Do not invent these endpoints in contracts until implemented — see `23_API_CONTRACTS.md`.

---

## Error handling / transactions

- No backend error pipeline
- No DB transactions

Status: `NOT FOUND`
