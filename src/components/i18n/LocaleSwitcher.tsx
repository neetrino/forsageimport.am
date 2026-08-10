"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/lib/i18n/config";

type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
  variant?: "light" | "dark";
};

export function LocaleSwitcher({
  locale,
  label,
  variant = "light",
}: LocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const hrefFor = (nextLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  };

  const inactiveClass =
    variant === "dark"
      ? "text-white/60 transition-colors hover:text-white"
      : "text-[var(--muted)] transition-colors hover:text-[var(--ink)]";

  const activeClass =
    variant === "dark"
      ? "text-white underline decoration-[var(--accent)] decoration-2 underline-offset-4"
      : "text-[var(--ink)] underline decoration-[var(--accent)] decoration-2 underline-offset-4";

  return (
    <div className="flex flex-wrap items-center gap-3" role="navigation" aria-label={label}>
      <span className={variant === "dark" ? "text-xs text-white/50" : "text-xs text-[var(--muted)]"}>
        {label}
      </span>
      <ul className="flex flex-wrap gap-3 text-sm">
        {locales.map((item) => {
          const active = item === locale;
          return (
            <li key={item}>
              <Link
                href={hrefFor(item)}
                hrefLang={item}
                aria-current={active ? "page" : undefined}
                className={active ? activeClass : inactiveClass}
                onClick={(event) => {
                  const hash =
                    typeof window !== "undefined" ? window.location.hash : "";
                  if (!hash) return;
                  event.preventDefault();
                  router.push(`${hrefFor(item)}${hash}`);
                }}
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
