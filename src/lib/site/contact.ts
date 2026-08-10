export type SiteSocialLink = {
  id: string;
  label: string;
  href: string;
};

export type SiteContact = {
  phone: string | null;
  email: string | null;
  address: string | null;
  social: SiteSocialLink[];
};

/**
 * Public contact pack for FOOT-001.
 * Fill via NEXT_PUBLIC_* when business provides values; nulls render pending copy.
 */
export function getSiteContact(): SiteContact {
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || null;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null;
  const address = process.env.NEXT_PUBLIC_CONTACT_ADDRESS?.trim() || null;

  const social: SiteSocialLink[] = [];
  const facebook = process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK?.trim();
  const instagram = process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM?.trim();
  const telegram = process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM?.trim();

  if (facebook) social.push({ id: "facebook", label: "Facebook", href: facebook });
  if (instagram) social.push({ id: "instagram", label: "Instagram", href: instagram });
  if (telegram) social.push({ id: "telegram", label: "Telegram", href: telegram });

  return { phone, email, address, social };
}
