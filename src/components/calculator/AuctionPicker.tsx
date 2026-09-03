"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useIsMounted } from "@/hooks/useSafeReducedMotion";
import type { AuctionId } from "@/lib/calculator/types";

const AUCTION_LOGOS = {
  iaai: {
    src: "/auctions/iaai-mark.webp",
    alt: "IAAI",
    width: 1024,
    height: 610,
    className: "h-7 w-auto object-contain",
  },
  copart: {
    src: "/auctions/copart-mark.webp",
    alt: "Copart",
    width: 1024,
    height: 382,
    className:
      "h-6 w-auto object-contain [filter:drop-shadow(0_0_0.6px_#111)_drop-shadow(0_1px_1px_rgba(0,0,0,0.28))]",
  },
} as const;

export type AuctionValue = AuctionId;

type AuctionPickerProps = {
  label: string;
  customLabel: string;
  name?: string;
  value: AuctionValue;
  customFee: string;
  onChange: (value: AuctionValue) => void;
  onCustomFeeChange: (value: string) => void;
  error?: string;
  customFeeError?: string;
};

export function AuctionPicker({
  label,
  customLabel,
  name = "auction",
  value,
  customFee,
  onChange,
  onCustomFeeChange,
  error,
  customFeeError,
}: AuctionPickerProps) {
  const mounted = useIsMounted();

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-[var(--calc-label)]">{label}</legend>
      <input type="hidden" name={name} value={value} />
      <div className="calc-auction-rail relative grid grid-cols-3 gap-1.5 rounded-[var(--radius-md)] bg-[var(--calc-field-bg)] p-1.5">
        <AuctionButton
          selected={value === "iaai"}
          mounted={mounted}
          onClick={() => onChange("iaai")}
        >
          <AuctionMark mark="iaai" />
        </AuctionButton>
        <AuctionButton
          selected={value === "copart"}
          mounted={mounted}
          surface="copart"
          onClick={() => onChange("copart")}
        >
          <AuctionMark mark="copart" />
        </AuctionButton>
        <label className="relative z-[1] flex h-11 items-center">
          <span className="sr-only">{customLabel}</span>
          <span className="pointer-events-none absolute left-2 text-xs text-[var(--calc-placeholder)]">
            $
          </span>
          <input
            type="number"
            min={0}
            step="1"
            inputMode="numeric"
            value={customFee}
            placeholder="0"
            aria-label={customLabel}
            aria-invalid={Boolean(customFeeError)}
            onChange={(event) => {
              onCustomFeeChange(event.target.value);
              onChange("custom");
            }}
            className="h-11 w-full rounded-[calc(var(--radius-md)-2px)] border border-transparent bg-transparent pr-2 pl-5 text-sm text-[var(--ink)] outline-none"
          />
        </label>
      </div>
      {error ? <p className="mt-1.5 text-xs text-[var(--danger)]">{error}</p> : null}
      {customFeeError ? (
        <p className="mt-1.5 text-xs text-[var(--danger)]">{customFeeError}</p>
      ) : null}
    </fieldset>
  );
}

const SELECTED_PILL_SURFACE = {
  default:
    "border border-[var(--calc-accent)] bg-white shadow-[0_8px_18px_rgba(240,90,24,0.18)]",
  copart:
    "border border-[var(--calc-accent)] bg-[#0a2748] shadow-[0_8px_18px_rgba(10,39,72,0.35)]",
} as const;

function AuctionButton({
  selected,
  mounted,
  surface = "default",
  onClick,
  children,
}: {
  selected: boolean;
  mounted: boolean;
  surface?: keyof typeof SELECTED_PILL_SURFACE;
  onClick: () => void;
  children: ReactNode;
}) {
  const pillClassName = `absolute inset-0 rounded-[calc(var(--radius-md)-2px)] ${SELECTED_PILL_SURFACE[surface]}`;

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`relative z-[1] flex h-11 items-center justify-center rounded-[calc(var(--radius-md)-2px)] transition-colors ${
        selected ? "text-[var(--ink)]" : "text-[var(--muted)] hover:text-[var(--ink)]"
      }`}
    >
      {selected ? (
        mounted ? (
          <motion.span
            layoutId="auction-pill"
            className={pillClassName}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          />
        ) : (
          <span className={pillClassName} />
        )
      ) : null}
      <span className="relative z-[1]">{children}</span>
    </button>
  );
}

function AuctionMark({ mark }: { mark: "iaai" | "copart" }) {
  const logo = AUCTION_LOGOS[mark];

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      className={logo.className}
      sizes="96px"
      unoptimized
    />
  );
}
