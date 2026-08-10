# 93 — Changelog

Documentation system established 2026-08-10. Record meaningful product/implementation changes below.

---

## 2026-08-10 (Phase 6) — Testing & QA

### Added

- Playwright E2E smoke: landing, calculator (+ PDF), lead form, i18n (`e2e/`)
- `playwright.config.ts` (dedicated port **3100**, `next start` webServer)
- `pnpm test:e2e`, `pnpm test:e2e:ui`, `pnpm qa:smoke`
- CI steps: Playwright Chromium install + E2E after build

### Changed

- QA checklist and testing strategy updated to reflect automated coverage
- Roadmap Phase 6 marked DONE

---

## 2026-08-10 (Phase 5) — Security hardening

### Added

- Global security headers + HSTS (prod) via `next.config.ts`
- Lead request guards: origin, JSON content-type, 8KB body limit, fast-submit bot check
- Dual rate limits (IP + phone)
- `auditEnv` hygiene helper
- `pnpm audit:deps` + CI audit step
- Security unit tests

### Changed

- `.env.example` cleaned: unused JWT/DB/R2 vars commented as out-of-scope
- Lead error logging no longer echoes provider payloads

### Security

- Phase 5 controls documented in `40_SECURITY.md`

---

## 2026-08-10 (Phase 4) — Lead capture

### Added

- FORM-001 scope lock (`src/lib/leads/scope.ts`)
- `POST /api/leads` with validation, honeypot, IP rate limit
- Resend email delivery + development log fallback
- Application form UX: loading / success / error / rate-limit states
- Lead unit tests

### Changed

- FORM-001 marked resolved in blockers; API contracts updated

### Security

- Spam controls: honeypot + fixed-window rate limit (in-process; Upstash recommended for multi-instance)

---

## 2026-08-10 (Phase 3) — Calculator engine

### Added

- `src/lib/calculator/*` pure engine (validate, auction fee, customs, calculate)
- DRAFT rates module with explicit `DRAFT_PENDING_BUSINESS` status
- Results UI for physical/legal variants + disclaimer
- PDF download per variant (`jspdf`)
- Vitest unit tests + CI `pnpm test`
- Client validation wired to calculator form

### Changed

- Calculator form is controlled; insurance checkbox restored for CALC-002 insurance line
- Auction locations draft list added (replace when business provides official list)

### Documentation

- Phase 3 marked done with draft-rate caveat; blockers/status matrix updated

---

## 2026-08-10 (Calculator UI from reference)

### Changed

- Calculator form rebuilt to match provided UI reference layout
- Components: `MoneyField`, `NumberField`, `SelectField`, `AuctionPicker`, `CalculatorForm`
- Fields: price, engine type, auction (IAAI/Copart/Manheim), age+year, location, volume cm³, transport fee, vehicle type, red pill «Հաշվել»
- Removed from visible UI (not in reference): auction fee input, insurance checkbox

### Documentation

- Spec still lists fee/insurance as requirements — tracked as deferred until business confirms reference vs DOCX

---

## 2026-08-10 (Phase 2) — Core marketing sections

### Added

- Full-bleed `HeroVisual` + polished LAND-001/CTA-001
- Mobile navigation dialog (`MobileNav`)
- Footer contact/social structure via `getSiteContact()` + `NEXT_PUBLIC_*` slots
- Shared `ButtonLink`, section eyebrows, smooth scrolling

### Changed

- About/Services/Process/WhyUs visual hierarchy and copy depth (5 about paragraphs)
- Footer layout: brand / contacts / social / language

### Documentation

- Phase 2 marked DONE in roadmap; status matrix updated

---

## 2026-08-10 (later) — Phase 1 Foundation

### Added

- Locale routing `/hy`, `/ru`, `/en` with `src/proxy.ts` default redirect to `/hy`
- Typed dictionaries (`src/lib/i18n/**`) + `LocaleSwitcher` (hash-preserving)
- Design tokens module `src/lib/theme/tokens.ts` + layout shell (`SiteShell`, skip link)
- CI workflow `.github/workflows/ci.yml` (lint, typecheck, build)
- Multilingual font stack (Armenian + Latin/Cyrillic Noto)

### Changed

- Landing sections consume `Dictionary` props (no hardcoded hy-only module)
- Root layout is pass-through; `[locale]/layout` owns `html[lang]`

### Removed

- Template `public/*.svg` assets
- Legacy `src/app/page.tsx` and `src/lib/content/hy.ts`
- Deprecated `middleware.ts` (migrated to `proxy.ts` for Next.js 16)

### Documentation

- Status matrix / architecture notes updated for Phase 1

---

## 2026-08-10

### Added

- `/project-docs` engineering documentation system (full modular set `00`–`94`)
- Spec extract at `_sources/Landing-Forsage-code.spec.txt` from official DOCX
- Landing UI skeleton: header, hero, about, services, process, calculator shell, why-us, application shell, footer
- Armenian draft content module `src/lib/content/hy.ts`
- Brand tokens + Noto Armenian fonts; default `lang="hy"`

### Changed

- Replaced Next.js placeholder home with composed landing page

### Fixed

- N/A

### Removed

- Scaffold “Project scaffold is ready” home content

### Security

- N/A

### Documentation

- Initial audit of scaffold vs Forsage Import landing specification
- Requirement IDs LAND/CALC/FORM/FOOT/I18N/META/CTA established
- Conflicts, blockers, roadmap, and health baseline recorded
- Status matrix updated after landing skeleton slice
