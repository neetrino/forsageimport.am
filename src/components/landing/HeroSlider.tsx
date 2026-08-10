"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import type { Dictionary } from "@/lib/i18n/types";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { sectionHref } from "@/lib/i18n/paths";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { HeroCarsCycle } from "@/components/landing/HeroCarsCycle";

const HeroRoad3D = dynamic(
  () =>
    import("@/components/landing/HeroRoad3D").then((mod) => mod.HeroRoad3D),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#07090e]" />,
  },
);

const AUTO_MS = 1800;
const TEXT_TRANSITION_S = 0.16;

type HeroSliderProps = {
  dict: Dictionary;
};

export function HeroSlider({ dict }: HeroSliderProps) {
  const slides = dict.hero.slides;
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length],
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (paused || reduce || slides.length < 2) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % slides.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce, slides.length]);

  const slide = slides[index] ?? slides[0];

  return (
    <div
      className="hero-slider relative min-h-svh overflow-hidden bg-[#090b10] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <span className="sr-only">{dict.a11y.heroVisual}</span>

      <HeroVelocityBackdrop active={index} reduceMotion={Boolean(reduce)} />

      <Container className="relative z-30 flex min-h-svh flex-col !pl-3 !pr-4 pb-16 pt-[calc(var(--header-height)+1.25rem)] sm:!pl-4 sm:!pr-6 sm:pb-20 sm:pt-[calc(var(--header-height)+1.75rem)] lg:!pl-5 lg:!pr-8 lg:pb-24 xl:!pl-6">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-4 xl:gap-6">
          <div className="hero-copy-stage order-2 w-full max-w-2xl justify-self-start lg:order-1 lg:max-w-3xl lg:-translate-x-2 xl:-translate-x-4">
            <div className="hero-copy-wall">
              <p className="inline-flex items-center gap-3 text-[0.8rem] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase sm:text-[0.85rem]">
                <span className="h-px w-10 bg-[var(--accent)]" aria-hidden="true" />
                {dict.site.tagline}
              </p>

              <div
                className="relative mt-7 min-h-[13rem] sm:min-h-[14.5rem] lg:min-h-[15.5rem]"
                aria-live="polite"
                aria-atomic="true"
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={slide.headline}
                    custom={direction}
                    variants={
                      reduce
                        ? fadeOnly
                        : {
                            enter: (dir: number) => ({
                              opacity: 0,
                              x: dir > 0 ? 56 : -56,
                              clipPath:
                                dir > 0
                                  ? "inset(0 0 0 28%)"
                                  : "inset(0 28% 0 0)",
                            }),
                            center: {
                              opacity: 1,
                              x: 0,
                              clipPath: "inset(0 0 0 0)",
                            },
                            exit: (dir: number) => ({
                              opacity: 0,
                              x: dir > 0 ? -40 : 40,
                              clipPath:
                                dir > 0
                                  ? "inset(0 32% 0 0)"
                                  : "inset(0 0 0 32%)",
                            }),
                          }
                    }
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: TEXT_TRANSITION_S, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h1 className="max-w-2xl font-display text-[2rem] leading-[1.12] text-white sm:text-[2.6rem] lg:text-[3.15rem] lg:leading-[1.08]">
                      {slide.headline}
                    </h1>
                    <p className="mt-5 max-w-xl text-lg font-medium leading-8 text-white/68 sm:text-xl sm:leading-8">
                      {slide.support}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink
                  href={sectionHref(LANDING_SECTION_IDS.calculator)}
                  className="!px-6 !py-3.5 !text-base"
                >
                  {dict.hero.ctaCalculate}
                </ButtonLink>
                <ButtonLink
                  href={sectionHref(LANDING_SECTION_IDS.apply)}
                  variant="secondary"
                  tone="dark"
                  className="!px-6 !py-3.5 !text-base"
                >
                  {dict.hero.ctaApply}
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className="order-1 flex justify-center overflow-visible lg:order-2 lg:justify-end">
            <div id="hero-brand" className="relative w-full max-w-[900px] overflow-visible">
              <HeroCarsCycle slideIndex={index} direction={direction} />
              <span className="sr-only">{dict.hero.brand}</span>
            </div>
          </div>
        </div>

        <div
          className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5"
          role="group"
          aria-label={dict.a11y.heroSlider}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hero-slider-nav"
              aria-label={dict.a11y.heroPrev}
              onClick={prev}
            >
              ←
            </button>
            <button
              type="button"
              className="hero-slider-nav"
              aria-label={dict.a11y.heroNext}
              onClick={next}
            >
              →
            </button>
          </div>

          <div className="flex min-w-[12rem] flex-1 items-center gap-2 sm:max-w-md sm:flex-none">
            {slides.map((item, slideIndex) => {
              const active = slideIndex === index;
              return (
                <button
                  key={item.headline}
                  type="button"
                  aria-label={`${dict.a11y.heroGoToSlide} ${slideIndex + 1}`}
                  aria-current={active ? "true" : undefined}
                  className="group relative h-1.5 flex-1 overflow-hidden rounded-sm bg-white/15"
                  onClick={() => goTo(slideIndex, slideIndex > index ? 1 : -1)}
                >
                  <span
                    className={`absolute inset-y-0 left-0 bg-[var(--accent)] transition-[width] duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-1/3"
                    }`}
                  />
                  {active && !reduce && !paused ? (
                    <motion.span
                      className="absolute inset-y-0 left-0 bg-white/80"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                      key={`progress-${index}`}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <p className="font-mono text-xs tracking-[0.18em] text-white/45 tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
        </div>
      </Container>
    </div>
  );
}

const fadeOnly = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

type HeroVelocityBackdropProps = {
  active: number;
  reduceMotion: boolean;
};

function HeroVelocityBackdrop({ active, reduceMotion }: HeroVelocityBackdropProps) {
  const scene =
    active === 0 ? "route" : active === 1 ? "cost" : "handover";

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#07090e]" />

      {reduceMotion ? <StaticRoadFallback /> : <HeroRoad3D active={active} />}

      <div
        className={`hero-horizon-band absolute inset-x-[-10%] top-[6%] h-[36%] mix-blend-screen transition-all duration-700 ${
          scene === "cost"
            ? "opacity-70 translate-y-[-4%]"
            : scene === "handover"
              ? "opacity-65 translate-y-[6%]"
              : "opacity-75"
        }`}
      />

      <div className="absolute inset-0 opacity-50">
        <div className="hero-shard hero-shard-a" />
        <div className="hero-shard hero-shard-b" />
        <div className="hero-shard hero-shard-c" />
      </div>

      {!reduceMotion ? (
        <div className="hero-streaks absolute inset-0 opacity-40">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : null}

      <p
        className={`hero-watermark absolute left-[-4%] top-[18%] select-none font-display text-[clamp(4.5rem,18vw,14rem)] font-black leading-none tracking-[-0.07em] text-white/[0.05] transition-transform duration-700 ${
          scene === "cost"
            ? "translate-x-[-2%] rotate-[-2deg]"
            : scene === "handover"
              ? "translate-x-[3%] rotate-[1.5deg]"
              : "rotate-[-4deg]"
        }`}
      >
        FORSAGE
      </p>

      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_70%_40%,transparent_18%,rgba(7,9,14,0.4)_72%,rgba(7,9,14,0.82)_100%)]" />
      <div className="absolute inset-y-0 left-0 w-[52%] bg-gradient-to-r from-[#07090e]/88 via-[#07090e]/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#07090e] to-transparent" />
    </div>
  );
}

function StaticRoadFallback() {
  return (
    <svg
      className="absolute inset-x-0 bottom-[-8%] h-[68%] w-full opacity-90"
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id="roadBodyStatic" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#151922" stopOpacity="0" />
          <stop offset="35%" stopColor="#12161f" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0a0c11" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="laneGlowStatic" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f05a18" stopOpacity="0" />
          <stop offset="55%" stopColor="#f05a18" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ff8a3d" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path d="M0 180 L720 40 L1440 180 L1440 720 L0 720 Z" fill="url(#roadBodyStatic)" />
      <path
        d="M720 56 L1180 720 H980 L720 170 L460 720 H260 Z"
        fill="url(#laneGlowStatic)"
      />
    </svg>
  );
}
