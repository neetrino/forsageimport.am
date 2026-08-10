# 52 — QA Checklist

Executable checklist. Mark items during test runs.

## Environment

- [ ] `pnpm install` succeeds
- [ ] `pnpm dev` serves `/`
- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds

## Scaffold (current baseline)

- [ ] Home page loads without runtime error
- [ ] Title metadata contains Forsage

## Landing sections (after implementation)

- [ ] Hero visual + slogan visible
- [ ] CTA to calculator works
- [ ] CTA to application works
- [ ] About has 3–5 paragraphs
- [ ] Services cover auction/VIN/transport/customs themes
- [ ] How it works shows 6 steps in order
- [ ] Why choose us shows 3–4 advantages
- [ ] Footer shows contacts
- [ ] Footer social links open correct URLs
- [ ] Mobile layout OK for all sections

## Calculator

- [ ] All required fields present
- [ ] Copart / IAAI selectable
- [ ] Invalid/empty submit blocked
- [ ] Valid submit shows results on same page
- [ ] Line items match CALC-002 list
- [ ] Legal vs physical customs both shown
- [ ] Final totals shown per variant
- [ ] Changing inputs invalidates or updates results correctly
- [ ] Insurance checkbox affects insurance line
- [ ] Double-click «Հաշվել» does not duplicate broken UI state

## PDF

- [ ] Download works per variant
- [ ] PDF contains key amounts
- [ ] Failure path shows error (if forced fail in staging)

## Application / lead

- [ ] Form fields match approved scope
- [ ] Valid submit succeeds
- [ ] Invalid submit rejected
- [ ] Success/error messages clear

## i18n

- [ ] Default language Armenian
- [ ] Switch to Russian works
- [ ] Switch to English works
- [ ] Calculator labels translated
- [ ] Validation messages translated

## Security / abuse (when API exists)

- [ ] Lead endpoint rejects invalid payloads
- [ ] Rapid repeated submits limited/handled
- [ ] No secrets in client bundle

## Regression

- [ ] Placeholder scaffold text removed
- [ ] No broken empty sections
- [ ] Favicon/brand assets correct
