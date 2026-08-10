"use client";

import { useMemo, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import {
  AuctionPicker,
  type AuctionValue,
} from "@/components/calculator/AuctionPicker";
import { CalculatorResults } from "@/components/calculator/CalculatorResults";
import { MoneyField } from "@/components/calculator/MoneyField";
import { NumberField } from "@/components/calculator/NumberField";
import { SelectField } from "@/components/calculator/SelectField";
import { downloadCalculationPdf } from "@/components/calculator/download-pdf";
import {
  calculateImportCost,
  validateCalculatorInput,
} from "@/lib/calculator";
import type {
  CalculatorErrors,
  CalculatorResult,
} from "@/lib/calculator/types";

type CalculatorFormProps = {
  dict: Dictionary;
  locale: Locale;
};

type FormState = {
  vehiclePrice: string;
  engineType: string;
  auctionLocation: string;
  transportFee: string;
  ageGroup: string;
  year: string;
  engineVolumeCm3: string;
  vehicleType: string;
  insuranceEnabled: boolean;
};

const initialForm: FormState = {
  vehiclePrice: "",
  engineType: "petrol",
  auctionLocation: "",
  transportFee: "",
  ageGroup: "under3",
  year: "",
  engineVolumeCm3: "0",
  vehicleType: "sedan",
  insuranceEnabled: false,
};

export function CalculatorForm({ dict, locale }: CalculatorFormProps) {
  const { calculator } = dict;
  const [auction, setAuction] = useState<AuctionValue>("iaai");
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<CalculatorErrors>({});
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [downloading, setDownloading] = useState<"physical" | "legal" | null>(
    null,
  );

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years: { value: string; label: string }[] = [];
    for (let year = currentYear; year >= 1990; year -= 1) {
      years.push({ value: String(year), label: String(year) });
    }
    return years;
  }, []);

  const numberLocale = locale === "hy" ? "hy-AM" : locale === "ru" ? "ru-RU" : "en-US";

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setResult(null);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validated = validateCalculatorInput(
      {
        vehiclePrice: form.vehiclePrice,
        auction,
        auctionLocation: form.auctionLocation,
        transportFee: form.transportFee,
        engineType: form.engineType,
        ageGroup: form.ageGroup,
        year: form.year,
        engineVolumeCm3: form.engineVolumeCm3,
        vehicleType: form.vehicleType,
        insuranceEnabled: form.insuranceEnabled,
      },
      calculator.validation,
    );

    if (!validated.ok) {
      setErrors(validated.errors);
      setResult(null);
      return;
    }

    setErrors({});
    setResult(calculateImportCost(validated.value));
  };

  const onDownload = async (variant: "physical" | "legal") => {
    if (!result) return;
    setDownloading(variant);
    try {
      await downloadCalculationPdf({
        result,
        variant,
        dict,
        locale: numberLocale,
      });
    } finally {
      setDownloading(null);
    }
  };

  return (
    <>
      <form className="calc-card" onSubmit={onSubmit} noValidate>
        <header className="calc-card-head">
          <div>
            <p className="font-mono text-[0.68rem] tracking-[0.22em] text-[var(--calc-accent)] uppercase">
              {calculator.eyebrow}
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">{calculator.subtitle}</p>
          </div>
          <span className="calc-status-chip">DRAFT</span>
        </header>

        <div className="calc-card-body">
          <div className="grid gap-5 sm:grid-cols-2">
            <MoneyField
              id="vehiclePrice"
              name="vehiclePrice"
              label={calculator.fields.vehiclePrice}
              value={form.vehiclePrice}
              onChange={(value) => updateField("vehiclePrice", value)}
              error={errors.vehiclePrice}
            />
            <SelectField
              id="engineType"
              name="engineType"
              label={calculator.fields.engineType}
              placeholder={calculator.selectPlaceholder}
              options={calculator.options.engineTypes}
              value={form.engineType}
              onChange={(value) => updateField("engineType", value)}
              error={errors.engineType}
            />

            <div>
              <AuctionPicker
                label={calculator.fields.auction}
                value={auction}
                onChange={(value) => {
                  setAuction(value);
                  setResult(null);
                }}
              />
              {errors.auction ? (
                <p className="mt-1.5 text-xs text-[var(--danger)]">{errors.auction}</p>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <SelectField
                id="ageGroup"
                name="ageGroup"
                label={calculator.fields.ageGroup}
                placeholder={calculator.selectPlaceholder}
                options={calculator.options.ageGroups}
                value={form.ageGroup}
                onChange={(value) => updateField("ageGroup", value)}
                error={errors.ageGroup}
              />
              <SelectField
                id="year"
                name="year"
                label={calculator.fields.year}
                placeholder={calculator.selectPlaceholder}
                options={yearOptions}
                value={form.year}
                onChange={(value) => updateField("year", value)}
                error={errors.year}
              />
            </div>

            <SelectField
              id="auctionLocation"
              name="auctionLocation"
              label={calculator.fields.auctionLocation}
              placeholder={calculator.selectPlaceholder}
              options={calculator.options.auctionLocations}
              value={form.auctionLocation}
              onChange={(value) => updateField("auctionLocation", value)}
              error={errors.auctionLocation}
            />
            <NumberField
              id="engineVolume"
              name="engineVolume"
              label={calculator.fields.engineVolume}
              value={form.engineVolumeCm3}
              onChange={(value) => updateField("engineVolumeCm3", value)}
              min={0}
              step="1"
              error={errors.engineVolumeCm3}
            />

            <MoneyField
              id="transportFee"
              name="transportFee"
              label={calculator.fields.transportFee}
              value={form.transportFee}
              onChange={(value) => updateField("transportFee", value)}
              error={errors.transportFee}
            />
            <SelectField
              id="vehicleType"
              name="vehicleType"
              label={calculator.fields.vehicleType}
              placeholder={calculator.selectPlaceholder}
              options={calculator.options.vehicleTypes}
              value={form.vehicleType}
              onChange={(value) => updateField("vehicleType", value)}
              error={errors.vehicleType}
            />
          </div>

          <label className="calc-toggle mt-6" htmlFor="insuranceEnabled">
            <input
              id="insuranceEnabled"
              type="checkbox"
              className="sr-only"
              checked={form.insuranceEnabled}
              onChange={(event) =>
                updateField("insuranceEnabled", event.target.checked)
              }
            />
            <span className="calc-toggle-track" data-on={form.insuranceEnabled} aria-hidden="true">
              <span className="calc-toggle-thumb" />
            </span>
            <span>{calculator.insurance}</span>
          </label>

          <motion.button
            type="submit"
            className="calc-submit mt-7 w-full"
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.12 }}
          >
            <span>{calculator.submit}</span>
          </motion.button>
        </div>
      </form>

      <CalculatorResults
        dict={dict}
        result={result}
        locale={numberLocale}
        onDownload={onDownload}
        onClear={() => {
          setResult(null);
          setDownloading(null);
        }}
        isDownloading={downloading}
      />
    </>
  );
}
