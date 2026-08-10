import type { ReactNode } from "react";
import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

/** Root pass-through — html/body live in `[locale]/layout` for correct `lang`. */
export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
