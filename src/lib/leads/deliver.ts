import type { LeadPayload } from "@/lib/leads/types";

export type LeadDeliveryResult =
  | { mode: "email"; messageId: string }
  | { mode: "log" };

function requireEnv(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

export async function deliverLead(payload: LeadPayload): Promise<LeadDeliveryResult> {
  const apiKey = requireEnv("RESEND_API_KEY");
  const fromEmail = requireEnv("RESEND_FROM_EMAIL");
  const toEmail =
    requireEnv("LEAD_TO_EMAIL") ?? requireEnv("NEXT_PUBLIC_CONTACT_EMAIL");

  if (!apiKey || !fromEmail || !toEmail || apiKey.startsWith("re_...")) {
    console.info("[lead] delivery=log", {
      locale: payload.locale,
      nameLength: payload.name.length,
      phoneMasked: maskPhone(payload.phone),
      hasMessage: payload.message.length > 0,
    });
    return { mode: "log" };
  }

  const subject = `[Forsage] New lead (${payload.locale}) — ${payload.name}`;
  const text = [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Locale: ${payload.locale}`,
    `Message: ${payload.message || "—"}`,
    `ReceivedAt: ${new Date().toISOString()}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend failed (${response.status}): ${body.slice(0, 200)}`);
  }

  const data = (await response.json()) as { id?: string };
  return { mode: "email", messageId: data.id ?? "unknown" };
}

function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return "***";
  return `***${digits.slice(-4)}`;
}
