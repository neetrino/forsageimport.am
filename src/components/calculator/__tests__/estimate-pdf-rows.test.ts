import { describe, expect, it } from "vitest";
import { buildEstimatePdfRows } from "@/components/calculator/estimate-pdf-rows";
import { hy } from "@/lib/i18n/dictionaries/hy";
import type { CustomsBreakdown, SharedCost } from "@/lib/calculator/types";

const labels = hy.calculator.results;

const shared: SharedCost = {
  vehiclePrice: 10000,
  auctionFee: 1119,
  transportFee: 2625,
  insuranceFee: 137,
  preCustoms: 13881,
  totalBeforeCustoms: 13881,
};

const legal: CustomsBreakdown = {
  duty: 0,
  vat: 0,
  environmental: 278,
  flatRate: 0,
  usesFlatRate: false,
  electricExemptionApplied: true,
  customsTotal: 278,
  finalTotal: 14159,
};

describe("buildEstimatePdfRows", () => {
  it("builds a two-column estimate with customs as a section", () => {
    const rows = buildEstimatePdfRows(labels, shared, legal, "hy-AM");

    expect(rows.filter((row) => row.kind === "item")).toHaveLength(9);
    expect(rows).toContainEqual({
      kind: "section",
      label: labels.customsHeading,
    });
    expect(rows.at(-1)).toMatchObject({
      kind: "item",
      label: labels.finalTotal,
      emphasis: true,
    });
    expect(rows.some((row) => row.kind === "item" && row.label === labels.vat)).toBe(
      true,
    );
  });

  it("uses the flat-rate row instead of duty and VAT", () => {
    const rows = buildEstimatePdfRows(
      labels,
      shared,
      { ...legal, usesFlatRate: true, flatRate: 8075, duty: 0, vat: 0 },
      "hy-AM",
    );
    const items = rows.filter((row) => row.kind === "item").map((row) => row.label);
    expect(items).toContain(labels.flatRate);
    expect(items).not.toContain(labels.customsDuty);
    expect(items).not.toContain(labels.vat);
  });
});
