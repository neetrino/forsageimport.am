import type { Dictionary } from "@/lib/i18n/types";

export const en: Dictionary = {
  meta: {
    title: "Forsage Import",
    description:
      "Forsage Import — select, buy, and import cars from US auctions to Armenia.",
  },
  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    language: "Language",
    openMenu: "Menu",
    closeMenu: "Close",
    heroVisual: "Road and horizon visual representing the import journey",
    heroSlider: "Hero slider",
    heroPrev: "Previous slide",
    heroNext: "Next slide",
    heroGoToSlide: "Go to slide",
  },
  site: {
    brand: "Forsage Import",
    tagline: "From US auctions to Armenia",
  },
  nav: {
    about: "About",
    services: "Services",
    process: "Process",
    calculator: "Calculator",
    whyUs: "Why us",
    apply: "Apply",
    contact: "Contact",
  },
  hero: {
    brand: "Forsage Import",
    headline: "US auction cars with transparent end-to-end support",
    support:
      "Selection, purchase, and import from Copart and IAAI — through to key handover in Armenia.",
    ctaCalculate: "Estimate cost",
    ctaApply: "Submit request",
    slides: [
      {
        headline: "US auction cars with transparent end-to-end support",
        support:
          "Selection, purchase, and import from Copart and IAAI — through to key handover in Armenia.",
      },
      {
        headline: "See the cost shape before you commit",
        support:
          "The calculator maps spend from auction to customs clearance — without hidden surprises.",
      },
      {
        headline: "One team from purchase to key handover",
        support:
          "Paperwork, logistics, and customs steps — as one clear process in Armenia.",
      },
    ],
  },
  about: {
    eyebrow: "Company",
    title: "About us",
    paragraphs: [
      "Forsage Import selects, purchases, and imports vehicles from abroad — especially from US auto auctions.",
      "We make the full journey clear: from choosing a car to customs clearance and handover.",
      "We work with transparent cost logic and professional advice so decisions are informed.",
      "Our team accompanies every stage of the deal — from auction purchase to logistics and paperwork.",
      "You receive not only a car, but a predictable and controlled import process.",
    ],
  },
  services: {
    eyebrow: "What we do",
    title: "Services",
    subtitle: "Full support from search to handover",
    items: [
      {
        title: "Search and selection",
        text: "Vehicle shortlists matched to your budget and requirements.",
      },
      {
        title: "Auction analysis",
        text: "Preliminary review of Copart, Manheim, and IAAI lots.",
      },
      {
        title: "Auction purchase",
        text: "Bidding and purchase after your confirmation.",
      },
      {
        title: "VIN and history",
        text: "Preliminary history and damage checks.",
      },
      {
        title: "Transport",
        text: "Inland and ocean shipping arranged through to Gyumri.",
      },
      {
        title: "Customs clearance",
        text: "Document handling through to key handover.",
      },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "How it works",
    subtitle: "Six clear steps from request to handover",
    stepLabel: "Step",
    steps: [
      "You share the desired car and budget.",
      "The team finds and proposes matching options.",
      "We run a preliminary history and damage review.",
      "After your confirmation, we place the auction bid.",
      "Payment, transport, delivery, and customs are organized.",
      "The car arrives in Armenia, clears customs, and is handed over.",
    ],
  },
  calculator: {
    eyebrow: "Estimate",
    title: "Vehicle import calculator",
    subtitle:
      "Enter the auction, transport, and vehicle details for a delivery and customs estimate.",
    submit: "Calculate",
    resultsTitle: "Results",
    resultsPending: "Fill in the fields and press Calculate to see results.",
    selectPlaceholder: "Select",
    disclaimer:
      "Preliminary estimate from current local rates. Auction, logistics, and customs totals may be adjusted when the order is confirmed.",
    downloadPdf: "Download",
    clearResults: "Clear",
    insurance: "Insurance",
    cheaperBadge: "Lower total",
    evExemptionNote:
      "From 1 February through 31 December 2026 for electric vehicles manufactured after 31 December 2023. The 0% customs duty is subject to the approved quota; final eligibility must be confirmed by customs.",
    locationSearch: "Search location",
    validation: {
      required: "Required field",
      positiveNumber: "Enter a positive number",
      engineVolume: "Enter volume in cm³",
      year: "Select a valid year",
    },
    results: {
      physicalTitle: "Individual",
      legalTitle: "Legal entity",
      vehiclePrice: "Final bid at auction",
      auctionFee: "Auction fee",
      serviceFee: "Service charge",
      transportFee: "Shipping (Gyumri, RA)",
      insuranceFee: "Insurance",
      totalBeforeCustoms: "Total excluding customs clearance",
      customsHeading: "Customs charges",
      customsDuty: "Customs duty",
      vat: "VAT",
      ecologicalTax: "Ecological tax",
      brokerage: "Customs brokerage",
      flatRate: "Flat rate",
      customsFee: "Customs fees",
      finalTotal: "Total price",
    },
    fields: {
      vehiclePrice: "Car price",
      engineType: "Engine type",
      auction: "Auction",
      customAuctionFee: "Custom auction fee",
      ageGroup: "Age",
      year: "Production year",
      auctionLocation: "Auction location",
      engineVolume: "Engine, cm³",
      transportFee: "Shipping",
      vehicleType: "Transport type",
    },
    options: {
      engineTypes: [
        { value: "petrol", label: "Petrol" },
        { value: "diesel", label: "Diesel" },
        { value: "hybrid", label: "Hybrid" },
        { value: "electric", label: "Electric" },
      ],
      ageGroups: [
        { value: "under3", label: "Up to 3 years" },
        { value: "3to5", label: "3–5 years" },
        { value: "5to7", label: "5–7 years" },
        { value: "over7", label: "7+" },
      ],
      vehicleTypes: [
        { value: "sedan", label: "Sedan" },
        { value: "suv", label: "SUV" },
        { value: "big_suv", label: "Large SUV" },
        { value: "van", label: "Van" },
        { value: "pickup", label: "Pickup" },
        { value: "motorcycle", label: "Motorcycle" },
      ],
    },
  },
  whyUs: {
    eyebrow: "Advantages",
    title: "Why choose us",
    subtitle: "Four principles that build trust",
    items: [
      {
        title: "Transparent costs",
        text: "Clear estimate breakdown without hidden corners.",
      },
      {
        title: "Expert advice",
        text: "Help choosing a car for your budget and purpose.",
      },
      {
        title: "History checks",
        text: "Preliminary review before the auction decision.",
      },
      {
        title: "End-to-end support",
        text: "From purchase through customs and handover.",
      },
    ],
  },
  apply: {
    eyebrow: "Contact",
    title: "Submit a request",
    subtitle: "Leave your name, phone, and a short message. We will get back to you.",
    responseNote: "We usually reply within 1 business day",
    name: "Name",
    phone: "Phone",
    message: "Message",
    submit: "Send request",
    submitting: "Sending…",
    success: "Request received. We will contact you soon.",
    errorGeneric: "Could not send. Please try again shortly.",
    errorRateLimited: "Too many attempts. Please try again later.",
    validation: {
      required: "Required field",
      phone: "Enter a valid phone number",
      messageTooLong: "Message is too long",
      nameTooLong: "Name is too long",
    },
  },
  footer: {
    title: "Contact",
    socialTitle: "Social",
    phoneLabel: "Phone",
    emailLabel: "Email",
    addressLabel: "Address",
    addresses: [
      "Gyumri, Tbilisi Highway 3/28",
      "Yerevan, Mazmanyan 1, Garage mall, pavilion 65",
    ],
    contactsPending: "Contact details will be added",
    socialPending: "Social links will be added",
    rights: "Forsage Import",
    copyrightRights: "All rights reserved",
    creditBefore: "Created by",
    creditAfter: "",
    creditCompany: "Neetrino IT Company",
  },
};
