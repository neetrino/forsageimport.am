import type { RatesStatus } from "@/lib/calculator/types";

/**
 * Forsage customs sheet dated 2026-09-23.
 * Duty and eco tables live in `volume-rate.ts` and `eco.ts`.
 * Update FX when CBA or ops change the sheet.
 */
export const RATES_STATUS: RatesStatus = "FORSAGE_SHEET_2026_09_23";

export const calculatorRates = {
  currency: "USD" as const,
  workingEurUsd: 1.1537,
  insurancePercent: 1,
  legalVatPercent: 20,
  legalMotorcycleDutyPercent: 10,
  physicalCommercialDutyPercent: 15,
  physicalMotorcycleDutyPercent: 10,
  copartDiscountUsd: 106,
  companyFeePercent: 1.5,
  companyFeeMinimumUsd: 300,
  /** Hammer at which iaa.am switches to `6% + $375` (Copart: `6% + $269`). */
  iaaiPercentFromPrice: 15_000,
  iaaiPercent: 6,
  iaaiPercentFlatUsd: 375,
  evExemptionFromYear: 2024,
  evExemptionThroughYear: 2026,
  /**
   * Transport substituted into customs duty, VAT, and the 2017+ environmental base.
   * The location shipping fee stays payable and is not replaced by this amount.
   */
  customsTransportUsd: 2200,
} as const;

export type CalculatorRates = typeof calculatorRates;

export function euroToUsd(euroAmount: number): number {
  return euroAmount * calculatorRates.workingEurUsd;
}
