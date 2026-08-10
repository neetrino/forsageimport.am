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
    title: "Cost calculator",
    subtitle:
      "Approximate estimate before customs. Final totals activate after fee tables are confirmed.",
    submit: "Calculate",
    resultsTitle: "Results",
    resultsPending: "Fill in the fields and press Calculate to see results.",
    selectPlaceholder: "Select",
    disclaimer:
      "Approximate estimate. Rates are DRAFT and pending business confirmation — not a final invoice.",
    downloadPdf: "Download",
    clearResults: "Clear",
    insurance: "Insurance",
    validation: {
      required: "Required field",
      positiveNumber: "Enter a positive number",
      engineVolume: "Enter volume in cm³",
      year: "Select a valid year",
    },
    results: {
      physicalTitle: "Individual (physical person)",
      legalTitle: "Legal entity",
      vehiclePrice: "Vehicle price",
      auctionFee: "Auction fee",
      serviceFee: "Service fee",
      transportFee: "Transport",
      insuranceFee: "Insurance",
      totalBeforeCustoms: "Total before customs",
      customsFee: "Customs fees",
      finalTotal: "Final total",
    },
    fields: {
      vehiclePrice: "Vehicle price",
      engineType: "Engine type",
      auction: "Auction",
      ageGroup: "Age",
      year: "Production year",
      auctionLocation: "Auction location",
      engineVolume: "Engine volume, cm³",
      transportFee: "Transport fee",
      vehicleType: "Vehicle type",
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
        { value: "over5", label: "Over 5 years" },
      ],
      vehicleTypes: [
        { value: "sedan", label: "Sedan" },
        { value: "suv", label: "SUV" },
        { value: "pickup", label: "Pickup" },
        { value: "minivan", label: "Minivan" },
        { value: "other", label: "Other" },
      ],
      auctionLocations: [
        { value: "ca", label: "California" },
        { value: "tx", label: "Texas" },
        { value: "nj", label: "New Jersey" },
        { value: "fl", label: "Florida" },
        { value: "ga", label: "Georgia" },
        { value: "other", label: "Other" },
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
    steps: [
      "Share your name and phone",
      "Add a short message",
      "We get back to you",
    ],
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
    contactsPending: "Contact details will be added",
    socialPending: "Social links will be added",
    rights: "Forsage Import",
    copyrightRights: "All rights reserved",
    creditBefore: "Created by",
    creditAfter: "",
    creditCompany: "Neetrino IT Company",
  },
};
