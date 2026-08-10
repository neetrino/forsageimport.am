import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { sectionHref } from "@/lib/i18n/paths";
import { getSiteContact } from "@/lib/site/contact";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SocialIcon } from "@/components/landing/SocialIcon";

const NEETRINO_URL = "https://neetrino.com/";

type SiteFooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const contact = getSiteContact();
  const hasContact = Boolean(contact.phone || contact.email || contact.address);
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
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-8 xl:gap-12">
            <div>
              <BrandLogo size="md" />
              <p className="mt-5 max-w-xs text-sm leading-7 text-white/68">{dict.site.tagline}</p>
              <p className="mt-6 inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.2em] text-[var(--accent)] uppercase">
                <span className="h-px w-8 bg-[var(--accent)]" aria-hidden="true" />
                Forsage Import
              </p>
            </div>

            <div>
              <h2 className="site-footer-heading">{dict.footer.title}</h2>
              {hasContact ? (
                <ul className="mt-5 space-y-4 text-sm text-white/80">
                  {contact.phone ? (
                    <li>
                      <span className="site-footer-label">{dict.footer.phoneLabel}</span>
                      <a className="site-footer-link" href={`tel:${contact.phone}`}>
                        {contact.phone}
                      </a>
                    </li>
                  ) : null}
                  {contact.email ? (
                    <li>
                      <span className="site-footer-label">{dict.footer.emailLabel}</span>
                      <a className="site-footer-link" href={`mailto:${contact.email}`}>
                        {contact.email}
                      </a>
                    </li>
                  ) : null}
                  {contact.address ? (
                    <li>
                      <span className="site-footer-label">{dict.footer.addressLabel}</span>
                      <span className="text-white/80">{contact.address}</span>
                    </li>
                  ) : null}
                </ul>
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
