# 80 — Implementation Roadmap

Dependency-aware phases. Do not reshuffle P0 calculator accuracy after fake formulas.

---

## Phase 0 — Critical clarifications (parallel, immediate)

| ID | Requirement | Priority | Dependencies | Goal | Acceptance | Risk |
| --- | --- | --- | --- | --- | --- | --- |
| R0-1 | FORM-001 decision | P0 | Owner | Written field list + channel | Decision in `02` + `10` updated | Wrong form |
| R0-2 | CALC rate tables | P0 | Owner | Numeric rules + 3 golden examples | Document in `30`/`33` | Wrong money |
| R0-3 | Contacts/social | P1 | Owner | Footer content pack | FOOT content ready | Empty footer |
| R0-4 | Design direction | P1 | Owner | Chosen reference/Figma | Note in `02` | Rework |

---

## Phase 1 — Foundation

| ID | Goal | Affected | Priority | Status |
| --- | --- | --- | --- | --- |
| R1-1 | Design tokens + layout shell + section anchors | `globals.css`, `tokens.ts`, `SiteShell` | P1 | DONE (2026-08-10) |
| R1-2 | I18N-001 foundation (hy default, ru/en) | `src/lib/i18n`, `[locale]`, switcher | P1 | DONE (2026-08-10) |
| R1-3 | Trim template noise (placeholder copy) | removed scaffold/SVGs | P1 | DONE (2026-08-10) |
| R1-4 | CI lint/typecheck/build | `.github/workflows/ci.yml` | P2 | DONE (2026-08-10) |

---

## Phase 2 — Core marketing sections

| ID | Requirements | Priority | Status |
| --- | --- | --- | --- |
| R2-1 | LAND-001 + CTA-001 | P1 | DONE (2026-08-10) — hero visual plane + CTAs |
| R2-2 | LAND-002, LAND-003, LAND-004 | P1 | DONE (2026-08-10) — polished marketing sections |
| R2-3 | LAND-005 | P2 | DONE (2026-08-10) |
| R2-4 | FOOT-001 structure (+ content when ready) | P1 | DONE (2026-08-10) — structure + env-driven contact/social |

---

## Phase 3 — Core business calculator

| ID | Requirements | Priority | Status |
| --- | --- | --- | --- |
| R3-1 | CALC-001 UI + client validation | P0 | DONE (2026-08-10) |
| R3-2 | Calculator engine with rates module | P0 | DONE with DRAFT rates (`rates.ts` pending business confirm) |
| R3-3 | CALC-002 results UI | P0 | DONE — physical/legal variants |
| R3-4 | CALC-003 PDF | P1 | DONE — per-variant download via jspdf |
| R3-5 | Unit tests for engine | P0 | DONE — vitest golden tests |

---

## Phase 4 — Lead capture

| ID | Requirements | Priority | Status |
| --- | --- | --- | --- |
| R4-1 | FORM-001 UI | P0 | DONE (2026-08-10) — name/phone/message |
| R4-2 | Delivery channel integration | P0 | DONE — `POST /api/leads` + Resend (log fallback) |
| R4-3 | Spam protection if API | P1 | DONE — honeypot + IP rate limit |

FORM-001 scope lock: `src/lib/leads/scope.ts`

---

## Phase 5 — Security & hardening

| ID | Goal | Priority | Status |
| --- | --- | --- | --- |
| R5-1 | Headers, env hygiene, dependency audit | P1 | DONE (2026-08-10) |
| R5-2 | Lead abuse controls | P1 | DONE — origin/body/honeypot/timing/IP+phone limits |

---

## Phase 6 — Testing & QA

| ID | Goal | Priority | Status |
| --- | --- | --- | --- |
| R6-1 | E2E smoke for landing+calc+pdf+i18n | P1 | DONE (2026-08-10) — Playwright suite + CI |
| R6-2 | Execute `52_QA_CHECKLIST.md` | P1 | DONE — automated via `pnpm qa:smoke` (+ manual mobile spot-check remaining) |

---

## Phase 7 — Performance & production readiness

| ID | Goal | Priority |
| --- | --- | --- |
| R7-1 | Image/font optimization, Lighthouse pass targets (define targets with owner) | P2 |
| R7-2 | Hosting + domain + DNS | P1 |
| R7-3 | Update `94_PROJECT_HEALTH.md` + changelog | P1 |

---

## Out of roadmap unless scope changes

- Auth, CMS, DB, auction live APIs, payments
