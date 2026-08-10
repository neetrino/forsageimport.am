"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const emptySubscribe = () => () => undefined;

/** True only after client hydration. */
export function useIsMounted(): boolean {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

/**
 * Safe reduced-motion flag for React 19.
 * Returns false until hydrated so we never branch trees during SSR/hydration.
 */
export function useSafeReducedMotion(): boolean {
  const reduce = useReducedMotion();
  const mounted = useIsMounted();
  return mounted && Boolean(reduce);
}

/** True when viewport is at least `minWidth` px (false until hydrated). */
export function useMinWidth(minWidth: number): boolean {
  const mounted = useIsMounted();
  const matches = useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia(`(min-width: ${minWidth}px)`);
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(`(min-width: ${minWidth}px)`).matches,
    () => false,
  );
  return mounted && matches;
}
