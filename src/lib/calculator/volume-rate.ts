export type VolumeBand = {
  maxVolume: number;
  euroPerCm3: number;
};

export type ValueTier = {
  maxValueEur: number;
  adValoremPercent: number;
  euroPerCm3: number;
};

/** Inclusive. 2,801 cm³ and above uses the high-volume percent. */
export const LEGAL_UNDER3_LOW_VOLUME_MAX = 2800;
export const LEGAL_UNDER3_LOW_VOLUME_PERCENT = 15;
export const LEGAL_UNDER3_HIGH_VOLUME_PERCENT = 12.5;

/**
 * High-clearance jeeps are `big_suv`.
 * The sheet states 15% through 3,500 cm³ and 10% from 4,200 cm³.
 * 3,501–4,199 cm³ is omitted, so the last stated rate (15%) holds until 4,200.
 */
export const HIGH_CLEARANCE_TEN_PERCENT_FROM = 4200;
export const HIGH_CLEARANCE_FIFTEEN_PERCENT = 15;
export const HIGH_CLEARANCE_TEN_PERCENT = 10;

export const LEGAL_MID_AGE_PERCENT = 20;

/**
 * Legal entity, 3–5 and 5–7 years.
 * The sheet writes the floor as euro without "per cm³". It is applied per cm³:
 * a flat euro floor never binds against 20%, and the 7+ rows in the same sheet
 * are already euro per cm³. The 1,501–1,800 floor is 0.36, below the 1,001–1,500 floor.
 */
export const LEGAL_MID_AGE_FLOORS: readonly VolumeBand[] = [
  { maxVolume: 1000, euroPerCm3: 0.36 },
  { maxVolume: 1500, euroPerCm3: 0.4 },
  { maxVolume: 1800, euroPerCm3: 0.36 },
  { maxVolume: 3000, euroPerCm3: 0.44 },
  { maxVolume: Number.POSITIVE_INFINITY, euroPerCm3: 0.8 },
];

/**
 * Physical person, cars under 3 years, by customs value in EUR.
 * The sheet's last row says "16,700 EUR and above" at 20 EUR/cm³, which would
 * hide the 7.5 and 15 rows. It is read as the open bracket after 169,000 EUR.
 */
export const PHYSICAL_UNDER3_VALUE_TIERS: readonly ValueTier[] = [
  { maxValueEur: 8500, adValoremPercent: 54, euroPerCm3: 2.5 },
  { maxValueEur: 16700, adValoremPercent: 48, euroPerCm3: 3.5 },
  { maxValueEur: 42300, adValoremPercent: 48, euroPerCm3: 5.5 },
  { maxValueEur: 84500, adValoremPercent: 48, euroPerCm3: 7.5 },
  { maxValueEur: 169000, adValoremPercent: 48, euroPerCm3: 15 },
  { maxValueEur: Number.POSITIVE_INFINITY, adValoremPercent: 48, euroPerCm3: 20 },
];

export function euroPerCm3ForVolume(
  volumeCm3: number,
  bands: readonly VolumeBand[],
): number {
  const band = bands.find((item) => volumeCm3 <= item.maxVolume);
  const fallback = bands.at(-1);
  if (!fallback) {
    throw new Error("Volume band table is empty");
  }
  return band?.euroPerCm3 ?? fallback.euroPerCm3;
}

/** EAEU individual 3–5 years. */
export const PHYSICAL_3_TO_5_BANDS: readonly VolumeBand[] = [
  { maxVolume: 1000, euroPerCm3: 1.5 },
  { maxVolume: 1500, euroPerCm3: 1.7 },
  { maxVolume: 1800, euroPerCm3: 2.5 },
  { maxVolume: 2300, euroPerCm3: 2.7 },
  { maxVolume: 3000, euroPerCm3: 3.0 },
  { maxVolume: Number.POSITIVE_INFINITY, euroPerCm3: 3.6 },
];

/** EAEU individual 5+ years. Used for both 5–7 and 7+. */
export const PHYSICAL_5_PLUS_BANDS: readonly VolumeBand[] = [
  { maxVolume: 1000, euroPerCm3: 3.0 },
  { maxVolume: 1500, euroPerCm3: 3.2 },
  { maxVolume: 1800, euroPerCm3: 3.5 },
  { maxVolume: 2300, euroPerCm3: 4.8 },
  { maxVolume: 3000, euroPerCm3: 5.0 },
  { maxVolume: Number.POSITIVE_INFINITY, euroPerCm3: 5.7 },
];

/** EAEU legal entity 7+ years. */
export const LEGAL_OVER_7_BANDS: readonly VolumeBand[] = [
  { maxVolume: 1000, euroPerCm3: 1.4 },
  { maxVolume: 1500, euroPerCm3: 1.5 },
  { maxVolume: 1800, euroPerCm3: 1.6 },
  { maxVolume: 3000, euroPerCm3: 2.2 },
  { maxVolume: Number.POSITIVE_INFINITY, euroPerCm3: 3.2 },
];
