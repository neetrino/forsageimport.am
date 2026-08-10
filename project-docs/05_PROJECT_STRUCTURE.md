# 05 — Project Structure

Audit date: 2026-08-10

---

## Root tree (product-relevant)

```text
d:\Forsage
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── favicon.ico
│   ├── components/          # empty (.gitkeep)
│   ├── lib/                 # empty (.gitkeep)
│   └── types/               # empty (.gitkeep)
├── public/                  # default Next SVGs
├── project-docs/            # THIS documentation system
├── docs/                    # template product docs + reference KB
├── .agents/                 # agent skills/system (template)
├── .cursor/                 # cursor rules (mostly empty presently)
├── .github/                 # PR/issue templates, dependabot
├── scripts/                 # template validation scripts
├── package.json
├── next.config.ts
├── tsconfig.json
├── .env.example
└── AGENTS.md
```

---

## Directory responsibilities

### `src/app`

- **Purpose:** Routes, layouts, metadata, global styles.
- **Responsibilities:** App Router entry; currently only `/`.
- **Dependencies:** React, Next, fonts, CSS.
- **Do not:** Dump business calculator formulas here long-term — prefer `src/lib`.
- **Important files:** `layout.tsx`, `page.tsx`, `globals.css`.

### `src/components`

- **Purpose:** Reusable UI sections/components.
- **Current:** Empty placeholder.
- **Do not:** Put one-off page orchestration without structure once sections exist; prefer section components for landing blocks.
- **Expected (MVP):** `Hero`, `About`, `Services`, `HowItWorks`, `Calculator`, `WhyUs`, `ApplicationForm?`, `Footer`, shared UI.

### `src/lib`

- **Purpose:** Pure business logic, i18n helpers, PDF helpers, env accessors.
- **Current:** Empty.
- **Do not:** React components here.
- **Expected (MVP):** `calculator/*`, `validation/*`, optional `email/*`.

### `src/types`

- **Purpose:** Shared TypeScript types.
- **Current:** Empty.
- **Expected:** Calculator input/output types, locale types.

### `public`

- **Purpose:** Static assets.
- **Current:** Default Next template SVGs — not Forsage brand assets.
- **Do not:** Secrets.

### `project-docs`

- **Purpose:** Engineering control center for Forsage product.
- **Do not:** Duplicate entire template KB from `docs/reference`.

### `docs`

- **Purpose:** Template product docs (`BRIEF.md` unfilled) + large reference knowledge base.
- **Note:** Not Forsage-specific implementation docs; prefer `project-docs` for product truth.

### `.agents` / `AGENTS.md`

- **Purpose:** Cursor agent governance for the template repo.
- **Do not:** Confuse agent-system architecture with Forsage product architecture.

### `.github`

- **Purpose:** Issue/PR templates, Dependabot.
- **Missing:** CI workflow files for build/lint.

### `scripts`

- **Purpose:** Template tooling (e.g. agent config validation).
- **Not:** Product business scripts.

---

## Important config files

| File | Role |
| --- | --- |
| `package.json` | Scripts and dependencies |
| `next.config.ts` | Next config (`agentRules: false`) |
| `tsconfig.json` | TS config |
| `eslint.config.mjs` | Lint |
| `prettier.config.cjs` | Format |
| `.env.example` | Env names (template-oriented) |
| `pnpm-workspace.yaml` | Workspace marker (single package app) |

---

## Structural constraints

- Preserve Size A layout unless TECH_CARD explicitly upgrades to B/C.
- Do not create `apps/` monorepo without decision.
- Do not delete `project-docs` or merge into a single mega-doc.
