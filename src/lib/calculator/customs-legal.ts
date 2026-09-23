import { computeEcoFee } from "@/lib/calculator/eco";
import { euroToUsd, calculatorRates } from "@/lib/calculator/rates";
import { percentOf, roundUsd } from "@/lib/calculator/money";
import {
  HIGH_CLEARANCE_FIFTEEN_PERCENT,
  HIGH_CLEARANCE_TEN_PERCENT,
  HIGH_CLEARANCE_TEN_PERCENT_FROM,
  LEGAL_MID_AGE_FLOORS,
  LEGAL_MID_AGE_PERCENT,
  LEGAL_OVER_7_BANDS,
  LEGAL_UNDER3_HIGH_VOLUME_PERCENT,
  LEGAL_UNDER3_LOW_VOLUME_MAX,
  LEGAL_UNDER3_LOW_VOLUME_PERCENT,
  euroPerCm3ForVolume,
  type VolumeBand,
} from "@/lib/calculator/volume-rate";
import type { AgeGroupId, CustomsBreakdown, VehicleTypeId } from "@/lib/calculator/types";

type LegalParams = {
  preCustoms: number;
  totalBeforeCustoms: number;
  engineVolumeCm3: number;
  ageGroup: AgeGroupId;
  productionYear: number;
  vehicleType: VehicleTypeId;
  electricExemptionApplied: boolean;
};

export function computeLegalCustoms(params: LegalParams): CustomsBreakdown {
  const duty = params.electricExemptionApplied ? 0 : legalDuty(params);
  const vat = params.electricExemptionApplied
    ? 0
    : percentOf(params.preCustoms + duty, calculatorRates.legalVatPercent);
  const environmental = computeEcoFee({
    base: params.preCustoms,
    ageGroup: params.ageGroup,
    productionYear: params.productionYear,
    vehicleType: params.vehicleType,
  });
  const customsTotal = duty + vat + environmental;

  return {
    duty,
    vat,
    environmental,
    flatRate: 0,
    usesFlatRate: false,
    electricExemptionApplied: params.electricExemptionApplied,
    customsTotal,
    finalTotal: params.totalBeforeCustoms + customsTotal,
  };
}

function legalDuty(params: LegalParams): number {
  if (params.vehicleType === "motorcycle") {
    return percentOf(params.preCustoms, calculatorRates.legalMotorcycleDutyPercent);
  }
  if (params.ageGroup === "over7") {
    return specificUsd(params.engineVolumeCm3, LEGAL_OVER_7_BANDS);
  }
  if (params.ageGroup === "under3") {
    return percentOf(params.preCustoms, legalUnder3Percent(params));
  }
  return legalMidAgeDuty(params);
}

function legalUnder3Percent(params: LegalParams): number {
  if (params.vehicleType === "big_suv") {
    return highClearanceUnder3Percent(params.engineVolumeCm3);
  }
  if (params.engineVolumeCm3 <= LEGAL_UNDER3_LOW_VOLUME_MAX) {
    return LEGAL_UNDER3_LOW_VOLUME_PERCENT;
  }
  return LEGAL_UNDER3_HIGH_VOLUME_PERCENT;
}

function highClearanceUnder3Percent(volumeCm3: number): number {
  if (volumeCm3 >= HIGH_CLEARANCE_TEN_PERCENT_FROM) {
    return HIGH_CLEARANCE_TEN_PERCENT;
  }
  return HIGH_CLEARANCE_FIFTEEN_PERCENT;
}

function legalMidAgeDuty(params: LegalParams): number {
  const adValorem = percentOf(params.preCustoms, LEGAL_MID_AGE_PERCENT);
  const floor = specificUsd(params.engineVolumeCm3, LEGAL_MID_AGE_FLOORS);
  return Math.max(adValorem, floor);
}

function specificUsd(volumeCm3: number, bands: readonly VolumeBand[]): number {
  const euroPerCm3 = euroPerCm3ForVolume(volumeCm3, bands);
  return roundUsd(euroToUsd(euroPerCm3 * volumeCm3));
}
