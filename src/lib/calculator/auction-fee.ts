import { calculatorRates } from "@/lib/calculator/rates";
import type { AuctionId } from "@/lib/calculator/types";

export function computeAuctionFee(vehiclePrice: number, auction: AuctionId): number {
  const tier = calculatorRates.auctionFeeTiers.find((item) => vehiclePrice <= item.maxPrice);
  const progressive = tier?.fee ?? calculatorRates.auctionFeeTiers.at(-1)?.fee ?? 0;
  const platform = calculatorRates.auctionPlatformFee[auction];
  return roundMoney(progressive + platform);
}

export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
