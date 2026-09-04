import shippingLocations from "@/lib/calculator/data/shipping-locations.json";
import shippingCallForPrice from "@/lib/calculator/data/shipping-call-for-price.json";
import type { VehicleTypeId } from "@/lib/calculator/types";

/**
 * Per-yard shipping to Gyumri (USD).
 * Base table from CarMark/IAA; numeric Car(/eligible Pickup/SUV) cells from
 * `docs/auctionauto-shipping-rates-2024-11-03.md` and sedan alignment from
 * `docs/gyumri-shipping-rates-2026-09-03.md` when the yard matches.
 * Motorcycle shipping is a flat $300 for every yard.
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

export function lookupShippingFee(
  locationId: string,
  vehicleType: VehicleTypeId,
): number {
  const location = findShippingLocation(locationId);
  if (!location) return 0;
  return location[vehicleType];
}

/**
 * True when AuctionAuto marks this yard + body type as "Call for price".
 */
export function requiresShippingCall(
  locationId: string,
  vehicleType: VehicleTypeId,
): boolean {
  const types = callForPriceByLocation[locationId];
  if (!types) return false;
  return types.includes(vehicleType);
}

export function shippingLocationOptions(): { value: string; label: string }[] {
  return locations.map((item) => ({ value: item.id, label: item.name }));
}
