"use client";

import { useState } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function ContactForm({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setSubmitted(true);
      event.currentTarget.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          {t.contactName}
          <input required name="name" className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          {t.contactEmail}
          <input required type="email" name="email" className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
        </label>
      </div>
      <label className="text-sm font-medium text-slate-700">
        {t.contactPhone}
        <input name="phone" className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {t.contactInterest}
        <select name="interest" className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3">
          <option>Air-to-air heat pump</option>
          <option>Air-to-water heat pump</option>
          <option>Installation</option>
          <option>Maintenance</option>
        </select>
      </label>
      <label className="text-sm font-medium text-slate-700">
        {t.contactMessage}
        <textarea required name="message" rows={5} className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3" />
      </label>
      <button type="submit" className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700">
        {t.contactSubmit}
      </button>
      {submitted ? (
        <p className="rounded-2xl bg-green-50 p-3 text-sm text-green-700">
          {t.contactSuccess}
        </p>
      ) : null}
    </form>
  );
}
