# 61 — Environment Variables

Audit date: 2026-08-10  
**Never store real secret values in documentation.**

Source of names: `.env.example` (template). Application code currently does **not** read these (`CONFIRMED` by absence of usage in `src/`).

| Variable | Used By | Required (today) | Purpose | Secret |
| --- | --- | --- | --- | --- |
| `LEAD_TO_EMAIL` | Lead API | No* | Inbox for new leads | No |
| `LEAD_RATE_LIMIT_MAX` | Lead API | No | Max leads per window | No |
| `LEAD_RATE_LIMIT_WINDOW_MS` | Lead API | No | Rate-limit window ms | No |
| `RESEND_API_KEY` | Lead API | No* | Resend API key | Yes |
| `RESEND_FROM_EMAIL` | Lead API | No* | From address | No |
| `NEXT_PUBLIC_CONTACT_PHONE` | Footer | No | Public phone | No |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Footer | No | Public email | No |
| `NEXT_PUBLIC_CONTACT_ADDRESS` | Footer | No | Public address | No |
| `NEXT_PUBLIC_SOCIAL_FACEBOOK` | Footer | No | Facebook URL | No |
| `NEXT_PUBLIC_SOCIAL_INSTAGRAM` | Footer | No | Instagram URL | No |
| `NEXT_PUBLIC_SOCIAL_TELEGRAM` | Footer | No | Telegram URL | No |
| `NODE_ENV` | Node/Next | No (framework default) | Environment mode | No |
| `APP_URL` | Template | No in code | Public app URL | No |
| `NEXT_PUBLIC_API_URL` | Template | No in code | Public API base | No |
| `DATABASE_URL` | Template | No | DB connection | Yes |
| `DATABASE_CONNECTION_LIMIT` | Template | No | Pool size | No |
| `DATABASE_POOL_TIMEOUT` | Template | No | Pool timeout | No |
| `JWT_SECRET` | Template | No | Auth signing | Yes |
| `JWT_EXPIRES_IN` | Template | No | Token TTL | No |
| `UPSTASH_REDIS_REST_URL` | Template | No | Redis REST | Yes |
| `UPSTASH_REDIS_REST_TOKEN` | Template | No | Redis auth | Yes |
| `RESEND_API_KEY` | Template | No | Email API | Yes |
| `RESEND_FROM_EMAIL` | Template | No | From address | No |
| `NEXT_PUBLIC_R2_PUBLIC_URL` | Brand assets / CSP / next/image / CI build | Yes (build + runtime) | Public R2/CDN base for WebP images | No |
| `R2_ACCOUNT_ID` | `pnpm assets:r2` | Upload only | R2 account | Yes |
| `R2_ACCESS_KEY_ID` | `pnpm assets:r2` | Upload only | R2 access key | Yes |
| `R2_SECRET_ACCESS_KEY` | `pnpm assets:r2` | Upload only | R2 secret | Yes |
| `R2_BUCKET_NAME` | `pnpm assets:r2` | Upload only | Bucket name | No |
| `R2_PUBLIC_URL` | `pnpm assets:r2` fallback | Upload only | Same public base as NEXT_PUBLIC | No |
| `FIGMA_ACCESS_TOKEN` | Template/MCP | No in app | Design tooling | Yes |

---

## MVP guidance

For DOCX-only landing + client calculator, **most variables are unnecessary**.

Likely first real secrets (if lead email added):

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- maybe `LEAD_TO_EMAIL` (not in example yet — add when implementing)

Update this table when code starts reading env vars.
