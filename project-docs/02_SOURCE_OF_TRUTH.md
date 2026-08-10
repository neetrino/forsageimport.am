# 02 — Source of Truth

Audit date: 2026-08-10

---

## Priority order

1. Official requirement/specification file (DOCX)
2. Real application code (`src/**`)
3. Database schema / migrations — **none present**
4. API definitions / DTO / validation — **none present**
5. Environment/configuration (`.env.example`, `next.config.ts`, `package.json`)
6. Existing documentation (`docs/`, `README.md`, `AGENTS.md`)
7. Tests — **none present**
8. Deployment/CI configs — **minimal / template**
9. Git history (supporting evidence)

**Rule:** A feature is `IMPLEMENTED` only if confirmed in code. Spec text alone is never enough.

---

## Provided specification

| Item | Value |
| --- | --- |
| Original file | `c:\Users\ROG\Downloads\Telegram Desktop\Landing - Forsage - code.docx` |
| Extracted text | `project-docs/_sources/Landing-Forsage-code.spec.txt` |
| Title in doc | Tech Spec / Functional Specification — Forsage Import վեբ կայք |
| Authority | **Primary business requirements source** for product scope |

---

## Sources studied

| Source | Result |
| --- | --- |
| DOCX / extracted spec | Landing sections, calculator fields/results/PDF, footer, i18n |
| `src/app/page.tsx`, `layout.tsx`, `globals.css` | Scaffold placeholder UI only |
| `src/components`, `src/lib`, `src/types` | Empty (`.gitkeep` only) |
| `package.json` | Next 16.3.0, React 19.2.8, Tailwind 4, pnpm 10.33.0 |
| `.env.example` | Template env for DB/JWT/Redis/email/R2/Figma |
| `docs/BRIEF.md` | Unfilled template |
| `docs/TECH_CARD.md` | `NOT FOUND` |
| `docs/01-ARCHITECTURE.md` | `NOT FOUND` |
| Prisma / Docker / workflows | `NOT FOUND` |
| Git commits | `Initial commit`, `start` on `dev-Mno` |

---

## Authoritative documents

| Topic | Authoritative source |
| --- | --- |
| Product features | DOCX spec (+ `_sources` extract) |
| What is implemented | Application code under `src/` |
| Stack versions | `package.json` / lockfile |
| Agent/system process | `AGENTS.md`, `.agents/**` (template governance — not product) |
| Env variable *names* currently expected by template | `.env.example` |

---

## Conflict resolution rule

```text
If DOCX and code disagree:
  → Document in Conflicts table below
  → Do NOT silently "implement" missing features in docs as done
  → Prefer code for "current reality"
  → Prefer DOCX for "required product behavior" until product owner changes scope
If DOCX internal sections disagree:
  → Mark NEEDS VERIFICATION / decision required
  → Do not invent a merged behavior
```

---

## Conflicts found

| Requirement | Code Reality | Impact | Required Decision |
| --- | --- | --- | --- |
| Full landing + calculator + i18n | Only Next.js placeholder home | Product not started | Proceed with MVP build per roadmap |
| Spec Info name «Doctour» | Repo/package/metadata = Forsage | Branding confusion | Confirm legal/product name is Forsage Import |
| Section list has separate «Հայտի ձև» and «Հաշվիչ» | §7 body describes calculator fields, not lead fields (name/phone/etc.) | Unclear lead-capture UX | Decide: separate lead form vs calculator-only + footer contact |
| Overview: «կապ հաստատել կամ լրացնել պատվերի հայտ» | No contact form fields in §7; footer has contacts | Lead pipeline undefined | Define fields, delivery channel (email/Telegram/CRM) |
| Template `.env.example` has DB/JWT/Redis | Spec is marketing landing; no auth/DB in DOCX | Over-engineering risk | Confirm MVP stack: static/SSR landing ± email only |
| `docs/BRIEF.md` empty template | Spec is external DOCX | Onboarding docs stale | Fill BRIEF from DOCX or point to `project-docs` |
| `lang="en"` in `layout.tsx` | Spec: Armenian primary | Wrong default locale | Set default `hy` when i18n lands |
| Default export in `page.tsx` | Team rule prefers named exports | Convention debt | Align when rewriting page |

---

## Needs verification

| Item | Why |
| --- | --- |
| Exact calculator formulas (fees, customs legal vs physical) | Spec lists fields/outputs, not formulas/rates |
| Auction location list | Spec says dropdown of auction locations — no list provided |
| Service fee: fixed USD vs percent | Spec allows both |
| Currency display rules (USD vs AMD) | Mixed in field table |
| PDF contents/layout branding | Only «Ներբեռնել» mentioned |
| Contact details (phone, address, email, social URLs) | Required in footer; values not in DOCX |
| Final visual design | Templates suggested; none selected |
| Hosting target (Vercel assumed by template, not stated in DOCX) | `NEEDS VERIFICATION` |
| Whether lead form submissions must be stored in DB | `NOT FOUND` in spec |
