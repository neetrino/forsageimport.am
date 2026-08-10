# 53 — Edge Cases

Project-specific (landing + calculator). Implementation mostly future-facing.

| Edge case | Related | Expected handling |
| --- | --- | --- |
| Empty calculator submit | CALC-001 | Validation, no results |
| Zero / negative prices | CALC-001 | Reject |
| Extremely large USD values | CALC-001 | Bound or warn; prevent overflow in UI |
| Auction fee auto vs manual conflict | CALC-001 | Single mode clear UX |
| Missing auction location list | CALC-001 | Blocker until list provided |
| Engine volume unit confusion (L vs cm³) | CALC-001 | Label unit; convert consistently |
| Year vs age group inconsistency | CALC-001 | Cross-field validation (`NEEDS VERIFICATION`) |
| Insurance off | CALC-002 | Insurance line 0 or hidden with rule |
| Double-click calculate | CALC-* | Idempotent UI |
| Double-click PDF download | CALC-003 | Single download / busy state |
| PDF while results stale | CALC-003 | Generate from last successful snapshot |
| Locale switch mid-form | I18N-001 | Preserve input values; translate labels |
| Missing translation key | I18N-001 | Fallback without crashing |
| Contact data not provided by business | FOOT-001 | Cannot complete content QA |
| Network offline on lead submit | FORM-001 | Error state |
| JS disabled | META-001 | Decide SSR content vs progressive enhancement (`NEEDS VERIFICATION`) |
| Dark mode preference | META-001 | Confirm if auto dark desired |
| Very small mobile screens | all sections | Stack layout, usable tap targets |
| RTL | not in scope | Spec languages are LTR |

Empty states: no inventory to empty; calculator results hidden until success.
