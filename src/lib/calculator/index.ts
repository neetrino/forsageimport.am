export { calculateImportCost } from "@/lib/calculator/calculate";
export { validateCalculatorInput } from "@/lib/calculator/validate";
export { formatUsd } from "@/lib/calculator/format";
export { calculatorRates, RATES_STATUS } from "@/lib/calculator/rates";
export { yearsForAgeGroup } from "@/lib/calculator/age";
export {
  lookupShippingFee,
  requiresShippingCall,
  shippingLocationOptions,
  findShippingLocation,
} from "@/lib/calculator/shipping";
export type {
  CalculatorInput,
  CalculatorResult,
  CalculatorErrors,
  SharedCost,
  CustomsBreakdown,
} from "@/lib/calculator/types";
