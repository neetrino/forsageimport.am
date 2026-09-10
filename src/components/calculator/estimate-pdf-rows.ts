import { formatUsd } from "@/lib/calculator/format";
import type { CustomsBreakdown, SharedCost } from "@/lib/calculator/types";
import type { Dictionary } from "@/lib/i18n/types";

export type EstimatePdfItemRow = {
  kind: "item";
  label: string;
  value: string;
  emphasis: boolean;
};

export type EstimatePdfSectionRow = {
  kind: "section";
  label: string;
};

export type EstimatePdfRow = EstimatePdfItemRow | EstimatePdfSectionRow;

export function buildEstimatePdfRows(
  labels: Dictionary["calculator"]["results"],
  shared: SharedCost,
  breakdown: CustomsBreakdown,
  locale: string,
): EstimatePdfRow[] {
  const item = (
    label: string,
    value: number,
    emphasis = false,
  ): EstimatePdfItemRow => ({
    kind: "item",
    label,
    value: formatUsd(value, locale),
    emphasis,
  });

  const customsItems = breakdown.usesFlatRate
    ? [item(labels.flatRate, breakdown.flatRate)]
    : [
        item(labels.customsDuty, breakdown.duty),
        item(labels.vat, breakdown.vat),
      ];

  return [
    item(labels.vehiclePrice, shared.vehiclePrice),
    item(labels.auctionFee, shared.auctionFee),
    item(labels.transportFee, shared.transportFee),
    item(labels.insuranceFee, shared.insuranceFee),
    item(labels.totalBeforeCustoms, shared.totalBeforeCustoms, true),
    { kind: "section", label: labels.customsHeading },
    ...customsItems,
    item(labels.ecologicalTax, breakdown.environmental),
    item(labels.finalTotal, breakdown.finalTotal, true),
  ];
}
