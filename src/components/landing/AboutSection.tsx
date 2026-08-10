"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import type { Dictionary } from "@/lib/i18n/types";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type AboutSectionProps = {
  dict: Dictionary;
};

export function AboutSection({ dict }: AboutSectionProps) {
  const [lead, ...stages] = dict.about.paragraphs;
  const [unlocked, setUnlocked] = useState(false);

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

  return (
    <Section
      id={LANDING_SECTION_IDS.about}
      ariaLabelledBy="about-title"
      className={clsx(
        unlocked
          ? "about-manifest-revealed -mt-8 sm:-mt-12 lg:-mt-14"
          : "about-manifest-pre-scroll",
        "about-manifest relative z-20 !py-0",
      )}
      containerClassName="!max-w-none !px-0"
      ariaHidden={!unlocked}
    >
      <div
        className={clsx(
          "about-manifest-shell relative overflow-hidden bg-[#0a0c11] text-white",
          unlocked && "is-curved",
        )}
      >
        <div className="about-manifest-glow" aria-hidden="true" />
        <div className="about-manifest-lanes" aria-hidden="true" />
        <div className="about-manifest-watermark" aria-hidden="true">
          FORSAGE
        </div>

        <div className="relative mx-auto max-w-[72rem] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <Reveal>
            <div className="about-manifest-header flex flex-col gap-6 border-b border-white/12 pb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:pb-12">
              <div className="min-w-0">
                <p className="inline-flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.28em] text-[var(--accent)] uppercase">
                  <span className="h-px w-10 bg-[var(--accent)]" aria-hidden="true" />
                  {dict.about.eyebrow}
                </p>
                <h2
                  id="about-title"
                  className="mt-4 font-display text-[2.6rem] leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.5rem]"
                >
                  {dict.about.title}
                </h2>
              </div>
              {lead ? (
                <p className="about-manifest-lead max-w-2xl text-lg font-medium leading-8 text-white/88 sm:text-xl sm:leading-9 lg:max-w-xl">
                  {lead}
                </p>
              ) : null}
            </div>
          </Reveal>

          <ol className="about-manifest-stages mt-0 grid gap-0 sm:grid-cols-2">
            {stages.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.05 * (index + 1)}>
                <li
                  className={clsx(
                    "about-manifest-tile group relative flex h-full min-h-[11rem] flex-col gap-4 border-b border-white/10 p-6 sm:min-h-[13rem] sm:p-8",
                    index % 2 === 0 && "sm:border-r",
                    index >= 2 && "sm:border-b-0",
                  )}
                >
                  <span className="font-mono text-sm tracking-[0.2em] text-[var(--accent)] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-8 text-white/70 transition-colors duration-300 group-hover:text-white/90 sm:text-lg sm:leading-8">
                    {paragraph}
                  </p>
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
