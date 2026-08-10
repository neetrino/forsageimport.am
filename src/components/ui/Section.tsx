import type { ReactNode } from "react";
import { clsx } from "clsx";
import type { LandingSectionId } from "@/types/landing";
import { Container } from "@/components/ui/Container";

type SectionProps = {
  id: LandingSectionId;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  ariaLabelledBy?: string;
  ariaHidden?: boolean;
  /** Match hero→about rounded seam on later major sections. */
  curvedTop?: boolean;
};

export function Section({
  id,
  children,
  className = "",
  containerClassName = "",
  ariaLabelledBy,
  ariaHidden,
  curvedTop = false,
}: SectionProps) {
  const isHero = id === "hero";

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-hidden={ariaHidden || undefined}
      className={clsx(
        "scroll-mt-[var(--scroll-margin)] py-20 sm:py-24",
        !isHero && "landing-section-paint",
        curvedTop && "landing-curve",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
