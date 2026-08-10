# 73 — Blockers

Audit date: 2026-08-10  
Only items that truly block the next delivery phase.

---

## BLK-001 — Missing calculator business rates/formulas

- **Why blocking:** CALC-002/003 cannot be correctly finished
- **Dependency:** Business/ops input (fee tables, customs rules, service fee rule)
- **Owner:** Product/business (spec lists Սուրեն as responsible contact)
- **Resolution:** Deliver rate sheet + example worked calculations
- **Meanwhile:** Build landing sections, form UI shell, i18n, calculator field UI without final numbers (feature-flag results accuracy)

## BLK-002 — FORM-001 scope ambiguity

- **Why blocking:** Cannot implement correct lead form fields/channel
- **Dependency:** Product owner decision
- **Resolution:** Document field list + destination (email/Telegram/CRM)
- **Meanwhile:** Implement CTAs as scroll to placeholder section; landing content; calculator

## BLK-003 — Missing contact & social content

- **Why blocking:** FOOT-001 content completion
- **Dependency:** Business content
- **Resolution:** Provide phone, email, address, maps link, social URLs
- **Meanwhile:** Footer structure with placeholders clearly marked

## BLK-004 — Design direction not chosen

- **Why blocking:** High-fidelity UI polish / brand motion
- **Dependency:** Stakeholder template selection
- **Resolution:** Choose among provided references or new Figma
- **Meanwhile:** Semantic HTML sections + temporary tokens; avoid pixel lock-in

---

Non-blockers: empty test suite, missing CI, unused template env — important but not stopping first UI slices.
