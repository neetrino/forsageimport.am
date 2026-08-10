import Link from "next/link";
import { defaultLocale } from "@/lib/i18n/config";
import { BrandLogo } from "@/components/brand/BrandLogo";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <BrandLogo size="md" />
      <h1 className="mt-6 font-display text-3xl text-[var(--ink)]">404</h1>
      <p className="mt-3 text-[var(--muted)]">Page not found</p>
      <Link
        href={`/${defaultLocale}`}
        className="mt-6 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-ink)]"
      >
        Forsage Import
      </Link>
    </main>
  );
}
