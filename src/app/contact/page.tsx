// src/app/contact/page.tsx
"use client";

import ContactForm from "./contactform";
import { useI18n } from "../components/i18nprovider";
import { motion } from "framer-motion";

const sectionUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactPage() {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const align = isAr ? "text-right" : "text-left";

  const title = isAr ? "تواصل مع خط النمو" : "Contact Growth Line";
  const subtitle = isAr
    ? "شاركنا أهدافك وتحدياتك وسنقترح عليك خطة عمل وخيارات تعاون مناسبة للسوق العراقي."
    : "Tell us your goals and challenges — we’ll propose a plan and collaboration options tailored to the Iraqi market.";

  return (
    <div
      className="w-full px-4 md:px-8 lg:px-16 space-y-10 md:space-y-12"
      dir={dir}
    >
      {/* Header */}
      <motion.section
        className="gl-card gl-card-lg"
        initial="hidden"
        animate="visible"
        variants={sectionUp}
        transition={{ duration: 0.6 }}
      >
        <div className="gl-card__topline" />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
          {isAr ? "تواصل" : "Contact"}
        </p>
        <h1
          className={`mt-3 text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-50 ${align}`}
          dir="auto"
        >
          {title}
        </h1>
        <p
          className={`mt-3 max-w-2xl text-sm md:text-base text-slate-100/80 ${align}`}
          dir="auto"
        >
          {subtitle}
        </p>
      </motion.section>

      {/* Content */}
      <motion.section
        className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionUp}
        transition={{ duration: 0.6 }}
      >
        {/* Info box */}
        <motion.div
          className="gl-card gl-card-lg"
          variants={sectionUp}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="gl-card__topline" />
          <h2 className="text-base md:text-lg font-semibold text-white mb-2">
            {isAr ? "معلومات التواصل" : "Contact information"}
          </h2>

          <div className="space-y-3 text-sm text-slate-100">
            <div>
              <div className="text-xs uppercase text-slate-400">
                {isAr ? "البريد الإلكتروني" : "Email"}
              </div>
              <a
                href="mailto:hello@growthline.com"
                className="text-sm text-emerald-300"
              >
                hello@growthline.com
              </a>
            </div>

            <div>
              <div className="text-xs uppercase text-slate-400">
                {isAr ? "الهاتف" : "Phone"}
              </div>
              <a
                href="tel:+9647444446355"
                className="text-sm text-emerald-300"
              >
                +964 744 444 6355
              </a>
            </div>

            <div>
              <div className="text-xs uppercase text-slate-400">
                {isAr ? "العنوان" : "Address"}
              </div>
              <p className="text-sm">
                {isAr
                  ? "العراق · بغداد · المنصور · 14 رمضان"
                  : "Iraq · Baghdad · Al-Mansour · 14 Ramadan"}
              </p>
            </div>

            <div>
              <div className="text-xs uppercase text-slate-400">
                {isAr ? "ساعات العمل" : "Office hours"}
              </div>
              <p className="text-sm">
                {isAr ? "الأحد – الخميس، 9:00 – 17:00" : "Sun–Thu, 9:00–17:00"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form box */}
        <motion.div
          className="gl-card gl-card-lg"
          variants={sectionUp}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="gl-card__topline" />
          <h2 className="text-base md:text-lg font-semibold text-white mb-3">
            {isAr ? "أرسل استفسارك" : "Send an enquiry"}
          </h2>
          <p
            className="text-xs md:text-sm text-slate-200/80 mb-4"
            dir="auto"
          >
            {isAr
              ? "املأ النموذج وسيقوم فريقنا بالتواصل معك قريبًا."
              : "Fill out the form and our team will get back to you shortly."}
          </p>

          <ContactForm />
        </motion.div>
      </motion.section>
    </div>
  );
}
