# 20 — Frontend

Audit date: 2026-08-10

---

## Framework & routing

| Item | Reality | Status |
| --- | --- | --- |
| Framework | Next.js App Router 16.3.0 | `CONFIRMED` |
| Routes | `/` only | `CONFIRMED` |
| Layouts | Root layout | `CONFIRMED` |
| Pages | `src/app/page.tsx` placeholder | `CONFIRMED` |

---

## Components / shared UI

- `src/components` empty (`.gitkeep`)
- No design system, no shadcn, no section components
- Status: `NOT FOUND`

---

## Forms / calculator UI

- No forms, inputs, validation libraries
- Status: `NOT IMPLEMENTED` (CALC-001, FORM-001)

---

## Data fetching / state

- No React Query/SWR, no global store, no server data fetching
- Status: `NOT FOUND`

---

## Auth state / role restrictions

- Not applicable to current public scaffold; no auth UI
- Status: `NOT FOUND`

---

## Validation / error / loading / empty states

- None implemented for product flows
- Status: `NOT IMPLEMENTED`

---

## Responsive behavior

- Tailwind available; page uses basic flex centering
- Product responsive sections: `NOT IMPLEMENTED`
- Dark mode CSS via `prefers-color-scheme` in `globals.css` — may conflict with intended brand; `NEEDS VERIFICATION` whether dark mode desired (spec silent)

---

## i18n

- Spec: hy primary, ru, en
- Code: `html lang="en"`, English placeholder copy
- Status: `NOT IMPLEMENTED`

---

## Accessibility

- Minimal semantic `<main>`, `<h1>`, `<p>`
- No skip links, no form labels, no focus management for sections
- Status: `NOT IMPLEMENTED` for product UI

---

## Anti-patterns / incomplete flows

| Issue | Evidence | Notes |
| --- | --- | --- |
| Placeholder presented as app home | `page.tsx` | Must be replaced for MVP |
| Default export | `page.tsx` | Conflicts with named-export team preference |
| Body font-family Arial override | `globals.css` | Conflicts with Geist CSS variables setup |
| Template SVGs in `public/` | `public/*.svg` | Not Forsage brand |

---

## Expected frontend structure (target, not built)

```text
src/components/landing/Hero.tsx
src/components/landing/About.tsx
src/components/landing/Services.tsx
src/components/landing/HowItWorks.tsx
src/components/landing/Calculator.tsx
src/components/landing/WhyUs.tsx
src/components/landing/ApplicationForm.tsx  # after FORM-001 decision
src/components/landing/Footer.tsx
src/components/i18n/LocaleSwitcher.tsx
src/lib/calculator/*.ts
src/lib/i18n/*.ts
```
