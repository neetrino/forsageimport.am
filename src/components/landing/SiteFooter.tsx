import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { LANDING_SECTION_IDS } from "@/types/landing";
import { getSiteContact } from "@/lib/site/contact";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { BrandLogo } from "@/components/brand/BrandLogo";

type SiteFooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const contact = getSiteContact();
  const hasContact = Boolean(contact.phone || contact.email || contact.address);
  const hasSocial = contact.social.length > 0;

  return (
    <footer
      id={LANDING_SECTION_IDS.contact}
      className="relative scroll-mt-[var(--scroll-margin)] overflow-hidden bg-[var(--ink)] text-[var(--paper)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(50% 40% at 0% 100%, rgba(240,90,24,0.22), transparent 60%), radial-gradient(40% 35% at 100% 0%, rgba(26,74,120,0.28), transparent 55%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[var(--accent)] via-[var(--brand-blue)] to-transparent opacity-80" />

      <Container className="relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <BrandLogo size="md" />
          <p className="mt-4 text-sm leading-6 text-white/70">{dict.site.tagline}</p>
          <p className="mt-8 text-xs tracking-wide text-white/40">
            © {new Date().getFullYear()} {dict.footer.rights}
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
            {dict.footer.title}
          </h2>
          {hasContact ? (
            <ul className="mt-5 space-y-4 text-sm text-white/80">
              {contact.phone ? (
                <li>
                  <span className="block text-xs text-white/40">{dict.footer.phoneLabel}</span>
                  <a className="transition-colors hover:text-white" href={`tel:${contact.phone}`}>
                    {contact.phone}
                  </a>
                </li>
              ) : null}
              {contact.email ? (
                <li>
                  <span className="block text-xs text-white/40">{dict.footer.emailLabel}</span>
                  <a className="transition-colors hover:text-white" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </li>
              ) : null}
              {contact.address ? (
                <li>
                  <span className="block text-xs text-white/40">{dict.footer.addressLabel}</span>
                  <span>{contact.address}</span>
                </li>
              ) : null}
            </ul>
          ) : (
            <p className="mt-5 text-sm leading-6 text-white/55">{dict.footer.contactsPending}</p>
          )}
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
            {dict.footer.socialTitle}
          </h2>
          {hasSocial ? (
            <ul className="mt-5 space-y-2 text-sm text-white/80">
              {contact.social.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm leading-6 text-white/55">{dict.footer.socialPending}</p>
          )}
        </div>

        <div>
          <LocaleSwitcher locale={locale} label={dict.a11y.language} variant="dark" />
        </div>
      </Container>
    </footer>
  );
}
