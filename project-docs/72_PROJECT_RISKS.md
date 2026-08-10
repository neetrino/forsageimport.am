# 72 — Project Risks

Audit date: 2026-08-10

| Risk | Probability | Impact | Severity | Mitigation |
| --- | --- | --- | --- | --- |
| Deadline 15–20 days with 0% features | High | High | P0 | Immediate scope lock + daily delivery of sections |
| Calculator ships with wrong customs math | High | High | P0 | Block release of CALC until business tables + tests |
| Building Nest/DB/auth from template habit | Medium | High | P1 | Follow `03_ARCHITECTURE.md` MVP boundaries |
| FORM-001 wrong interpretation | High | Medium | P1 | Written decision before coding form |
| No design selection → rework | High | Medium | P1 | Pick template direction early |
| Missing contact data at launch | Medium | Medium | P1 | Collect content checklist from Suren |
| i18n bolted on late → string debt | Medium | Medium | P1 | i18n foundation before mass copy |
| Lead API spam if unprotected | Medium (later) | Medium | P1 | Rate limit + validation |
| Secret leakage via committed `.env` | Low | High | P0 | Keep gitignore; never commit secrets |
| Agents inventing fake APIs/DB | Medium | High | P1 | Enforce `92_AI_AGENT_RULES.md` |
| Doctour naming confusion | Low | Low | P3 | Confirm Forsage branding |
| No CI → broken main | Medium | Medium | P2 | Add lint/typecheck/build workflow |

Categories covered: incorrect business data, broken delivery, over-architecture, security (future), no payment scope.
