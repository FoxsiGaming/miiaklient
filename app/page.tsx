import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { getProducts, getSiteContent } from "@/lib/site-data";

export const dynamic = "force-static";

function getContentValue(content: Record<string, string>, key: string, fallback: string) {
  return content[key] || fallback;
}

export default async function HomePage() {
  const locale = "fi" as const;
  const t = getDictionary(locale);

  const products = getProducts().slice(0, 3);
  const content = getSiteContent();

  return (
    <div className="space-y-16">
      <section className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm">
        <div className="grid gap-8 px-6 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="mb-4 inline-flex w-fit items-center rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
              {t.heroBadge}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {getContentValue(content, "heroHeading", t.heroHeading)}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {getContentValue(content, "heroBody", t.heroBody)}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/tuotteet" className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700">
                {t.heroPrimaryCta} <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link href="/yhteystiedot" className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 font-semibold text-slate-900 transition hover:bg-yellow-300">
                {t.heroSecondaryCta}
              </Link>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-gray-200 bg-gray-50 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-yellow-400 p-2 text-slate-900">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">{t.trustTitle}</p>
                <p className="text-sm text-slate-600">{t.trustSubtitle}</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-red-600">
                  <ShieldCheck size={18} />
                  <p className="font-semibold">{t.warrantyTitle}</p>
                </div>
                <p className="mt-2 text-sm text-slate-600">{t.warrantyBody}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-yellow-500">
                  <Wrench size={18} />
                  <p className="font-semibold">{t.installTitle}</p>
                </div>
                <p className="mt-2 text-sm text-slate-600">{t.installBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">{t.expertTitle}</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">{t.expertHeading}</h2>
          <p className="mt-3 text-slate-600">{t.expertBody}</p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-500">{t.quoteTitle}</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">{t.quoteHeading}</h2>
          <p className="mt-3 text-slate-600">{t.quoteBody}</p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">{t.qualityTitle}</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">{t.qualityHeading}</h2>
          <p className="mt-3 text-slate-600">{t.qualityBody}</p>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">{t.featuredTitle}</p>
            <h2 className="text-3xl font-semibold text-slate-900">{t.featuredHeading}</h2>
          </div>
          <Link href="/tuotteet" className="text-sm font-semibold text-red-600 hover:text-red-700">
            {t.featuredLink}
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="flex h-full flex-col rounded-[1.5rem] border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-500">{product.type}</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">{product.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{product.description}</p>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>{t.power}: {product.heatingCapacity}</p>
                <p>SCOP: {product.scop}</p>
                <p>{t.price}: {product.price.toFixed(0)} €</p>
              </div>
              <Link href="/yhteystiedot" className="mt-6 inline-flex items-center justify-center rounded-full bg-yellow-400 px-5 py-3 font-semibold text-slate-900 transition hover:bg-yellow-300">
                {t.askQuote}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
