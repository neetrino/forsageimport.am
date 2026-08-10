import type {
  LeadErrors,
  LeadLocale,
  LeadPayload,
  LeadValidationMessages,
} from "@/lib/leads/types";

const locales = new Set<LeadLocale>(["hy", "ru", "en"]);

export type RawLeadInput = {
  name: unknown;
  phone: unknown;
  message: unknown;
  locale: unknown;
  website?: unknown;
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isPlausiblePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export function validateLeadInput(
  raw: RawLeadInput,
  messages: LeadValidationMessages,
):
  | { ok: true; value: LeadPayload }
  | { ok: false; errors: LeadErrors; spam?: boolean } {
  // Honeypot: bots fill hidden "website"
  if (asTrimmedString(raw.website).length > 0) {
    return { ok: false, errors: {}, spam: true };
  }

  const errors: LeadErrors = {};
  const name = asTrimmedString(raw.name);
  const phone = asTrimmedString(raw.phone);
  const message = asTrimmedString(raw.message);
  const localeRaw = asTrimmedString(raw.locale);

  if (!name) errors.name = messages.required;
  else if (name.length > 120) errors.name = messages.nameTooLong;

  if (!phone) errors.phone = messages.required;
  else if (!isPlausiblePhone(phone)) errors.phone = messages.phone;

  if (message.length > 2000) errors.message = messages.messageTooLong;

  if (!locales.has(localeRaw as LeadLocale)) {
    errors.locale = messages.required;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      name,
      phone,
      message,
      locale: localeRaw as LeadLocale,
    },
  };
}
