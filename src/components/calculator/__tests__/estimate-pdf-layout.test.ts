import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { jsPDF } from "jspdf";
import { hy } from "@/lib/i18n/dictionaries/hy";
import type { CustomsBreakdown, SharedCost } from "@/lib/calculator/types";
import { buildEstimatePdfRows } from "@/components/calculator/estimate-pdf-rows";
import {
  PDF_FONT_NAME,
  drawEstimateTable,
  drawPdfTitleBlock,
  paintPdfWatermark,
  type PdfWatermark,
} from "@/components/calculator/estimate-pdf-layout";

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

describe("estimate PDF layout", () => {
  it("renders a table page with a Forsage watermark", async () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    registerFont(doc);
    const watermark = await loadWatermark();
    paintPdfWatermark(doc, watermark);

    const labels = hy.calculator.results;
    const tableTop = drawPdfTitleBlock(doc, {
      brand: hy.site.brand,
      resultsTitle: hy.calculator.resultsTitle,
      variantTitle: labels.legalTitle,
    });
    drawEstimateTable(
      doc,
      buildEstimatePdfRows(labels, shared, legal, "hy-AM"),
      { item: labels.columnItem, amount: labels.columnAmount },
      tableTop,
      watermark,
    );

    const pdfBytes = new Uint8Array(doc.output("arraybuffer"));
    expect(Buffer.from(pdfBytes).subarray(0, 5).toString("latin1")).toBe("%PDF-");
    expect(pdfBytes.byteLength).toBeGreaterThan(8000);
  });
});

function registerFont(doc: jsPDF): void {
  const font = readFileSync("public/fonts/DejaVuSans.ttf");
  doc.addFileToVFS("DejaVuSans.ttf", font.toString("latin1"));
  doc.addFont("DejaVuSans.ttf", PDF_FONT_NAME, "normal");
}

async function loadWatermark(): Promise<PdfWatermark> {
  const image = await loadImage("public/pdf/forsage-logo.webp");
  const canvas = createCanvas(image.width, image.height);
  canvas.getContext("2d").drawImage(image, 0, 0);
  return {
    dataUrl: canvas.toDataURL("image/png"),
    width: image.width,
    height: image.height,
  };
}
