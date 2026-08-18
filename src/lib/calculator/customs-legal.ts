import { computeEcoFee } from "@/lib/calculator/eco";
import { euroToUsd, calculatorRates } from "@/lib/calculator/rates";
import { percentOf, roundUsd } from "@/lib/calculator/money";
import { LEGAL_OVER_7_BANDS, euroPerCm3ForVolume } from "@/lib/calculator/volume-rate";
import type { AgeGroupId, CustomsBreakdown, VehicleTypeId } from "@/lib/calculator/types";

type LegalParams = {
  preCustoms: number;
  totalBeforeCustoms: number;
  engineVolumeCm3: number;
  ageGroup: AgeGroupId;
  vehicleType: VehicleTypeId;
  electricExemptionApplied: boolean;
};

export function computeLegalCustoms(params: LegalParams): CustomsBreakdown {
  const duty = params.electricExemptionApplied ? 0 : legalDuty(params);
  const vat = params.electricExemptionApplied
    ? 0
    : percentOf(
        params.preCustoms + duty,
        calculatorRates.legalVatPercent,
      );
  const environmental = computeEcoFee({
    base: params.preCustoms,
    ageGroup: params.ageGroup,
    vehicleType: params.vehicleType,
  });
  const brokerage = calculatorRates.legalBrokerageUsd;
  const customsTotal = duty + vat + environmental + brokerage;

  return {
    duty,
    vat,
    environmental,
    brokerage,
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
    return roundUsd(
      euroToUsd(
        euroPerCm3ForVolume(params.engineVolumeCm3, LEGAL_OVER_7_BANDS) *
          params.engineVolumeCm3,
      ),
    );
  }

  if (params.ageGroup === "under3") {
    const percent =
      params.engineVolumeCm3 >= calculatorRates.legalUnder3HighVolumeFrom
        ? calculatorRates.legalUnder3HighVolumeDutyPercent
        : calculatorRates.legalUnder3DutyPercent;
    return percentOf(params.preCustoms, percent);
  }

  const adValorem = percentOf(
    params.preCustoms,
    calculatorRates.legalMidAgeDutyPercent,
  );
  if (params.engineVolumeCm3 <= 3000) return adValorem;

  const specific = roundUsd(
    euroToUsd(calculatorRates.legalMidAgeSpecificEuro * params.engineVolumeCm3),
  );
  return Math.max(adValorem, specific);
}
