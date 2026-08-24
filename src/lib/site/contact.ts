export type SiteSocialLink = {
  id: string;
  label: string;
  href: string;
};

export type SiteContact = {
  phones: readonly string[];
  email: string | null;
  addresses: readonly string[];
  social: SiteSocialLink[];
};

/**
 * Public contact pack for FOOT-001.
 * Fill via NEXT_PUBLIC_* when business provides values; nulls render pending copy.
 */
export function getSiteContact(): SiteContact {
  const phones = [
    process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim(),
    process.env.NEXT_PUBLIC_CONTACT_PHONE_2?.trim(),
  ].filter((value): value is string => Boolean(value));
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null;
  const addresses = [
    process.env.NEXT_PUBLIC_CONTACT_ADDRESS?.trim(),
    process.env.NEXT_PUBLIC_CONTACT_ADDRESS_2?.trim(),
  ].filter((value): value is string => Boolean(value));

  const social: SiteSocialLink[] = [];
  const facebook = process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK?.trim();
  const instagram = process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM?.trim();
  const telegram = process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM?.trim();

  if (facebook) social.push({ id: "facebook", label: "Facebook", href: facebook });
  if (instagram) social.push({ id: "instagram", label: "Instagram", href: instagram });
  if (telegram) social.push({ id: "telegram", label: "Telegram", href: telegram });

  return { phones, email, addresses, social };
}
