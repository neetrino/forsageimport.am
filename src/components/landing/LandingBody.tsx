"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { clsx } from "clsx";
import {
  useIsMounted,
  useSafeReducedMotion,
} from "@/hooks/useSafeReducedMotion";

type LandingBodyProps = {
  children: ReactNode;
};

export function LandingBody({ children }: LandingBodyProps) {
  const [unlocked, setUnlocked] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useSafeReducedMotion();
  const mounted = useIsMounted();

  useEffect(() => {
    const unlock = () => setUnlocked(true);

    window.addEventListener("wheel", unlock, { passive: true, once: true });
    window.addEventListener("touchmove", unlock, { passive: true, once: true });
    window.addEventListener("scroll", unlock, { passive: true, once: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " " ||
        event.key === "Spacebar"
      ) {
        unlock();
        window.removeEventListener("keydown", onKeyDown);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("touchmove", unlock);
      window.removeEventListener("scroll", unlock);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: mounted ? rootRef : undefined,
    offset: ["start end", "end start"],
  });

  const atmosphereY = useTransform(
    scrollYProgress,
    [0, 1],
    !unlocked || reduce ? [0, 0] : [0, 120],
  );
  const lanesY = useTransform(
    scrollYProgress,
    [0, 1],
    !unlocked || reduce ? [0, 0] : [0, -60],
  );
  const gridOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    !unlocked || reduce ? [0.28, 0.28, 0.28, 0.28] : [0.18, 0.32, 0.28, 0.12],
  );

  return (
    <div
      ref={rootRef}
      className={clsx(
        "landing-canvas relative z-20",
        unlocked
          ? "landing-canvas-revealed -mt-[var(--landing-curve-overlap)]"
          : "landing-canvas-pre-scroll",
        unlocked && "is-curved",
      )}
      aria-hidden={!unlocked}
    >
      <motion.div
        className="landing-canvas-atmosphere"
        aria-hidden="true"
        style={{ y: atmosphereY }}
      />
      <motion.div
        className="landing-canvas-lanes"
        aria-hidden="true"
        style={{ y: lanesY }}
      />
      <motion.div
        className="landing-canvas-grid"
        aria-hidden="true"
        style={{ opacity: gridOpacity }}
      />
      <motion.div
        className="relative z-[1]"
        initial={false}
        animate={
          unlocked
            ? { opacity: 1, y: 0 }
            : reduce
              ? { opacity: 0, y: 0 }
              : { opacity: 0, y: 24 }
        }
        transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
