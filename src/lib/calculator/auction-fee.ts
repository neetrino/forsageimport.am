import { calculatorRates } from "@/lib/calculator/rates";
import { roundUsd } from "@/lib/calculator/money";
import type { AuctionId } from "@/lib/calculator/types";

type FeeTier = {
  readonly minPrice: number;
  readonly fee: number;
};

/**
 * IAAI inclusive floors, probed from iaa.am on 2026-09-23.
 * $7,991–$7,999 is a live-site dip to $360; Copart does not follow it.
 */
const IAAI_TIERS: readonly FeeTier[] = [
  { minPrice: 0, fee: 216 },
  { minPrice: 100, fee: 290 },
  { minPrice: 200, fee: 325 },
  { minPrice: 300, fee: 350 },
  { minPrice: 350, fee: 365 },
  { minPrice: 400, fee: 390 },
  { minPrice: 450, fee: 400 },
  { minPrice: 500, fee: 425 },
  { minPrice: 550, fee: 435 },
  { minPrice: 600, fee: 450 },
  { minPrice: 700, fee: 475 },
  { minPrice: 800, fee: 495 },
  { minPrice: 900, fee: 510 },
  { minPrice: 1000, fee: 550 },
  { minPrice: 1200, fee: 570 },
  { minPrice: 1300, fee: 585 },
  { minPrice: 1400, fee: 600 },
  { minPrice: 1500, fee: 625 },
  { minPrice: 1600, fee: 640 },
  { minPrice: 1700, fee: 660 },
  { minPrice: 1800, fee: 680 },
  { minPrice: 2000, fee: 715 },
  { minPrice: 2400, fee: 750 },
  { minPrice: 2500, fee: 785 },
  { minPrice: 3000, fee: 830 },
  { minPrice: 3500, fee: 880 },
  { minPrice: 4000, fee: 940 },
  { minPrice: 4500, fee: 965 },
  { minPrice: 5000, fee: 990 },
  { minPrice: 5500, fee: 1015 },
  { minPrice: 6000, fee: 1060 },
  { minPrice: 6500, fee: 1080 },
  { minPrice: 7000, fee: 1115 },
  { minPrice: 7500, fee: 1135 },
  { minPrice: 8000, fee: 1175 },
  { minPrice: 8500, fee: 1225 },
  { minPrice: 11500, fee: 1235 },
  { minPrice: 12000, fee: 1250 },
  { minPrice: 12500, fee: 1265 },
];

const IAAI_FEE_HOLE = { minPrice: 7991, maxPrice: 7999, fee: 360 } as const;

/** Copart bands that are not `IAAI − $106`. */
const COPART_FLAT_RANGES: readonly {
  minPrice: number;
  maxPrice: number;
  fee: number;
}[] = [
  { minPrice: 8500, maxPrice: 9999, fee: 1089 },
  { minPrice: 12500, maxPrice: 14999, fee: 1119 },
];

export function computeAuctionFee(
  vehiclePrice: number,
  auction: AuctionId,
  customAuctionFee = 0,
): number {
  if (auction === "custom") {
    return roundUsd(Math.max(0, customAuctionFee));
  }

  const price = Math.max(0, vehiclePrice);
  if (auction === "copart") return computeCopartFee(price);
  return computeIaaiFee(price);
}

function computeIaaiFee(price: number): number {
  if (price >= calculatorRates.iaaiPercentFromPrice) {
    return percentFee(price, calculatorRates.iaaiPercentFlatUsd);
  }
  if (price >= IAAI_FEE_HOLE.minPrice && price <= IAAI_FEE_HOLE.maxPrice) {
    return IAAI_FEE_HOLE.fee;
  }
  return lookupTier(price, IAAI_TIERS);
}

function computeCopartFee(price: number): number {
  if (price >= calculatorRates.iaaiPercentFromPrice) {
    return percentFee(
      price,
      calculatorRates.iaaiPercentFlatUsd - calculatorRates.copartDiscountUsd,
    );
  }

  const flat = COPART_FLAT_RANGES.find(
    (range) => price >= range.minPrice && price <= range.maxPrice,
  );
  if (flat) return flat.fee;
  return lookupTier(price, IAAI_TIERS) - calculatorRates.copartDiscountUsd;
}

function percentFee(price: number, flatUsd: number): number {
  return roundUsd((price * calculatorRates.iaaiPercent) / 100 + flatUsd);
}

function lookupTier(price: number, tiers: readonly FeeTier[]): number {
  let fee = tiers[0]?.fee ?? 0;
  for (const tier of tiers) {
    if (price < tier.minPrice) break;
    fee = tier.fee;
  }
  return fee;
}
