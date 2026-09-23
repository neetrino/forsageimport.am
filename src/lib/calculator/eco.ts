import { percentOf } from "@/lib/calculator/money";
import type { AgeGroupId, VehicleTypeId } from "@/lib/calculator/types";

const UNDER3_ECO_PERCENT = 2;
const AGE_3_TO_5_ECO_PERCENT = 4;
const ECO_BEFORE_2010_PERCENT = 24;

/**
 * Cars older than 5 years. Year 2010 stays in the 12% band named "2016–2010".
 * 24% starts in 2009. The sheet's "(2010--)" overlaps that year.
 */
const OLDER_ECO_YEAR_BANDS = [
  { minYear: 2017, percent: 6 },
  { minYear: 2010, percent: 12 },
] as const;

/**
 * Environmental tax from the 2026-09-23 sheet.
 * Under 3 years is 2% and 3–5 years is 4% for both payers.
 * A 2021 car is in the 5–7 group in 2026, so it uses 6% from the 5+ section.
 * The physical 3–5 block also names 2021 at 4%; that row is not used.
 */
export function computeEcoFee(params: {
  base: number;
  ageGroup: AgeGroupId;
  productionYear: number;
  vehicleType: VehicleTypeId;
}): number {
  if (params.vehicleType === "motorcycle") return 0;
  return percentOf(params.base, ecoPercent(params.ageGroup, params.productionYear));
}

function ecoPercent(ageGroup: AgeGroupId, productionYear: number): number {
  if (ageGroup === "under3") return UNDER3_ECO_PERCENT;
  if (ageGroup === "3to5") return AGE_3_TO_5_ECO_PERCENT;
  const band = OLDER_ECO_YEAR_BANDS.find((item) => productionYear >= item.minYear);
  return band?.percent ?? ECO_BEFORE_2010_PERCENT;
}
