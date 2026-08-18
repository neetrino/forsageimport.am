export type VolumeBand = {
  maxVolume: number;
  euroPerCm3: number;
};

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
