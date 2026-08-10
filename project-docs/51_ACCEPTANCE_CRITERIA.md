# 51 — Acceptance Criteria

Format: Given / When / Then. Tied to requirement IDs.

---

### LAND-001

Given the visitor opens `/`  
When the first viewport renders  
Then a hero visual and value proposition are visible  
And CTAs «Հաշվել արժեքը» and «Լրացնել հայտ» are available.

### LAND-002

Given the visitor scrolls to About  
When the section is in view  
Then 3–5 paragraphs describe Forsage Import’s import-focused business.

### LAND-003

Given the Services section  
When viewed  
Then the listed service themes from the spec (search, auction analysis, bidding, VIN/history, transport, customs-to-handover) are presented.

### LAND-004

Given How it works  
When viewed  
Then exactly the six business steps are shown in order.

### LAND-005

Given Why choose us  
When viewed  
Then 3–4 advantages including transparent costs / advice / history check / accompaniment themes appear.

### CTA-001

Given hero CTAs  
When «Հաշվել արժեքը» is activated  
Then the calculator section is brought into view (or equivalent navigation)  
When «Լրացնել հայտ» is activated  
Then the application/lead target is brought into view.

### CALC-001

Given the calculator form  
When required fields are empty and «Հաշվել» is pressed  
Then validation errors appear and results stay hidden  
When all required fields are valid and «Հաշվել» is pressed  
Then computation runs without full page reload.

### CALC-002

Given a successful calculation  
When results render on the same page  
Then vehicle price, auction fee, service fee, transport, insurance, pre-customs total, customs for legal and physical persons, and final totals per variant are visible.

### CALC-003

Given visible result variants  
When «Ներբեռնել» is clicked for a variant  
Then a PDF downloads containing that calculation breakdown.

### FORM-001

Given an agreed lead/application field set  
When the visitor submits valid data  
Then the company receives the lead via the agreed channel  
And the visitor sees success feedback  
*(Exact fields pending product decision.)*

### FOOT-001

Given the footer  
When viewed  
Then contact details, social links, and language controls are present and usable.

### I18N-001

Given the site  
When locale is Armenian  
Then primary content displays in Armenian  
When user switches to Russian or English  
Then corresponding translations display for UI copy.

### META-001

Given the completed landing  
When loaded on mobile and desktop  
Then layout remains usable without horizontal breakage  
And the site presents Forsage branding (not scaffold placeholder).
