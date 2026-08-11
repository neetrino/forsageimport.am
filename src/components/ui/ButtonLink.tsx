import { clsx } from "clsx";
import type { MouseEventHandler } from "react";

type ButtonLinkProps = {
  href: string;
  children: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "sm";
  tone?: "light" | "dark";
  /** Parallelogram skew (header Calculator style). Off for hero CTAs. */
  skew?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const variants: Record<
  NonNullable<ButtonLinkProps["variant"]>,
  Record<NonNullable<ButtonLinkProps["tone"]>, string>
> = {
  primary: {
    light: "btn-primary",
    dark: "btn-primary",
  },
  secondary: {
    light: "btn-secondary",
    dark: "btn-secondary-dark",
  },
  ghost: {
    light: "bg-transparent text-[var(--ink)] hover:text-[var(--accent)]",
    dark: "bg-transparent text-white hover:text-[var(--accent)]",
  },
};

const sizes: Record<NonNullable<ButtonLinkProps["size"]>, string> = {
  md: "px-5 py-3 text-sm",
  sm: "px-3.5 py-2 text-sm",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  tone = "light",
  skew = true,
  className = "",
  onClick,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={clsx(
        "inline-flex items-center justify-center font-semibold tracking-tight",
        variants[variant][tone],
        sizes[size],
        skew && "btn-skew",
        className,
      )}
    >
      <span>{children}</span>
    </a>
  );
}
