import type { Dictionary } from "@/lib/i18n/types";
import type { CalculatorResult, CustomsBreakdown, SharedCost } from "@/lib/calculator/types";
import { formatUsd } from "@/lib/calculator/format";
import type { jsPDF } from "jspdf";

type VariantKey = "physical" | "legal";

type DownloadPdfArgs = {
  result: CalculatorResult;
  variant: VariantKey;
  dict: Dictionary;
  locale: string;
};

const PDF_FONT_NAME = "DejaVuSans";
const PDF_FONT_FILE = "DejaVuSans.ttf";
const PDF_FONT_URL = `/fonts/${PDF_FONT_FILE}`;

let fontBinaryPromise: Promise<string> | null = null;

export async function downloadCalculationPdf({
  result,
  variant,
  dict,
  locale,
}: DownloadPdfArgs): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  await registerUnicodeFont(doc);

  const title =
    variant === "physical"
      ? dict.calculator.results.physicalTitle
      : dict.calculator.results.legalTitle;

  let y = 18;
  doc.setFont(PDF_FONT_NAME, "normal");
  doc.setFontSize(16);
  doc.text("Forsage Import", 14, y);
  y += 8;
  doc.setFontSize(12);
  doc.text(dict.calculator.resultsTitle, 14, y);
  y += 7;
  doc.text(title, 14, y);
  y += 10;
  doc.setFontSize(10);

  for (const line of buildLines(dict, result.shared, result[variant], locale)) {
    doc.text(line, 14, y);
    y += 7;
    if (y > 280) {
      doc.addPage();
      doc.setFont(PDF_FONT_NAME, "normal");
      y = 18;
    }
  }

  y += 4;
  doc.setFontSize(9);
  doc.text(doc.splitTextToSize(dict.calculator.disclaimer, 180), 14, y);
  doc.save(`forsage-estimate-${variant}.pdf`);
}

async function registerUnicodeFont(doc: jsPDF): Promise<void> {
  const fontBinary = await loadPdfFontBinary();
  doc.addFileToVFS(PDF_FONT_FILE, fontBinary);
  doc.addFont(PDF_FONT_FILE, PDF_FONT_NAME, "normal");
}

function loadPdfFontBinary(): Promise<string> {
  if (!fontBinaryPromise) {
    fontBinaryPromise = fetch(PDF_FONT_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load PDF font (${response.status})`);
        }
        return response.arrayBuffer();
      })
      .then(arrayBufferToBinaryString)
      .catch((error: unknown) => {
        fontBinaryPromise = null;
        throw error;
      });
  }
  return fontBinaryPromise;
}

function arrayBufferToBinaryString(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x2000;
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return binary;
}

function buildLines(
  dict: Dictionary,
  shared: SharedCost,
  breakdown: CustomsBreakdown,
  locale: string,
): string[] {
  const labels = dict.calculator.results;
  const lines = [
    `${labels.vehiclePrice}: ${formatUsd(shared.vehiclePrice, locale)}`,
    `${labels.auctionFee}: ${formatUsd(shared.auctionFee, locale)}`,
    `${labels.serviceFee}: ${formatUsd(shared.serviceFee, locale)}`,
    `${labels.transportFee}: ${formatUsd(shared.transportFee, locale)}`,
    `${labels.insuranceFee}: ${formatUsd(shared.insuranceFee, locale)}`,
    `${labels.totalBeforeCustoms}: ${formatUsd(shared.totalBeforeCustoms, locale)}`,
  ];
  if (breakdown.usesFlatRate) {
    lines.push(`${labels.flatRate}: ${formatUsd(breakdown.flatRate, locale)}`);
  } else {
    lines.push(`${labels.customsDuty}: ${formatUsd(breakdown.duty, locale)}`);
    lines.push(`${labels.vat}: ${formatUsd(breakdown.vat, locale)}`);
  }
  lines.push(`${labels.ecologicalTax}: ${formatUsd(breakdown.environmental, locale)}`);
  if (breakdown.brokerage > 0) {
    lines.push(`${labels.brokerage}: ${formatUsd(breakdown.brokerage, locale)}`);
  }
  lines.push(`${labels.finalTotal}: ${formatUsd(breakdown.finalTotal, locale)}`);
  return lines;
}
