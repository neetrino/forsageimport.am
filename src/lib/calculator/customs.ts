import { calculatorRates } from "@/lib/calculator/rates";
import { roundMoney } from "@/lib/calculator/auction-fee";
import type { AgeGroupId, EngineTypeId } from "@/lib/calculator/types";

type CustomsParams = {
  taxableBase: number;
  engineVolumeCm3: number;
  ageGroup: AgeGroupId;
  engineType: EngineTypeId;
  personType: "physical" | "legal";
};

export function computeCustomsFee(params: CustomsParams): number {
  const table =
    params.personType === "physical"
      ? calculatorRates.customs.physical
      : calculatorRates.customs.legal;
  const band = table[params.ageGroup];
  const engineMultiplier =
    calculatorRates.customs.engineTypeMultiplier[params.engineType];

  const raw =
    (params.taxableBase * band.baseRate +
      params.engineVolumeCm3 * band.volumeRate) *
    engineMultiplier;

  return roundMoney(Math.max(0, raw));
}
