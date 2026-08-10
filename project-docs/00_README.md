# Forsage Import — Project Documentation

**Engineering control center** for the Forsage Import landing website.

Audit date: **2026-08-10**  
Documentation language: Armenian (technical terms in English)  
Codebase snapshot: Next.js 16 scaffold on branch `dev-Mno`

---

## Project in one sentence

Forsage Import-ի մեկ էջանոց landing կայք՝ ԱՄՆ աճուրդներից (Copart / IAAI) ավտոմեքենաների ընտրության, գնման և Հայաստան ներմուծման ծառայությունը ներկայացնելու, մոտավոր արժեք հաշվելու և կապ հաստատելու համար։

---

## Documentation purpose

Այս թղթապանակը թույլ է տալիս ցանկացած AI Agent կամ Senior Developer-ին՝

- հասկանալ business requirements-ը և architecture-ը,
- տեսնել ինչն է **իրականում** implemented,
- չկրկնել աշխատանքը և չփոխել architecture-ը առանց պատճառի,
- հետևել acceptance criteria-ին և հաջորդ քայլերին։

**Status labels (anti-hallucination):** `CONFIRMED` · `PARTIALLY CONFIRMED` · `NOT IMPLEMENTED` · `NOT FOUND` · `NEEDS VERIFICATION` · `BLOCKED` · `UNKNOWN`

---

## Current status summary

| Area | Status |
| --- | --- |
| Spec source | `CONFIRMED` — DOCX → `_sources/Landing-Forsage-code.spec.txt` |
| Product code | Scaffold only (`src/app/page.tsx` placeholder) |
| Landing sections | `NOT IMPLEMENTED` |
| Calculator + PDF | `NOT IMPLEMENTED` |
| i18n (hy/ru/en) | `NOT IMPLEMENTED` |
| Backend / DB / Auth | `NOT FOUND` in application code |
| Tests | `NOT FOUND` |
| Production readiness | **Not ready** |

Estimated functional completeness (from status matrix): **~0%** of specified product features (scaffold ≠ product).

---

## Recommended reading order

1. `00_README.md` (այս ֆայլը)
2. `01_PROJECT_OVERVIEW.md`
3. `02_SOURCE_OF_TRUTH.md`
4. `10_FUNCTIONAL_REQUIREMENTS.md`
5. `11_FUNCTIONAL_STATUS_MATRIX.md`
6. `03_ARCHITECTURE.md` + `05_PROJECT_STRUCTURE.md`
7. `15_FUNCTIONAL_GAPS.md` + `70_KNOWN_ISSUES.md`
8. `80_IMPLEMENTATION_ROADMAP.md` + `81_NEXT_STEPS.md`
9. `92_AI_AGENT_RULES.md` — նախքան կոդ գրելը

---

## File index

### Foundation

| File | Purpose |
| --- | --- |
| `00_README.md` | Index, navigation, status snapshot |
| `01_PROJECT_OVERVIEW.md` | Business goal, users, scope |
| `02_SOURCE_OF_TRUTH.md` | Spec vs code priority, conflicts |
| `03_ARCHITECTURE.md` | Real architecture (current + target for MVP) |
| `04_TECH_STACK_AND_TOOLS.md` | Versions and tools with evidence |
| `05_PROJECT_STRUCTURE.md` | Folders, responsibilities |

### Functional system

| File | Purpose |
| --- | --- |
| `10_FUNCTIONAL_REQUIREMENTS.md` | All requirements with IDs |
| `11_FUNCTIONAL_STATUS_MATRIX.md` | Implementation matrix |
| `12_IMPLEMENTED_FUNCTIONALITY.md` | Confirmed implemented only |
| `13_PARTIALLY_IMPLEMENTED.md` | Incomplete items |
| `14_NOT_IMPLEMENTED.md` | Spec present, code absent |
| `15_FUNCTIONAL_GAPS.md` | Gap analysis by severity |

### Technical layers

| File | Purpose |
| --- | --- |
| `20_FRONTEND.md` | Pages, UI, state, i18n |
| `21_BACKEND.md` | API/modules (current: none) |
| `22_DATABASE.md` | Schema (current: none) |
| `23_API_CONTRACTS.md` | Real endpoints only |
| `24_AUTH_AND_PERMISSIONS.md` | Auth (not in product scope yet) |
| `25_INTEGRATIONS.md` | Email, storage, payments, etc. |

### Business

| File | Purpose |
| --- | --- |
| `30_BUSINESS_LOGIC.md` | Calculator rules, workflows |
| `31_USER_ROLES_AND_FLOWS.md` | Visitor flows |
| `32_DATA_FLOWS.md` | Data movement |
| `33_VALIDATION_RULES.md` | Form/calc validation |

### Quality & risk

| File | Purpose |
| --- | --- |
| `40_SECURITY.md` | Security audit |
| `41_ERROR_HANDLING.md` | Error strategy |
| `42_PERFORMANCE.md` | Perf risks |
| `43_DATA_INTEGRITY.md` | Integrity risks |
| `50_TESTING_STRATEGY.md` | Test plan |
| `51_ACCEPTANCE_CRITERIA.md` | Testable AC per requirement |
| `52_QA_CHECKLIST.md` | Executable QA list |
| `53_EDGE_CASES.md` | Project-specific edge cases |

### Ops

| File | Purpose |
| --- | --- |
| `60_DEPLOYMENT.md` | Deploy lifecycle |
| `61_ENVIRONMENT_VARIABLES.md` | Env names only |
| `62_DEVOPS_AND_INFRASTRUCTURE.md` | CI/CD, hosting |
| `63_BACKUP_AND_RECOVERY.md` | Backup needs |

### Delivery control

| File | Purpose |
| --- | --- |
| `70_KNOWN_ISSUES.md` | Confirmed issues |
| `71_TECHNICAL_DEBT.md` | Debt register |
| `72_PROJECT_RISKS.md` | Risk register |
| `73_BLOCKERS.md` | Active blockers |
| `80_IMPLEMENTATION_ROADMAP.md` | Phased plan |
| `81_NEXT_STEPS.md` | Next 10–20 concrete steps |
| `82_PRIORITY_MATRIX.md` | P0–P3 |
| `83_DEPENDENCY_MAP.md` | Feature dependencies |

### Governance

| File | Purpose |
| --- | --- |
| `90_DEFINITION_OF_DONE.md` | When a feature is DONE |
| `91_DEVELOPMENT_RULES.md` | Human/dev rules |
| `92_AI_AGENT_RULES.md` | Cursor agent operational rules |
| `93_CHANGELOG.md` | Meaningful changes log |
| `94_PROJECT_HEALTH.md` | Executive scores |

### Sources

| Path | Purpose |
| --- | --- |
| `_sources/Landing-Forsage-code.spec.txt` | Extracted text from official DOCX |

---

## Navigation shortcuts

- **What to build?** → `10_FUNCTIONAL_REQUIREMENTS.md`
- **What exists?** → `11_FUNCTIONAL_STATUS_MATRIX.md`
- **What next?** → `81_NEXT_STEPS.md`
- **Do not break?** → `03_ARCHITECTURE.md` + `91_DEVELOPMENT_RULES.md`
- **Spec conflicts?** → `02_SOURCE_OF_TRUTH.md`
