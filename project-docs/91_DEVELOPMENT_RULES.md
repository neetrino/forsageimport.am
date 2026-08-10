# 91 — Development Rules

1. Do not change architecture without documented reason in `03_ARCHITECTURE.md` + changelog.
2. Do not introduce NestJS/DB/Auth/Redis solely because template `.env.example` lists them.
3. Do not rename public APIs/routes without checking consumers (when APIs exist).
4. Do not modify DB schema without migration (when DB exists).
5. Do not delete fields/content keys before checking i18n usage.
6. Do not bypass validation on calculator or lead forms.
7. Do not hardcode secrets; use env names only.
8. Do not duplicate calculator formulas across UI components — keep pure functions in `src/lib`.
9. Reuse existing folder conventions: `src/app`, `src/components`, `src/lib`, `src/types`.
10. Prefer TypeScript strict typing; no `any`.
11. Named exports preferred (align new modules); update scaffold defaults when touching those files.
12. Every critical change requires verification (`pnpm lint`, `pnpm typecheck`, relevant tests).
13. Every completed requirement updates `11_FUNCTIONAL_STATUS_MATRIX.md` and `93_CHANGELOG.md`.
14. Preserve unrelated user changes; keep diffs scoped.
15. Do not commit or push unless explicitly requested by the user.
16. Do not invent endpoints in `23_API_CONTRACTS.md` before they exist in code.
17. Armenian is primary product language; keep `hy` default once i18n lands.
18. Treat DOCX + `project-docs` as product control plane; treat `docs/reference/**` as generic KB only.
