"use client";

import { useMemo, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { AuctionPicker, type AuctionValue } from "@/components/calculator/AuctionPicker";
import { CalculatorResults } from "@/components/calculator/CalculatorResults";
import { MoneyField } from "@/components/calculator/MoneyField";
import { NumberField } from "@/components/calculator/NumberField";
import { SearchableSelect } from "@/components/calculator/SearchableSelect";
import { SelectField } from "@/components/calculator/SelectField";
import { downloadCalculationPdf } from "@/components/calculator/download-pdf";
import {
  calculateImportCost,
  lookupShippingFee,
  shippingLocationOptions,
  validateCalculatorInput,
  yearsForAgeGroup,
} from "@/lib/calculator";
import type { AgeGroupId, CalculatorErrors, CalculatorResult, VehicleTypeId } from "@/lib/calculator/types";

type CalculatorFormProps = {
  dict: Dictionary;
  locale: Locale;
};

type FormState = {
  vehiclePrice: string;
  engineType: string;
  customAuctionFee: string;
  auctionLocationId: string;
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
  customAuctionFee: "",
  auctionLocationId: "",
  transportFee: "",
  ageGroup: "under3",
  year: "",
  engineVolumeCm3: "",
  vehicleType: "sedan",
  insuranceEnabled: true,
};

export function CalculatorForm({ dict, locale }: CalculatorFormProps) {
  const { calculator } = dict;
  const [auction, setAuction] = useState<AuctionValue>("iaai");
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<CalculatorErrors>({});
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [downloading, setDownloading] = useState<"physical" | "legal" | null>(null);
  const locations = useMemo(() => shippingLocationOptions(), []);
  const yearOptions = useMemo(
    () =>
      yearsForAgeGroup(form.ageGroup as AgeGroupId).map((year) => ({
        value: String(year),
        label: String(year),
      })),
    [form.ageGroup],
  );
  const numberLocale = locale === "hy" ? "hy-AM" : locale === "ru" ? "ru-RU" : "en-US";
  const volumeDisabled = form.engineType === "electric";

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setResult(null);
  };

  const syncShipping = (locationId: string, vehicleType: string) => {
    const fee = lookupShippingFee(locationId, vehicleType as VehicleTypeId);
    setForm((prev) => ({
      ...prev,
      auctionLocationId: locationId,
      vehicleType,
      transportFee: locationId ? String(fee) : prev.transportFee,
    }));
    setResult(null);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validated = validateCalculatorInput(
      {
        vehiclePrice: form.vehiclePrice,
        auction,
        customAuctionFee: form.customAuctionFee,
        auctionLocationId: form.auctionLocationId,
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
          <span className="calc-status-chip">USD</span>
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
              onChange={(value) => {
                updateField("engineType", value);
                if (value === "electric") updateField("engineVolumeCm3", "");
              }}
              error={errors.engineType}
            />

            <AuctionPicker
              label={calculator.fields.auction}
              customLabel={calculator.fields.customAuctionFee}
              value={auction}
              customFee={form.customAuctionFee}
              onChange={(value) => {
                setAuction(value);
                if (value !== "custom") updateField("customAuctionFee", "");
                setResult(null);
              }}
              onCustomFeeChange={(value) => updateField("customAuctionFee", value)}
              error={errors.auction}
              customFeeError={errors.customAuctionFee}
            />

            <div className="grid grid-cols-2 gap-3">
              <SelectField
                id="ageGroup"
                name="ageGroup"
                label={calculator.fields.ageGroup}
                placeholder={calculator.selectPlaceholder}
                options={calculator.options.ageGroups}
                value={form.ageGroup}
                onChange={(value) => {
                  setForm((prev) => ({ ...prev, ageGroup: value, year: "" }));
                  setResult(null);
                }}
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

            <SearchableSelect
              id="auctionLocation"
              name="auctionLocation"
              label={calculator.fields.auctionLocation}
              placeholder={calculator.selectPlaceholder}
              searchLabel={calculator.locationSearch}
              options={locations}
              value={form.auctionLocationId}
              onChange={(value) => syncShipping(value, form.vehicleType)}
              error={errors.auctionLocationId}
            />
            <NumberField
              id="engineVolume"
              name="engineVolume"
              label={calculator.fields.engineVolume}
              value={form.engineVolumeCm3}
              onChange={(value) => updateField("engineVolumeCm3", value)}
              min={0}
              step="1"
              disabled={volumeDisabled}
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
              onChange={(value) => syncShipping(form.auctionLocationId, value)}
              error={errors.vehicleType}
            />
          </div>

          <label className="calc-toggle mt-6" htmlFor="insuranceEnabled">
            <input
              id="insuranceEnabled"
              type="checkbox"
              className="sr-only"
              checked={form.insuranceEnabled}
              onChange={(event) => {
                const enabled = event.target.checked;
                setForm((prev) => ({ ...prev, insuranceEnabled: enabled }));
                if (result) {
                  setResult(
                    calculateImportCost({ ...result.input, insuranceEnabled: enabled }),
                  );
                }
              }}
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
        onDownload={async (variant) => {
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
        }}
        onClear={() => {
          setResult(null);
          setDownloading(null);
        }}
        isDownloading={downloading}
      />
    </>
  );
}
