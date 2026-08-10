# 41 — Error Handling

Audit date: 2026-08-10

---

## Current

| Layer | Behavior |
| --- | --- |
| Frontend | No product error UI |
| Backend | No API errors |
| Next.js | Framework defaults only |
| Logging | No application logger; avoid relying on `console.log` for production |

Status: `NOT IMPLEMENTED` for product flows.

---

## Required for MVP (target)

| Flow | Error handling need |
| --- | --- |
| CALC-001 | Field-level messages; block compute on invalid |
| CALC-003 | PDF failure message + retry |
| FORM-001 | Submit failure + success states |
| i18n | Missing key fallback strategy |
| Network (if API) | Timeout/offline messaging |

---

## Global errors

- Add `error.tsx` / `not-found.tsx` when product UI lands (`NOT FOUND` now)
