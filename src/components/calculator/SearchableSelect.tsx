"use client";

import { useMemo, useState } from "react";
import type { LabeledOption } from "@/lib/i18n/types";
import { FieldLabel } from "@/components/calculator/FieldLabel";

type SearchableSelectProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  searchLabel: string;
  options: readonly LabeledOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function SearchableSelect({
  id,
  name,
  label,
  placeholder,
  searchLabel,
  options,
  value,
  onChange,
  error,
}: SearchableSelectProps) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matches = needle
      ? options.filter((option) => option.label.toLowerCase().includes(needle))
      : options;
    const selected = options.find((option) => option.value === value);
    if (selected && !matches.some((option) => option.value === selected.value)) {
      return [selected, ...matches];
    }
    return matches;
  }, [options, query, value]);

  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="calc-input mb-2 w-full"
        placeholder={searchLabel}
        aria-label={searchLabel}
      />
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`calc-input calc-select w-full appearance-none pr-10 ${error ? "calc-input-error" : ""}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {filtered.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-[var(--danger)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
