import shippingLocations from "@/lib/calculator/data/shipping-locations.json";
import shippingCallForPrice from "@/lib/calculator/data/shipping-call-for-price.json";
import type { VehicleTypeId } from "@/lib/calculator/types";

/**
 * Per-yard shipping to Gyumri (USD).
 * Base table from CarMark/IAA; numeric Car(/eligible Pickup/SUV) cells from
 * `docs/auctionauto-shipping-rates-2024-11-03.md` and sedan alignment from
 * `docs/gyumri-shipping-rates-2026-09-03.md` when the yard matches.
 * Motorcycle shipping is a flat $300 for every yard.
 * SUV ships at the sedan rate, large SUV at the sedan rate plus $300, and EV
 * and hybrid at the sedan rate plus $100, so the `suv` and `big_suv` columns
 * in the table are kept only as source reference.
 * `Call for price` is kept only for yards without a usable sedan rate
 * (currently ND-BISMARCK). See `docs/auctionauto-call-for-price-2024-11-03.md`.
 */
export type ShippingLocation = {
  id: string;
  name: string;
  sedan: number;
  suv: number;
  pickup: number;
  motorcycle: number;
  big_suv: number;
  van: number;
};

const locations = shippingLocations as ShippingLocation[];
const callForPriceByLocation = shippingCallForPrice as Record<
  string,
  readonly VehicleTypeId[]
>;

export function listShippingLocations(): readonly ShippingLocation[] {
  return locations;
}

export function findShippingLocation(
  locationId: string,
): ShippingLocation | undefined {
  return locations.find((item) => item.id === locationId);
}

/** Numeric rate columns stored on each yard row. */
type ShippingRateColumn = Exclude<keyof ShippingLocation, "id" | "name">;

/** Flat USD added on top of the sedan rate for selected body types. */
const BODY_SURCHARGE_USD: Partial<Record<VehicleTypeId, number>> = {
  big_suv: 300,
  ev: 100,
  hybrid: 100,
};

/**
 * Resolves the yard column a body type is billed from, so derived body types
 * stay consistent with the rate they are calculated off.
 */
function rateColumn(vehicleType: VehicleTypeId): ShippingRateColumn {
  switch (vehicleType) {
    case "sedan":
    case "suv":
    case "big_suv":
    case "ev":
    case "hybrid":
      return "sedan";
    case "pickup":
    case "van":
    case "motorcycle":
      return vehicleType;
  }
}

export function lookupShippingFee(
  locationId: string,
  vehicleType: VehicleTypeId,
): number {
  const location = findShippingLocation(locationId);
  if (!location) return 0;
  const base = location[rateColumn(vehicleType)];
  return base + (BODY_SURCHARGE_USD[vehicleType] ?? 0);
}

/**
 * True when AuctionAuto marks this yard + body type as "Call for price".
 * Body types billed off another column inherit that column's flag.
 */
export function requiresShippingCall(
  locationId: string,
  vehicleType: VehicleTypeId,
): boolean {
  const types = callForPriceByLocation[locationId];
  if (!types) return false;
  return types.includes(vehicleType) || types.includes(rateColumn(vehicleType));
}

export function shippingLocationOptions(): { value: string; label: string }[] {
  return locations.map((item) => ({ value: item.id, label: item.name }));
}
