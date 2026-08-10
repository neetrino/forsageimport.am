# 50 — Testing Strategy

Audit date: 2026-08-10 (Phase 6)

---

## Current tests

| Type | Status | Location |
| --- | --- | --- |
| Unit | ✅ | `src/lib/calculator/__tests__`, `src/lib/leads/__tests__`, `src/lib/security/__tests__` |
| Integration | 🟡 | Lead API exercised via Playwright `request` + route unit paths |
| API | ✅ | Content-type / validation covered in unit + E2E request smoke |
| E2E | ✅ | `e2e/*.spec.ts` (Playwright) |
| Visual | `NOT FOUND` | Optional later |
| CI test job | ✅ | `.github/workflows/ci.yml` — lint, typecheck, unit, audit, build, Playwright |

Scripts: `test`, `test:e2e`, `qa:smoke`, `lint`, `typecheck`, `build`, `audit:deps`

---

## Strategy in use

### Unit (P0 calculator + leads + security)

- Pure fee/customs/totals functions with golden fixtures
- Lead validation + spam honeypot behavior
- Request guards / rate-limit helpers

### E2E smoke (Phase 6)

- `/` → `/hy` redirect + core sections
- Hero CTAs to calculator/apply
- Calculator empty-submit blocked + happy path + PDF download
- Lead invalid/valid submit + API 415
- Locale switch hy → ru → en

Default Playwright port: **3100** (avoids clash with `pnpm dev` on 3000).

### Automated QA gate

`pnpm qa:smoke` runs: lint → typecheck → unit → audit → build → Playwright.

Maps to executable items in `52_QA_CHECKLIST.md`.

### Still manual / deferred

- Real-device mobile layout walkthrough
- Visual regression
- Multi-instance rate-limit behavior (needs shared store)
- Lighthouse / perf budgets (Phase 7)

---

## Gap (remaining)

- No visual snapshots
- Mobile viewport E2E project not configured yet
- Official rate golden files pending business (BLK-001)
