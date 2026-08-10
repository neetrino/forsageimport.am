"use client";

import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

export function ScrollDivider() {
  const reduce = useSafeReducedMotion();

  return (
    <div className="landing-section-divider" aria-hidden="true">
      <motion.span
        className="landing-section-divider-glow"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={reduce ? undefined : { opacity: 0.9 }}
        animate={reduce ? { opacity: 0.9 } : undefined}
        viewport={reduce ? undefined : { once: true, amount: 0.55 }}
        transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="landing-section-divider-line"
        initial={reduce ? false : { opacity: 0, scaleX: 0.2 }}
        whileInView={reduce ? undefined : { opacity: 1, scaleX: 1 }}
        animate={reduce ? { opacity: 1, scaleX: 1 } : undefined}
        viewport={reduce ? undefined : { once: true, amount: 0.55 }}
        transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "center" }}
      />
      <motion.span
        className="landing-section-divider-mark"
        initial={reduce ? false : { opacity: 0, scale: 0.35 }}
        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
        animate={reduce ? { opacity: 1, scale: 1 } : undefined}
        viewport={reduce ? undefined : { once: true, amount: 0.55 }}
        transition={{
          duration: reduce ? 0 : 0.4,
          delay: reduce ? 0 : 0.14,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </div>
  );
}
