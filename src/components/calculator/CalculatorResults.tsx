"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Dictionary } from "@/lib/i18n/types";
import type { CalculatorResult, CostBreakdown } from "@/lib/calculator/types";
import { formatUsd } from "@/lib/calculator/format";

type VariantKey = "physical" | "legal";

type CalculatorResultsProps = {
  dict: Dictionary;
  result: CalculatorResult | null;
  locale: string;
  onDownload: (variant: VariantKey) => void;
  onClear: () => void;
  isDownloading: VariantKey | null;
};

export function CalculatorResults({
  dict,
  result,
  locale,
  onDownload,
  onClear,
  isDownloading,
}: CalculatorResultsProps) {
  return (
    <div className="mt-6">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="pending"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="calc-results-pending"
          >
            <p className="font-mono text-[0.68rem] tracking-[0.2em] text-[var(--accent)] uppercase">
              {dict.calculator.resultsTitle}
            </p>
            <h3 className="mt-2 font-display text-xl text-white sm:text-2xl">
              {dict.calculator.resultsPending}
            </h3>
          </motion.div>
        ) : (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <div className="flex flex-wrap items-stretch gap-3">
              <p className="calc-disclaimer min-w-0 flex-1">
                {dict.calculator.disclaimer}
              </p>
              <button
                type="button"
                className="calc-clear"
                onClick={onClear}
                aria-label={dict.calculator.clearResults}
              >
                <ClearIcon />
                <span>{dict.calculator.clearResults}</span>
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <ResultCard
                title={dict.calculator.results.physicalTitle}
                labels={dict.calculator.results}
                breakdown={result.physical}
                locale={locale}
                downloadLabel={dict.calculator.downloadPdf}
                downloading={isDownloading === "physical"}
                onDownload={() => onDownload("physical")}
                delay={0}
              />
              <ResultCard
                title={dict.calculator.results.legalTitle}
                labels={dict.calculator.results}
                breakdown={result.legal}
                locale={locale}
                downloadLabel={dict.calculator.downloadPdf}
                downloading={isDownloading === "legal"}
                onDownload={() => onDownload("legal")}
                delay={0.06}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ClearIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 4.5h9M6.5 4.5V3.25A.75.75 0 0 1 7.25 2.5h1.5a.75.75 0 0 1 .75.75V4.5m1.5 0v8.25a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75V4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ResultCardProps = {
  title: string;
  labels: Dictionary["calculator"]["results"];
  breakdown: CostBreakdown;
  locale: string;
  downloadLabel: string;
  downloading: boolean;
  onDownload: () => void;
  delay: number;
};

function ResultCard({
  title,
  labels,
  breakdown,
  locale,
  downloadLabel,
  downloading,
  onDownload,
  delay,
}: ResultCardProps) {
  const rows: { label: string; value: number; emphasize?: boolean }[] = [
    { label: labels.vehiclePrice, value: breakdown.vehiclePrice },
    { label: labels.auctionFee, value: breakdown.auctionFee },
    { label: labels.serviceFee, value: breakdown.serviceFee },
    { label: labels.transportFee, value: breakdown.transportFee },
    { label: labels.insuranceFee, value: breakdown.insuranceFee },
    { label: labels.totalBeforeCustoms, value: breakdown.totalBeforeCustoms },
    { label: labels.customsFee, value: breakdown.customsFee },
    { label: labels.finalTotal, value: breakdown.finalTotal, emphasize: true },
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] }}
      className="calc-result-card"
    >
      <h3 className="font-display text-xl text-[var(--ink)]">{title}</h3>
      <dl className="mt-4 space-y-2.5">
        {rows.map((row) => (
          <div
            key={row.label}
            className={`flex items-center justify-between gap-4 text-sm ${
              row.emphasize
                ? "mt-1 border-t border-[var(--calc-border)] pt-3 text-base font-semibold"
                : ""
            }`}
          >
            <dt className={row.emphasize ? "text-[var(--ink)]" : "text-[var(--muted)]"}>
              {row.label}
            </dt>
            <dd
              className={
                row.emphasize
                  ? "font-mono text-[var(--calc-accent)] tabular-nums"
                  : "font-mono tabular-nums text-[var(--ink)]"
              }
            >
              {formatUsd(row.value, locale)}
            </dd>
          </div>
        ))}
      </dl>
      <button
        type="button"
        className="calc-submit mt-5 w-full"
        onClick={onDownload}
        disabled={downloading}
      >
        <span>{downloadLabel}</span>
      </button>
    </motion.article>
  );
}
