import { clsx } from "clsx";

type ButtonLinkProps = {
  href: string;
  children: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "sm";
  tone?: "light" | "dark";
  className?: string;
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
  className = "",
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={clsx(
        "inline-flex items-center justify-center font-semibold tracking-tight",
        variants[variant][tone],
        sizes[size],
        className,
      )}
    >
      <span>{children}</span>
    </a>
  );
}
