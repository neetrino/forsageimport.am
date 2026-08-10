# 25 — Integrations

Audit date: 2026-08-10

---

## Required by DOCX (explicit)

| Integration | Spec | Code |
| --- | --- | --- |
| Copart / IAAI / Manheim live APIs | Mentioned as business service context, **not** as technical API integration | `NOT FOUND` / not required as live feed |
| Social links | Footer | `NOT IMPLEMENTED` (URLs unknown) |
| Language content | hy/ru/en | `NOT IMPLEMENTED` |

---

## Implied / optional for MVP

| Integration | Why | Status |
| --- | --- | --- |
| Email (e.g. Resend) | Deliver FORM-001 leads | Env name present; code `NOT FOUND` |
| PDF library | CALC-003 | `NOT FOUND` |
| Analytics (GA, etc.) | Not in DOCX | `NOT FOUND` |
| Maps | Not in DOCX | `NOT FOUND` |
| Payments | Not in DOCX | `NOT FOUND` (ignore template payment KB for product scope) |

---

## Present only as template configuration

| Name in `.env.example` | Used by app code |
| --- | --- |
| DATABASE_URL | No |
| JWT_* | No |
| UPSTASH_* | No |
| RESEND_* | No |
| R2_* / NEXT_PUBLIC_R2_PUBLIC_URL | Yes (brand WebP CDN) |
| FIGMA_ACCESS_TOKEN | No |

---

## Design references (not integrations)

Three example landing templates listed in DOCX for visual inspiration — not wired into code.
