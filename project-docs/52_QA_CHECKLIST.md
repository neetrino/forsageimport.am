# 52 — QA Checklist

Executable checklist. Automated items are covered by `pnpm qa:smoke` / CI unless noted.

Last automated run: 2026-08-10 (Phase 6) — Playwright 6/6 passed locally with `CI=true`.

## Environment

- [x] `pnpm install` succeeds
- [x] `pnpm dev` serves `/`
- [x] `pnpm lint` passes
- [x] `pnpm typecheck` passes
- [x] `pnpm build` succeeds
- [x] `pnpm test` (unit) passes
- [x] `pnpm exec playwright test` (E2E) passes
- [x] `pnpm audit:deps` (high+) passes

## Scaffold (current baseline)

- [x] Home page loads without runtime error
- [x] Title metadata contains Forsage

## Landing sections

- [x] Hero visual + slogan visible (E2E)
- [x] CTA to calculator works (E2E)
- [x] CTA to application works (E2E)
- [x] About has 3–5 paragraphs (5 body + eyebrow; E2E)
- [x] Services cover auction/VIN/transport/customs themes (code review)
- [x] How it works shows 6 steps in order (E2E count)
- [x] Why choose us shows 3–4 advantages (E2E count)
- [x] Footer shows contacts (structure; values via env)
- [ ] Footer social links open correct URLs — **manual** when business URLs final
- [ ] Mobile layout OK for all sections — **manual** spot-check

## Calculator

- [x] All required fields present
- [x] Copart / IAAI selectable
- [x] Invalid/empty submit blocked (E2E)
- [x] Valid submit shows results on same page (E2E)
- [x] Line items match CALC-002 list (unit + UI)
- [x] Legal vs physical customs both shown (E2E)
- [x] Final totals shown per variant (E2E)
- [x] Changing inputs invalidates or updates results correctly (unit/UI behavior)
- [x] Insurance checkbox affects insurance line (engine unit)
- [x] Double-click «Հաշվել» does not duplicate broken UI state (idempotent setState)

## PDF

- [x] Download works per variant (E2E)
- [x] PDF contains key amounts (jspdf builder; smoke via download event)
- [ ] Failure path shows error (if forced fail in staging) — **deferred**

## Application / lead

- [x] Form fields match approved scope
- [x] Valid submit succeeds (E2E; log/email delivery)
- [x] Invalid submit rejected (E2E + unit)
- [x] Success/error messages clear

## i18n

- [x] Default language Armenian (E2E)
- [x] Switch to Russian works (E2E)
- [x] Switch to English works (E2E)
- [x] Calculator labels translated (E2E headings)
- [ ] Validation messages translated — **spot-check** ru/en (hy covered in E2E)

## Security / abuse

- [x] Lead endpoint rejects invalid payloads (E2E 415 + unit)
- [x] Rapid repeated submits limited/handled (unit rate-limit)
- [x] No secrets in client bundle (env audit pattern; no secret prefixes in NEXT_PUBLIC)

## Regression

- [x] Placeholder scaffold text removed
- [x] No broken empty sections
- [ ] Favicon/brand assets correct — **manual** before launch
