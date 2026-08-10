export type AuctionId = "iaai" | "copart" | "manheim";

export type EngineTypeId = "petrol" | "diesel" | "hybrid" | "electric";

export type AgeGroupId = "under3" | "3to5" | "over5";

export type VehicleTypeId = "sedan" | "suv" | "pickup" | "minivan" | "other";

export type CalculatorInput = {
  vehiclePrice: number;
  auction: AuctionId;
  auctionLocation: string;
  transportFee: number;
  engineType: EngineTypeId;
  ageGroup: AgeGroupId;
  year: number;
  engineVolumeCm3: number;
  vehicleType: VehicleTypeId;
  insuranceEnabled: boolean;
};

export type CostBreakdown = {
  vehiclePrice: number;
  auctionFee: number;
  serviceFee: number;
  transportFee: number;
  insuranceFee: number;
  totalBeforeCustoms: number;
  customsFee: number;
  finalTotal: number;
};

export type CalculatorResult = {
  input: CalculatorInput;
  currency: "USD";
  ratesStatus: "DRAFT_PENDING_BUSINESS";
  physical: CostBreakdown;
  legal: CostBreakdown;
  computedAt: string;
};

export type CalculatorField =
  | "vehiclePrice"
  | "auction"
  | "auctionLocation"
  | "transportFee"
  | "engineType"
  | "ageGroup"
  | "year"
  | "engineVolumeCm3"
  | "vehicleType";

export type CalculatorErrors = Partial<Record<CalculatorField, string>>;
