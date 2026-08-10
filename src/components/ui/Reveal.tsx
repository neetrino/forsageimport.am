"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { clsx } from "clsx";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

export type RevealVariant = "up" | "left" | "right" | "scale" | "blur" | "clip";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  variant?: RevealVariant;
  amount?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const variantMap: Record<
  RevealVariant,
  { hidden: Record<string, number | string>; show: Record<string, number | string> }
> = {
  up: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -32 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 32 },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  clip: {
    hidden: { opacity: 0, clipPath: "inset(12% 0 12% 0)" },
    show: { opacity: 1, clipPath: "inset(0% 0 0% 0)" },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  variant = "up",
  amount = 0.18,
}: RevealProps) {
  const reduce = useSafeReducedMotion();
  const preset = variantMap[variant];
  const hidden =
    variant === "up" && y !== 22
      ? { opacity: 0, y }
      : preset.hidden;

  return (
    <motion.div
      className={clsx(className)}
      initial={reduce ? false : hidden}
      whileInView={reduce ? undefined : preset.show}
      animate={reduce ? preset.show : undefined}
      viewport={reduce ? undefined : { once: true, amount }}
      transition={{ duration: reduce ? 0 : 0.42, delay: reduce ? 0 : delay, ease: EASE }}
      style={reduce ? undefined : { willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: "div" | "ol" | "ul";
};

export function Stagger({
  children,
  className,
  stagger = 0.05,
  delayChildren = 0.04,
  as = "div",
}: StaggerProps) {
  const reduce = useSafeReducedMotion();

  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delayChildren,
      },
    },
  };

  const MotionTag = as === "ol" ? motion.ol : as === "ul" ? motion.ul : motion.div;

  return (
    <MotionTag
      className={clsx(className)}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      animate={reduce ? "show" : undefined}
      viewport={reduce ? undefined : { once: true, amount: 0.12 }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  as?: "div" | "li";
};

export function StaggerItem({
  children,
  className,
  variant = "up",
  as = "div",
}: StaggerItemProps) {
  const reduce = useSafeReducedMotion();
  const preset = variantMap[variant];
  const MotionTag = as === "li" ? motion.li : motion.div;

  return (
    <MotionTag
      className={clsx(className)}
      variants={{
        hidden: reduce ? preset.show : preset.hidden,
        show: preset.show,
      }}
      transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
      style={reduce ? undefined : { willChange: "transform, opacity" }}
    >
      {children}
    </MotionTag>
  );
}
