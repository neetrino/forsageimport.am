import { describe, expect, it } from "vitest";
import { calculateImportCost } from "@/lib/calculator/calculate";
import { computeEcoFee } from "@/lib/calculator/eco";
import { percentOf, roundUsd } from "@/lib/calculator/money";
import { euroToUsd } from "@/lib/calculator/rates";
import type { CalculatorInput } from "@/lib/calculator/types";

const baseInput: CalculatorInput = {
  vehiclePrice: 10000,
  auction: "iaai",
  customAuctionFee: 0,
  auctionLocationId: "187",
  transportFee: 2325,
  engineType: "petrol",
  ageGroup: "under3",
  year: 2025,
  engineVolumeCm3: 2000,
  vehicleType: "sedan",
  insuranceEnabled: true,
};

function priced(overrides: Partial<CalculatorInput>): CalculatorInput {
  return {
    ...baseInput,
    auction: "custom",
    customAuctionFee: 0,
    transportFee: 0,
    insuranceEnabled: false,
    ...overrides,
  };
}

describe("legal under-3 duty", () => {
  it("keeps 15% through 2,800 cm³ and 12.5% above it", () => {
    const atCap = calculateImportCost({ ...baseInput, engineVolumeCm3: 2800 });
    const above = calculateImportCost({ ...baseInput, engineVolumeCm3: 2801 });
    expect(atCap.legal.duty).toBe(percentOf(atCap.shared.preCustoms, 15));
    expect(above.legal.duty).toBe(percentOf(above.shared.preCustoms, 12.5));
  });

  it("uses the high-clearance schedule for a large SUV", () => {
    const throughGap = calculateImportCost({
      ...baseInput,
      vehicleType: "big_suv",
      engineVolumeCm3: 4000,
    });
    const from4200 = calculateImportCost({
      ...baseInput,
      vehicleType: "big_suv",
      engineVolumeCm3: 4200,
    });
    expect(throughGap.legal.duty).toBe(percentOf(throughGap.shared.preCustoms, 15));
    expect(from4200.legal.duty).toBe(percentOf(from4200.shared.preCustoms, 10));
  });
});

describe("legal mid-age duty floor", () => {
  it("applies the per-cm³ floor when it exceeds 20%", () => {
    const at1500 = calculateImportCost(
      priced({ year: 2022, engineVolumeCm3: 1500, vehiclePrice: 1000 }),
    );
    const at1600 = calculateImportCost(
      priced({ year: 2022, engineVolumeCm3: 1600, vehiclePrice: 1000 }),
    );
    expect(at1500.legal.duty).toBe(roundUsd(euroToUsd(0.4 * 1500)));
    expect(at1600.legal.duty).toBe(roundUsd(euroToUsd(0.36 * 1600)));
  });
});

describe("physical under-3 flat rate", () => {
  it("uses 54% below 8,500 EUR", () => {
    const result = calculateImportCost(
      priced({ vehiclePrice: 8000, engineVolumeCm3: 1000, year: 2025 }),
    );
    expect(result.physical.flatRate).toBe(4305);
  });

  it("steps from 3.5 to 5.5 EUR/cm³ at 16,700 EUR", () => {
    const result = calculateImportCost(
      priced({ vehiclePrice: 19325, engineVolumeCm3: 8000, year: 2025 }),
    );
    expect(result.physical.flatRate).toBe(roundUsd(euroToUsd(5.5 * 8000)));
  });

  it("uses 15 EUR/cm³ between 84,500 and 169,000 EUR", () => {
    const result = calculateImportCost(
      priced({ vehiclePrice: 115370, engineVolumeCm3: 4000, year: 2025 }),
    );
    expect(result.physical.flatRate).toBe(roundUsd(euroToUsd(15 * 4000)));
  });

  it("uses 20 EUR/cm³ above 169,000 EUR", () => {
    const result = calculateImportCost(
      priced({ vehiclePrice: 194976, engineVolumeCm3: 5000, year: 2025 }),
    );
    expect(result.physical.flatRate).toBe(roundUsd(euroToUsd(20 * 5000)));
  });
});

describe("environmental tax by production year", () => {
  it("charges 6% for 2017–2018, 12% for 2010–2016, and 24% before 2010", () => {
    const year2018 = calculateImportCost({ ...baseInput, year: 2018 });
    const year2015 = calculateImportCost({ ...baseInput, year: 2015 });
    const year2009 = calculateImportCost({ ...baseInput, year: 2009 });
    expect(year2018.legal.environmental).toBe(
      percentOf(year2018.shared.preCustoms, 6),
    );
    expect(year2015.legal.environmental).toBe(
      percentOf(year2015.shared.preCustoms, 12),
    );
    expect(year2009.legal.environmental).toBe(
      percentOf(year2009.shared.preCustoms, 24),
    );
    expect(year2018.physical.environmental).toBe(percentOf(11225, 6));
    expect(year2009.physical.environmental).toBe(percentOf(11225, 24));
  });

  it("keeps 3–5 years at 4% and a 2021 car in the 5–7 group at 6%", () => {
    expect(
      computeEcoFee({
        base: 10000,
        ageGroup: "3to5",
        productionYear: 2022,
        vehicleType: "sedan",
      }),
    ).toBe(400);
    expect(
      computeEcoFee({
        base: 10000,
        ageGroup: "5to7",
        productionYear: 2021,
        vehicleType: "sedan",
      }),
    ).toBe(600);
  });
});
