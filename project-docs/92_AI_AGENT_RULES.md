# 92 — AI Agent Rules

Operational instructions for Cursor agents working on Forsage Import.

---

## Before coding

1. Read `/project-docs/00_README.md`
2. Identify requirement ID(s) from `/project-docs/10_FUNCTIONAL_REQUIREMENTS.md`
3. Check status in `/project-docs/11_FUNCTIONAL_STATUS_MATRIX.md`
4. Read `/project-docs/03_ARCHITECTURE.md` (do not invent backend/DB)
5. Check `/project-docs/83_DEPENDENCY_MAP.md` and `/project-docs/73_BLOCKERS.md`
6. Inspect existing code under `src/` (it may still be scaffold)
7. Read `/project-docs/70_KNOWN_ISSUES.md` and `/project-docs/72_PROJECT_RISKS.md`
8. If calculator work: confirm rate tables exist; if not, do not fabricate formulas

---

## During coding

- Preserve Size A Next.js architecture unless an approved TECH_CARD says otherwise
- Prefer existing patterns and folders
- Avoid duplicate calculator logic
- Do not silently change contracts
- Do not bypass validation
- Do not introduce unrelated refactors
- Do not mark features implemented in docs without code evidence
- Do not copy secret values into markdown
- Ignore payment reference docs unless task is explicitly payments (out of Forsage DOCX scope)
- Reply in the user’s language; keep code/identifiers in English

---

## After coding

1. Run relevant checks: at least `pnpm lint` and `pnpm typecheck` when TS/UI changed; `pnpm build` for release-risk changes
2. Verify acceptance criteria for touched IDs (`51_ACCEPTANCE_CRITERIA.md`)
3. Update:
   - `11_FUNCTIONAL_STATUS_MATRIX.md`
   - `12` / `13` / `14` as status changes
   - `15_FUNCTIONAL_GAPS.md` if gaps closed
   - `80` / `81` if plan changes
   - `93_CHANGELOG.md`
   - `94_PROJECT_HEALTH.md` after meaningful milestones
4. List remaining gaps honestly with status labels

---

## Anti-hallucination labels

Use: `CONFIRMED` · `PARTIALLY CONFIRMED` · `NOT IMPLEMENTED` · `NOT FOUND` · `NEEDS VERIFICATION` · `BLOCKED` · `UNKNOWN`

---

## Hard prohibitions for this task type

- No production deploy
- No destructive git
- No mass dependency upgrades without ask
- No “fixing” missing calculator math with guessed Armenian customs rates
