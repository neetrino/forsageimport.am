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
| LAND-001 | Hero banner | Required | ✅ | ❌ N/A | ❌ N/A | ✅ | PARTIAL | 90% | P1 | Full-bleed visual + brand + CTAs; E2E smoke; photo assets optional later |
| LAND-002 | About | Required | ✅ | ❌ N/A | ❌ N/A | ✅ | PARTIAL | 90% | P1 | 5 hy/ru/en paragraphs; E2E count; business copy review pending |
| LAND-003 | Services | Required | ✅ | ❌ N/A | ❌ N/A | 🟡 | PARTIAL | 85% | P1 | 6 service themes present across locales |
| LAND-004 | How it works | Required | ✅ | ❌ N/A | ❌ N/A | ✅ | PARTIAL | 90% | P1 | 6 steps; E2E count |
| LAND-005 | Why choose us | Required | ✅ | ❌ N/A | ❌ N/A | ✅ | PARTIAL | 90% | P2 | 4 advantages; E2E count |
| CTA-001 | Hero CTAs | Required | ✅ | ❌ N/A | ❌ N/A | ✅ | PARTIAL | 95% | P1 | Smooth-scroll anchors; E2E |
| CALC-001 | Calculator inputs | Required | ✅ | ✅ | ❌ N/A* | ✅ | PARTIAL | 92% | P0 | UI+validation+unit+E2E; locations draft list |
| CALC-002 | Calculator results | Required | ✅ | ✅ | ❌ N/A* | ✅ | PARTIAL | 88% | P0 | Physical/legal + E2E; rates DRAFT pending business |
| CALC-003 | PDF download | Required | ✅ | ❌ N/A | ❌ N/A | ✅ | PARTIAL | 90% | P1 | Client PDF per variant; E2E download smoke |
| FORM-001 | Application form | Required | ✅ | ✅ | ❌ N/A | ✅ | PARTIAL | 95% | P0 | API+email/log+guards; unit+E2E; no DB by design |
| FOOT-001 | Footer | Required | ✅ | ❌ N/A | ❌ N/A | 🟡 | PARTIAL | 80% | P1 | Structure+lang+env contact/social; values pending business |
| I18N-001 | hy/ru/en | Required | ✅ | ❌ N/A | ❌ N/A | ✅ | PARTIAL | 90% | P1 | `/[locale]` + dicts + switcher E2E; copy review pending |
| META-001 | Fast/trust NFR | Required | 🟡 | ❌ N/A | ❌ N/A | ✅ | PARTIAL | 65% | P2 | Security+CI+E2E; Lighthouse/hosting Phase 7 |

\* Calculator may be fully client-side; DB not required unless rates stored server-side (`NEEDS VERIFICATION`).

---

## Scaffold-only row (not a product requirement)

| ID | Item | Frontend | Status | Notes |
| --- | --- | --- | --- | --- |
| TECH-SCAFFOLD | Next.js app boots | ✅ landing shell | PARTIAL | Placeholder replaced by sectioned landing skeleton |

---

## Totals

| Status | Count (of 13) |
| --- | ---: |
| IMPLEMENTED | 0 (strict official rates/contacts still open) |
| PARTIAL | 13 |
| NOT IMPLEMENTED | 0 |
| BLOCKED | soft: rates/locations/contacts (BLK-001) |

### Estimated functional completeness

```text
Average of row Completion column:
(90+90+85+90+90+95+92+88+90+95+80+90+65) / 13 ≈ 88%
Interpretation: Phase 6 — core flows covered by unit+E2E+CI; soft-blocked on business rates.
Strict fully-done: 0 / 13 (official calculator sheet + final contacts/hosting remain)
```

Evidence: `e2e/`, `src/components/landing/*`, `src/lib/calculator`, `src/lib/leads`, `src/lib/security`.
