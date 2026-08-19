"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  LANDING_SECTION_IDS,
  type LandingSectionId,
} from "@/types/landing";
import { sectionHref } from "@/lib/i18n/paths";

type RevealSectionOptions = {
  behavior?: ScrollBehavior;
};

type LandingRevealContextValue = {
  unlocked: boolean;
  unlock: () => void;
  revealSection: (sectionId: string, options?: RevealSectionOptions) => void;
};

const LandingRevealContext = createContext<LandingRevealContextValue | null>(
  null,
);

const HERO_ID = LANDING_SECTION_IDS.hero;
/** Cold CI dynamic chunks + layout settle; ~6s of polling. */
const REVEAL_MAX_ATTEMPTS = 120;
const REVEAL_POLL_MS = 50;
const REVEAL_SMOOTH_POLL_MS = 250;
const UNLOCK_LAYOUT_DELAY_MS = 120;
const REVEAL_SETTLE_PX = 8;

type RevealJob = {
  generation: number;
  timer: number;
};

/** Prefer the real <section> so dynamic() loading placeholders never steal the id. */
export function getLandingSectionElement(id: string): HTMLElement | null {
  return (
    document.querySelector(`section#${CSS.escape(id)}`) ??
    document.getElementById(id)
  );
}

function markLandingUnlocked() {
  document.documentElement.dataset.landingUnlocked = "1";
}

function realizeLandingSectionLayouts() {
  markLandingUnlocked();
  document.querySelectorAll(".landing-section-paint").forEach((node) => {
    node.classList.add("landing-section-realized");
  });
}

function sectionIntersectsViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  return visible > 1;
}

function sectionRevealSettled(el: HTMLElement): boolean {
  if (!sectionIntersectsViewport(el)) return false;
  return Math.abs(window.scrollY - sectionScrollTop(el)) <= REVEAL_SETTLE_PX;
}

function sectionScrollTop(el: HTMLElement): number {
  const marginTop = Number.parseFloat(getComputedStyle(el).scrollMarginTop);
  const offset = Number.isFinite(marginTop) ? marginTop : 0;
  return Math.max(0, window.scrollY + el.getBoundingClientRect().top - offset);
}

/**
 * CSSOM `behavior: "auto"` follows `html { scroll-behavior: smooth }`.
 * Disable that for corrections so polling does not restart the animation.
 */
function scrollWindowTo(top: number, behavior: ScrollBehavior) {
  if (behavior === "smooth") {
    window.scrollTo({ top, left: 0, behavior: "smooth" });
    return;
  }

  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, top);
  root.style.scrollBehavior = previous;
}

function scrollToSection(id: string, behavior: ScrollBehavior) {
  const el = getLandingSectionElement(id);
  if (!el) return false;
  realizeLandingSectionLayouts();
  scrollWindowTo(sectionScrollTop(el), behavior);
  return true;
}

function scheduleReveal(
  job: RevealJob,
  sectionId: string,
  preferredBehavior: ScrollBehavior,
  delay: number,
) {
  job.generation += 1;
  const generation = job.generation;
  window.clearTimeout(job.timer);

  let attempts = 0;
  const run = () => {
    if (generation !== job.generation) return;

    const el = getLandingSectionElement(sectionId);
    if (!el) {
      if (attempts >= REVEAL_MAX_ATTEMPTS) return;
      attempts += 1;
      job.timer = window.setTimeout(run, REVEAL_POLL_MS);
      return;
    }

    realizeLandingSectionLayouts();
    void el.offsetHeight;
    if (sectionRevealSettled(el)) return;

    const behavior =
      attempts === 0 && preferredBehavior === "smooth" ? "smooth" : "auto";
    scrollToSection(sectionId, behavior);
    attempts += 1;
    if (attempts >= REVEAL_MAX_ATTEMPTS) return;
    job.timer = window.setTimeout(
      run,
      behavior === "smooth" ? REVEAL_SMOOTH_POLL_MS : REVEAL_POLL_MS,
    );
  };

  job.timer = window.setTimeout(run, delay);
}

export function LandingRevealProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const unlockedRef = useRef(false);
  const revealJobRef = useRef<RevealJob>({ generation: 0, timer: 0 });

  const unlock = useCallback(() => {
    unlockedRef.current = true;
    markLandingUnlocked();
    setUnlocked(true);
  }, []);

  const revealSection = useCallback(
    (sectionId: string, options?: RevealSectionOptions) => {
      if (!sectionId || sectionId === HERO_ID) return;

      const delay = unlockedRef.current ? 0 : UNLOCK_LAYOUT_DELAY_MS;
      unlockedRef.current = true;
      markLandingUnlocked();
      setUnlocked(true);
      scheduleReveal(
        revealJobRef.current,
        sectionId,
        options?.behavior ?? "smooth",
        delay,
      );
    },
    [],
  );

  useEffect(() => {
    const job = revealJobRef.current;
    return () => {
      job.generation += 1;
      window.clearTimeout(job.timer);
      delete document.documentElement.dataset.landingUnlocked;
    };
  }, []);

  const value = useMemo(
    () => ({ unlocked, unlock, revealSection }),
    [unlocked, unlock, revealSection],
  );

  return (
    <LandingRevealContext.Provider value={value}>
      {children}
    </LandingRevealContext.Provider>
  );
}

export function useLandingReveal(): LandingRevealContextValue {
  const value = useContext(LandingRevealContext);
  if (!value) {
    throw new Error("useLandingReveal must be used within LandingRevealProvider");
  }
  return value;
}

/** Props for in-page section anchors that must unlock the landing canvas first. */
export function useSectionAnchor(sectionId: LandingSectionId) {
  const { revealSection } = useLandingReveal();
  const href = sectionHref(sectionId);

  const onClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      event.preventDefault();
      if (window.location.hash !== `#${sectionId}`) {
        window.history.pushState(null, "", `#${sectionId}`);
      }
      revealSection(sectionId);
    },
    [revealSection, sectionId],
  );

  return { href, onClick };
}

type SectionAnchorProps = {
  sectionId: LandingSectionId;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

export function SectionAnchor({
  sectionId,
  className,
  children,
  onNavigate,
}: SectionAnchorProps) {
  const { href, onClick } = useSectionAnchor(sectionId);
  return (
    <a
      href={href}
      onClick={(event) => {
        onClick(event);
        if (!event.defaultPrevented) return;
        onNavigate?.();
      }}
      className={className}
    >
      {children}
    </a>
  );
}
