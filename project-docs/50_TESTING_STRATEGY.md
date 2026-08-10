# 50 — Testing Strategy

Audit date: 2026-08-10

---

## Current tests

| Type | Status |
| --- | --- |
| Unit | `NOT FOUND` |
| Integration | `NOT FOUND` |
| API | `NOT FOUND` |
| E2E | `NOT FOUND` |
| Visual | `NOT FOUND` |
| CI test job | `NOT FOUND` |

Scripts available: `lint`, `typecheck`, `build` — quality gates, not functional tests.

---

## Recommended strategy for this project

### Unit (P0 for calculator)

- Pure functions for fees, customs variants, totals
- Fixtures provided by business (golden files)

### Component

- Calculator form validation messages
- Results rendering for both person types
- Locale switcher

### E2E (smoke)

- Load `/`
- Fill calculator happy path
- See results
- Download PDF
- Switch language
- Submit lead (when exists)

### Security / abuse

- Lead endpoint rate limit tests (if API)

### Regression

- Snapshot key copy for hy/ru/en critical strings

---

## Missing tests (gap)

Everything product-related — track as debt until Phase 5 in roadmap.
