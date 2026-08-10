/**
 * Convert non-SVG rasters to WebP and upload to Cloudflare R2.
 *
 * Requires in `.env`:
 *   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY,
 *   R2_BUCKET_NAME, R2_PUBLIC_URL (or NEXT_PUBLIC_R2_PUBLIC_URL)
 *
 * Staging sources (first match wins):
 *   tmp/brand-assets/...  (from `pnpm brand:logo`)
 *   public/brand/...      (legacy local copies, if present)
 *
 * Usage:
 *   pnpm assets:r2
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnv({ path: path.join(root, ".env") });

const accountId = required("R2_ACCOUNT_ID");
const accessKeyId = required("R2_ACCESS_KEY_ID");
const secretAccessKey = required("R2_SECRET_ACCESS_KEY");
const bucket = required("R2_BUCKET_NAME");
const publicBase = (
  process.env.NEXT_PUBLIC_R2_PUBLIC_URL ||
  process.env.R2_PUBLIC_URL ||
  ""
).replace(/\/$/, "");

if (!publicBase) {
  throw new Error("Set NEXT_PUBLIC_R2_PUBLIC_URL or R2_PUBLIC_URL");
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
});

/** @type {{ key: string; candidates: string[]; resize?: { width: number; height: number } }[]} */
const jobs = [
  {
    key: "brand/forsage-logo.webp",
    candidates: [
      "tmp/brand-assets/forsage-logo.webp",
      "public/brand/forsage-logo.webp",
      "public/brand/forsage-logo.png",
    ],
  },
  {
    key: "brand/forsage-favicon.webp",
    candidates: [
      "tmp/brand-assets/forsage-favicon.webp",
      "public/brand/forsage-favicon.webp",
    ],
  },
  {
    key: "brand/forsage-hero-3d.webp",
    candidates: [
      "tmp/brand-assets/forsage-hero-3d.webp",
      "public/brand/forsage-hero-3d.webp",
      "public/brand/forsage-hero-3d.png",
    ],
  },
  {
    key: "brand/cars/hero-car-01.webp",
    candidates: [
      "tmp/brand-assets/cars/hero-car-01.webp",
      "public/brand/cars/hero-car-01.webp",
      "public/brand/cars/hero-car-01.png",
    ],
  },
  {
    key: "brand/cars/hero-car-02.webp",
    candidates: [
      "tmp/brand-assets/cars/hero-car-02.webp",
      "public/brand/cars/hero-car-02.webp",
      "public/brand/cars/hero-car-02.png",
    ],
  },
  {
    key: "brand/cars/hero-car-03.webp",
    candidates: [
      "tmp/brand-assets/cars/hero-car-03.webp",
      "public/brand/cars/hero-car-03.webp",
      "public/brand/cars/hero-car-03.png",
    ],
  },
  {
    key: "brand/icon.webp",
    candidates: [
      "tmp/brand-assets/icon.webp",
      "public/brand/icon.webp",
      "src/app/icon.png",
    ],
    resize: { width: 32, height: 32 },
  },
  {
    key: "brand/apple-icon.webp",
    candidates: [
      "tmp/brand-assets/apple-icon.webp",
      "public/brand/apple-icon.webp",
      "src/app/apple-icon.png",
    ],
    resize: { width: 180, height: 180 },
  },
];

for (const job of jobs) {
  const buffer = await toWebpBuffer(job);
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: job.key,
      Body: buffer,
      ContentType: "image/webp",
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );
  console.log(`uploaded ${publicBase}/${job.key} (${buffer.length} bytes)`);
}

console.log("Done. Ensure NEXT_PUBLIC_R2_PUBLIC_URL=%s", publicBase);

/**
 * @param {string} name
 */
function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

/**
 * @param {{ key: string; candidates: string[]; resize?: { width: number; height: number } }} job
 */
async function toWebpBuffer(job) {
  const inputPath = job.candidates
    .map((relative) => path.join(root, relative))
    .find((candidate) => fs.existsSync(candidate));

  if (!inputPath) {
    throw new Error(
      `Missing source for ${job.key}. Tried:\n- ${job.candidates.join("\n- ")}`,
    );
  }

  let pipeline = sharp(inputPath).ensureAlpha();
  if (job.resize) {
    pipeline = pipeline.resize(job.resize.width, job.resize.height, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });
  }

  return pipeline.webp({ quality: 90, effort: 6 }).toBuffer();
}
