import shippingLocations from "@/lib/calculator/data/shipping-locations.json";
import shippingCallForPrice from "@/lib/calculator/data/shipping-call-for-price.json";
import type { VehicleTypeId } from "@/lib/calculator/types";

/**
 * Per-yard shipping to Gyumri (USD).
 * Base table from CarMark/IAA; numeric Car/Motorcycle(/eligible Pickup/SUV)
 * cells from `docs/auctionauto-shipping-rates-2024-11-03.md` override when present.
 * `Call for price` / empty MD cells keep the previous yard price.
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
