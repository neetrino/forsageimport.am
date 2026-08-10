# 60 — Deployment

Audit date: 2026-08-10

---

## Confirmed local lifecycle

```text
pnpm install
pnpm dev          # next dev --turbopack
pnpm lint
pnpm typecheck
pnpm build        # next build --turbopack
pnpm start        # next start
```

Evidence: `package.json` scripts.

---

## Environments

| Env | Status |
| --- | --- |
| Local | Supported via scripts; `APP_URL` in `.env.example` |
| Development / Staging / Production hosting | `NOT FOUND` in repo (no vercel.json, no CI deploy) |

Likely target for this template family is Vercel — **not confirmed** for Forsage product.

---

## Migrations

N/A — no database.

---

## Deployment order (when hosting chosen)

1. Set env vars (see `61_ENVIRONMENT_VARIABLES.md`)
2. `pnpm build`
3. Deploy build output / platform build
4. Smoke test `/`
5. Verify forms/email if enabled

---

## Rollback

Platform-dependent (`UNKNOWN` until host chosen). Prefer previous deployment promote/rollback on Vercel if used.

---

## DNS / domain

Spec: company currently has no domain. Status: `NOT FOUND` in repo.
