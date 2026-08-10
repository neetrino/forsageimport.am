/**
 * DRAFT rate tables for Phase 3 engine wiring.
 *
 * Status: NOT business-confirmed. Replace values in this file when Suren/ops
 * provide the official sheet. Do not treat outputs as final invoices.
 */
export const RATES_STATUS = "DRAFT_PENDING_BUSINESS" as const;

export const calculatorRates = {
  currency: "USD" as const,
  /** Progressive auction buyer fee by hammer price (DRAFT approximation). */
  auctionFeeTiers: [
    { maxPrice: 100, fee: 25 },
    { maxPrice: 500, fee: 50 },
    { maxPrice: 1000, fee: 100 },
    { maxPrice: 2000, fee: 150 },
    { maxPrice: 5000, fee: 250 },
    { maxPrice: 10000, fee: 400 },
    { maxPrice: 15000, fee: 500 },
    { maxPrice: 20000, fee: 600 },
    { maxPrice: 30000, fee: 700 },
    { maxPrice: 50000, fee: 850 },
    { maxPrice: Number.POSITIVE_INFINITY, fee: 1000 },
  ],
  /** Extra flat fee by auction platform (DRAFT). */
  auctionPlatformFee: {
    iaai: 95,
    copart: 89,
    manheim: 110,
  },
  /** Forsage service fee as percent of (vehicle + auction fee). */
  serviceFeePercent: 5,
  /** Insurance percent of (vehicle + transport) when enabled. */
  insurancePercent: 1.5,
  /**
   * Customs model (DRAFT parametric).
   * taxableBase = vehicle + auctionFee + transport
   * customs = taxableBase * rate + volumeCm3 * volumeRate
   */
  customs: {
    physical: {
      under3: { baseRate: 0.22, volumeRate: 0.12 },
      "3to5": { baseRate: 0.28, volumeRate: 0.14 },
      over5: { baseRate: 0.34, volumeRate: 0.16 },
    },
    legal: {
      under3: { baseRate: 0.18, volumeRate: 0.1 },
      "3to5": { baseRate: 0.24, volumeRate: 0.12 },
      over5: { baseRate: 0.3, volumeRate: 0.14 },
    },
    engineTypeMultiplier: {
      petrol: 1,
      diesel: 1.05,
      hybrid: 0.92,
      electric: 0.85,
    },
  },
} as const;

export type CalculatorRates = typeof calculatorRates;
