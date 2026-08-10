import { computeAuctionFee, roundMoney } from "@/lib/calculator/auction-fee";
import { computeCustomsFee } from "@/lib/calculator/customs";
import { calculatorRates, RATES_STATUS } from "@/lib/calculator/rates";
import type {
  CalculatorInput,
  CalculatorResult,
  CostBreakdown,
} from "@/lib/calculator/types";

function buildBreakdown(
  input: CalculatorInput,
  auctionFee: number,
  customsFee: number,
): CostBreakdown {
  const serviceFee = roundMoney(
    ((input.vehiclePrice + auctionFee) * calculatorRates.serviceFeePercent) / 100,
  );
  const insuranceFee = input.insuranceEnabled
    ? roundMoney(
        ((input.vehiclePrice + input.transportFee) *
          calculatorRates.insurancePercent) /
          100,
      )
    : 0;

  const totalBeforeCustoms = roundMoney(
    input.vehiclePrice +
      auctionFee +
      serviceFee +
      input.transportFee +
      insuranceFee,
  );

  return {
    vehiclePrice: roundMoney(input.vehiclePrice),
    auctionFee,
    serviceFee,
    transportFee: roundMoney(input.transportFee),
    insuranceFee,
    totalBeforeCustoms,
    customsFee,
    finalTotal: roundMoney(totalBeforeCustoms + customsFee),
  };
}

export function calculateImportCost(input: CalculatorInput): CalculatorResult {
  const auctionFee = computeAuctionFee(input.vehiclePrice, input.auction);
  const taxableBase = input.vehiclePrice + auctionFee + input.transportFee;

  const physicalCustoms = computeCustomsFee({
    taxableBase,
    engineVolumeCm3: input.engineVolumeCm3,
    ageGroup: input.ageGroup,
    engineType: input.engineType,
    personType: "physical",
  });

  const legalCustoms = computeCustomsFee({
    taxableBase,
    engineVolumeCm3: input.engineVolumeCm3,
    ageGroup: input.ageGroup,
    engineType: input.engineType,
    personType: "legal",
  });

  return {
    input,
    currency: calculatorRates.currency,
    ratesStatus: RATES_STATUS,
    physical: buildBreakdown(input, auctionFee, physicalCustoms),
    legal: buildBreakdown(input, auctionFee, legalCustoms),
    computedAt: new Date().toISOString(),
  };
}
