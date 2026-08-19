import { calculatorRates } from "@/lib/calculator/rates";
import type { EngineTypeId } from "@/lib/calculator/types";

export function isElectricExemptionApplied(
  engineType: EngineTypeId,
  productionYear: number,
  currentYear = new Date().getFullYear(),
): boolean {
  if (engineType !== "electric") return false;
  if (productionYear < calculatorRates.evExemptionFromYear) return false;
  return currentYear <= calculatorRates.evExemptionThroughYear;
}
