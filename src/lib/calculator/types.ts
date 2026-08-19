export type AuctionId = "iaai" | "copart" | "custom";

export type EngineTypeId = "petrol" | "diesel" | "hybrid" | "electric";

export type AgeGroupId = "under3" | "3to5" | "5to7" | "over7";

export type VehicleTypeId =
  | "sedan"
  | "suv"
  | "big_suv"
  | "van"
  | "pickup"
  | "motorcycle";

export type RatesStatus = "IAA_PARITY_OBSERVED";

export type CalculatorInput = {
  vehiclePrice: number;
  auction: AuctionId;
  customAuctionFee: number;
  auctionLocationId: string;
  transportFee: number;
  engineType: EngineTypeId;
  ageGroup: AgeGroupId;
  year: number;
  engineVolumeCm3: number;
  vehicleType: VehicleTypeId;
  insuranceEnabled: boolean;
};

export type SharedCost = {
  vehiclePrice: number;
  auctionFee: number;
  serviceFee: number;
  transportFee: number;
  insuranceFee: number;
  preCustoms: number;
  totalBeforeCustoms: number;
};

export type CustomsBreakdown = {
  duty: number;
  vat: number;
  environmental: number;
  brokerage: number;
  flatRate: number;
  usesFlatRate: boolean;
  electricExemptionApplied: boolean;
  customsTotal: number;
  finalTotal: number;
};

export type CalculatorResult = {
  input: CalculatorInput;
  currency: "USD";
  ratesStatus: RatesStatus;
  ageGroup: AgeGroupId;
  shared: SharedCost;
  physical: CustomsBreakdown;
  legal: CustomsBreakdown;
  computedAt: string;
};

export type CalculatorField =
  | "vehiclePrice"
  | "auction"
  | "customAuctionFee"
  | "auctionLocationId"
  | "transportFee"
  | "engineType"
  | "ageGroup"
  | "year"
  | "engineVolumeCm3"
  | "vehicleType";

export type CalculatorErrors = Partial<Record<CalculatorField, string>>;
