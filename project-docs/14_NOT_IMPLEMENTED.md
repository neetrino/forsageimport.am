# 14 — Not Implemented

Audit date: 2026-08-10  
All items below exist in DOCX but have **no** matching product implementation in `src/`.

Complexity: relative for a Size A Next.js landing (team estimate bands only).

---

## LAND-001 — Hero banner

- **Expected:** Large visual, slogan, CTAs
- **Missing:** Component, assets, copy, slider (if chosen)
- **Dependencies:** Design, CTA-001 targets
- **Complexity:** MEDIUM
- **Order:** Phase 2 (after design tokens / layout shell)

## LAND-002 — About

- **Expected:** 3–5 paragraphs
- **Missing:** Section + i18n strings
- **Complexity:** LOW
- **Order:** After LAND-001 shell

## LAND-003 — Services

- **Expected:** Service list including auctions Copart/Manheim/IAAI, VIN, logistics, customs
- **Missing:** Section UI + content
- **Complexity:** LOW–MEDIUM
- **Order:** With other content sections

## LAND-004 — How it works

- **Expected:** 6 steps
- **Missing:** Steps UI
- **Complexity:** LOW
- **Order:** With content sections

## LAND-005 — Why choose us

- **Expected:** 3–4 advantages
- **Missing:** Section UI
- **Complexity:** LOW
- **Order:** After core content

## CTA-001 — CTAs

- **Expected:** «Հաշվել արժեքը», «Լրացնել հայտ»
- **Missing:** Buttons + scroll/navigation targets
- **Dependencies:** CALC-001, FORM-001 decision
- **Complexity:** LOW
- **Order:** With hero

## CALC-001 — Calculator inputs

- **Expected:** Full field set + «Հաշվել»
- **Missing:** Form UI, state, validation, rate/fee engine inputs
- **Dependencies:** Business formulas (`NEEDS VERIFICATION`)
- **Complexity:** HIGH
- **Order:** Phase 3 core (after shell)

## CALC-002 — Results

- **Expected:** Itemized + legal/physical customs variants + finals
- **Missing:** Results UI + computation outputs
- **Dependencies:** CALC-001 + formulas
- **Complexity:** HIGH
- **Order:** Immediately after CALC-001 engine

## CALC-003 — PDF download

- **Expected:** Download button per variant
- **Missing:** PDF generation + wiring
- **Dependencies:** CALC-002
- **Complexity:** MEDIUM–HIGH
- **Order:** After results stable

## FORM-001 — Application form

- **Expected:** Lead/application capture (exact fields ambiguous)
- **Missing:** Entire feature + delivery channel
- **Dependencies:** Product owner decision
- **Complexity:** MEDIUM (once scoped)
- **Order:** After decision; can parallelize late Phase 3

## FOOT-001 — Footer

- **Expected:** Contacts, social, languages
- **Missing:** Footer UI + real contact data
- **Dependencies:** Business contact info; I18N-001
- **Complexity:** LOW
- **Order:** Phase 2–3

## I18N-001 — Languages

- **Expected:** hy primary, ru, en
- **Missing:** i18n framework, dictionaries, switcher
- **Complexity:** MEDIUM
- **Order:** Early Phase 2 (before duplicating all copy)

---

## Implementation order (summary)

```text
1) Design tokens + page shell + I18N-001 foundation
2) LAND-001..005 + FOOT-001 + CTA-001
3) CALC-001 engine + UI → CALC-002 → CALC-003
4) FORM-001 after scope confirmation
5) META-001 verification (perf/a11y/content QA)
```
