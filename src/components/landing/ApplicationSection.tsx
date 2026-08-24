"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { validateLeadInput } from "@/lib/leads/validate";
import type { LeadErrors } from "@/lib/leads/types";

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
      className="relative"
      ariaLabelledBy="apply-title"
      curvedTop
    >
      <Reveal variant="blur" className="relative z-[1]">
        <SectionHeading
          id="apply-title"
          eyebrow={dict.apply.eyebrow}
          title={dict.apply.title}
          subtitle={dict.apply.subtitle}
          tone="dark"
        />
      </Reveal>

      <div className="relative z-[1] mt-10 mx-auto max-w-2xl">
        <Reveal variant="up" delay={0.06}>
          <div className="apply-shell">
            <div className="apply-shell-glow" aria-hidden="true" />
            <form className="apply-card relative" onSubmit={onSubmit} noValidate>
              <header className="apply-card-head">
                <div>
                  <p className="font-mono text-[0.68rem] tracking-[0.22em] text-[var(--accent)] uppercase">
                    {dict.apply.eyebrow}
                  </p>
                  <p className="mt-1 text-sm text-white/55">{dict.apply.responseNote}</p>
                </div>
                <span className="apply-status-chip">LEAD</span>
              </header>

              <div className="apply-card-body">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="lead-name"
                    label={dict.apply.name}
                    error={errors.name}
                    input={
                      <input
                        id="lead-name"
                        className={`apply-input ${errors.name ? "apply-input-error" : ""}`}
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={(event) =>
                          setForm((prev) => ({ ...prev, name: event.target.value }))
                        }
                        aria-invalid={Boolean(errors.name)}
                      />
                    }
                  />
                  <Field
                    id="lead-phone"
                    label={dict.apply.phone}
                    error={errors.phone}
                    input={
                      <input
                        id="lead-phone"
                        className={`apply-input ${errors.phone ? "apply-input-error" : ""}`}
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(event) =>
                          setForm((prev) => ({ ...prev, phone: event.target.value }))
                        }
                        aria-invalid={Boolean(errors.phone)}
                      />
                    }
                  />
                  <div className="sm:col-span-2">
                    <Field
                      id="lead-message"
                      label={dict.apply.message}
                      error={errors.message}
                      input={
                        <textarea
                          id="lead-message"
                          className={`apply-input min-h-32 resize-y ${
                            errors.message ? "apply-input-error" : ""
                          }`}
                          name="message"
                          rows={4}
                          value={form.message}
                          onChange={(event) =>
                            setForm((prev) => ({
                              ...prev,
                              message: event.target.value,
                            }))
                          }
                          aria-invalid={Boolean(errors.message)}
                        />
                      }
                    />
                  </div>
                </div>

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

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  className="calc-submit mt-6 w-full sm:w-auto sm:min-w-[14rem]"
                  whileTap={{ scale: 0.985 }}
                  transition={{ duration: 0.12 }}
                >
                  <span>
                    {status === "submitting" ? dict.apply.submitting : dict.apply.submit}
                  </span>
                </motion.button>

                <StatusMessage status={status} dict={dict} />
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  input: ReactNode;
};

function Field({ id, label, error, input }: FieldProps) {
  return (
    <div>
      <label className="apply-label" htmlFor={id}>
        {label}
      </label>
      {input}
      {error ? <p className="mt-1.5 text-xs text-[var(--danger)]">{error}</p> : null}
    </div>
  );
}

function StatusMessage({
  status,
  dict,
}: {
  status: SubmitState;
  dict: Dictionary;
}) {
  const map = {
    success: { text: dict.apply.success, kind: "ok" as const, role: "status" as const },
    error: { text: dict.apply.errorGeneric, kind: "err" as const, role: "alert" as const },
    rate_limited: {
      text: dict.apply.errorRateLimited,
      kind: "err" as const,
      role: "alert" as const,
    },
  };

  const active =
    status === "success" || status === "error" || status === "rate_limited"
      ? map[status]
      : null;

  return (
    <AnimatePresence mode="wait">
      {active ? (
        <motion.p
          key={status}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`apply-feedback ${
            active.kind === "ok" ? "apply-feedback-ok" : "apply-feedback-err"
          }`}
          role={active.role}
        >
          {active.text}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}
