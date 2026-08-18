import type { AgeGroupId, RatesStatus } from "@/lib/calculator/types";

/**
 * Observed CarMark / IAA.am working rates (2026-08-18).
 * Not an official SRC notice. Update FX when CBA or ops change the sheet.
 */
export const RATES_STATUS: RatesStatus = "IAA_PARITY_OBSERVED";

export const calculatorRates = {
  currency: "USD" as const,
  workingEurUsd: 1.1537,
  cbaUsdAmd: 365.25,
  cbaEurAmd: 422.81,
  under3AdValoremPercent: 48,
  under3ValueEurTier1Max: 8500,
  under3ValueEurTier2Max: 16800,
  under3EuroPerCm3: [2.5, 3.5, 5.5] as const,
  serviceFeeMinUsd: 300,
  serviceFeePercent: 1.5,
  insurancePercent: 1,
  legalVatPercent: 20,
  legalBrokerageUsd: 75,
  legalUnder3HighVolumeFrom: 2999,
  legalUnder3DutyPercent: 15,
  legalUnder3HighVolumeDutyPercent: 12.5,
  legalMidAgeDutyPercent: 20,
  legalMidAgeSpecificEuro: 0.8,
  legalMotorcycleDutyPercent: 10,
  physicalCommercialDutyPercent: 15,
  physicalMotorcycleDutyPercent: 10,
  copartDiscountUsd: 106,
  iaaiPercentFromPrice: 16_000,
  iaaiPercent: 6,
  iaaiPercentFlatUsd: 375,
  evExemptionFromYear: 2024,
  evExemptionThroughYear: 2026,
  ecoPercent: {
    under3: 2,
    "3to5": 4,
    "5to7": 6,
    over7: 12,
  } satisfies Record<AgeGroupId, number>,
} as const;

export type CalculatorRates = typeof calculatorRates;

export function cbaEurUsd(): number {
  return calculatorRates.cbaEurAmd / calculatorRates.cbaUsdAmd;
}

export function euroToUsd(euroAmount: number): number {
  return euroAmount * calculatorRates.workingEurUsd;
}
