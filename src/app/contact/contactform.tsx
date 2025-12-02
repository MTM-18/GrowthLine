// src/app/contact/contactform.tsx
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useI18n } from "../components/i18nprovider";

type Status = "idle" | "sending" | "success" | "error";

type ContactFormProps = {
  // when passed → this is a provider enquiry and will hit /api/enquiry
  providerSlug?: string;
  providerName?: string;
  providerEmail?: string;
};

export default function ContactForm({
  providerSlug,
  providerName,
  providerEmail,
}: ContactFormProps) {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const align = isAr ? "text-right" : "text-left";
  const justify = isAr ? "justify-end" : "justify-start";

  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    date: "",
    message: "",
  });

  // --- Localized texts (self-contained) ---
  const L = {
    name: isAr ? "الاسم" : "Your name",
    email: isAr ? "البريد الإلكتروني" : "Email",
    phone: isAr ? "الهاتف (اختياري)" : "Phone (optional)",
    company: isAr ? "الشركة (اختياري)" : "Company (optional)",
    subject: isAr ? "الموضوع (اختياري)" : "Subject (optional)",
    date: isAr ? "التاريخ المفضل (اختياري)" : "Preferred date (optional)",
    message: isAr ? "رسالتك" : "Your message",

    phName: isAr ? "اسمك" : "Name",
    phEmail: "name@example.com",
    phPhone: isAr ? "+964 …" : "+964 …",
    phSubject: isAr
      ? "شراكة / استشارة / توظيف…"
      : "Partnership / Consultation / Hiring…",
    phMessage: isAr ? "أخبرنا باختصار ما تحتاجه" : "Tell us briefly what you need",

    submit: isAr ? "إرسال" : "Send",
    sending: isAr ? "جاري الإرسال…" : "Sending…",
    error: isAr
      ? "حدث خطأ ما. حاول مرة أخرى."
      : "Something went wrong. Please try again.",

    successTitle: isAr ? "تم إرسال الاستفسار ✅" : "Enquiry sent ✅",
    successBody: isAr
      ? "شكرًا لك! استلمنا رسالتك وسنعاود التواصل معك قريبًا."
      : "Thanks! We’ve received your message and will get back to you shortly.",
    goHome: isAr ? "العودة للرئيسية" : "Back to home",
    close: isAr ? "إرسال استفسار جديد" : "Send another enquiry",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      let res: Response;

      // If we have provider info → send to /api/enquiry (JSON body)
      if (providerSlug && providerName) {
        res = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            providerSlug,
            providerName,
            providerEmail: providerEmail || undefined,
            name: form.name,
            email: form.email,
            phone: form.phone,
            service: form.subject,
            preferredDate: form.date,
            message: form.message,
          }),
        });
      } else {
        // Generic contact → send to /api/request (FormData, matches your route.ts)
        const fd = new FormData();
        fd.append("name", form.name);
        fd.append("email", form.email);
        fd.append("phone", form.phone);
        fd.append("company", form.company);
        fd.append("subject", form.subject);
        fd.append("date", form.date);
        fd.append("message", form.message);

        res = await fetch("/api/request", {
          method: "POST",
          body: fd,
        });
      }

      if (!res.ok) {
        throw new Error(await res.text());
      }

      setStatus("success");
    } catch (err) {
      console.error("CONTACT_SUBMIT_ERROR", err);
      setStatus("error");
    }
  };

  // ------- Success state -------
  if (status === "success") {
    return (
      <div className="space-y-4" dir={dir}>
        <h3
          className={`text-base md:text-lg font-semibold text-emerald-300 ${align}`}
          dir="auto"
        >
          {L.successTitle}
        </h3>
        <p
          className={`text-sm md:text-[0.95rem] text-slate-100/80 ${align}`}
          dir="auto"
        >
          {L.successBody}
        </p>
        <div className={`flex flex-wrap gap-3 ${justify}`}>
          <Link
            href="/"
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs md:text-sm font-medium text-slate-50 border border-slate-600 hover:bg-slate-800"
          >
            {L.goHome}
          </Link>
          <button
            type="button"
            onClick={() => {
              setForm({
                name: "",
                email: "",
                phone: "",
                company: "",
                subject: "",
                date: "",
                message: "",
              });
              setStatus("idle");
            }}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-xs md:text-sm font-medium text-white hover:bg-emerald-700"
          >
            {L.close}
          </button>
        </div>
      </div>
    );
  }

  // ------- Form UI -------
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-sm text-slate-100"
      dir={dir}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {/* Name */}
        <div className="space-y-1">
          <label
            className={`block text-xs uppercase tracking-wide text-slate-300 ${align}`}
          >
            {L.name}
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="h-10 w-full rounded-lg border border-slate-600 bg-slate-900/60 px-3 text-sm text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder={L.phName}
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label
            className={`block text-xs uppercase tracking-wide text-slate-300 ${align}`}
          >
            {L.email}
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="h-10 w-full rounded-lg border border-slate-600 bg-slate-900/60 px-3 text-sm text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder={L.phEmail}
          />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label
            className={`block text-xs uppercase tracking-wide text-slate-300 ${align}`}
          >
            {L.phone}
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="h-10 w-full rounded-lg border border-slate-600 bg-slate-900/60 px-3 text-sm text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder={L.phPhone}
          />
        </div>

        {/* Company */}
        <div className="space-y-1">
          <label
            className={`block text-xs uppercase tracking-wide text-slate-300 ${align}`}
          >
            {L.company}
          </label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className="h-10 w-full rounded-lg border border-slate-600 bg-slate-900/60 px-3 text-sm text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder={L.company}
          />
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-1">
        <label
          className={`block text-xs uppercase tracking-wide text-slate-300 ${align}`}
        >
          {L.subject}
        </label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="h-10 w-full rounded-lg border border-slate-600 bg-slate-900/60 px-3 text-sm text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder={L.phSubject}
        />
      </div>

      {/* Date */}
      <div className="space-y-1">
        <label
          className={`block text-xs uppercase tracking-wide text-slate-300 ${align}`}
        >
          {L.date}
        </label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="h-10 w-full rounded-lg border border-slate-600 bg-slate-900/60 px-3 text-sm text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label
          className={`block text-xs uppercase tracking-wide text-slate-300 ${align}`}
        >
          {L.message}
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded-lg border border-slate-600 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder={L.phMessage}
        />
      </div>

      {/* Buttons */}
      <div className={`mt-4 flex items-center gap-3 ${justify}`}>
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? L.sending : L.submit}
        </button>

        {status === "error" && (
          <p className="text-xs text-red-400" dir="auto">
            {L.error}
          </p>
        )}
      </div>
    </form>
  );
}
