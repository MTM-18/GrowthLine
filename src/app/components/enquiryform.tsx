"use client";

import { useState } from "react";
import { useI18n } from "./i18nprovider";
import type { Provider } from "../types/provider";

type Props = {
  provider: Provider & { linkedin?: string };
};

export default function EnquiryForm({ provider }: Props) {
  const { locale, t } = useI18n();
  const isAr = locale === "ar";

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form).entries());

      // Keep your endpoint (JSON → /api/enquiry). If yours is /api/request, just change the URL.
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          providerName: provider.name,
          providerSlug: provider.slug, // EN slug for reference
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Failed");
      }
      setOk(true);
      (e.target as HTMLFormElement).reset();
    } catch (e: any) {
      setErr(e?.message || t("form.error.generic"));
    } finally {
      setLoading(false);
    }
  }

  if (ok) {
    return (
      <div className="rounded-xl border border-[var(--color-border,#e6ecea)] bg-white p-4">
        <h3 className="text-base font-semibold" dir="auto">{t("form.success.title")}</h3>
        <p className="text-sm text-[var(--charcoal-600,#334140)] mt-1" dir="auto">
          {t("form.success.body")}
        </p>
        <button
          type="button"
          onClick={() => setOk(false)}
          className="mt-3 inline-flex items-center justify-center h-10 px-4 rounded-xl bg-[var(--brand-600,#0a7d57)] text-white hover:bg-[var(--brand-500,#0e9f6e)]"
        >
          {t("form.close")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-4 md:grid-cols-2 ${isAr ? "text-right" : ""}`}>
      {/* Name */}
      <label className="grid gap-1">
        <span className="text-sm">{t("form.name")}</span>
        <input
          name="name"
          required
          className="h-10 rounded-xl border border-[var(--color-border,#e6ecea)] px-3"
          placeholder={t("form.name")}
          dir="auto"
        />
      </label>

      {/* Email */}
      <label className="grid gap-1">
        <span className="text-sm">{t("form.email")}</span>
        <input
          type="email"
          name="email"
          required
          className="h-10 rounded-xl border border-[var(--color-border,#e6ecea)] px-3"
          placeholder="name@example.com"
          dir="ltr"
          inputMode="email"
          autoComplete="email"
        />
      </label>

      {/* Phone (optional) */}
      <label className="grid gap-1">
        <span className="text-sm">{t("form.phone")}</span>
        <input
          type="tel"
          name="phone"
          className="h-10 rounded-xl border border-[var(--color-border,#e6ecea)] px-3"
          placeholder="+964 …"
          dir="ltr"
          inputMode="tel"
          autoComplete="tel"
        />
      </label>

      {/* Company (optional) */}
      <label className="grid gap-1">
        <span className="text-sm">{t("form.company")}</span>
        <input
          name="company"
          className="h-10 rounded-xl border border-[var(--color-border,#e6ecea)] px-3"
          placeholder={t("form.company")}
          dir="auto"
          autoComplete="organization"
        />
      </label>

      {/* Subject (optional) */}
      <label className="grid gap-1 md:col-span-2">
        <span className="text-sm">{t("form.subject")}</span>
        <input
          name="subject"
          className="h-10 rounded-xl border border-[var(--color-border,#e6ecea)] px-3"
          placeholder={t("form.subject")}
          dir="auto"
        />
      </label>

      {/* Preferred date (optional) */}
      <label className="grid gap-1">
        <span className="text-sm">{t("form.date")}</span>
        <input
          type="date"
          name="date"
          className="h-10 rounded-xl border border-[var(--color-border,#e6ecea)] px-3"
        />
      </label>

      {/* Message */}
      <label className="grid gap-1 md:col-span-2">
        <span className="text-sm">{t("form.message")}</span>
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-xl border border-[var(--color-border,#e6ecea)] px-3 py-2"
          placeholder={t("form.message")}
          dir="auto"
        />
      </label>

      {/* Submit */}
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center h-10 px-5 rounded-xl bg-[var(--brand-600,#0a7d57)] text-white hover:bg-[var(--brand-500,#0e9f6e)] disabled:opacity-60"
        >
          {loading ? t("form.sending") : t("form.submit")}
        </button>
      </div>

      {err && (
        <p className="md:col-span-2 text-sm text-red-600" dir="auto">
          {err}
        </p>
      )}
    </form>
  );
}
