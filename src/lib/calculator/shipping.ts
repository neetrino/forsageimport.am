import shippingLocations from "@/lib/calculator/data/shipping-locations.json";
import type { VehicleTypeId } from "@/lib/calculator/types";

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

export function shippingLocationOptions(): { value: string; label: string }[] {
  return locations.map((item) => ({ value: item.id, label: item.name }));
}
