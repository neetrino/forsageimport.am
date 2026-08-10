# 04 — Tech Stack and Tools

Audit date: 2026-08-10  
Rule: versions only when confirmed from package/config.

| Technology | Version | Purpose | Location | Critical |
| --- | --- | --- | --- | --- |
| Node.js | `>=22` (engines) | Runtime | `package.json` engines | Yes |
| pnpm | `10.33.0` | Package manager | `package.json` packageManager | Yes |
| Next.js | `16.3.0` | Fullstack framework / SSR | `package.json` | Yes |
| React | `19.2.8` | UI | `package.json` | Yes |
| React DOM | `19.2.8` | UI rendering | `package.json` | Yes |
| TypeScript | `^5` | Language | `package.json` / `tsconfig.json` | Yes |
| Tailwind CSS | `^4` | Styling | `package.json`, `globals.css` | Yes |
| `@tailwindcss/postcss` | `^4` | PostCSS integration | `package.json` | Yes |
| ESLint | `^9` | Lint | `package.json`, `eslint.config.mjs` | No |
| `eslint-config-next` | `16.3.0` | Next lint rules | `package.json` | No |
| Prettier | present via `prettier.config.cjs` | Format | root config | No |
| Turbopack | via Next scripts | Dev/build bundler | `package.json` scripts | Yes |
| Geist / Geist Mono | next/font Google | Typography | `layout.tsx` | No |
| Vitest | `^4.1.10` | Unit tests | `package.json`, `src/lib/**/__tests__` | Yes |
| Playwright | `^1.62.1` | E2E smoke | `package.json`, `e2e/`, `playwright.config.ts` | Yes |
| jspdf | `^4.2.1` | Calculator PDF export | `package.json`, calculator download | Yes |
| Resend | via env + API route | Lead email delivery | `src/lib/leads`, `.env.example` | Optional |

---

## Not present in application (despite template env)

| Technology | Purpose if used | Status |
| --- | --- | --- |
| Prisma / Drizzle / SQL DB | Persistence | `NOT FOUND` |
| Auth.js / Clerk / JWT app logic | Authentication | `NOT FOUND` in code |
| Upstash Redis | Cache/rate limit | `NOT FOUND` in code (in-process rate limit used) |
| Cloudflare R2 | File storage | `NOT FOUND` in code |
| Stripe / local payment gateways | Payments | `NOT FOUND` (payment docs under `docs/reference` are template KB only) |
| Docker | Containers | `NOT FOUND` |
| i18n library (`next-intl`, etc.) | Localization | Custom dictionaries (`src/lib/i18n`) — no next-intl |

---

## Build / quality scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `next dev --turbopack` | Local development |
| `build` | `next build --turbopack` | Production build |
| `start` | `next start` | Run production server |
| `lint` | `eslint` | Lint |
| `typecheck` | `tsc --noEmit` | Typecheck |
| `test` | `vitest run` | Unit tests |
| `test:e2e` | `pnpm build && playwright test` | E2E smoke |
| `qa:smoke` | `node scripts/qa-smoke.mjs` | Full automated QA gate |
| `audit:deps` | `pnpm audit --audit-level=high` | Dependency audit |

---

## Cloud / deployment tools

| Tool | Status |
| --- | --- |
| Vercel | Common for this template; **not confirmed** configured for this product |
| GitHub Actions workflows | `.github/workflows/ci.yml` (lint/typecheck/unit/audit/build/e2e) |
| Dependabot | `.github/dependabot.yml` present (template) |

---

## Notes

- Exact resolved minor versions for caret ranges live in `pnpm-lock.yaml` if needed for deep audits.
- Do not treat `docs/reference/payment integration/**` as Forsage product scope — it is template knowledge base.
