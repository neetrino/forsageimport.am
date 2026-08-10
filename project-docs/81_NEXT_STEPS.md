# 81 — Next Steps

Executable order for the next engineering cycle (2026-08-10).

1. **Confirm product name** is Forsage Import (ignore DOCX «Doctour» Info line) and record decision in `02_SOURCE_OF_TRUTH.md` Conflicts table as resolved when confirmed.
2. **Send content request to business (Suren):** phone, email, address, social URLs, auction location list, calculator rate tables with ≥3 worked examples, service fee rule (fixed vs %), insurance amount rule.
3. **Resolve FORM-001:** decide separate lead form fields vs calculator-only + contacts; write the decision into `10_FUNCTIONAL_REQUIREMENTS.md` and status matrix.
4. **Choose visual direction** from the three DOCX template links (or Figma) before polishing CSS.
5. **Implement i18n foundation** with default locale `hy` and stub dictionaries for `ru`/`en` in `src/lib/i18n` (or chosen library), update `layout.tsx` `lang`.
6. **Replace scaffold `page.tsx`** with composed section placeholders and anchor IDs for hero/about/services/process/calculator/why-us/apply/footer.
7. **Build LAND-001..004 + CTA-001** using real (or approved draft) Armenian copy first.
8. **Build FOOT-001 structure** with placeholders clearly labeled until contact pack arrives.
9. **Build CALC-001 form UI** wired to typed state + client validation matching `33_VALIDATION_RULES.md` (no fake final totals until rates arrive).
10. **Implement calculator engine** in `src/lib/calculator` from business tables; add unit tests with golden examples.
11. **Implement CALC-002 results panel** including legal vs physical variants.
12. **Implement CALC-003 PDF download** per variant with code-splitting.
13. **Implement FORM-001** per approved decision + delivery channel; add rate limiting if API route is used.
14. **Complete I18N-001** translations for all UI strings (hy/ru/en).
15. **Add GitHub Actions** workflow: `pnpm lint`, `pnpm typecheck`, `pnpm build`.
16. **Run `52_QA_CHECKLIST.md`** on desktop + mobile; fix blockers.
17. **Configure hosting + domain** when available; document URLs in `60_DEPLOYMENT.md`.
18. **Update** `11_FUNCTIONAL_STATUS_MATRIX.md`, `93_CHANGELOG.md`, and `94_PROJECT_HEALTH.md` after each merged feature slice.

Do not: introduce NestJS/DB/JWT “because `.env.example` has them” without an explicit scope decision.
