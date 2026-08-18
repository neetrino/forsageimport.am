import { calculatorRates } from "@/lib/calculator/rates";
import { percentOf } from "@/lib/calculator/money";
import type { AgeGroupId, VehicleTypeId } from "@/lib/calculator/types";

export function computeEcoFee(params: {
  base: number;
  ageGroup: AgeGroupId;
  vehicleType: VehicleTypeId;
}): number {
  if (params.vehicleType === "motorcycle") return 0;
  return percentOf(params.base, calculatorRates.ecoPercent[params.ageGroup]);
}
