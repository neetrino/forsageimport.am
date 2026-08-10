# 42 — Performance

Audit date: 2026-08-10

---

## Current observations

| Topic | Reality |
| --- | --- |
| N+1 queries | N/A (no DB) |
| API fan-out | None |
| Bundle | Minimal app code; Next/React dominate |
| Images | No product images yet |
| Pagination | N/A |
| Caching | No app cache layer |
| Fonts | `next/font` Geist — good baseline |

Status: Product perf not measurable meaningfully without real sections/assets.

---

## Future risks (MVP)

| Risk | Why | Mitigation |
| --- | --- | --- |
| Large hero images/slider | LAND-001 | Next/Image, modern formats, sizing |
| Heavy PDF lib | CALC-003 | Code-split; load on download |
| Triple locale dictionaries | I18N-001 | Split messages; avoid shipping all if possible |
| Client calculator complexity | CALC-* | Keep pure functions; memoize only if measured need |
| Dark-mode CSS + unused template assets | `globals.css`, `public/*.svg` | Remove unused assets |

---

## Missing measurements

- Lighthouse / Web Vitals baselines: `NOT FOUND`
- Bundle analyzer config: `NOT FOUND`
