import type { AgeGroupId } from "@/lib/calculator/types";

export function resolveAgeGroup(
  productionYear: number,
  currentYear = new Date().getFullYear(),
): AgeGroupId {
  const age = currentYear - productionYear;
  if (age < 3) return "under3";
  if (age < 5) return "3to5";
  if (age < 7) return "5to7";
  return "over7";
}

export function yearsForAgeGroup(
  ageGroup: AgeGroupId,
  currentYear = new Date().getFullYear(),
): number[] {
  const range = yearRangeForAgeGroup(ageGroup, currentYear);
  const years: number[] = [];
  for (let year = range.end; year >= range.start; year -= 1) {
    years.push(year);
  }
  return years;
}

function yearRangeForAgeGroup(
  ageGroup: AgeGroupId,
  currentYear: number,
): { start: number; end: number } {
  switch (ageGroup) {
    case "under3":
      return { start: currentYear - 3, end: currentYear };
    case "3to5":
      return { start: currentYear - 5, end: currentYear - 3 };
    case "5to7":
      return { start: currentYear - 7, end: currentYear - 5 };
    case "over7":
      return { start: 1950, end: currentYear - 7 };
  }
}
