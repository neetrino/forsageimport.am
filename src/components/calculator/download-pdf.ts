import type { Dictionary } from "@/lib/i18n/types";
import type { CalculatorResult, CostBreakdown } from "@/lib/calculator/types";
import { formatUsd } from "@/lib/calculator/format";

type VariantKey = "physical" | "legal";

type DownloadPdfArgs = {
  result: CalculatorResult;
  variant: VariantKey;
  dict: Dictionary;
  locale: string;
};

export async function downloadCalculationPdf({
  result,
  variant,
  dict,
  locale,
}: DownloadPdfArgs): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  const breakdown = result[variant];
  const title =
    variant === "physical"
      ? dict.calculator.results.physicalTitle
      : dict.calculator.results.legalTitle;

  let y = 18;
  doc.setFontSize(16);
  doc.text("Forsage Import", 14, y);
  y += 8;
  doc.setFontSize(12);
  doc.text(dict.calculator.resultsTitle, 14, y);
  y += 7;
  doc.text(title, 14, y);
  y += 10;

  doc.setFontSize(10);
  const lines = buildLines(dict, breakdown, locale);
  for (const line of lines) {
    doc.text(line, 14, y);
    y += 7;
    if (y > 280) {
      doc.addPage();
      y = 18;
    }
  }

  y += 4;
  doc.setFontSize(9);
  const disclaimerLines = doc.splitTextToSize(dict.calculator.disclaimer, 180);
  doc.text(disclaimerLines, 14, y);

  doc.save(`forsage-estimate-${variant}.pdf`);
}

function buildLines(
  dict: Dictionary,
  breakdown: CostBreakdown,
  locale: string,
): string[] {
  const labels = dict.calculator.results;
  return [
    `${labels.vehiclePrice}: ${formatUsd(breakdown.vehiclePrice, locale)}`,
    `${labels.auctionFee}: ${formatUsd(breakdown.auctionFee, locale)}`,
    `${labels.serviceFee}: ${formatUsd(breakdown.serviceFee, locale)}`,
    `${labels.transportFee}: ${formatUsd(breakdown.transportFee, locale)}`,
    `${labels.insuranceFee}: ${formatUsd(breakdown.insuranceFee, locale)}`,
    `${labels.totalBeforeCustoms}: ${formatUsd(breakdown.totalBeforeCustoms, locale)}`,
    `${labels.customsFee}: ${formatUsd(breakdown.customsFee, locale)}`,
    `${labels.finalTotal}: ${formatUsd(breakdown.finalTotal, locale)}`,
  ];
}
