"use client";

import { Stagger, StaggerItem } from "@/components/ui/Reveal";

type ApplyRoutePanelProps = {
  eyebrow: string;
  responseNote: string;
  steps: readonly string[];
};

export function ApplyRoutePanel({
  eyebrow,
  responseNote,
  steps,
}: ApplyRoutePanelProps) {
  return (
    <aside className="apply-aside" aria-label={eyebrow}>
      <div className="apply-aside-orbit" aria-hidden="true" />
      <p className="font-mono text-[0.68rem] tracking-[0.22em] text-[var(--accent)] uppercase">
        01 — 03
      </p>
      <h3 className="mt-3 font-display text-2xl text-white xl:text-3xl">{responseNote}</h3>
      <Stagger as="ol" className="mt-8 space-y-4" stagger={0.08}>
        {steps.map((step, index) => (
          <StaggerItem
            key={step}
            as="li"
            variant="up"
            className="flex items-start gap-4 border-b border-white/10 pb-4 last:border-b-0"
          >
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] font-mono text-xs text-[var(--accent)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="pt-1.5 text-base leading-7 text-white/75">{step}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </aside>
  );
}
