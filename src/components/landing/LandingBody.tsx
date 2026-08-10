"use client";

import { useEffect, useRef, type ReactNode } from "react";
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
import { useLandingReveal } from "@/components/landing/LandingRevealContext";
import { LANDING_SECTION_IDS } from "@/types/landing";

type LandingBodyProps = {
  children: ReactNode;
};

const HERO_ID = LANDING_SECTION_IDS.hero;

function hashSectionId(hash: string): string | null {
  const id = hash.replace(/^#/, "").trim();
  if (!id || id === HERO_ID) return null;
  return id;
}

export function LandingBody({ children }: LandingBodyProps) {
  const { unlocked, unlock, revealSection } = useLandingReveal();
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useSafeReducedMotion();
  const mounted = useIsMounted();

  useEffect(() => {
    document.documentElement.dataset.landingReady = "1";

    const initialId = hashSectionId(window.location.hash);
    if (initialId) {
      revealSection(initialId, { behavior: "auto" });
    }

    const onHashChange = () => {
      const id = hashSectionId(window.location.hash);
      if (id) revealSection(id, { behavior: "smooth" });
    };

    window.addEventListener("wheel", unlock, { passive: true, once: true });
    window.addEventListener("touchmove", unlock, { passive: true, once: true });
    window.addEventListener("scroll", unlock, { passive: true, once: true });
    window.addEventListener("hashchange", onHashChange);

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
      delete document.documentElement.dataset.landingReady;
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("touchmove", unlock);
      window.removeEventListener("scroll", unlock);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [revealSection, unlock]);

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
