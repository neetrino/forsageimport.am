# 11 — Functional Status Matrix

Audit date: 2026-08-10  
Completion rule: percentage is **not guessed**. Each row uses discrete layer checks (FE/BE/DB/Tests). Product feature completion ≈ share of layers done for that feature; overall product completion = implemented requirements / total.

### Legend

| Symbol | Meaning |
| --- | --- |
| ✅ | Present / done |
| 🟡 | Partial |
| ❌ | Missing |
| ⚠️ | Needs fix |
| 🔍 | Needs verification |
| ⛔ | Blocked |

Status values: `IMPLEMENTED` · `PARTIAL` · `NOT IMPLEMENTED` · `NEEDS FIX` · `NEEDS VERIFICATION` · `BLOCKED`

---

## Matrix

| ID | Functional | Requirement | Frontend | Backend | DB | Tests | Status | Completion | Priority | Completion basis |
| --- | --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| LAND-001 | Hero banner | Required | ❌ | ❌ N/A | ❌ N/A | ❌ | NOT IMPLEMENTED | 0% | P1 | 0/2 applicable layers (FE+Tests); BE/DB not required for static content |
| LAND-002 | About | Required | ❌ | ❌ N/A | ❌ N/A | ❌ | NOT IMPLEMENTED | 0% | P1 | same |
| LAND-003 | Services | Required | ❌ | ❌ N/A | ❌ N/A | ❌ | NOT IMPLEMENTED | 0% | P1 | same |
| LAND-004 | How it works | Required | ❌ | ❌ N/A | ❌ N/A | ❌ | NOT IMPLEMENTED | 0% | P1 | same |
| LAND-005 | Why choose us | Required | ❌ | ❌ N/A | ❌ N/A | ❌ | NOT IMPLEMENTED | 0% | P2 | same |
| CTA-001 | Hero CTAs | Required | ❌ | ❌ N/A | ❌ N/A | ❌ | NOT IMPLEMENTED | 0% | P1 | same |
| CALC-001 | Calculator inputs | Required | ❌ | ❌ | ❌ N/A* | ❌ | NOT IMPLEMENTED | 0% | P0 | 0/3 applicable (FE, calc logic/lib, Tests) |
| CALC-002 | Calculator results | Required | ❌ | ❌ | ❌ N/A* | ❌ | NOT IMPLEMENTED | 0% | P0 | same |
| CALC-003 | PDF download | Required | ❌ | ❌ | ❌ N/A | ❌ | NOT IMPLEMENTED | 0% | P1 | same |
| FORM-001 | Application form | Required (ambiguous) | ❌ | ❌ | ❌ | ❌ | NEEDS VERIFICATION | 0% | P0 | Scope decision blocking exact UI |
| FOOT-001 | Footer | Required | ❌ | ❌ N/A | ❌ N/A | ❌ | NOT IMPLEMENTED | 0% | P1 | contacts content missing from spec |
| I18N-001 | hy/ru/en | Required | ❌ | ❌ N/A | ❌ N/A | ❌ | NOT IMPLEMENTED | 0% | P1 | layout lang=en only |
| META-001 | Fast/trust NFR | Required | 🟡 | ❌ N/A | ❌ N/A | ❌ | PARTIAL | 10% | P2 | Next scaffold exists; no product UX/perf validation |

\* Calculator may be fully client-side; DB not required unless rates stored server-side (`NEEDS VERIFICATION`).

---

## Scaffold-only row (not a product requirement)

| ID | Item | Frontend | Status | Notes |
| --- | --- | --- | --- | --- |
| TECH-SCAFFOLD | Next.js app boots | ✅ placeholder page | PARTIAL | `src/app/page.tsx` shows “Project scaffold is ready” — not Forsage landing |

---

## Totals

| Status | Count (of 13) |
| --- | ---: |
| IMPLEMENTED | 0 |
| PARTIAL | 1 (META-001 only, weakly) |
| NOT IMPLEMENTED | 11 |
| NEEDS VERIFICATION | 1 (FORM-001) |
| BLOCKED | 0 (unless counting FORM-001 decision as soft block) |

### Estimated functional completeness

```text
Strict product features fully done: 0 / 13 = 0%
Weighted note: META-001 at 10% does not move overall above ~1%
Reported estimate: ~0–1% of specified product functionality
```

Evidence: no landing sections, calculator, PDF, i18n, or forms in `src/`.
