import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { sectionHref } from "@/lib/i18n/paths";
import { getSiteContact, type SiteContactBranch } from "@/lib/site/contact";
import { buildMapsSearchUrl } from "@/lib/site/maps";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SocialIcon } from "@/components/landing/SocialIcon";

const NEETRINO_URL = "https://neetrino.com/";

type SiteFooterProps = {
  locale: Locale;
  dict: Dictionary;
};

type FooterGlyphName = "phone" | "pin";

function FooterGlyph({ name }: { name: FooterGlyphName }) {
  const common = {
    className: "site-footer-branch-glyph",
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };

  if (name === "phone") {
    return (
      <svg {...common}>
        <path
          fill="currentColor"
          d="M7.2 2.8h2.1c.6 0 1.1.4 1.2 1l.4 2.1c.1.5 0 1-.4 1.3l-1.3 1.1c1.1 2.1 2.8 3.8 4.9 4.9l1.1-1.3c.4-.4.8-.5 1.3-.4l2.1.4c.6.1 1 .6 1 1.2v2.1c0 .7-.6 1.3-1.3 1.2-3.7-.5-8.1-3.8-10.6-8.3C5.2 5.7 6 3.4 7.2 2.8Z"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path
        fill="currentColor"
        d="M12 2.6A6.4 6.4 0 0 0 5.6 9c0 4.3 5.1 10.4 6.1 11.5.2.2.4.2.6 0 1-1.1 6.1-7.2 6.1-11.5A6.4 6.4 0 0 0 12 2.6Zm0 8.6A2.2 2.2 0 1 1 12 6.8a2.2 2.2 0 0 1 0 4.4Z"
      />
    </svg>
  );
}

function FooterBranchGroup({
  label,
  icon,
  children,
}: {
  label: string;
  icon: FooterGlyphName;
  children: ReactNode;
}) {
  return (
    <div className="site-footer-branch-group" aria-label={label}>
      <FooterGlyph name={icon} />
      <div className="site-footer-branch-values">{children}</div>
    </div>
  );
}

type FooterBranchProps = {
  branch: SiteContactBranch;
  title: string;
  phoneLabel: string;
  addressLabel: string;
};

function FooterBranch({
  branch,
  title,
  phoneLabel,
  addressLabel,
}: FooterBranchProps) {
  const headingId = `footer-branch-${branch.id}`;

  return (
    <section className="site-footer-branch" aria-labelledby={headingId}>
      <h3 id={headingId} className="site-footer-branch-title">
        {title}
      </h3>
      {branch.phones.length > 0 ? (
        <FooterBranchGroup label={phoneLabel} icon="phone">
          {branch.phones.map((phone) => (
            <a key={phone} className="site-footer-link" href={`tel:${phone}`}>
              {phone}
            </a>
          ))}
        </FooterBranchGroup>
      ) : null}
      {branch.addresses.length > 0 ? (
        <FooterBranchGroup label={addressLabel} icon="pin">
          {branch.addresses.map((address) => (
            <a
              key={address.mapsQuery}
              href={buildMapsSearchUrl(address.mapsQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-link site-footer-address"
            >
              {address.label}
            </a>
          ))}
        </FooterBranchGroup>
      ) : null}
    </section>
  );
}

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const contact = getSiteContact(dict.footer.addresses);
  const hasContact = Boolean(contact.branches.length > 0 || contact.email);
  const hasSocial = contact.social.length > 0;
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: sectionHref(LANDING_SECTION_IDS.about), label: dict.nav.about },
    { href: sectionHref(LANDING_SECTION_IDS.services), label: dict.nav.services },
    { href: sectionHref(LANDING_SECTION_IDS.calculator), label: dict.nav.calculator },
    { href: sectionHref(LANDING_SECTION_IDS.apply), label: dict.nav.apply },
  ];

  return (
    <div className="site-footer-lift">
      <footer
        id={LANDING_SECTION_IDS.contact}
        className="site-footer site-footer-panel relative scroll-mt-[var(--scroll-margin)] text-[var(--paper)]"
      >
        <div className="site-footer-seam" aria-hidden="true" />
        <div className="site-footer-atmosphere" aria-hidden="true" />

        <Container className="relative z-[1] pt-16 pb-8 sm:pt-20 lg:pt-[4.75rem]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,0.8fr)] lg:gap-8 xl:gap-10">
            <div>
              <BrandLogo size="md" />
              <p className="mt-5 max-w-xs text-sm leading-7 text-white/68">{dict.site.tagline}</p>
              <p className="mt-6 inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.2em] text-[var(--accent)] uppercase">
                <span className="h-px w-8 bg-[var(--accent)]" aria-hidden="true" />
                Forsage Import
              </p>
            </div>

            <div className="lg:col-span-2">
              <h2 className="site-footer-heading">{dict.footer.title}</h2>
              {hasContact ? (
                <div className="site-footer-branches mt-4">
                  {contact.branches.map((branch) => (
                    <FooterBranch
                      key={branch.id}
                      branch={branch}
                      title={dict.footer.branches[branch.id]}
                      phoneLabel={dict.footer.phoneLabel}
                      addressLabel={dict.footer.addressLabel}
                    />
                  ))}
                  {contact.email ? (
                    <div className="sm:col-span-2">
                      <span className="site-footer-label">{dict.footer.emailLabel}</span>
                      <a className="site-footer-link" href={`mailto:${contact.email}`}>
                        {contact.email}
                      </a>
                    </div>
                  ) : null}
                </div>
              ) : (
                <p className="site-footer-pending mt-5">{dict.footer.contactsPending}</p>
              )}
            </div>

            <div>
              <h2 className="site-footer-heading">{dict.footer.socialTitle}</h2>
              {hasSocial ? (
                <ul className="mt-5 space-y-2.5 text-sm">
                  {contact.social.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="site-footer-social-link"
                      >
                        <span className="site-footer-social-icon">
                          <SocialIcon id={item.id} />
                        </span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-5 space-y-4">
                  <p className="site-footer-pending">{dict.footer.socialPending}</p>
                  <ul className="flex flex-wrap gap-2">
                    {quickLinks.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} className="site-footer-chip">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <h2 className="site-footer-heading">{dict.a11y.language}</h2>
              <div className="mt-5">
                <LocaleSwitcher
                  locale={locale}
                  label={dict.a11y.language}
                  variant="footer"
                />
              </div>
            </div>
          </div>

          <div className="site-footer-bar">
            <p className="site-footer-copyright">
              <span>Copyright © {year}</span>
              <span className="site-footer-sep" aria-hidden="true">
                |
              </span>
              <span>{dict.footer.copyrightRights}</span>
              <span className="site-footer-sep" aria-hidden="true">
                |
              </span>
              <span>
                {dict.footer.creditBefore}{" "}
                <a
                  href={NEETRINO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer-credit"
                >
                  {dict.footer.creditCompany}
                </a>
                {dict.footer.creditAfter ? ` ${dict.footer.creditAfter}` : null}
              </span>
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
