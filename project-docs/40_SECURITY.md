# 40 — Security

Audit date: 2026-08-10  
Scope: current scaffold + foreseeable MVP risks.

---

## Findings

### SEC-001 — No product attack surface yet beyond static page

- **Severity:** Info  
- **Location:** `src/app/page.tsx`  
- **Risk:** Low currently  
- **Exploit scenario:** N/A beyond typical static Next site  
- **Recommended fix:** Keep dependencies updated; add security headers at deploy time  

### SEC-002 — Template secrets placeholders in `.env.example`

- **Severity:** Medium (process risk)  
- **Location:** `.env.example` (`JWT_SECRET` placeholder text)  
- **Risk:** Developers copying weak secrets to production if auth added  
- **Exploit scenario:** Token forgery if JWT later enabled with example secret  
- **Recommended fix:** Document that values are fake; rotate any real secrets; don’t commit `.env`  

### SEC-003 — Future lead API spam / abuse

- **Severity:** High (when FORM-001 API exists)  
- **Location:** N/A (not built)  
- **Risk:** Inbox flood, cost abuse  
- **Exploit scenario:** Automated POST to lead endpoint  
- **Recommended fix:** Rate limiting, bot protection, server validation  

### SEC-004 — XSS via rich content / user inputs

- **Severity:** Medium (future)  
- **Location:** Future calculator/lead UI  
- **Risk:** Script injection if unsafe HTML rendering  
- **Recommended fix:** React text defaults; sanitize any markdown/HTML  

### SEC-005 — PDF generation resource abuse

- **Severity:** Medium (future CALC-003 server-side)  
- **Location:** N/A  
- **Risk:** CPU/memory DoS  
- **Recommended fix:** Prefer client PDF or rate-limit server generation  

### SEC-006 — Dependency / supply chain

- **Severity:** Low–Medium  
- **Location:** `package.json` / lockfile  
- **Risk:** Vulnerable transitive deps  
- **Recommended fix:** Keep Dependabot; run audit before production  

---

## Checklist areas (current)

| Area | Status |
| --- | --- |
| Authentication | N/A for MVP product |
| Authorization | N/A |
| Password storage | N/A |
| SQL injection | N/A (no DB) |
| CSRF | N/A until mutating APIs |
| CORS | Default Next; no custom API |
| File upload | `NOT FOUND` |
| Rate limiting | `NOT FOUND` |
| Secret exposure in repo | No real secrets found in tracked source (`CONFIRMED` for scanned app files); do not commit `.env` |

**Note:** No secret values are copied into documentation.
