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
