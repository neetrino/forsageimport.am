import type { Dictionary } from "@/lib/i18n/types";
import type { CalculatorResult } from "@/lib/calculator/types";
import type { jsPDF } from "jspdf";
import { buildEstimatePdfRows } from "@/components/calculator/estimate-pdf-rows";
import {
  PDF_FONT_NAME,
  drawEstimateTable,
  drawPdfTitleBlock,
  loadPdfWatermark,
  paintPdfWatermark,
} from "@/components/calculator/estimate-pdf-layout";

type VariantKey = "physical" | "legal";

type DownloadPdfArgs = {
  result: CalculatorResult;
  variant: VariantKey;
  dict: Dictionary;
  locale: string;
};

const PDF_FONT_FILE = "DejaVuSans.ttf";
const PDF_FONT_URL = `/fonts/${PDF_FONT_FILE}`;

let fontBinaryPromise: Promise<string> | null = null;

export async function downloadCalculationPdf({
  result,
  variant,
  dict,
  locale,
}: DownloadPdfArgs): Promise<void> {
  const [{ jsPDF }, watermark] = await Promise.all([
    import("jspdf"),
    loadPdfWatermark(),
  ]);
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  await registerUnicodeFont(doc);
  paintPdfWatermark(doc, watermark);

  const labels = dict.calculator.results;
  const variantTitle =
    variant === "physical" ? labels.physicalTitle : labels.legalTitle;
  const tableTop = drawPdfTitleBlock(doc, {
    brand: dict.site.brand,
    resultsTitle: dict.calculator.resultsTitle,
    variantTitle,
  });
  drawEstimateTable(
    doc,
    buildEstimatePdfRows(labels, result.shared, result[variant], locale),
    { item: labels.columnItem, amount: labels.columnAmount },
    tableTop,
    watermark,
  );
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
