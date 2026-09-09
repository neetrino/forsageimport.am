import shippingLocations from "@/lib/calculator/data/shipping-locations.json";
import shippingCallForPrice from "@/lib/calculator/data/shipping-call-for-price.json";
import type { VehicleTypeId } from "@/lib/calculator/types";

/**
 * Per-yard shipping to Gyumri (USD).
 * Base table from CarMark/IAA; numeric Car(/eligible Pickup/SUV) cells from
 * `docs/auctionauto-shipping-rates-2024-11-03.md` and sedan alignment from
 * `docs/gyumri-shipping-rates-2026-09-03.md` when the yard matches.
 * Motorcycle shipping is a flat $300 for every yard.
 * SUV ships at the sedan rate and large SUV at the sedan rate plus $300, so the
 * `suv` and `big_suv` columns in the table are kept only as source reference.
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

/** Body types shipped at the plain car rate. */
const SEDAN_RATE_VEHICLES = new Set<VehicleTypeId>(["sedan", "suv"]);

/** Flat surcharge a large SUV adds on top of the car rate (USD). */
const BIG_SUV_SURCHARGE = 300;

/**
 * Resolves the yard column a body type is billed from, so derived body types
 * stay consistent with the rate they are calculated off.
 */
function rateColumn(vehicleType: VehicleTypeId): VehicleTypeId {
  if (SEDAN_RATE_VEHICLES.has(vehicleType) || vehicleType === "big_suv") {
    return "sedan";
  }
  return vehicleType;
}

export function lookupShippingFee(
  locationId: string,
  vehicleType: VehicleTypeId,
): number {
  const location = findShippingLocation(locationId);
  if (!location) return 0;
  const base = location[rateColumn(vehicleType)];
  return vehicleType === "big_suv" ? base + BIG_SUV_SURCHARGE : base;
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
