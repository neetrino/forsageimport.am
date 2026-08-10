# 83 — Dependency Map

```text
Content & decisions (R0)
  ├── Contact pack ──────────────► FOOT-001
  ├── Rate tables ───────────────► CALC engine ─► CALC-002 ─► CALC-003
  ├── Auction locations list ────► CALC-001 field
  ├── FORM-001 decision ─────────► FORM-001 UI ─► lead channel
  └── Design direction ──────────► visual polish (all LAND_*)

I18N-001 foundation
  └── All user-visible LAND/CALC/FORM/FOOT copy

Page shell + anchors
  ├── LAND-001 + CTA-001
  │     ├── scrolls to CALC-001
  │     └── scrolls to FORM-001
  ├── LAND-002
  ├── LAND-003
  ├── LAND-004
  ├── LAND-005
  ├── CALC-001 → CALC-002 → CALC-003
  ├── FORM-001
  └── FOOT-001 (+ locale switcher)

META-001 (perf/trust)
  └── depends on real content + images after sections exist

CI / hosting
  └── parallel; not a feature dependency but release dependency
```

## Anti-dependency (do not wait on)

- Database before landing sections
- Auth before calculator
- Payment docs in `docs/reference`
