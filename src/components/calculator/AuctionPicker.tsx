"use client";

import { motion } from "motion/react";
import { useIsMounted } from "@/hooks/useSafeReducedMotion";

export type AuctionValue = "iaai" | "copart" | "manheim";

type AuctionPickerProps = {
  label: string;
  name?: string;
  value: AuctionValue;
  onChange: (value: AuctionValue) => void;
};

const auctions: { value: AuctionValue; mark: "iaai" | "copart" | "manheim" }[] = [
  { value: "iaai", mark: "iaai" },
  { value: "copart", mark: "copart" },
  { value: "manheim", mark: "manheim" },
];

export function AuctionPicker({
  label,
  name = "auction",
  value,
  onChange,
}: AuctionPickerProps) {
  const mounted = useIsMounted();

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-[var(--calc-label)]">{label}</legend>
      <input type="hidden" name={name} value={value} />
      <div className="calc-auction-rail relative grid grid-cols-3 gap-1.5 rounded-[var(--radius-md)] bg-[var(--calc-field-bg)] p-1.5">
        {auctions.map((auction) => {
          const selected = auction.value === value;
          return (
            <button
              key={auction.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(auction.value)}
              className={`relative z-[1] flex h-11 items-center justify-center rounded-[calc(var(--radius-md)-2px)] transition-colors ${
                selected ? "text-[var(--ink)]" : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              {selected ? (
                mounted ? (
                  <motion.span
                    layoutId="auction-pill"
                    className="absolute inset-0 rounded-[calc(var(--radius-md)-2px)] border border-[var(--calc-accent)] bg-white shadow-[0_8px_18px_rgba(240,90,24,0.18)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : (
                  <span className="absolute inset-0 rounded-[calc(var(--radius-md)-2px)] border border-[var(--calc-accent)] bg-white shadow-[0_8px_18px_rgba(240,90,24,0.18)]" />
                )
              ) : null}
              <span className="relative z-[1]">
                <AuctionMark mark={auction.mark} />
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function AuctionMark({ mark }: { mark: "iaai" | "copart" | "manheim" }) {
  if (mark === "iaai") {
    return (
      <span className="text-sm font-extrabold tracking-tight text-[#e10600]">
        IAA<span className="align-super text-[0.65em]">I</span>
      </span>
    );
  }

  if (mark === "copart") {
    return (
      <span className="text-sm font-extrabold tracking-tight">
        <span className="text-[#1f4e79]">Co</span>
        <span className="text-[#c41230]">part</span>
      </span>
    );
  }

  return (
    <span className="text-xs font-bold tracking-wide text-[#5b6b7c] uppercase">
      Manheim
    </span>
  );
}
