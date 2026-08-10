# 01 — Project Overview

Status of this document: `CONFIRMED` against DOCX spec + codebase audit (2026-08-10).

---

## Purpose

Ստեղծել ժամանակակից, արագ և վստահություն ներշնչող **մեկ էջանոց (single-page)** վեբ կայք **Forsage Import** ընկերության համար։

Ընկերությունը զբաղվում է ԱՄՆ ավտոաճուրդներից (հատկապես **Copart** և **IAAI**) ավտոմեքենաների ընտրությամբ, գնմամբ և Հայաստան ներմուծմամբ։

---

## Business problem

Այցելուն պետք է՝

1. հասկանա ծառայության ամբողջ ընթացքը,
2. մոտավոր հաշվարկի մեքենայի ձեռքբերման և ներմուծման ընդհանուր ծախսերը,
3. արագ կապ հաստատի կամ լրացնի պատվերի հայտ։

Ներկայում ընկերությունը **կայք և դոմեն չունի** (spec Info)։

---

## Primary goals (from spec)

1. Ներկայացնել Forsage Import-ը և ձևավորել վստահություն։
2. Ներկայացնել ԱՄՆ աճուրդներից ավտոմեքենա պատվիրելու ծառայությունը։
3. Բացատրել աշխատանքի փուլերը՝ ընտրությունից մինչև առաքում Հայաստան։
4. Տրամադրել ավտոմեքենայի ընդհանուր արժեքի մոտավոր հաշվիչ։

---

## Users

| User type | Description | Auth needed |
| --- | --- | --- |
| Visitor / Lead | Հայաստանում գտնվող հաճախորդ, ով հետաքրքրվում է ներմուծմամբ | No (spec) |
| Company staff | Spec-ում admin panel չի պահանջվում | N/A |

Roles beyond anonymous visitor are `NOT FOUND` in the specification.

---

## Main modules (product)

| Module | Spec section | Code status |
| --- | --- | --- |
| Hero / Banner | §1 | `NOT IMPLEMENTED` |
| About | §2 | `NOT IMPLEMENTED` |
| Services | §3 | `NOT IMPLEMENTED` |
| How it works | §4 | `NOT IMPLEMENTED` |
| Cost calculator | §5, §7 | `NOT IMPLEMENTED` |
| Why choose us | §6 | `NOT IMPLEMENTED` |
| Application / lead form | Overview + section list | `NOT IMPLEMENTED` / content ambiguous — see `02_SOURCE_OF_TRUTH.md` |
| Footer / contact | §8 | `NOT IMPLEMENTED` |
| i18n (hy / ru / en) | §8 + Info | `NOT IMPLEMENTED` |

---

## High-level visitor workflow (intended)

```text
Land on page (hy default)
  → Read trust + services + process
  → Use calculator (estimate cost)
  → Optionally download PDF result
  → Contact / submit application (CTA / form / footer)
```

Evidence of implementation: **none** beyond Next.js scaffold home placeholder.

---

## Scope

### In scope (spec)

- Single-page marketing site
- Content sections listed above
- Approximate cost calculator with results breakdown
- PDF download of calculation variants
- Footer contacts + social + language switch
- Languages: Armenian (primary), Russian, English
- Deadline context: 15–20 working days (project management, not technical DoD)

### Out of scope / not specified (`NOT FOUND` in DOCX)

- User accounts / login
- Admin CMS
- Live auction API integration with Copart/IAAI
- Online payment checkout
- Inventory catalog of cars
- Tracking portal for orders
- Mobile native apps

Template `.env.example` mentions DB/JWT/Redis/R2/Resend — these are **template leftovers**, not confirmed product requirements. See conflicts in `02_SOURCE_OF_TRUTH.md`.

---

## MVP vs future

| Tier | Items |
| --- | --- |
| **MVP (spec-aligned)** | All landing sections, calculator + results, PDF export, footer contact/social, i18n hy/ru/en, responsive UI |
| **Future (not in DOCX)** | CMS, lead CRM, live auction feeds, authenticated client cabinet, payments |

---

## Delivery context (from spec Info)

| Field | Value | Confidence |
| --- | --- | --- |
| Product name | Forsage Import | `CONFIRMED` (main body) |
| Alternate name in Info | «դոկ տուռ - Doctour» | `CONFIRMED` text present — likely copy-paste error |
| Responsible | Սուրեն | `CONFIRMED` |
| Deadline | 15–20 working days | `CONFIRMED` |
| Existing site/domain | None | `CONFIRMED` |
| Design template | Not chosen; 3 example links provided | `CONFIRMED` |
| Partner | `-` | `CONFIRMED` |

Reference templates (visual inspiration only):

1. https://woodmart.xtemos.com/demo-lawyer/demo/lawyer/
2. https://websitedemos.net/general-hospital-04/?customize=template
3. https://websitedemos.net/pharmaceutical-02/?customize=template
