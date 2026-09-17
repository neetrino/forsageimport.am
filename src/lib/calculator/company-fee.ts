import { roundUsd } from "@/lib/calculator/money";

/** Inclusive ceilings on vehicle (hammer) price. Above 52000 the office quotes the fee. */
const COMPANY_FEE_TIERS: readonly { maxPrice: number; fee: number }[] = [
  { maxPrice: 12000, fee: 250 },
  { maxPrice: 22000, fee: 450 },
  { maxPrice: 32000, fee: 650 },
  { maxPrice: 42000, fee: 800 },
  { maxPrice: 52000, fee: 1150 },
];

export const COMPANY_FEE_CALL_ABOVE = 52000;

export function requiresCompanyFeeCall(vehiclePrice: number): boolean {
  return vehiclePrice > COMPANY_FEE_CALL_ABOVE;
}

export function computeCompanyFee(vehiclePrice: number): number {
  if (requiresCompanyFeeCall(vehiclePrice)) return 0;
  const tier = COMPANY_FEE_TIERS.find((item) => vehiclePrice <= item.maxPrice);
  return roundUsd(tier?.fee ?? 0);
}
