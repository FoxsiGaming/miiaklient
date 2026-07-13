import { cookies } from "next/headers";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import ContactForm from "@/app/components/contact-form";
import { prisma } from "@/lib/db";
import { getDictionary, getLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const cookieStore = await cookies();
  const locale = getLocale(cookieStore.get("locale")?.value);
  const t = getDictionary(locale);

  const siteContent = await prisma.siteContent.findMany();
  const content = Object.fromEntries(siteContent.map((item) => [item.key, item.value]));

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-6 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">{t.contactTitle}</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">{t.contactHeading}</h1>
          <p className="mt-4 text-lg text-slate-600">{t.contactBody}</p>
        </div>

        <div className="space-y-4 text-slate-700">
          <div className="flex items-start gap-3">
            <PhoneCall className="mt-1 text-red-600" size={18} />
            <div>
              <p className="font-semibold">{t.phone}</p>
              <p>{content.companyPhone || "+358 40 123 4567"}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="mt-1 text-red-600" size={18} />
            <div>
              <p className="font-semibold">{t.email}</p>
              <p>{content.companyEmail || "info@lampokamu.fi"}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 text-red-600" size={18} />
            <div>
              <p className="font-semibold">{t.address}</p>
              <p>{content.companyAddress || "Katu 12, 00100 Helsinki"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">{t.contactFormTitle}</h2>
          <p className="mt-2 text-slate-600">{t.contactFormBody}</p>
        </div>
        <ContactForm locale={locale} />
      </div>
    </div>
  );
}
