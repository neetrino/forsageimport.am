"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { validateLeadInput } from "@/lib/leads/validate";
import type { LeadErrors } from "@/lib/leads/types";

const fieldClass =
  "mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--line-strong)] bg-[color-mix(in_srgb,white_70%,var(--paper))] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none transition-[border-color,box-shadow,background] focus-visible:border-[color-mix(in_srgb,var(--accent)_45%,var(--line-strong))] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[var(--accent)]/25";

type ApplicationSectionProps = {
  dict: Dictionary;
  locale: Locale;
};

type FormState = {
  name: string;
  phone: string;
  message: string;
  website: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error" | "rate_limited";

export function ApplicationSection({ dict, locale }: ApplicationSectionProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<SubmitState>("idle");
  const [openedAt, setOpenedAt] = useState(() => Date.now());

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");

    const validated = validateLeadInput(
      {
        name: form.name,
        phone: form.phone,
        message: form.message,
        locale,
        website: form.website,
      },
      dict.apply.validation,
    );

    if (!validated.ok) {
      if (validated.spam) {
        setStatus("success");
        setForm({ name: "", phone: "", message: "", website: "" });
        return;
      }
      setErrors(validated.errors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: validated.value.name,
          phone: validated.value.phone,
          message: validated.value.message,
          locale: validated.value.locale,
          website: form.website,
          openedAt,
        }),
      });

      if (response.status === 429) {
        setStatus("rate_limited");
        return;
      }

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        fields?: LeadErrors;
      };

      if (!response.ok || !data.ok) {
        if (data.fields) setErrors(data.fields);
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", phone: "", message: "", website: "" });
      setOpenedAt(Date.now());
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section
      id={LANDING_SECTION_IDS.apply}
      className="section-band bg-[var(--surface)]"
      ariaLabelledBy="apply-title"
    >
      <SectionHeading
        id="apply-title"
        title={dict.apply.title}
        subtitle={dict.apply.subtitle}
      />

      <form
        className="mt-10 grid max-w-xl gap-4 rounded-[var(--radius-lg)] border border-[var(--line)] bg-[color-mix(in_srgb,white_72%,transparent)] p-5 shadow-[0_18px_40px_rgba(14,16,20,0.06)] backdrop-blur-sm sm:p-7"
        onSubmit={onSubmit}
        noValidate
      >
        <div>
          <label className="block text-sm font-medium text-[var(--ink)]" htmlFor="lead-name">
            {dict.apply.name}
          </label>
          <input
            id="lead-name"
            className={`${fieldClass} ${errors.name ? "border-[var(--danger)]" : ""}`}
            type="text"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? (
            <p className="mt-1.5 text-xs text-[var(--danger)]">{errors.name}</p>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--ink)]" htmlFor="lead-phone">
            {dict.apply.phone}
          </label>
          <input
            id="lead-phone"
            className={`${fieldClass} ${errors.phone ? "border-[var(--danger)]" : ""}`}
            type="tel"
            name="phone"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone ? (
            <p className="mt-1.5 text-xs text-[var(--danger)]">{errors.phone}</p>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--ink)]" htmlFor="lead-message">
            {dict.apply.message}
          </label>
          <textarea
            id="lead-message"
            className={`${fieldClass} min-h-28 resize-y ${errors.message ? "border-[var(--danger)]" : ""}`}
            name="message"
            rows={4}
            value={form.message}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, message: event.target.value }))
            }
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message ? (
            <p className="mt-1.5 text-xs text-[var(--danger)]">{errors.message}</p>
          ) : null}
        </div>

        {/* Honeypot — hidden from users */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="lead-website">Website</label>
          <input
            id="lead-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, website: event.target.value }))
            }
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary justify-self-start px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? dict.apply.submitting : dict.apply.submit}
        </button>

        {status === "success" ? (
          <p className="text-sm text-[var(--accent)]" role="status">
            {dict.apply.success}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-[var(--danger)]" role="alert">
            {dict.apply.errorGeneric}
          </p>
        ) : null}
        {status === "rate_limited" ? (
          <p className="text-sm text-[var(--danger)]" role="alert">
            {dict.apply.errorRateLimited}
          </p>
        ) : null}
      </form>
    </Section>
  );
}
