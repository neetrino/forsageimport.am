import type { ReactNode } from "react";
import type { LandingSectionId } from "@/types/landing";
import { Container } from "@/components/ui/Container";

type SectionProps = {
  id: LandingSectionId;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  ariaLabelledBy?: string;
  ariaHidden?: boolean;
};

export function Section({
  id,
  children,
  className = "",
  containerClassName = "",
  ariaLabelledBy,
  ariaHidden,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-hidden={ariaHidden || undefined}
      className={`scroll-mt-[var(--scroll-margin)] py-20 sm:py-24 ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
