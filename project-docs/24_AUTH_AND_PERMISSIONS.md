# 24 — Auth and Permissions

Audit date: 2026-08-10

---

## Product requirement

DOCX does **not** require login, roles, or admin panel. Site is public marketing content + calculator.

Status: Auth product scope = `NOT FOUND` in specification.

---

## Code reality

| Concern | Status |
| --- | --- |
| Login / logout | `NOT FOUND` |
| Sessions / cookies auth | `NOT FOUND` |
| JWT usage in code | `NOT FOUND` (only `.env.example` names) |
| OAuth | `NOT FOUND` |
| Password hashing | `NOT FOUND` |
| RBAC / guards | `NOT FOUND` |
| Frontend route protection | `NOT FOUND` |

---

## Permission matrix (public site)

| Action | Visitor (Guest) | Staff (not in product) |
| --- | --- | --- |
| View landing | Allow (intended) | N/A |
| Use calculator | Allow (intended) | N/A |
| Download PDF | Allow (intended) | N/A |
| Submit lead form | Allow (intended, if built) | N/A |
| Admin edit content | Not specified | Not specified |

---

## Authorization risks

| Risk | Notes |
| --- | --- |
| Future API without authz | If leads API added, protect against spam/abuse (rate limit), not “user roles” |
| Template JWT secret in `.env.example` | Placeholder string — must never be used in production if auth added |
| Frontend hide ≠ auth | N/A today |

---

## Recommendation

Do not implement Auth.js/JWT for MVP unless scope expands to CMS/cabinet.
