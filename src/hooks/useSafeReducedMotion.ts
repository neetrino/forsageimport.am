"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const emptySubscribe = () => () => undefined;

function subscribeMedia(
  query: string,
  onStoreChange: () => void,
): () => void {
  const media = window.matchMedia(query);
  const onChange = () => onStoreChange();

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", onChange);
  } else {
    media.addListener(onChange);
  }

  // Yandex / some Chromium forks fire layout after visualViewport, not only matchMedia.
  window.visualViewport?.addEventListener("resize", onChange);
  window.addEventListener("orientationchange", onChange);

  return () => {
    if (typeof media.removeEventListener === "function") {
      media.removeEventListener("change", onChange);
    } else {
      media.removeListener(onChange);
    }
    window.visualViewport?.removeEventListener("resize", onChange);
    window.removeEventListener("orientationchange", onChange);
  };
}

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
    (onStoreChange) => subscribeMedia(`(min-width: ${minWidth}px)`, onStoreChange),
    () => window.matchMedia(`(min-width: ${minWidth}px)`).matches,
    () => false,
  );
  return mounted && matches;
}

/**
 * True when the device can reliably hover (mouse/trackpad).
 * Touch browsers (incl. Yandex mobile) often fire mouseenter without mouseleave.
 */
export function useCanHover(): boolean {
  const mounted = useIsMounted();
  const matches = useSyncExternalStore(
    (onStoreChange) =>
      subscribeMedia("(hover: hover) and (pointer: fine)", onStoreChange),
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    () => false,
  );
  return mounted && matches;
}
