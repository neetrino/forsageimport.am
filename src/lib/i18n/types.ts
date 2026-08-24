export type LabeledOption = {
  value: string;
  label: string;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  a11y: {
    skipToContent: string;
    mainNav: string;
    language: string;
    openMenu: string;
    closeMenu: string;
    heroVisual: string;
    heroSlider: string;
    heroPrev: string;
    heroNext: string;
    heroGoToSlide: string;
  };
  site: {
    brand: string;
    tagline: string;
  };
  nav: {
    about: string;
    services: string;
    process: string;
    calculator: string;
    whyUs: string;
    apply: string;
    contact: string;
  };
  hero: {
    brand: string;
    headline: string;
    support: string;
    ctaCalculate: string;
    ctaApply: string;
    slides: readonly { headline: string; support: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: readonly { title: string; text: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    stepLabel: string;
    steps: readonly string[];
  };
  calculator: {
    eyebrow: string;
    title: string;
    subtitle: string;
    submit: string;
    resultsTitle: string;
    resultsPending: string;
    selectPlaceholder: string;
    disclaimer: string;
    downloadPdf: string;
    clearResults: string;
    insurance: string;
    cheaperBadge: string;
    evExemptionNote: string;
    locationSearch: string;
    validation: {
      required: string;
      positiveNumber: string;
      engineVolume: string;
      year: string;
    };
    results: {
      physicalTitle: string;
      legalTitle: string;
      vehiclePrice: string;
      auctionFee: string;
      serviceFee: string;
      transportFee: string;
      insuranceFee: string;
      totalBeforeCustoms: string;
      customsHeading: string;
      customsDuty: string;
      vat: string;
      ecologicalTax: string;
      brokerage: string;
      flatRate: string;
      customsFee: string;
      finalTotal: string;
    };
    fields: {
      vehiclePrice: string;
      engineType: string;
      auction: string;
      customAuctionFee: string;
      ageGroup: string;
      year: string;
      auctionLocation: string;
      engineVolume: string;
      transportFee: string;
      vehicleType: string;
    };
    options: {
      engineTypes: readonly LabeledOption[];
      ageGroups: readonly LabeledOption[];
      vehicleTypes: readonly LabeledOption[];
    };
  };
  whyUs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: readonly { title: string; text: string }[];
  };
  apply: {
    eyebrow: string;
    title: string;
    subtitle: string;
    responseNote: string;
    name: string;
    phone: string;
    message: string;
    submit: string;
    submitting: string;
    success: string;
    errorGeneric: string;
    errorRateLimited: string;
    validation: {
      required: string;
      phone: string;
      messageTooLong: string;
      nameTooLong: string;
    };
  };
  footer: {
    title: string;
    socialTitle: string;
    phoneLabel: string;
    emailLabel: string;
    addressLabel: string;
    addresses: readonly string[];
    contactsPending: string;
    socialPending: string;
    rights: string;
    copyrightRights: string;
    creditBefore: string;
    creditAfter: string;
    creditCompany: string;
  };
};
