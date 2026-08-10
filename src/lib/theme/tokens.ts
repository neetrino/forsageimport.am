/**
 * Design tokens — Forsage Kinetic Emblem system.
 * Colors from logo; type: modern geometric sans (HY Noto Sans, INT Rubik + Exo 2).
 */
export const designTokens = {
  color: {
    paper: "#f3f5f8",
    surface: "#e7ebf1",
    ink: "#0e1014",
    muted: "#5a616c",
    line: "#d5dae3",
    lineStrong: "#b8c0cd",
    accent: "#f05a18",
    accentInk: "#ffffff",
    accentSoft: "#ffe6d8",
    brandBlue: "#1a4a78",
    brandRed: "#c6281e",
    danger: "#c6281e",
  },
  font: {
    bodyHy: "Noto Sans Armenian",
    displayHy: "Noto Sans Armenian",
    bodyIntl: "Rubik",
    displayIntl: "Exo 2",
    mono: "IBM Plex Mono",
  },
  layout: {
    maxWidth: "72rem",
    headerHeight: "4.25rem",
    sectionY: { mobile: "4.5rem", desktop: "6rem" },
    scrollMargin: "6rem",
  },
  motion: {
    riseDuration: "0.75s",
  },
} as const;
