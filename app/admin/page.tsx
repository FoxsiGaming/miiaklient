import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { createProduct, deleteProduct, saveSiteContent, updateProduct } from "@/app/actions";
import { getDictionary, getLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const locale = getLocale(cookieStore.get("locale")?.value);
  const t = getDictionary(locale);

  const [products, siteContent] = await Promise.all([
    prisma.product.findMany({ orderBy: { id: "asc" } }),
    prisma.siteContent.findMany(),
  ]);

  const content = Object.fromEntries(siteContent.map((item) => [item.key, item.value]));

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">{t.adminTitle}</p>
            <h1 className="text-3xl font-semibold text-slate-900">{t.adminHeading}</h1>
            <p className="mt-2 text-slate-600">{t.adminDescription}</p>
          </div>
          <div className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-900">{t.adminUser}</div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">{t.adminContentTitle}</h2>
        <form action={saveSiteContent} className="mt-6 grid gap-4 lg:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            {t.adminHeroHeading}
            <input name="heroHeading" defaultValue={content.heroHeading || "Pidämme Suomen kodit lämpiminä ja energiatehokkaina."} className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            {t.adminHeroBody}
            <input name="heroBody" defaultValue={content.heroBody || "Kokeneet asentajat ja huolellisesti valitut tuotteet tekevät kotistasi miellyttävän ja tehokkaan."} className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            {t.adminCompanyName}
            <input name="companyName" defaultValue={content.companyName || "Lämpökamu"} className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            {t.adminEmail}
            <input name="companyEmail" defaultValue={content.companyEmail || "info@lampokamu.fi"} className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            {t.adminPhone}
            <input name="companyPhone" defaultValue={content.companyPhone || "+358 40 123 4567"} className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            {t.adminAddress}
            <input name="companyAddress" defaultValue={content.companyAddress || "Katu 12, 00100 Helsinki"} className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
          </label>
          <div className="lg:col-span-2">
            <button type="submit" className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700">
              {t.adminSave}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">{t.adminProductsTitle}</h2>
          <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-slate-600">{products.length} {t.adminProductCount}</div>
        </div>

        <form action={createProduct} className="mt-6 grid gap-4 rounded-[1.5rem] border border-gray-200 bg-gray-50 p-6 lg:grid-cols-2">
          <h3 className="text-lg font-semibold text-slate-900 lg:col-span-2">{t.adminAddProduct}</h3>
          <label className="text-sm font-medium text-slate-700">
            {t.adminProductName}
            <input required name="name" className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            {t.adminProductType}
            <input required name="type" className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
          </label>
          <label className="text-sm font-medium text-slate-700 lg:col-span-2">
            {t.adminProductDescription}
            <textarea required name="description" rows={3} className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            {t.adminProductPrice}
            <input required type="number" name="price" className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            {t.adminProductCapacity}
            <input required name="heatingCapacity" className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            {t.adminProductScop}
            <input required type="number" step="0.1" name="scop" className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            {t.adminProductImageUrl}
            <input name="imageUrl" className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            {t.adminProductImageFile}
            <input type="file" name="imageFile" accept="image/*" className="mt-1 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3" />
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input type="checkbox" name="isVisible" defaultChecked />
            {t.adminVisible}
          </label>
          <div className="lg:col-span-2">
            <button type="submit" className="rounded-full bg-yellow-400 px-6 py-3 font-semibold text-slate-900 transition hover:bg-yellow-300">
              {t.adminAddButton}
            </button>
          </div>
        </form>

        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">{t.adminTableProduct}</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">{t.adminTableType}</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">{t.adminTablePrice}</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">{t.adminTableVisible}</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">{t.adminTableActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-slate-900">{product.name}</div>
                    <div className="text-slate-600">{product.heatingCapacity}</div>
                  </td>
                  <td className="px-4 py-4 text-slate-700">{product.type}</td>
                  <td className="px-4 py-4 text-slate-700">{product.price.toFixed(0)} €</td>
                  <td className="px-4 py-4 text-slate-700">{product.isVisible ? t.adminYes : t.adminNo}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-3">
                      <form action={updateProduct} className="space-y-3 rounded-2xl border border-gray-200 p-3">
                        <input type="hidden" name="id" value={product.id} />
                        <input name="name" defaultValue={product.name} className="w-full rounded-2xl border border-gray-200 px-3 py-2" />
                        <input name="type" defaultValue={product.type} className="w-full rounded-2xl border border-gray-200 px-3 py-2" />
                        <textarea name="description" defaultValue={product.description} rows={2} className="w-full rounded-2xl border border-gray-200 px-3 py-2" />
                        <input type="number" name="price" defaultValue={product.price} className="w-full rounded-2xl border border-gray-200 px-3 py-2" />
                        <input name="heatingCapacity" defaultValue={product.heatingCapacity} className="w-full rounded-2xl border border-gray-200 px-3 py-2" />
                        <input type="number" step="0.1" name="scop" defaultValue={product.scop} className="w-full rounded-2xl border border-gray-200 px-3 py-2" />
                        <input name="imageUrl" defaultValue={product.imageUrl} className="w-full rounded-2xl border border-gray-200 px-3 py-2" />
                        <input type="file" name="imageFile" accept="image/*" className="w-full rounded-2xl border border-gray-200 px-3 py-2" />
                        <label className="flex items-center gap-2 text-sm text-slate-700">
                          <input type="checkbox" name="isVisible" defaultChecked={product.isVisible} />
                          {t.adminVisible}
                        </label>
                        <button type="submit" className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">
                          {t.adminUpdate}
                        </button>
                      </form>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={product.id} />
                        <button type="submit" className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white">
                          {t.adminDelete}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
