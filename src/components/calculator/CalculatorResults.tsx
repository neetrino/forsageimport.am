"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Dictionary } from "@/lib/i18n/types";
import type { CalculatorResult, CustomsBreakdown, SharedCost } from "@/lib/calculator/types";
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
            className="space-y-4"
          >
            <div className="flex flex-wrap items-stretch gap-3">
              <p className="calc-disclaimer min-w-0 flex-1">{dict.calculator.disclaimer}</p>
              <button type="button" className="calc-clear" onClick={onClear}>
                <span>{dict.calculator.clearResults}</span>
              </button>
            </div>

            <SharedCard dict={dict} shared={result.shared} locale={locale} />
            <h3 className="pt-2 font-display text-xl text-white">
              {dict.calculator.results.customsHeading}
            </h3>
            <div className="grid gap-4 lg:grid-cols-2">
              <CustomsCard
                title={dict.calculator.results.legalTitle}
                labels={dict.calculator.results}
                breakdown={result.legal}
                locale={locale}
                highlighted={result.legal.finalTotal < result.physical.finalTotal}
                cheaperLabel={dict.calculator.cheaperBadge}
                evNote={dict.calculator.evExemptionNote}
                downloadLabel={dict.calculator.downloadPdf}
                downloading={isDownloading === "legal"}
                onDownload={() => onDownload("legal")}
              />
              <CustomsCard
                title={dict.calculator.results.physicalTitle}
                labels={dict.calculator.results}
                breakdown={result.physical}
                locale={locale}
                highlighted={result.physical.finalTotal < result.legal.finalTotal}
                cheaperLabel={dict.calculator.cheaperBadge}
                evNote={dict.calculator.evExemptionNote}
                downloadLabel={dict.calculator.downloadPdf}
                downloading={isDownloading === "physical"}
                onDownload={() => onDownload("physical")}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SharedCard({
  dict,
  shared,
  locale,
}: {
  dict: Dictionary;
  shared: SharedCost;
  locale: string;
}) {
  const labels = dict.calculator.results;
  const rows = [
    [labels.vehiclePrice, shared.vehiclePrice],
    [labels.auctionFee, shared.auctionFee],
    [labels.serviceFee, shared.serviceFee],
    [labels.transportFee, shared.transportFee],
    [labels.insuranceFee, shared.insuranceFee],
  ] as const;

  return (
    <article className="calc-result-card">
      <dl className="space-y-2.5">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 text-sm">
            <dt className="text-[var(--muted)]">{label}</dt>
            <dd className="font-mono tabular-nums text-[var(--ink)]">{formatUsd(value, locale)}</dd>
          </div>
        ))}
        <div className="mt-1 flex items-center justify-between gap-4 border-t border-[var(--calc-border)] pt-3 text-base font-semibold">
          <dt>{labels.totalBeforeCustoms}</dt>
          <dd className="font-mono text-[var(--calc-accent)] tabular-nums">
            {formatUsd(shared.totalBeforeCustoms, locale)}
          </dd>
        </div>
      </dl>
    </article>
  );
}

function CustomsCard({
  title,
  labels,
  breakdown,
  locale,
  highlighted,
  cheaperLabel,
  evNote,
  downloadLabel,
  downloading,
  onDownload,
}: {
  title: string;
  labels: Dictionary["calculator"]["results"];
  breakdown: CustomsBreakdown;
  locale: string;
  highlighted: boolean;
  cheaperLabel: string;
  evNote: string;
  downloadLabel: string;
  downloading: boolean;
  onDownload: () => void;
}) {
  const rows = customsRows(labels, breakdown);

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className={`calc-result-card ${highlighted ? "calc-result-card-best" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl text-[var(--ink)]">{title}</h3>
        {highlighted ? <span className="calc-status-chip">{cheaperLabel}</span> : null}
      </div>
      <dl className="mt-4 space-y-2.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 text-sm">
            <dt className="text-[var(--muted)]">{row.label}</dt>
            <dd className="font-mono tabular-nums text-[var(--ink)]">
              {formatUsd(row.value, locale)}
            </dd>
          </div>
        ))}
        <div className="mt-1 flex items-center justify-between gap-4 border-t border-[var(--calc-border)] pt-3 text-base font-semibold">
          <dt>{labels.finalTotal}</dt>
          <dd className="font-mono text-[var(--calc-accent)] tabular-nums">
            {formatUsd(breakdown.finalTotal, locale)}
          </dd>
        </div>
      </dl>
      {breakdown.electricExemptionApplied ? (
        <p className="mt-3 text-xs leading-5 text-[var(--muted)]">{evNote}</p>
      ) : null}
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

function customsRows(
  labels: Dictionary["calculator"]["results"],
  breakdown: CustomsBreakdown,
): { label: string; value: number }[] {
  if (breakdown.usesFlatRate) {
    return [
      { label: labels.flatRate, value: breakdown.flatRate },
      { label: labels.ecologicalTax, value: breakdown.environmental },
    ];
  }
  return [
    { label: labels.customsDuty, value: breakdown.duty },
    { label: labels.vat, value: breakdown.vat },
    { label: labels.ecologicalTax, value: breakdown.environmental },
    ...(breakdown.brokerage > 0
      ? [{ label: labels.brokerage, value: breakdown.brokerage }]
      : []),
  ];
}
