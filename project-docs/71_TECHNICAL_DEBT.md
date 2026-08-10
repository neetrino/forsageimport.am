# 71 — Technical Debt

Audit date: 2026-08-10

| ID | Item | Type | Evidence | Priority |
| --- | --- | --- | --- | --- |
| TD-001 | Empty `components`/`lib`/`types` placeholders | Structural | `.gitkeep` only | P3 |
| TD-002 | Default export in `page.tsx` | Convention | `page.tsx` | P3 |
| TD-003 | Unfilled `docs/BRIEF.md` vs external DOCX | Docs drift | `docs/BRIEF.md` | P2 |
| TD-004 | Missing TECH_CARD / architecture product docs | Process | files not found | P2 |
| TD-005 | Template `.env.example` overscoping DB/JWT/Redis | Config debt | `.env.example` | P2 |
| TD-006 | No CI workflow | Quality | no workflows | P1 |
| TD-007 | No automated tests | Quality | no test runner/deps | P1 |
| TD-008 | Template `public/*.svg` unused brand-wise | Dead assets | `public/` | P3 |
| TD-009 | Auto dark mode without brand decision | Design debt | `globals.css` | P3 |
| TD-010 | README still template onboarding | Docs | `README.md` | P2 |
| TD-011 | Large unrelated payment reference KB | Noise for agents | `docs/reference/payment integration` | P3 |

Bugs vs debt: ISS-* in `70_KNOWN_ISSUES.md` are delivery/spec issues; this file is maintainability/process debt.
