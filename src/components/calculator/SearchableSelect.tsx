"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
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

function filterOptions(options: readonly LabeledOption[], query: string): LabeledOption[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [...options];
  return options.filter((option) => option.label.toLowerCase().includes(needle));
}

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
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const selected = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  const inputValue = open ? draft : (selected?.label ?? "");
  const filtered = useMemo(() => {
    const matches = filterOptions(options, draft);
    if (selected && !matches.some((option) => option.value === selected.value)) {
      return [selected, ...matches];
    }
    return matches;
  }, [options, draft, selected]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const closeList = () => {
    setOpen(false);
  };

  const openList = () => {
    setDraft(selected?.label ?? "");
    setOpen(true);
  };

  const pickOption = (option: LabeledOption) => {
    onChange(option.value);
    closeList();
  };

  const onInputChange = (next: string) => {
    setDraft(next);
    setOpen(true);
    if (next.trim() === "") {
      onChange("");
    }
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      closeList();
      return;
    }
    if (event.key === "Enter" && open && filtered.length > 0) {
      event.preventDefault();
      pickOption(filtered[0]);
    }
  };

  return (
    <div ref={rootRef} className="calc-field calc-searchable-select min-w-0">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)}
          onFocus={openList}
          onKeyDown={onInputKeyDown}
          className={`calc-input calc-select calc-searchable-input w-full appearance-none pr-10 ${error ? "calc-input-error" : ""}`}
          placeholder={searchLabel || placeholder}
          autoComplete="off"
          spellCheck={false}
        />
        <input type="hidden" name={name} value={value} />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[var(--calc-placeholder)]"
        >
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {open ? (
          <ul
            id={listboxId}
            role="listbox"
            aria-label={label}
            className="calc-searchable-list"
          >
            {filtered.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                className="calc-searchable-option"
                data-selected={option.value === value}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => pickOption(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-[var(--danger)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
