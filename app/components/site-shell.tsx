import Link from "next/link";
import { cookies } from "next/headers";
import { Flame, PhoneCall, ShieldCheck } from "lucide-react";
import LanguageSwitcher from "@/app/components/language-switcher";
import { prisma } from "@/lib/db";
import { getDictionary, getLocale } from "@/lib/i18n";

export default async function SiteShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = getLocale(cookieStore.get("locale")?.value);
  const t = getDictionary(locale);

  const siteContent = await prisma.siteContent.findMany();
  const content = Object.fromEntries(siteContent.map((item) => [item.key, item.value]));
  const companyName = content.companyName || "Lämpökamu";
  const companyPhone = content.companyPhone || "+358 40 123 4567";

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-full bg-red-600 p-2 text-white">
              <Flame size={18} />
            </div>
            <div>
              <p className="text-lg font-semibold">{companyName}</p>
              <p className="text-sm text-slate-500">Lämpöpumput ja asiantuntemus</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link href="/" className="transition hover:text-red-600">
              {t.navHome}
            </Link>
            <Link href="/tuotteet" className="transition hover:text-red-600">
              {t.navProducts}
            </Link>
            <Link href="/yhteystiedot" className="transition hover:text-red-600">
              {t.navContact}
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col px-6 py-8 lg:px-8 lg:py-12">
        {children}
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-600 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-semibold text-slate-900">{companyName}</p>
            <p>{t.footerDescription}</p>
          </div>
          <div className="flex items-center gap-2">
            <PhoneCall size={16} className="text-red-600" />
            <span>{companyPhone}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-yellow-500" />
            <span>{t.footerWarranty}</span>
          </div>
          <LanguageSwitcher initialLocale={locale} />
        </div>
      </footer>
    </div>
  );
}
