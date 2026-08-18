"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useIsMounted } from "@/hooks/useSafeReducedMotion";
import type { AuctionId } from "@/lib/calculator/types";

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

function AuctionButton({
  selected,
  mounted,
  onClick,
  children,
}: {
  selected: boolean;
  mounted: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
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
            className="absolute inset-0 rounded-[calc(var(--radius-md)-2px)] border border-[var(--calc-accent)] bg-white shadow-[0_8px_18px_rgba(240,90,24,0.18)]"
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          />
        ) : (
          <span className="absolute inset-0 rounded-[calc(var(--radius-md)-2px)] border border-[var(--calc-accent)] bg-white shadow-[0_8px_18px_rgba(240,90,24,0.18)]" />
        )
      ) : null}
      <span className="relative z-[1]">{children}</span>
    </button>
  );
}

function AuctionMark({ mark }: { mark: "iaai" | "copart" }) {
  if (mark === "iaai") {
    return (
      <span className="text-sm font-extrabold tracking-tight text-[#e10600]">
        IAA<span className="align-super text-[0.65em]">I</span>
      </span>
    );
  }

  return (
    <span className="text-sm font-extrabold tracking-tight">
      <span className="text-[#1f4e79]">Co</span>
      <span className="text-[#c41230]">part</span>
    </span>
  );
}
