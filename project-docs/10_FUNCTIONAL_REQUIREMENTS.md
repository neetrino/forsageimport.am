# 10 — Functional Requirements

Source: `Landing - Forsage - code.docx` → `_sources/Landing-Forsage-code.spec.txt`  
IDs are stable across all `project-docs` files.

---

## LAND-001 — Hero / Banner

| Field | Value |
| --- | --- |
| Name | Hero banner |
| Description | Large visual (image or slider), short value proposition, CTA buttons |
| User role | Visitor |
| Preconditions | Page loaded |
| Expected behavior | Shows brand message; CTAs navigate/scroll to calculator and application |
| Validation | N/A (content) |
| Dependencies | Design assets, copy |
| Acceptance criteria | See `51_ACCEPTANCE_CRITERIA.md` |
| Source section | §1 Բանեռի հատված |

---

## LAND-002 — About company

| Field | Value |
| --- | --- |
| Name | About / short introduction |
| Description | 3–5 paragraphs about Forsage Import; focus on importing vehicles from abroad |
| User role | Visitor |
| Preconditions | Page loaded |
| Expected behavior | Clear company introduction builds trust |
| Validation | Content present in primary locale |
| Dependencies | Approved copy |
| Source section | §2 |

---

## LAND-003 — Services

| Field | Value |
| --- | --- |
| Name | Core services |
| Description | Present services e.g. search/selection; Copart/Manheim/IAAI lot analysis; auction bidding; VIN/history check; inland & ocean transport; customs docs until key handoff |
| User role | Visitor |
| Preconditions | Page loaded |
| Expected behavior | Visitor understands service catalog |
| Dependencies | Copy / icons |
| Source section | §3 |

---

## LAND-004 — How it works

| Field | Value |
| --- | --- |
| Name | Process steps |
| Description | Six-step process from customer request to delivery in Armenia |
| User role | Visitor |
| Preconditions | Page loaded |
| Expected behavior | Steps 1–6 visible and understandable |
| Dependencies | Copy |
| Source section | §4 |

Steps (required content):

1. Customer specifies desired car and budget  
2. Team finds and proposes options  
3. Preliminary history/damage study  
4. After confirmation — auction bid  
5. Payment, transport, delivery, customs organized  
6. Car arrives in Armenia, cleared, handed to customer  

---

## LAND-005 — Why choose us

| Field | Value |
| --- | --- |
| Name | Why choose us |
| Description | 3–4 advantages (transparent costs, professional advice, history check, full accompaniment) |
| User role | Visitor |
| Source section | §6 |

---

## CALC-001 — Calculator input form

| Field | Value |
| --- | --- |
| Name | Cost calculator inputs |
| Description | Form fields for approximate import cost calculation |
| User role | Visitor |
| Preconditions | Calculator section visible |
| Expected behavior | User can fill required fields and submit «Հաշվել» |
| Validation | Numeric fields; required selects; see `33_VALIDATION_RULES.md` |
| Dependencies | Rate tables / formulas (`NEEDS VERIFICATION`) |
| Source section | §5, §7 |

Required fields (from §7):

| Field | Type |
| --- | --- |
| Մեքենայի արժեքը | number, USD |
| Աճուրդ | select: Copart \| IAAI |
| Աճուրդի միջնորդավճար | number |
| Աճուրդի վայր | select (locations list TBD) |
| Տեղափոխման վճար | number |
| Շարժիչի տեսակ | select: petrol, diesel, hybrid, electric (examples) |
| Մեքենայի տարիքային խումբ | select: ≤3y, 3–5y, >5y (examples) |
| Արտադրության տարի | select |
| Շարժիչի ծավալ | number (L or cm³) |
| ՏՄ տեսակ | select: sedan, SUV, pickup, minivan, etc. |
| Ապահովագրություն | checkbox |
| Action | «Հաշվել» button |

§5 also mentions: foreign transport to Gyumri, insurance/docs, customs fees AMD/USD, Forsage service fee USD or fixed %.

---

## CALC-002 — Calculator results

| Field | Value |
| --- | --- |
| Name | Calculation results panel |
| Description | After calculate, same-page results breakdown |
| User role | Visitor |
| Preconditions | CALC-001 submitted with valid data |
| Expected behavior | Show itemized costs and totals for variants |
| Source section | §7 |

Results must include:

- Vehicle price  
- Auction fee  
- Service fee  
- Transport cost  
- Insurance cost  
- Total before customs  
- Customs fees for legal entity and physical person  
- Final total per variant  

---

## CALC-003 — PDF download

| Field | Value |
| --- | --- |
| Name | Download calculation PDF |
| Description | Each result variant has «Ներբեռնել» to save calculation as PDF |
| User role | Visitor |
| Preconditions | CALC-002 results visible |
| Expected behavior | PDF downloads successfully with calculation data |
| Dependencies | CALC-002, PDF library decision |
| Source section | §7 |

---

## FORM-001 — Application / order request

| Field | Value |
| --- | --- |
| Name | Application / lead form |
| Description | Spec overview and section list require an application form; §7 body duplicates calculator fields |
| User role | Visitor |
| Status note | **Ambiguous** — `NEEDS VERIFICATION` with product owner |
| Expected behavior (minimum interpretation) | User can request service / leave a lead via dedicated UI beyond calculator |
| Source section | Overview; sections list «Հայտի ձև»; §7 title |

---

## CTA-001 — Primary CTAs

| Field | Value |
| --- | --- |
| Name | Hero CTAs |
| Description | Buttons such as «Հաշվել արժեքը» and «Լրացնել հայտ» |
| User role | Visitor |
| Expected behavior | Navigate/scroll to calculator and application targets |
| Source section | §1 |

---

## FOOT-001 — Footer

| Field | Value |
| --- | --- |
| Name | Footer |
| Description | Contact details, social links, language switcher |
| User role | Visitor |
| Source section | §8 |

---

## I18N-001 — Multi-language

| Field | Value |
| --- | --- |
| Name | Site languages |
| Description | Armenian primary; Russian; English |
| User role | Visitor |
| Expected behavior | User can switch language; content available in hy/ru/en |
| Source section | §8 + Info «Թարգմանություն՝ arm (առաջնային), eng, ru» |

---

## META-001 — Trust and performance goals

| Field | Value |
| --- | --- |
| Name | Non-functional product goals |
| Description | Modern, fast, trust-inspiring one-page site |
| User role | Visitor |
| Source section | Overview |

---

## Requirement count

| Category | Count |
| --- | --- |
| Landing/content | LAND-001..005, CTA-001, FOOT-001 → 7 |
| Calculator | CALC-001..003 → 3 |
| Lead/form | FORM-001 → 1 |
| i18n | I18N-001 → 1 |
| Meta/NFR | META-001 → 1 |
| **Total tracked** | **13** |
