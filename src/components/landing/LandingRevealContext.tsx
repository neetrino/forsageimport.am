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

function scrollToSection(id: string, behavior: ScrollBehavior) {
  const el = document.getElementById(id);
  if (!el) return false;

  const scrollMargin = Number.parseFloat(
    getComputedStyle(el).scrollMarginTop || "0",
  );
  const top = window.scrollY + el.getBoundingClientRect().top - scrollMargin;
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}

export function LandingRevealProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);

  const unlock = useCallback(() => {
    setUnlocked(true);
  }, []);

  const revealSection = useCallback(
    (sectionId: string, options?: RevealSectionOptions) => {
      if (!sectionId || sectionId === HERO_ID) return;

      const behavior = options?.behavior ?? "smooth";
      setUnlocked((wasUnlocked) => {
        const delay = wasUnlocked ? 0 : 120;
        let attempts = 0;
        const run = () => {
          if (scrollToSection(sectionId, behavior) || attempts >= 30) return;
          attempts += 1;
          window.setTimeout(run, 50);
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
