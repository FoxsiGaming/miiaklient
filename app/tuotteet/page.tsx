import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { getProducts } from "@/lib/site-data";

export const dynamic = "force-static";

export default async function ProductsPage() {
  const locale = "fi" as const;
  const t = getDictionary(locale);

  const products = getProducts();

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">{t.productsTitle}</p>
        <h1 className="text-4xl font-semibold text-slate-900">{t.productsHeading}</h1>
        <p className="max-w-2xl text-lg text-slate-600">{t.productsBody}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {products.map((product) => (
          <article key={product.id} className="rounded-[1.5rem] border border-gray-200 bg-white p-6 shadow-sm">
            {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="mt-4 h-48 w-full rounded-2xl object-cover" /> : null}
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">{product.type}</span>
              <span className="text-sm font-semibold text-slate-500">{product.price.toFixed(0)} €</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">{product.name}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{product.description}</p>
            <div className="mt-5 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              <p>{t.power}: {product.heatingCapacity}</p>
              <p>SCOP: {product.scop}</p>
            </div>
            <Link href="/yhteystiedot" className="mt-6 inline-flex items-center rounded-full bg-yellow-400 px-5 py-3 font-semibold text-slate-900 transition hover:bg-yellow-300">
              {t.askQuote} <ArrowRight className="ml-2" size={18} />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
