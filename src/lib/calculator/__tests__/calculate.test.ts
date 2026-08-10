import { describe, expect, it } from "vitest";
import { calculateImportCost } from "@/lib/calculator/calculate";
import { computeAuctionFee } from "@/lib/calculator/auction-fee";
import { validateCalculatorInput } from "@/lib/calculator/validate";
import type { CalculatorInput } from "@/lib/calculator/types";

const baseInput: CalculatorInput = {
  vehiclePrice: 10000,
  auction: "iaai",
  auctionLocation: "ca",
  transportFee: 1200,
  engineType: "petrol",
  ageGroup: "under3",
  year: 2022,
  engineVolumeCm3: 2000,
  vehicleType: "sedan",
  insuranceEnabled: false,
};

describe("computeAuctionFee", () => {
  it("adds progressive tier and platform fee", () => {
    expect(computeAuctionFee(10000, "iaai")).toBe(495);
    expect(computeAuctionFee(10000, "copart")).toBe(489);
  });
});

describe("validateCalculatorInput", () => {
  const messages = {
    required: "required",
    positiveNumber: "positive",
    engineVolume: "volume",
    year: "year",
  };

  it("rejects empty required fields", () => {
    const result = validateCalculatorInput(
      {
        vehiclePrice: "",
        auction: "iaai",
        auctionLocation: "",
        transportFee: "",
        engineType: "petrol",
        ageGroup: "under3",
        year: "",
        engineVolumeCm3: "0",
        vehicleType: "sedan",
        insuranceEnabled: false,
      },
      messages,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.vehiclePrice).toBeDefined();
      expect(result.errors.auctionLocation).toBeDefined();
      expect(result.errors.year).toBeDefined();
      expect(result.errors.engineVolumeCm3).toBeDefined();
    }
  });

  it("accepts a valid payload", () => {
    const result = validateCalculatorInput(
      {
        vehiclePrice: "10000",
        auction: "copart",
        auctionLocation: "tx",
        transportFee: "900",
        engineType: "diesel",
        ageGroup: "3to5",
        year: "2019",
        engineVolumeCm3: "2200",
        vehicleType: "suv",
        insuranceEnabled: true,
      },
      messages,
    );
    expect(result.ok).toBe(true);
  });
});

describe("calculateImportCost", () => {
  it("returns physical and legal variants with expected line items", () => {
    const result = calculateImportCost(baseInput);
    expect(result.ratesStatus).toBe("DRAFT_PENDING_BUSINESS");
    expect(result.physical.vehiclePrice).toBe(10000);
    expect(result.physical.auctionFee).toBe(495);
    expect(result.physical.serviceFee).toBe(524.75);
    expect(result.physical.transportFee).toBe(1200);
    expect(result.physical.insuranceFee).toBe(0);
    expect(result.physical.totalBeforeCustoms).toBe(12219.75);
    expect(result.legal.customsFee).toBeLessThan(result.physical.customsFee);
    expect(result.physical.finalTotal).toBeGreaterThan(
      result.physical.totalBeforeCustoms,
    );
  });

  it("applies insurance when enabled", () => {
    const result = calculateImportCost({
      ...baseInput,
      insuranceEnabled: true,
    });
    expect(result.physical.insuranceFee).toBe(168);
  });
});
