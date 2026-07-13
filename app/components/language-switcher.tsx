"use client";

import { useState } from "react";

export default function LanguageSwitcher({ initialLocale }: { initialLocale: "fi" | "en" }) {
  const [locale, setLocale] = useState(initialLocale);

  function toggleLanguage() {
    const nextLocale = locale === "fi" ? "en" : "fi";
    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000`;
    document.documentElement.lang = nextLocale;
    setLocale(nextLocale);
    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="rounded-full border border-gray-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-red-300 hover:text-red-600"
    >
      {locale === "fi" ? "English" : "Suomeksi"}
    </button>
  );
}
