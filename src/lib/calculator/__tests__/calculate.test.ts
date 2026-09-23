import { describe, expect, it } from "vitest";
import { calculateImportCost } from "@/lib/calculator/calculate";
import { computeAuctionFee } from "@/lib/calculator/auction-fee";
import { computeCompanyFee } from "@/lib/calculator/company-fee";
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
  it("uses the iaa.am IAAI floors and the 6% branch from $15,000", () => {
    expect(computeAuctionFee(99, "iaai")).toBe(216);
    expect(computeAuctionFee(100, "iaai")).toBe(290);
    expect(computeAuctionFee(350, "iaai")).toBe(365);
    expect(computeAuctionFee(2400, "iaai")).toBe(750);
    expect(computeAuctionFee(5500, "iaai")).toBe(1015);
    expect(computeAuctionFee(7990, "iaai")).toBe(1135);
    expect(computeAuctionFee(7991, "iaai")).toBe(360);
    expect(computeAuctionFee(7999, "iaai")).toBe(360);
    expect(computeAuctionFee(8000, "iaai")).toBe(1175);
    expect(computeAuctionFee(10000, "iaai")).toBe(1225);
    expect(computeAuctionFee(15000, "iaai")).toBe(1275);
    expect(computeAuctionFee(15500, "iaai")).toBe(1305);
    expect(computeAuctionFee(20000, "iaai")).toBe(1575);
    expect(computeAuctionFee(500, "custom", 400)).toBe(400);
  });

  it("prices Copart as IAAI minus $106, with the two flat exceptions", () => {
    expect(computeAuctionFee(1000, "copart")).toBe(444);
    expect(computeAuctionFee(7995, "copart")).toBe(1029);
    expect(computeAuctionFee(8500, "copart")).toBe(1089);
    expect(computeAuctionFee(9999, "copart")).toBe(1089);
    expect(computeAuctionFee(10000, "copart")).toBe(1119);
    expect(computeAuctionFee(12500, "copart")).toBe(1119);
    expect(computeAuctionFee(14999, "copart")).toBe(1119);
    expect(computeAuctionFee(15000, "copart")).toBe(1169);
    expect(computeAuctionFee(20000, "copart")).toBe(1469);
  });
});

describe("computeCompanyFee", () => {
  it("uses the IAA service charge: max(300, 1.5% of hammer plus auction fee), rounded up", () => {
    expect(computeCompanyFee(1000, 550)).toBe(300);
    expect(computeCompanyFee(10000, 1225)).toBe(300);
    expect(computeCompanyFee(10000, 1119)).toBe(300);
    expect(computeCompanyFee(20000, 1575)).toBe(324);
    expect(computeCompanyFee(20000, 1469)).toBe(323);
    expect(computeCompanyFee(30000, 2175)).toBe(483);
    expect(computeCompanyFee(52000, 3495)).toBe(833);
    expect(computeCompanyFee(60000, 3975)).toBe(960);
    expect(computeCompanyFee(60000, 3869)).toBe(959);
  });
});

describe("requiresShippingCall", () => {
  it("flags Call for price for ND-BISMARCK sedan and the body types billed off it", () => {
    expect(requiresShippingCall("174", "sedan")).toBe(true);
    expect(requiresShippingCall("174", "suv")).toBe(true);
    expect(requiresShippingCall("174", "big_suv")).toBe(true);
    expect(requiresShippingCall("174", "ev")).toBe(true);
    expect(requiresShippingCall("174", "hybrid")).toBe(true);
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

  it("ships an SUV at the sedan rate, a large SUV at sedan plus $300, and EV or hybrid at sedan plus $100", () => {
    for (const yard of ["187", "299", "73"]) {
      const sedan = lookupShippingFee(yard, "sedan");
      expect(lookupShippingFee(yard, "suv")).toBe(sedan);
      expect(lookupShippingFee(yard, "big_suv")).toBe(sedan + 300);
      expect(lookupShippingFee(yard, "ev")).toBe(sedan + 100);
      expect(lookupShippingFee(yard, "hybrid")).toBe(sedan + 100);
    }
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
    expect(result.ratesStatus).toBe("FORSAGE_SHEET_2026_09_23");
    expect(result.shared.auctionFee).toBe(1225);
    expect(result.shared.companyFee).toBe(300);
    expect(result.shared.transportFee).toBe(2325);
    expect(result.shared.insuranceFee).toBe(136);
    expect(result.shared.preCustoms).toBe(13686);
    expect(result.shared.totalBeforeCustoms).toBe(13986);
    expect(result.legal.duty).toBe(2053);
    expect(result.legal.vat).toBe(3148);
    expect(result.legal.environmental).toBe(274);
    expect(result.legal.finalTotal).toBe(19461);
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

  it("uses the 6% + 375 IAAI fee above the percent threshold", () => {
    const result = calculateImportCost({
      ...baseInput,
      vehiclePrice: 20000,
      insuranceEnabled: false,
    });
    expect(result.shared.auctionFee).toBe(1575);
    expect(result.shared.companyFee).toBe(324);
    expect(result.shared.insuranceFee).toBe(0);
    expect(result.shared.totalBeforeCustoms).toBe(24224);
  });
});
