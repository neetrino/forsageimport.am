export type LandingSectionId =
  | "hero"
  | "about"
  | "services"
  | "process"
  | "calculator"
  | "why-us"
  | "apply"
  | "contact";

export const LANDING_SECTION_IDS = {
  hero: "hero",
  about: "about",
  services: "services",
  process: "process",
  calculator: "calculator",
  whyUs: "why-us",
  apply: "apply",
  contact: "contact",
} as const satisfies Record<string, LandingSectionId>;
