export type SiteSocialLink = {
  id: string;
  label: string;
  href: string;
};

export type SiteContactAddress = {
  label: string;
  mapsQuery: string;
};

export type SiteBranchId = "yerevan" | "gyumri";

export type SiteContactBranch = {
  id: SiteBranchId;
  phones: readonly string[];
  addresses: readonly SiteContactAddress[];
};

export type LocalizedBranchAddresses = Record<SiteBranchId, readonly string[]>;

export type SiteContact = {
  branches: readonly SiteContactBranch[];
  email: string | null;
  social: SiteSocialLink[];
};

const YEREVAN_PHONES = [
  "+37499800180",
  "+37498928592",
  "+37493027302",
] as const;

const GYUMRI_PHONES = ["+37477080558"] as const;

const YEREVAN_ADDRESS_QUERIES = ["ք․ Երևան Սեբաստյա 1/1"] as const;

const GYUMRI_ADDRESS_QUERIES = ["ք. Գյումրի, Թբիլիսյան խճ. 3/28"] as const;

function readContactValue(envValue: string | undefined, fallback: string): string {
  return envValue?.trim() || fallback;
}

function toAddresses(
  queries: readonly string[],
  labels: readonly string[],
): SiteContactAddress[] {
  return queries.map((mapsQuery, index) => ({
    mapsQuery,
    label: labels?.[index]?.trim() || mapsQuery,
  }));
}

function hasBranchContent(branch: SiteContactBranch): boolean {
  return branch.phones.length > 0 || branch.addresses.length > 0;
}

function readSocialLinks(): SiteSocialLink[] {
  const social: SiteSocialLink[] = [];
  const facebook = process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK?.trim();
  const instagram = process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM?.trim();
  const telegram = process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM?.trim();

  if (facebook) social.push({ id: "facebook", label: "Facebook", href: facebook });
  if (instagram) social.push({ id: "instagram", label: "Instagram", href: instagram });
  if (telegram) social.push({ id: "telegram", label: "Telegram", href: telegram });
  return social;
}

function buildYerevanBranch(
  labels: readonly string[],
): SiteContactBranch {
  return {
    id: "yerevan",
    phones: [
      readContactValue(process.env.NEXT_PUBLIC_CONTACT_PHONE_2, YEREVAN_PHONES[0]),
      readContactValue(process.env.NEXT_PUBLIC_CONTACT_PHONE_3, YEREVAN_PHONES[1]),
      readContactValue(process.env.NEXT_PUBLIC_CONTACT_PHONE_4, YEREVAN_PHONES[2]),
    ],
    addresses: toAddresses(
      [
        readContactValue(
          process.env.NEXT_PUBLIC_CONTACT_ADDRESS_2,
          YEREVAN_ADDRESS_QUERIES[0],
        ),
      ],
      labels,
    ),
  };
}

function buildGyumriBranch(labels: readonly string[]): SiteContactBranch {
  return {
    id: "gyumri",
    phones: [readContactValue(process.env.NEXT_PUBLIC_CONTACT_PHONE, GYUMRI_PHONES[0])],
    addresses: toAddresses(
      [
        readContactValue(
          process.env.NEXT_PUBLIC_CONTACT_ADDRESS,
          GYUMRI_ADDRESS_QUERIES[0],
        ),
      ],
      labels,
    ),
  };
}

/**
 * Public contact pack for FOOT-001.
 * Env slots override defaults when set; empty env still shows the published branches.
 */
export function getSiteContact(
  localizedAddresses: LocalizedBranchAddresses,
): SiteContact {
  return {
    branches: [
      buildYerevanBranch(localizedAddresses.yerevan),
      buildGyumriBranch(localizedAddresses.gyumri),
    ].filter(hasBranchContent),
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null,
    social: readSocialLinks(),
  };
}
