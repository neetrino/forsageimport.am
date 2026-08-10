# 90 — Definition of Done

A requirement ID is **DONE** only when all applicable boxes pass.

## Universal DoD

- [ ] Frontend implemented for the requirement
- [ ] Backend implemented **if** the requirement needs it (else explicitly N/A)
- [ ] Database implemented **if** needed (else N/A)
- [ ] Validation implemented where user input exists
- [ ] Permissions enforced on server if mutating/protected API exists
- [ ] Error states handled
- [ ] Loading states handled (when async)
- [ ] Empty/hidden states handled (e.g. results before calculate)
- [ ] Security reviewed for new surface
- [ ] Tests added/updated for critical logic
- [ ] Acceptance criteria in `51_ACCEPTANCE_CRITERIA.md` passed
- [ ] `11_FUNCTIONAL_STATUS_MATRIX.md` updated
- [ ] `93_CHANGELOG.md` updated
- [ ] No known blocking regression in QA checklist

## Not Done

- UI mock with hardcoded fake totals presented as final calculator
- Section “exists” but only in English when I18N-001 claimed done
- PDF button without generating a real file
- Lead form that does not deliver leads anywhere

## Calculator-specific DoD extras

- [ ] Golden business examples match engine output
- [ ] Legal vs physical variants both correct
- [ ] Approximate-cost disclaimer present if legally required
