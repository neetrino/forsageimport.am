/**
 * FORM-001 locked MVP scope (Phase 4 decision, 2026-08-10)
 *
 * Fields:
 * - name (required)
 * - phone (required)
 * - message (optional)
 * - locale (from client, hy|ru|en)
 * - website (honeypot, must be empty)
 *
 * Delivery:
 * - POST /api/leads
 * - Email via Resend when RESEND_API_KEY + LEAD_TO_EMAIL are set
 * - Otherwise structured server log (development / misconfig fallback)
 *
 * Not in MVP: CRM, DB persistence, Telegram bot, file attachments
 */

export const LEAD_FORM_SCOPE = {
  id: "FORM-001",
  fields: ["name", "phone", "message", "locale"] as const,
  channel: "email-or-log",
  persistence: "none",
} as const;
