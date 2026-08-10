import type {
  AgeGroupId,
  AuctionId,
  CalculatorErrors,
  CalculatorInput,
  EngineTypeId,
  VehicleTypeId,
} from "@/lib/calculator/types";

export type ValidationMessages = {
  required: string;
  positiveNumber: string;
  engineVolume: string;
  year: string;
};

const auctions = new Set<AuctionId>(["iaai", "copart", "manheim"]);
const engineTypes = new Set<EngineTypeId>([
  "petrol",
  "diesel",
  "hybrid",
  "electric",
]);
const ageGroups = new Set<AgeGroupId>(["under3", "3to5", "over5"]);
const vehicleTypes = new Set<VehicleTypeId>([
  "sedan",
  "suv",
  "pickup",
  "minivan",
  "other",
]);

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string" || value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export type RawCalculatorValues = {
  vehiclePrice: string;
  auction: string;
  auctionLocation: string;
  transportFee: string;
  engineType: string;
  ageGroup: string;
  year: string;
  engineVolumeCm3: string;
  vehicleType: string;
  insuranceEnabled: boolean;
};

export function validateCalculatorInput(
  raw: RawCalculatorValues,
  messages: ValidationMessages,
): { ok: true; value: CalculatorInput } | { ok: false; errors: CalculatorErrors } {
  const errors: CalculatorErrors = {};

  const vehiclePrice = parseNumber(raw.vehiclePrice);
  if (vehiclePrice === null) errors.vehiclePrice = messages.required;
  else if (vehiclePrice <= 0) errors.vehiclePrice = messages.positiveNumber;

  if (!auctions.has(raw.auction as AuctionId)) {
    errors.auction = messages.required;
  }

  if (!raw.auctionLocation.trim()) {
    errors.auctionLocation = messages.required;
  }

  const transportFee = parseNumber(raw.transportFee);
  if (transportFee === null) errors.transportFee = messages.required;
  else if (transportFee < 0) errors.transportFee = messages.positiveNumber;

  if (!engineTypes.has(raw.engineType as EngineTypeId)) {
    errors.engineType = messages.required;
  }

  if (!ageGroups.has(raw.ageGroup as AgeGroupId)) {
    errors.ageGroup = messages.required;
  }

  const year = parseNumber(raw.year);
  const currentYear = new Date().getFullYear();
  if (year === null) errors.year = messages.required;
  else if (year < 1990 || year > currentYear + 1) errors.year = messages.year;

  const engineVolumeCm3 = parseNumber(raw.engineVolumeCm3);
  if (engineVolumeCm3 === null) errors.engineVolumeCm3 = messages.required;
  else if (engineVolumeCm3 <= 0) errors.engineVolumeCm3 = messages.engineVolume;

  if (!vehicleTypes.has(raw.vehicleType as VehicleTypeId)) {
    errors.vehicleType = messages.required;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      vehiclePrice: vehiclePrice as number,
      auction: raw.auction as AuctionId,
      auctionLocation: raw.auctionLocation.trim(),
      transportFee: transportFee as number,
      engineType: raw.engineType as EngineTypeId,
      ageGroup: raw.ageGroup as AgeGroupId,
      year: year as number,
      engineVolumeCm3: engineVolumeCm3 as number,
      vehicleType: raw.vehicleType as VehicleTypeId,
      insuranceEnabled: raw.insuranceEnabled,
    },
  };
}
