export type LeadLocale = "hy" | "ru" | "en";

export type LeadPayload = {
  name: string;
  phone: string;
  message: string;
  locale: LeadLocale;
};

export type LeadField = "name" | "phone" | "message" | "locale" | "website";

export type LeadErrors = Partial<Record<LeadField, string>>;

export type LeadValidationMessages = {
  required: string;
  phone: string;
  messageTooLong: string;
  nameTooLong: string;
};
