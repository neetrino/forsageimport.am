# 15 — Functional Gaps

Audit date: 2026-08-10

| Requirement | Expected | Current Reality | Gap | Severity |
| --- | --- | --- | --- | --- |
| LAND-001 | Hero with visual + CTAs | Placeholder scaffold text | Full section missing | P1 High |
| LAND-002 | About 3–5 paragraphs | Absent | Full section missing | P1 High |
| LAND-003 | Services list | Absent | Full section missing | P1 High |
| LAND-004 | 6-step process | Absent | Full section missing | P1 High |
| LAND-005 | 3–4 advantages | Absent | Full section missing | P2 Medium |
| CTA-001 | Dual CTAs to calc/apply | Absent | No navigation affordances | P1 High |
| CALC-001 | Full calculator inputs | Absent | Core business tool missing | P0 Critical |
| CALC-002 | Results breakdown + variants | Absent | Core business tool missing | P0 Critical |
| CALC-003 | PDF per variant | Absent | Export missing | P1 High |
| FORM-001 | Application/lead form | Absent + ambiguous spec | Scope + implementation gap | P0 Critical |
| FOOT-001 | Contacts, social, langs | Absent; contact values not in DOCX | UI + content gap | P1 High |
| I18N-001 | hy/ru/en | `lang=en` only, no dictionaries | Full i18n missing | P1 High |
| META-001 | Fast trust-inspiring site | Generic scaffold | Brand/UX/perf gap | P2 Medium |
| Calculator formulas | Deterministic totals | Not specified numerically | Cannot finish CALC accurately | P0 Critical |
| Auction locations list | Dropdown options | Not provided | Blocks CALC-001 field | P1 High |
| Contact details | Footer data | Not in DOCX | Blocks FOOT-001 content | P1 High |
| Design template | Chosen visual direction | 3 links, none selected | Blocks polished UI | P1 High |
| Project name Info vs body | Forsage vs Doctour | Conflicting text in DOCX | Branding risk | P2 Medium |
| Template env DB/Auth | Implied by `.env.example` | Not in product DOCX | Scope creep risk | P2 Medium |

Severity key: P0 Critical · P1 High · P2 Medium · P3 Low
