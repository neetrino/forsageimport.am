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
  PHYSICAL_UNDER3_VALUE_TIERS,
  euroPerCm3ForVolume,
  type ValueTier,
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
  "ev",
  "hybrid",
]);

type PhysicalParams = {
  vehiclePrice: number;
  auctionFee: number;
  preCustoms: number;
  totalBeforeCustoms: number;
  engineVolumeCm3: number;
  ageGroup: AgeGroupId;
  productionYear: number;
  vehicleType: VehicleTypeId;
  engineType: EngineTypeId;
  electricExemptionApplied: boolean;
};

export function computePhysicalCustoms(params: PhysicalParams): CustomsBreakdown {
  const hammerBase = params.vehiclePrice + params.auctionFee;
  const environmental = computeEcoFee({
    base: hammerBase,
    ageGroup: params.ageGroup,
    productionYear: params.productionYear,
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
  const valueEur = hammerBase / calculatorRates.workingEurUsd;
  const tier = under3ValueTier(valueEur);
  const adValorem = eurAdValoremUsd(hammerBase, tier.adValoremPercent);
  const specific = roundUsd(euroToUsd(tier.euroPerCm3 * volumeCm3));
  return Math.max(adValorem, specific);
}

function under3ValueTier(valueEur: number): ValueTier {
  const tier = PHYSICAL_UNDER3_VALUE_TIERS.find((item) => valueEur <= item.maxValueEur);
  const fallback = PHYSICAL_UNDER3_VALUE_TIERS.at(-1);
  if (!fallback) {
    throw new Error("Physical under-3 value table is empty");
  }
  return tier ?? fallback;
}

/** Percent of an EUR customs value, converted back with the working USD rate. */
function eurAdValoremUsd(hammerBase: number, percent: number): number {
  const fx = calculatorRates.workingEurUsd / cbaEurUsd();
  return roundUsd((hammerBase * percent * fx) / 100);
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
    electricExemptionApplied: params.electricExemptionApplied,
    customsTotal,
    finalTotal: params.totalBeforeCustoms + customsTotal,
  };
}
