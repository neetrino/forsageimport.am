"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { HERO_CARS } from "@/lib/brand/assets";

const SWAP_DURATION = 0.2;

type HeroCarsCycleProps = {
  slideIndex: number;
  direction?: number;
};

export function HeroCarsCycle({
  slideIndex,
  direction = 1,
}: HeroCarsCycleProps) {
  const reduce = useReducedMotion();
  const index =
    ((slideIndex % HERO_CARS.length) + HERO_CARS.length) % HERO_CARS.length;
  const car = HERO_CARS[index] ?? HERO_CARS[0];

  return (
    <div
      className="hero-cars-cycle relative flex w-full max-w-[900px] flex-col items-center"
      aria-live="polite"
    >
      <div className="hero-cars-stage relative flex min-h-[200px] w-full items-center justify-center overflow-visible px-2 sm:min-h-[280px] lg:min-h-[340px] xl:min-h-[380px]">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={car.id}
            custom={direction}
            className="hero-car-rig absolute inset-0 flex items-center justify-center overflow-visible translate-x-4 translate-y-6 sm:translate-x-8 sm:translate-y-8 lg:translate-x-12 lg:translate-y-10"
            variants={reduce ? fadeVariants : swapVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: reduce ? 0.25 : SWAP_DURATION,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src={car.webp}
              alt={car.alt}
              width={car.width}
              height={car.height}
              priority
              sizes="(max-width: 768px) 92vw, 860px"
              className="hero-car-image h-auto max-h-full w-full max-w-full object-contain object-center"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const fadeVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const swapVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 40 : -40,
    scale: 0.94,
    filter: "blur(6px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -36 : 36,
    scale: 0.96,
    filter: "blur(4px)",
  }),
};
