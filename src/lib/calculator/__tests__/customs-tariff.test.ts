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
    expect(atCap.legal.duty).toBe(percentOf(atCap.shared.customsValue, 15));
    expect(atCap.legal.vat).toBe(percentOf(atCap.shared.customsValue + atCap.legal.duty, 20));
    expect(above.legal.duty).toBe(percentOf(above.shared.customsValue, 12.5));
    expect(above.legal.vat).toBe(percentOf(above.shared.customsValue + above.legal.duty, 20));
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
    expect(throughGap.legal.duty).toBe(percentOf(throughGap.shared.customsValue, 15));
    expect(from4200.legal.duty).toBe(percentOf(from4200.shared.customsValue, 10));
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
    expect(result.physical.flatRate).toBe(percentOf(8000, 54));
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

describe("customs transport", () => {
  it("assesses duty and VAT on a fixed 2200 USD transport and keeps the real fee in the total", () => {
    const realTransport = 5000;
    const result = calculateImportCost({
      ...baseInput,
      transportFee: realTransport,
      insuranceEnabled: false,
    });
    const customsValue =
      result.shared.vehiclePrice + result.shared.auctionFee + 2200;

    expect(result.shared.transportFee).toBe(realTransport);
    expect(result.shared.customsValue).toBe(customsValue);
    expect(result.shared.totalBeforeCustoms).toBe(
      result.shared.vehiclePrice +
        result.shared.auctionFee +
        realTransport +
        result.shared.companyFee,
    );
    expect(result.legal.duty).toBe(percentOf(customsValue, 15));
    expect(result.legal.vat).toBe(
      percentOf(customsValue + result.legal.duty, 20),
    );
    expect(result.legal.finalTotal).toBe(
      result.shared.totalBeforeCustoms +
        result.legal.duty +
        result.legal.vat +
        result.legal.environmental,
    );
  });
});

describe("environmental tax by production year", () => {
  const assessedYears = [
    [2026, 2],
    [2025, 2],
    [2024, 2],
    [2023, 4],
    [2022, 4],
    [2021, 6],
    [2020, 6],
    [2019, 6],
    [2018, 6],
    [2017, 6],
  ] as const;

  it("uses vehicle price + FOB + 2200 at the year rate for 2017 and newer", () => {
    for (const [year, percent] of assessedYears) {
      const result = calculateImportCost({
        ...baseInput,
        year,
        transportFee: 5000,
      });
      const base = result.shared.vehiclePrice + result.shared.auctionFee + 2200;
      expect(result.legal.environmental).toBe(percentOf(base, percent));
      expect(result.physical.environmental).toBe(percentOf(base, percent));
    }
  });

  it("keeps 2016 and older on the vehicle price", () => {
    const year2016 = calculateImportCost({ ...baseInput, year: 2016 });
    const year2015 = calculateImportCost({ ...baseInput, year: 2015 });
    const year2010 = calculateImportCost({ ...baseInput, year: 2010 });
    const year2009 = calculateImportCost({ ...baseInput, year: 2009 });
    expect(year2016.legal.environmental).toBe(percentOf(10000, 12));
    expect(year2016.physical.environmental).toBe(percentOf(10000, 12));
    expect(year2015.legal.environmental).toBe(percentOf(year2015.shared.vehiclePrice, 12));
    expect(year2010.legal.environmental).toBe(percentOf(10000, 12));
    expect(year2009.legal.environmental).toBe(percentOf(year2009.shared.vehiclePrice, 24));
    expect(year2009.physical.environmental).toBe(percentOf(10000, 24));
  });

  it("ignores FOB on a 2015 car and includes it from 2017", () => {
    expect(
      computeEcoFee({
        vehiclePrice: 10000,
        fob: 500,
        productionYear: 2015,
        vehicleType: "sedan",
      }),
    ).toBe(percentOf(10000, 12));
    expect(
      computeEcoFee({
        vehiclePrice: 10000,
        fob: 500,
        productionYear: 2022,
        vehicleType: "sedan",
      }),
    ).toBe(percentOf(10000 + 500 + 2200, 4));
    expect(
      computeEcoFee({
        vehiclePrice: 10000,
        fob: 500,
        productionYear: 2021,
        vehicleType: "sedan",
      }),
    ).toBe(percentOf(10000 + 500 + 2200, 6));
  });
});
