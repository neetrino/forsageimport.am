/** IAA calculator posts whole-dollar line items. */
export function roundUsd(value: number): number {
  return Math.round(value + Number.EPSILON);
}

export function percentOf(base: number, percent: number): number {
  return roundUsd((base * percent) / 100);
}
