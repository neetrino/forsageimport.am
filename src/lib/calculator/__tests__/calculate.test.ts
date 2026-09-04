import { describe, expect, it } from "vitest";
import { calculateImportCost } from "@/lib/calculator/calculate";
import { computeAuctionFee } from "@/lib/calculator/auction-fee";
import { resolveAgeGroup } from "@/lib/calculator/age";
import { lookupShippingFee, requiresShippingCall } from "@/lib/calculator/shipping";
import { validateCalculatorInput } from "@/lib/calculator/validate";
import type { CalculatorInput } from "@/lib/calculator/types";

const njSedan = lookupShippingFee("187", "sedan");

const baseInput: CalculatorInput = {
  vehiclePrice: 10000,
  auction: "iaai",
  customAuctionFee: 0,
  auctionLocationId: "187",
  transportFee: njSedan,
  engineType: "petrol",
  ageGroup: "under3",
  year: 2025,
  engineVolumeCm3: 2000,
  vehicleType: "sedan",
  insuranceEnabled: true,
};

describe("computeAuctionFee", () => {
  it("uses the IAAI table and Copart offset", () => {
    expect(computeAuctionFee(10000, "iaai")).toBe(1225);
    expect(computeAuctionFee(10000, "copart")).toBe(1119);
    expect(computeAuctionFee(20000, "iaai")).toBe(1575);
    expect(computeAuctionFee(500, "custom", 400)).toBe(400);
  });
});

describe("requiresShippingCall", () => {
  it("flags Call for price only for ND-BISMARCK sedan", () => {
    expect(requiresShippingCall("174", "sedan")).toBe(true);
    expect(requiresShippingCall("174", "motorcycle")).toBe(false);
    expect(requiresShippingCall("73", "sedan")).toBe(false);
    expect(requiresShippingCall("73", "motorcycle")).toBe(false);
    expect(requiresShippingCall("187", "sedan")).toBe(false);
  });
});

describe("lookupShippingFee", () => {
  it("uses a flat $300 motorcycle shipping fee", () => {
    expect(lookupShippingFee("187", "motorcycle")).toBe(300);
    expect(lookupShippingFee("174", "motorcycle")).toBe(300);
    expect(lookupShippingFee("73", "motorcycle")).toBe(300);
  });
});

describe("resolveAgeGroup", () => {
  it("uses production year against the current calendar year", () => {
    expect(resolveAgeGroup(2025, 2026)).toBe("under3");
    expect(resolveAgeGroup(2023, 2026)).toBe("3to5");
    expect(resolveAgeGroup(2020, 2026)).toBe("5to7");
    expect(resolveAgeGroup(2016, 2026)).toBe("over7");
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
        customAuctionFee: "",
        auctionLocationId: "",
        transportFee: "",
        engineType: "petrol",
        ageGroup: "under3",
        year: "",
        engineVolumeCm3: "0",
        vehicleType: "sedan",
        insuranceEnabled: true,
      },
      messages,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.vehiclePrice).toBeDefined();
      expect(result.errors.auctionLocationId).toBeDefined();
      expect(result.errors.year).toBeDefined();
      expect(result.errors.engineVolumeCm3).toBeDefined();
    }
  });

  it("accepts a valid IAA-shaped payload", () => {
    const result = validateCalculatorInput(
      {
        vehiclePrice: "10000",
        auction: "iaai",
        customAuctionFee: "",
        auctionLocationId: "187",
        transportFee: "1990",
        engineType: "diesel",
        ageGroup: "3to5",
        year: "2022",
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
  it("matches the IAA $10k sedan / NJ / 2000cm3 snapshot", () => {
    const result = calculateImportCost(baseInput);
    expect(result.ratesStatus).toBe("IAA_PARITY_OBSERVED");
    expect(result.shared.auctionFee).toBe(1225);
    expect(result.shared.transportFee).toBe(2325);
    expect(result.shared.insuranceFee).toBe(136);
    expect(result.shared.serviceFee).toBe(300);
    expect(result.shared.preCustoms).toBe(13686);
    expect(result.shared.totalBeforeCustoms).toBe(13986);
    expect(result.legal.duty).toBe(2053);
    expect(result.legal.vat).toBe(3148);
    expect(result.legal.environmental).toBe(274);
    expect(result.legal.brokerage).toBe(75);
    expect(result.legal.finalTotal).toBe(19536);
    expect(result.physical.usesFlatRate).toBe(true);
    expect(result.physical.flatRate).toBeGreaterThanOrEqual(8075);
    expect(result.physical.flatRate).toBeLessThanOrEqual(8076);
    expect(result.physical.environmental).toBe(225);
    expect(result.physical.finalTotal).toBeGreaterThan(21000);
  });

  it("applies the 2024+ electric exemption", () => {
    const result = calculateImportCost({
      ...baseInput,
      engineType: "electric",
      engineVolumeCm3: 0,
      year: 2025,
    });
    expect(result.legal.electricExemptionApplied).toBe(true);
    expect(result.legal.duty).toBe(0);
    expect(result.legal.vat).toBe(0);
    expect(result.physical.duty).toBe(0);
    expect(result.physical.vat).toBe(0);
    expect(result.legal.environmental).toBe(274);
  });

  it("keeps duty on a 2023 electric car", () => {
    const result = calculateImportCost({
      ...baseInput,
      engineType: "electric",
      year: 2023,
      engineVolumeCm3: 0,
    });
    expect(result.physical.electricExemptionApplied).toBe(false);
    expect(result.physical.duty).toBe(1684);
    expect(result.physical.vat).toBe(2582);
  });

  it("uses 6% + 375 IAAI fee and the service-fee floor lift", () => {
    const result = calculateImportCost({
      ...baseInput,
      vehiclePrice: 20000,
      insuranceEnabled: false,
    });
    expect(result.shared.auctionFee).toBe(1575);
    expect(result.shared.serviceFee).toBe(324);
  });
});
