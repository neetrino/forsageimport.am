"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
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

/** Prefer the real <section> so dynamic() loading placeholders never steal the id. */
export function getLandingSectionElement(id: string): HTMLElement | null {
  return (
    document.querySelector(`section#${CSS.escape(id)}`) ??
    document.getElementById(id)
  );
}

function sectionIntersectsViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

function scrollToSection(id: string, behavior: ScrollBehavior) {
  const el = getLandingSectionElement(id);
  if (!el) return false;

  if (behavior === "smooth") {
    el.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" });
    return true;
  }

  scrollSectionIntoViewInstant(el);
  return true;
}

/**
 * CSSOM `behavior: "auto"` follows `html { scroll-behavior: smooth }`.
 * Instant window scroll avoids restarting that animation on every poll.
 */
function scrollSectionIntoViewInstant(el: HTMLElement) {
  const marginTop = Number.parseFloat(getComputedStyle(el).scrollMarginTop);
  const offset = Number.isFinite(marginTop) ? marginTop : 0;
  const top = window.scrollY + el.getBoundingClientRect().top - offset;
  window.scrollTo(0, Math.max(0, top));
}

export function LandingRevealProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);

  const unlock = useCallback(() => {
    setUnlocked(true);
  }, []);

  const revealSection = useCallback(
    (sectionId: string, options?: RevealSectionOptions) => {
      if (!sectionId || sectionId === HERO_ID) return;

      const preferredBehavior = options?.behavior ?? "smooth";
      setUnlocked((wasUnlocked) => {
        const delay = wasUnlocked ? 0 : UNLOCK_LAYOUT_DELAY_MS;
        let attempts = 0;

        const run = () => {
          const el = getLandingSectionElement(sectionId);
          if (!el) {
            if (attempts >= REVEAL_MAX_ATTEMPTS) return;
            attempts += 1;
            window.setTimeout(run, REVEAL_POLL_MS);
            return;
          }

          // Element can mount before layout/chunk paint is stable; keep correcting
          // until it actually intersects (smooth first, then instant).
          if (sectionIntersectsViewport(el)) {
            scrollToSection(sectionId, "auto");
            return;
          }

          const behavior =
            attempts === 0 && preferredBehavior === "smooth"
              ? "smooth"
              : "auto";
          scrollToSection(sectionId, behavior);
          attempts += 1;
          if (attempts >= REVEAL_MAX_ATTEMPTS) return;
          window.setTimeout(
            run,
            behavior === "smooth" ? REVEAL_SMOOTH_POLL_MS : REVEAL_POLL_MS,
          );
        };

        window.setTimeout(run, delay);
        return true;
      });
    },
    [],
  );

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
