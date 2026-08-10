# 33 — Validation Rules

Audit date: 2026-08-10  
Implementation status: `NOT IMPLEMENTED` (rules derived from DOCX field types).

---

## CALC-001 field rules (intended)

| Field | Rules |
| --- | --- |
| Մեքենայի արժեքը | Required; number; > 0; USD |
| Աճուրդ | Required; enum Copart \| IAAI |
| Աճուրդի միջնորդավճար | Required unless auto-calc enabled; number; ≥ 0 |
| Աճուրդի վայր | Required; must be from approved list (list TBD) |
| Տեղափոխման վճար | Required; number; ≥ 0 |
| Շարժիչի տեսակ | Required; enum (petrol/diesel/hybrid/electric + TBD) |
| Տարիքային խումբ | Required; enum |
| Արտադրության տարի | Required; year in allowed range (range TBD) |
| Շարժիչի ծավալ | Required; number; > 0; unit L or cm³ must be consistent |
| ՏՄ տեսակ | Required; enum |
| Ապահովագրություն | Optional boolean; default off unless business says otherwise (`NEEDS VERIFICATION`) |

---

## CALC-002

- Show results only after successful validation
- Distinguish legal vs physical customs totals clearly
- Mark figures as approximate if required by legal copy

---

## FORM-001

- Exact fields `NEEDS VERIFICATION`
- If classic lead form: validate phone/email formats; required name+contact method

---

## i18n validation messages

- Errors must appear in active locale (hy/ru/en) once I18N-001 exists

---

## Code evidence

No zod/yup/react-hook-form validators found in `src/`.
