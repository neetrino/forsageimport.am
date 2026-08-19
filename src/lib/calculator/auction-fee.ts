import { calculatorRates } from "@/lib/calculator/rates";
import { roundUsd } from "@/lib/calculator/money";
import type { AuctionId } from "@/lib/calculator/types";

/** Probed IAAI inclusive ceilings (2026-08-18). */
const IAAI_TIERS: readonly { maxPrice: number; fee: number }[] = [
  { maxPrice: 50, fee: 216 },
  { maxPrice: 100, fee: 290 },
  { maxPrice: 200, fee: 325 },
  { maxPrice: 300, fee: 350 },
  { maxPrice: 400, fee: 390 },
  { maxPrice: 500, fee: 425 },
  { maxPrice: 600, fee: 450 },
  { maxPrice: 700, fee: 475 },
  { maxPrice: 800, fee: 495 },
  { maxPrice: 900, fee: 510 },
  { maxPrice: 1000, fee: 550 },
  { maxPrice: 1200, fee: 570 },
  { maxPrice: 1400, fee: 600 },
  { maxPrice: 1600, fee: 640 },
  { maxPrice: 1800, fee: 680 },
  { maxPrice: 2000, fee: 715 },
  { maxPrice: 2500, fee: 785 },
  { maxPrice: 3000, fee: 830 },
  { maxPrice: 3500, fee: 880 },
  { maxPrice: 4000, fee: 940 },
  { maxPrice: 4500, fee: 965 },
  { maxPrice: 5000, fee: 990 },
  { maxPrice: 6000, fee: 1060 },
  { maxPrice: 7000, fee: 1115 },
  { maxPrice: 8000, fee: 1175 },
  { maxPrice: 11000, fee: 1225 },
  { maxPrice: 12000, fee: 1250 },
  { maxPrice: 14999, fee: 1265 },
  { maxPrice: 15000, fee: 1275 },
];

export function computeAuctionFee(
  vehiclePrice: number,
  auction: AuctionId,
  customAuctionFee = 0,
): number {
  if (auction === "custom") {
    return roundUsd(Math.max(0, customAuctionFee));
  }

  const iaaiFee = computeIaaiFee(vehiclePrice);
  if (auction === "copart") {
    return Math.max(0, iaaiFee - calculatorRates.copartDiscountUsd);
  }
  return iaaiFee;
}

function computeIaaiFee(vehiclePrice: number): number {
  if (vehiclePrice >= calculatorRates.iaaiPercentFromPrice) {
    return roundUsd(
      (vehiclePrice * calculatorRates.iaaiPercent) / 100 +
        calculatorRates.iaaiPercentFlatUsd,
    );
  }

  const tier = IAAI_TIERS.find((item) => vehiclePrice <= item.maxPrice);
  return tier?.fee ?? IAAI_TIERS.at(-1)?.fee ?? 0;
}
