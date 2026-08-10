# 70 — Known Issues

Audit date: 2026-08-10  
Only confirmed or high-confidence items.

---

## ISS-001 — Product UI not started

- **Severity:** P0
- **Affected:** All LAND/CALC/FORM/I18N/FOOT
- **Symptoms:** Home shows scaffold message, not Forsage landing
- **Root cause:** Repo is template scaffold; feature work not begun
- **Evidence:** `src/app/page.tsx`
- **Impact:** Spec unmet; cannot demo product
- **Recommended fix:** Implement per `80_IMPLEMENTATION_ROADMAP.md`

## ISS-002 — Spec internal ambiguity for application form

- **Severity:** P0 (scope)
- **Affected:** FORM-001, CTA-001
- **Symptoms:** Section list separates հայտ vs հաշվիչ; §7 body is calculator fields
- **Root cause:** Spec inconsistency / incomplete lead fields
- **Evidence:** `_sources/Landing-Forsage-code.spec.txt`
- **Impact:** Engineers may build wrong form
- **Recommended fix:** Product owner decision recorded in `02_SOURCE_OF_TRUTH.md` + update requirements

## ISS-003 — Calculator formulas missing

- **Severity:** P0
- **Affected:** CALC-001..003
- **Symptoms:** Cannot produce correct AMD/USD customs/service totals
- **Root cause:** DOCX lists fields/outputs without rates
- **Evidence:** spec §5–§7
- **Impact:** Calculator blocked for accurate delivery
- **Recommended fix:** Obtain fee tables from business (Suren / ops)

## ISS-004 — Default locale English

- **Severity:** P1
- **Affected:** I18N-001
- **Symptoms:** `html lang="en"`, English placeholder
- **Evidence:** `src/app/layout.tsx`
- **Impact:** Wrong primary language vs spec
- **Recommended fix:** Default `hy` when implementing i18n

## ISS-005 — Conflicting project name in DOCX Info

- **Severity:** P2
- **Affected:** Branding/meta
- **Symptoms:** Info line «դոկ տուռ - Doctour» vs Forsage body
- **Evidence:** spec Info section
- **Impact:** Confusion in docs/comms
- **Recommended fix:** Confirm Forsage Import; ignore Doctour as erroneous

## ISS-006 — Contact/social content absent

- **Severity:** P1
- **Affected:** FOOT-001
- **Symptoms:** Cannot finish footer with real data
- **Evidence:** DOCX requires contacts but provides none
- **Impact:** Incomplete footer
- **Recommended fix:** Collect phone, email, address, social URLs

## ISS-007 — Design not selected

- **Severity:** P1
- **Affected:** META-001, all UI
- **Symptoms:** Three template links; none chosen
- **Evidence:** DOCX Info
- **Impact:** Visual thrash / rework
- **Recommended fix:** Stakeholder pick direction before pixel-perfect polish

## ISS-008 — CSS font inconsistency

- **Severity:** P3
- **Affected:** META-001 typography
- **Symptoms:** Geist variables set, body forces Arial/Helvetica
- **Evidence:** `globals.css` `font-family`
- **Impact:** Inconsistent type rendering
- **Recommended fix:** Use design tokens / intended font stack when branding lands
