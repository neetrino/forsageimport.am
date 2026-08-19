import { resolveAgeGroup } from "@/lib/calculator/age";
import { computeAuctionFee } from "@/lib/calculator/auction-fee";
import { computeLegalCustoms } from "@/lib/calculator/customs-legal";
import { computePhysicalCustoms } from "@/lib/calculator/customs-physical";
import { isElectricExemptionApplied } from "@/lib/calculator/ev-exemption";
import { percentOf, roundUsd } from "@/lib/calculator/money";
import { calculatorRates, RATES_STATUS } from "@/lib/calculator/rates";
import type { CalculatorInput, CalculatorResult, SharedCost } from "@/lib/calculator/types";

export function calculateImportCost(input: CalculatorInput): CalculatorResult {
  const ageGroup = resolveAgeGroup(input.year);
  const auctionFee = computeAuctionFee(
    input.vehiclePrice,
    input.auction,
    input.customAuctionFee,
  );
  const transportFee = roundUsd(input.transportFee);
  const insuranceFee = input.insuranceEnabled
    ? percentOf(
        input.vehiclePrice + auctionFee + transportFee,
        calculatorRates.insurancePercent,
      )
    : 0;
  const serviceFee = Math.max(
    calculatorRates.serviceFeeMinUsd,
    percentOf(
      input.vehiclePrice + auctionFee,
      calculatorRates.serviceFeePercent,
    ),
  );
  const preCustoms = roundUsd(
    input.vehiclePrice + auctionFee + transportFee + insuranceFee,
  );
  const shared: SharedCost = {
    vehiclePrice: roundUsd(input.vehiclePrice),
    auctionFee,
    serviceFee,
    transportFee,
    insuranceFee,
    preCustoms,
    totalBeforeCustoms: preCustoms + serviceFee,
  };
  const electricExemptionApplied = isElectricExemptionApplied(
    input.engineType,
    input.year,
  );
  const customsInput = {
    preCustoms,
    totalBeforeCustoms: shared.totalBeforeCustoms,
    engineVolumeCm3: input.engineVolumeCm3,
    ageGroup,
    vehicleType: input.vehicleType,
    electricExemptionApplied,
  };

  return {
    input,
    currency: calculatorRates.currency,
    ratesStatus: RATES_STATUS,
    ageGroup,
    shared,
    physical: computePhysicalCustoms({
      ...customsInput,
      vehiclePrice: shared.vehiclePrice,
      auctionFee,
      engineType: input.engineType,
    }),
    legal: computeLegalCustoms(customsInput),
    computedAt: new Date().toISOString(),
  };
}
