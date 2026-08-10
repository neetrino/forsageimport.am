"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { localeLabels, locales, type Locale } from "@/lib/i18n/config";
import { useIsMounted } from "@/hooks/useSafeReducedMotion";

type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
  variant?: "light" | "dark" | "footer";
};

export function LocaleSwitcher({
  locale,
  label,
  variant = "light",
}: LocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useIsMounted();

  const hrefFor = (nextLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  };

  const goWithHash = (event: MouseEvent<HTMLAnchorElement>, nextLocale: Locale) => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash) return;
    event.preventDefault();
    router.push(`${hrefFor(nextLocale)}${hash}`);
  };

  if (variant === "footer") {
    return (
      <div role="navigation" aria-label={label}>
        <span className="sr-only">{label}</span>
        <ul className="site-footer-lang">
          {locales.map((item) => {
            const active = item === locale;
            return (
              <li key={item}>
                <Link
                  href={hrefFor(item)}
                  hrefLang={item}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "site-footer-lang-btn is-active"
                      : "site-footer-lang-btn"
                  }
                  onClick={(event) => goWithHash(event, item)}
                >
                  {localeLabels[item]}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div
      className={`locale-switch locale-switch--${variant}`}
      role="navigation"
      aria-label={label}
    >
      <span className="locale-switch-label">{label}</span>
      <ul className="locale-switch-rail">
        {locales.map((item) => {
          const active = item === locale;
          return (
            <li key={item} className="relative">
              <Link
                href={hrefFor(item)}
                hrefLang={item}
                aria-current={active ? "page" : undefined}
                className={
                  active ? "locale-switch-btn is-active" : "locale-switch-btn"
                }
                onClick={(event) => goWithHash(event, item)}
              >
                {active ? (
                  mounted ? (
                    <motion.span
                      layoutId={`locale-pill-${variant}`}
                      className="locale-switch-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : (
                    <span className="locale-switch-pill" />
                  )
                ) : null}
                <span className="relative z-[1]">{localeLabels[item]}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
