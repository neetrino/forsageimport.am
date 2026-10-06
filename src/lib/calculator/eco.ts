import { percentOf, roundUsd } from "@/lib/calculator/money";
import { calculatorRates } from "@/lib/calculator/rates";
import type { VehicleTypeId } from "@/lib/calculator/types";

const ECO_PERCENT_FROM_2024 = 2;
const ECO_PERCENT_FROM_2022 = 4;
const ECO_PERCENT_FROM_2017 = 6;
const ECO_PERCENT_FROM_2010 = 12;
const ECO_PERCENT_BEFORE_2010 = 24;

/** 2016 and older keep the previous vehicle-price base and year bands. */
const ECO_ASSESSED_BASE_FROM_YEAR = 2017;

/**
 * Environmental tax.
 * 2024 and newer is 2%, 2022–2023 is 4%, and 2017–2021 is 6%.
 * Those years use vehicle price + auction fee (FOB) + the fixed customs transport.
 * 2010–2016 stays 12% of the vehicle price. 2009 and older stays 24%.
 */
export function computeEcoFee(params: {
  vehiclePrice: number;
  fob: number;
  productionYear: number;
  vehicleType: VehicleTypeId;
}): number {
  if (params.vehicleType === "motorcycle") return 0;
  return percentOf(ecoBase(params), ecoPercent(params.productionYear));
}

function ecoBase(params: {
  vehiclePrice: number;
  fob: number;
  productionYear: number;
}): number {
  if (params.productionYear < ECO_ASSESSED_BASE_FROM_YEAR) {
    return params.vehiclePrice;
  }
  return roundUsd(
    params.vehiclePrice + params.fob + calculatorRates.customsTransportUsd,
  );
}

function ecoPercent(productionYear: number): number {
  if (productionYear >= 2024) return ECO_PERCENT_FROM_2024;
  if (productionYear >= 2022) return ECO_PERCENT_FROM_2022;
  if (productionYear >= 2017) return ECO_PERCENT_FROM_2017;
  if (productionYear >= 2010) return ECO_PERCENT_FROM_2010;
  return ECO_PERCENT_BEFORE_2010;
}
