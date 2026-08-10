/**
 * One-shot / repeatable converter:
 * PDF logo → transparent WebP (+ favicon + Next icon PNGs)
 *
 * Usage:
 *   node scripts/convert-logo.mjs "C:\path\to\Forsage logo.pdf"
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createCanvas } from "@napi-rs/canvas";
import sharp from "sharp";

const pdfPath = process.argv[2];
if (!pdfPath || !fs.existsSync(pdfPath)) {
  console.error("Usage: node scripts/convert-logo.mjs <logo.pdf>");
  process.exit(1);
}

const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
const data = new Uint8Array(fs.readFileSync(pdfPath));
const pdf = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
const page = await pdf.getPage(1);
const base = page.getViewport({ scale: 1 });
const scale = Math.min(4, 2000 / Math.max(base.width, base.height));
const viewport = page.getViewport({ scale });

const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
const ctx = canvas.getContext("2d");
await page.render({ canvasContext: ctx, viewport }).promise;
const rendered = canvas.toBuffer("image/png");
const trimmed = await sharp(rendered).trim({ threshold: 8 }).ensureAlpha().raw()
  .toBuffer({ resolveWithObject: true });

const { data: pixelsIn, info } = trimmed;
const pixels = Buffer.from(pixelsIn);
const { width, height, channels } = info;
const visited = new Uint8Array(width * height);
const isBg = (i) => {
  const o = i * channels;
  return pixels[o] > 245 && pixels[o + 1] > 245 && pixels[o + 2] > 245;
};
const stack = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const i = y * width + x;
  if (visited[i]) return;
  visited[i] = 1;
  if (!isBg(i)) return;
  stack.push(i);
};
for (let x = 0; x < width; x += 1) {
  push(x, 0);
  push(x, height - 1);
}
for (let y = 0; y < height; y += 1) {
  push(0, y);
  push(width - 1, y);
}
while (stack.length) {
  const i = stack.pop();
  pixels[i * channels + 3] = 0;
  const x = i % width;
  const y = (i - x) / width;
  push(x + 1, y);
  push(x - 1, y);
  push(x, y + 1);
  push(x, y - 1);
}

const transparent = await sharp(pixels, {
  raw: { width, height, channels: 4 },
}).png().toBuffer();

const brandDir = path.resolve("public/brand");
const appDir = path.resolve("src/app");
fs.mkdirSync(brandDir, { recursive: true });

await sharp(transparent).webp({ quality: 92, effort: 6 }).toFile(path.join(brandDir, "forsage-logo.webp"));
await sharp(transparent).png().toFile(path.join(brandDir, "forsage-logo.png"));
await sharp(transparent)
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 95 })
  .toFile(path.join(brandDir, "forsage-favicon.webp"));
await sharp(transparent)
  .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(appDir, "icon.png"));
await sharp(transparent)
  .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(appDir, "apple-icon.png"));

console.log("Wrote brand assets from", pathToFileURL(pdfPath).href);
