import { computeEcoFee } from "@/lib/calculator/eco";
import {
  cbaEurUsd,
  calculatorRates,
  euroToUsd,
} from "@/lib/calculator/rates";
import { percentOf, roundUsd } from "@/lib/calculator/money";
import {
  PHYSICAL_3_TO_5_BANDS,
  PHYSICAL_5_PLUS_BANDS,
  euroPerCm3ForVolume,
} from "@/lib/calculator/volume-rate";
import type {
  AgeGroupId,
  CustomsBreakdown,
  EngineTypeId,
  VehicleTypeId,
} from "@/lib/calculator/types";

const FLAT_RATE_VEHICLES = new Set<VehicleTypeId>([
  "sedan",
  "suv",
  "big_suv",
  "van",
]);

type PhysicalParams = {
  vehiclePrice: number;
  auctionFee: number;
  preCustoms: number;
  totalBeforeCustoms: number;
  engineVolumeCm3: number;
  ageGroup: AgeGroupId;
  vehicleType: VehicleTypeId;
  engineType: EngineTypeId;
  electricExemptionApplied: boolean;
};

export function computePhysicalCustoms(params: PhysicalParams): CustomsBreakdown {
  const hammerBase = params.vehiclePrice + params.auctionFee;
  const environmental = computeEcoFee({
    base: hammerBase,
    ageGroup: params.ageGroup,
    vehicleType: params.vehicleType,
  });

  if (params.electricExemptionApplied) {
    return finishPhysical(params, {
      duty: 0,
      vat: 0,
      flatRate: 0,
      usesFlatRate: false,
      environmental,
    });
  }

  if (params.engineType === "electric" || params.vehicleType === "pickup") {
    const duty = percentOf(
      hammerBase,
      calculatorRates.physicalCommercialDutyPercent,
    );
    return finishPhysical(params, {
      duty,
      vat: percentOf(hammerBase + duty, calculatorRates.legalVatPercent),
      flatRate: 0,
      usesFlatRate: false,
      environmental,
    });
  }

  if (params.vehicleType === "motorcycle") {
    return finishPhysical(params, {
      duty: percentOf(hammerBase, calculatorRates.physicalMotorcycleDutyPercent),
      vat: 0,
      flatRate: 0,
      usesFlatRate: false,
      environmental: 0,
    });
  }

  const flatRate = passengerFlatRate(params, hammerBase);
  return finishPhysical(params, {
    duty: 0,
    vat: 0,
    flatRate,
    usesFlatRate: FLAT_RATE_VEHICLES.has(params.vehicleType),
    environmental,
  });
}

function passengerFlatRate(params: PhysicalParams, hammerBase: number): number {
  if (params.ageGroup === "under3") {
    return under3FlatRate(hammerBase, params.engineVolumeCm3);
  }

  const bands =
    params.ageGroup === "3to5" ? PHYSICAL_3_TO_5_BANDS : PHYSICAL_5_PLUS_BANDS;
  return roundUsd(
    euroToUsd(
      euroPerCm3ForVolume(params.engineVolumeCm3, bands) * params.engineVolumeCm3,
    ),
  );
}

function under3FlatRate(hammerBase: number, volumeCm3: number): number {
  const adValorem = roundUsd(
    (hammerBase * calculatorRates.under3AdValoremPercent) /
      100 *
      (calculatorRates.workingEurUsd / cbaEurUsd()),
  );
  const valueEur = hammerBase / calculatorRates.workingEurUsd;
  const euroRate = under3EuroPerCm3(valueEur);
  const specific = roundUsd(euroToUsd(euroRate * volumeCm3));
  return Math.max(adValorem, specific);
}

function under3EuroPerCm3(valueEur: number): number {
  const [low, mid, high] = calculatorRates.under3EuroPerCm3;
  if (valueEur <= calculatorRates.under3ValueEurTier1Max) return low;
  if (valueEur <= calculatorRates.under3ValueEurTier2Max) return mid;
  return high;
}

function finishPhysical(
  params: PhysicalParams,
  parts: Pick<
    CustomsBreakdown,
    "duty" | "vat" | "flatRate" | "usesFlatRate" | "environmental"
  >,
): CustomsBreakdown {
  const customsTotal =
    parts.duty + parts.vat + parts.environmental + parts.flatRate;
  return {
    ...parts,
    brokerage: 0,
    electricExemptionApplied: params.electricExemptionApplied,
    customsTotal,
    finalTotal: params.totalBeforeCustoms + customsTotal,
  };
}
