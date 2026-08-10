# 43 — Data Integrity

Audit date: 2026-08-10

---

## Current

No persistent writes. Integrity risk for stored business data = **N/A**.

---

## Calculator integrity (future)

| Risk | Description | Mitigation |
| --- | --- | --- |
| Wrong totals | Missing/incorrect fee tables | Single source rate module + golden-test cases from business |
| Currency mix USD/AMD | Spec allows both | Explicit conversion rules + display labels |
| Race on double click | Double compute/PDF | Disable button while working |
| Stale results | Inputs changed after compute | Invalidate results on input change |
| Legal vs physical mismatch | Two customs paths | Explicit variant model; never overwrite silently |

---

## Lead integrity (future)

| Risk | Mitigation |
| --- | --- |
| Duplicate submissions | Idempotency key / debounce / cooldown |
| Partial email send success UX | Transactional outbox or clear failure states |
| Missing unique constraints | Only if DB introduced |

---

## Transactions

No DB transactions present. Status: `NOT FOUND`.
