import type { jsPDF } from "jspdf";
import type { EstimatePdfItemRow, EstimatePdfRow } from "@/components/calculator/estimate-pdf-rows";

export const PDF_FONT_NAME = "DejaVuSans";
export const PDF_LOGO_URL = "/pdf/forsage-logo.webp";

const MARGIN = 16;
const VALUE_COL_WIDTH = 46;
const ROW_MIN_HEIGHT = 9;
const LINE_HEIGHT = 4.6;
const CELL_PAD_X = 3.2;
const CELL_PAD_Y = 2.5;
const WATERMARK_OPACITY = 0.1;
const PAGE_BOTTOM = 277;

const INK: [number, number, number] = [14, 16, 20];
const MUTED: [number, number, number] = [90, 97, 108];
const LINE: [number, number, number] = [181, 192, 205];
const ACCENT: [number, number, number] = [240, 90, 24];
const ACCENT_SOFT: [number, number, number] = [255, 230, 216];
const ZEBRA: [number, number, number] = [243, 245, 248];
const SECTION: [number, number, number] = [26, 74, 120];
const WHITE: [number, number, number] = [255, 255, 255];

export type PdfWatermark = {
  dataUrl: string;
  width: number;
  height: number;
};

export type EstimateTableHeaders = {
  item: string;
  amount: string;
};

type TableMetrics = {
  x: number;
  width: number;
  labelWidth: number;
};

export async function loadPdfWatermark(): Promise<PdfWatermark | null> {
  try {
    const response = await fetch(PDF_LOGO_URL);
    if (!response.ok) return null;
    const url = URL.createObjectURL(await response.blob());
    try {
      const image = await decodeImage(url);
      return toPngWatermark(image);
    } finally {
      URL.revokeObjectURL(url);
    }
  } catch {
    return null;
  }
}

export function paintPdfWatermark(doc: jsPDF, watermark: PdfWatermark | null): void {
  if (!watermark) return;
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const maxSide = Math.min(pageW, pageH) * 0.72;
  const ratio = watermark.width / watermark.height;
  const width = ratio >= 1 ? maxSide : maxSide * ratio;
  const height = ratio >= 1 ? maxSide / ratio : maxSide;
  doc.saveGraphicsState();
  doc.setGState(doc.GState({ opacity: WATERMARK_OPACITY }));
  doc.addImage(
    watermark.dataUrl,
    "PNG",
    (pageW - width) / 2,
    (pageH - height) / 2,
    width,
    height,
  );
  doc.restoreGraphicsState();
}

export function drawPdfTitleBlock(
  doc: jsPDF,
  copy: { brand: string; resultsTitle: string; variantTitle: string },
): number {
  doc.setFont(PDF_FONT_NAME, "normal");
  doc.setTextColor(...INK);
  doc.setFontSize(18);
  doc.text(copy.brand, MARGIN, 20);
  doc.setFontSize(11);
  doc.setTextColor(...MUTED);
  doc.text(copy.resultsTitle, MARGIN, 28);
  doc.setFontSize(13);
  doc.setTextColor(...ACCENT);
  doc.text(copy.variantTitle, MARGIN, 36);
  return 44;
}

export function drawEstimateTable(
  doc: jsPDF,
  rows: readonly EstimatePdfRow[],
  headers: EstimateTableHeaders,
  startY: number,
  watermark: PdfWatermark | null,
): number {
  const metrics = tableMetrics(doc);
  let y = startY;
  let bodyIndex = 0;
  y = drawHeaderRow(doc, metrics, y, headers);

  for (const row of rows) {
    const height = rowHeight(doc, row, metrics.labelWidth);
    if (y + height > PAGE_BOTTOM) {
      doc.addPage();
      paintPdfWatermark(doc, watermark);
      y = MARGIN;
      y = drawHeaderRow(doc, metrics, y, headers);
    }
    if (row.kind === "section") {
      y = drawSectionRow(doc, metrics, y, height, row.label);
      continue;
    }
    y = drawItemRow(doc, metrics, y, height, row, bodyIndex);
    bodyIndex += 1;
  }
  return y;
}

function tableMetrics(doc: jsPDF): TableMetrics {
  const width = doc.internal.pageSize.getWidth() - MARGIN * 2;
  return {
    x: MARGIN,
    width,
    labelWidth: width - VALUE_COL_WIDTH,
  };
}

function rowHeight(doc: jsPDF, row: EstimatePdfRow, labelWidth: number): number {
  doc.setFont(PDF_FONT_NAME, "normal");
  doc.setFontSize(row.kind === "item" && row.emphasis ? 11 : 10);
  const lines = doc.splitTextToSize(row.label, labelWidth - CELL_PAD_X * 2);
  return Math.max(ROW_MIN_HEIGHT, lines.length * LINE_HEIGHT + CELL_PAD_Y * 2);
}

function drawHeaderRow(
  doc: jsPDF,
  metrics: TableMetrics,
  y: number,
  headers: EstimateTableHeaders,
): number {
  const height = ROW_MIN_HEIGHT;
  fillRow(doc, metrics, y, height, ACCENT);
  strokeRow(doc, metrics, y, height);
  doc.setFont(PDF_FONT_NAME, "normal");
  doc.setFontSize(10);
  doc.setTextColor(...WHITE);
  doc.text(headers.item, metrics.x + CELL_PAD_X, y + height - 3.2);
  doc.text(headers.amount, metrics.x + metrics.width - CELL_PAD_X, y + height - 3.2, {
    align: "right",
  });
  return y + height;
}

function drawSectionRow(
  doc: jsPDF,
  metrics: TableMetrics,
  y: number,
  height: number,
  label: string,
): number {
  fillRow(doc, metrics, y, height, SECTION);
  strokeRow(doc, metrics, y, height);
  doc.setFont(PDF_FONT_NAME, "normal");
  doc.setFontSize(10);
  doc.setTextColor(...WHITE);
  doc.text(label, metrics.x + CELL_PAD_X, y + height - 3.2);
  return y + height;
}

function drawItemRow(
  doc: jsPDF,
  metrics: TableMetrics,
  y: number,
  height: number,
  row: EstimatePdfItemRow,
  bodyIndex: number,
): number {
  const fill = row.emphasis ? ACCENT_SOFT : bodyIndex % 2 === 0 ? WHITE : ZEBRA;
  fillRow(doc, metrics, y, height, fill);
  strokeRow(doc, metrics, y, height);
  doc.setDrawColor(...LINE);
  doc.line(
    metrics.x + metrics.labelWidth,
    y,
    metrics.x + metrics.labelWidth,
    y + height,
  );
  doc.setFont(PDF_FONT_NAME, "normal");
  doc.setFontSize(row.emphasis ? 11 : 10);
  doc.setTextColor(...INK);
  const lines = doc.splitTextToSize(row.label, metrics.labelWidth - CELL_PAD_X * 2);
  doc.text(lines, metrics.x + CELL_PAD_X, y + CELL_PAD_Y + 3.4);
  if (row.emphasis) doc.setTextColor(...ACCENT);
  doc.text(row.value, metrics.x + metrics.width - CELL_PAD_X, y + height - 3.2, {
    align: "right",
  });
  return y + height;
}

function fillRow(
  doc: jsPDF,
  metrics: TableMetrics,
  y: number,
  height: number,
  color: readonly [number, number, number],
): void {
  doc.setFillColor(...color);
  doc.rect(metrics.x, y, metrics.width, height, "F");
}

function strokeRow(
  doc: jsPDF,
  metrics: TableMetrics,
  y: number,
  height: number,
): void {
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.2);
  doc.rect(metrics.x, y, metrics.width, height, "S");
}

function decodeImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to decode PDF logo"));
    image.src = src;
  });
}

function toPngWatermark(image: HTMLImageElement): PdfWatermark {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Failed to create PDF logo canvas");
  }
  context.drawImage(image, 0, 0);
  return {
    dataUrl: canvas.toDataURL("image/png"),
    width: image.naturalWidth,
    height: image.naturalHeight,
  };
}
