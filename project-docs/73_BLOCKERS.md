# 73 — Blockers

Audit date: 2026-08-10  
Only items that truly block the next delivery phase.

---

## BLK-001 — Official calculator rates not confirmed

- **Why blocking:** Production-accurate totals / legal trust
- **Dependency:** Business/ops official fee + customs sheet + golden examples
- **Owner:** Product/business (Suren)
- **Resolution:** Replace DRAFT values in `src/lib/calculator/rates.ts` and update golden tests
- **Meanwhile:** Engine/UI/PDF work with `DRAFT_PENDING_BUSINESS` disclaimer (implemented)
- **Status:** Softened — feature works with draft rates; not cleared for “final invoice” claims

## BLK-002 — FORM-001 scope ambiguity

- **Status:** RESOLVED (2026-08-10)
- **Decision:** MVP fields = name + phone + optional message; channel = Resend email (`LEAD_TO_EMAIL`) with log fallback
- **Evidence:** `src/lib/leads/scope.ts`, `src/app/api/leads/route.ts`

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
