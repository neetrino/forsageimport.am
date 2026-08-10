import type { Dictionary } from "@/lib/i18n/types";
import type { CalculatorResult, CostBreakdown } from "@/lib/calculator/types";
import { formatUsd } from "@/lib/calculator/format";

type VariantKey = "physical" | "legal";

type CalculatorResultsProps = {
  dict: Dictionary;
  result: CalculatorResult | null;
  locale: string;
  onDownload: (variant: VariantKey) => void;
  isDownloading: VariantKey | null;
};

export function CalculatorResults({
  dict,
  result,
  locale,
  onDownload,
  isDownloading,
}: CalculatorResultsProps) {
  if (!result) {
    return (
      <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6">
        <h3 className="font-display text-xl text-white">{dict.calculator.resultsTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-white/65 sm:text-base">
          {dict.calculator.resultsPending}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <p className="rounded-xl border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] px-4 py-3 text-sm text-[color-mix(in_srgb,var(--accent-ink)_88%,var(--accent))]">
        {dict.calculator.disclaimer}
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        <ResultCard
          title={dict.calculator.results.physicalTitle}
          labels={dict.calculator.results}
          breakdown={result.physical}
          locale={locale}
          downloadLabel={dict.calculator.downloadPdf}
          downloading={isDownloading === "physical"}
          onDownload={() => onDownload("physical")}
        />
        <ResultCard
          title={dict.calculator.results.legalTitle}
          labels={dict.calculator.results}
          breakdown={result.legal}
          locale={locale}
          downloadLabel={dict.calculator.downloadPdf}
          downloading={isDownloading === "legal"}
          onDownload={() => onDownload("legal")}
        />
      </div>
    </div>
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
};

function ResultCard({
  title,
  labels,
  breakdown,
  locale,
  downloadLabel,
  downloading,
  onDownload,
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
    <article className="rounded-[var(--radius-lg)] border border-white/15 bg-white p-5 text-[var(--ink)] sm:p-6">
      <h3 className="font-display text-xl">{title}</h3>
      <dl className="mt-4 space-y-2.5">
        {rows.map((row) => (
          <div
            key={row.label}
            className={`flex items-center justify-between gap-4 text-sm ${
              row.emphasize ? "border-t border-[var(--calc-border)] pt-3 text-base font-semibold" : ""
            }`}
          >
            <dt className={row.emphasize ? "text-[var(--ink)]" : "text-[var(--muted)]"}>
              {row.label}
            </dt>
            <dd>{formatUsd(row.value, locale)}</dd>
          </div>
        ))}
      </dl>
      <button
        type="button"
        className="calc-submit mt-5 w-full"
        onClick={onDownload}
        disabled={downloading}
      >
        {downloadLabel}
      </button>
    </article>
  );
}
