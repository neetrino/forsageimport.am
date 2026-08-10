# 63 — Backup and Recovery

Audit date: 2026-08-10

---

## Current state

| Asset | Backup need | Current |
| --- | --- | --- |
| Application code | Git remote | Repo on `origin` (`CONFIRMED` branch tracking) |
| Database | N/A | No DB |
| Uploaded files | N/A | No uploads |
| CMS content | N/A | Content will live in code/i18n files initially |
| Secrets | Password manager / host env | Not documented here |

---

## If leads DB added later

- Daily DB backups
- Test restore quarterly
- Define RPO/RTO with owner (`UNKNOWN` now — not in DOCX)

---

## What is missing today

- Documented production backup policy: `NOT FOUND`
- Disaster recovery runbook: `NOT FOUND`
- RPO/RTO targets: `NOT FOUND` in requirements

For static/SSR landing without DB, **git + host redeploy** is the practical recovery path.
