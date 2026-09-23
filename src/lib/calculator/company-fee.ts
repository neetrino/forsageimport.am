import { calculatorRates } from "@/lib/calculator/rates";

/**
 * CarMark / IAA.am service charge (`servicePrice`), observed 2026-09-23.
 * `max(300, ceil(1.5% × (hammer + auction fee)))`, whole dollars, rounded up.
 */
export function computeCompanyFee(vehiclePrice: number, auctionFee: number): number {
  const base = Math.max(0, vehiclePrice) + Math.max(0, auctionFee);
  const percentFee = ceilUsdPercent(base, calculatorRates.companyFeePercent);
  return Math.max(calculatorRates.companyFeeMinimumUsd, percentFee);
}

function ceilUsdPercent(base: number, percent: number): number {
  const thousandths = Math.round(base * percent * 10);
  return Math.ceil(thousandths / 1000);
}
