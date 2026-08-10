# 82 — Priority Matrix

## Scale

| Priority | Meaning |
| --- | --- |
| P0 | Project-breaking / incorrect money / scope blockers |
| P1 | Core functional delivery |
| P2 | Important polish |
| P3 | Improvement |

## Ordering principle

1. Security (when surface exists)  
2. Data integrity (calculator correctness)  
3. Architecture blockers (avoid wrong stack)  
4. Core functional  
5. Tests  
6. UX polish  
7. Optimization  

---

## P0

- ISS-001 product not built
- ISS-002 FORM-001 ambiguity
- ISS-003 missing formulas
- CALC-001, CALC-002
- FORM-001 (after decision)
- Secret hygiene if any real env appears

## P1

- LAND-001..004, CTA-001, FOOT-001, I18N-001, CALC-003
- Contact content pack
- Design direction
- CI pipeline
- Calculator unit tests
- Hosting/domain

## P2

- LAND-005
- META-001 polish / Lighthouse
- BRIEF/TECH_CARD alignment
- README productization

## P3

- Font stack cleanup (ISS-008)
- Remove unused template SVGs
- Named export convention cleanup
- Dark mode decision

---

## Explicit non-priorities (unless scope change)

- Auth/RBAC
- Prisma/DB
- Payment gateways
- Live Copart/IAAI API integration
- Admin CMS
