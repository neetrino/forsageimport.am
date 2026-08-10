# 81 — Next Steps

Executable order after Phase 6 (2026-08-10).

1. **Send content/rates request to business (Suren):** official calculator tables + ≥3 worked examples, auction location list, service fee + insurance rules, final phone/email/address/social URLs.
2. **Replace DRAFT rates** in `src/lib/calculator/rates.ts` once approved; expand golden unit fixtures; clear BLK-001.
3. **Fill FOOT-001 env values** (`NEXT_PUBLIC_*` contacts/social) and spot-check footer links.
4. **Manual mobile layout pass** for `52_QA_CHECKLIST.md` remaining items.
5. **Phase 7 — production readiness:** Lighthouse targets, image/font polish, hosting + domain + DNS (`60_DEPLOYMENT.md`).
6. **Configure Resend** (or keep log fallback) for production lead delivery; set `APP_URL` for origin checks.
7. **Update** status matrix / health / changelog when rates go official or hosting is live.

Do not: invent official customs/rate numbers; introduce NestJS/DB/JWT without an explicit scope decision.
