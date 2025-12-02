// src/app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "./components/i18nprovider";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import ClientsSection from "./components/clients";

const metricsConfig = [
  { id: 1, end: 30, prefix: "$", suffix: "M+" },   // $30M+
  { id: 2, end: 40, prefix: "", suffix: "+" },     // 40+
  { id: 3, end: 500, prefix: "", suffix: "+" },    // 500+
  { id: 4, end: 15000, prefix: "", suffix: "+" },  // 15,000+
  { id: 5, end: 120, prefix: "", suffix: "+" },    // 120+
  { id: 6, end: 92, prefix: "", suffix: "%" },     // 92%
];

export default function HomePage() {
  const { t, locale } = useI18n();
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const align = isAr ? "text-right" : "text-left";
  const justify = isAr ? "justify-end" : "justify-start";

  return (
    <div
      className="w-full px-4 md:px-8 lg:px-16 space-y-6 md:space-y-10"
      dir={dir}
    >
      {/* HERO */}
      <motion.section
        className="gl-card gl-card-lg relative overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="gl-card__topline" />

        {/* Background image */}
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/hero.png"
            alt="Growth Line"
            fill
            className="object-cover object-center mix-blend-soft-light"
          />
        </div>

        {/* ✨ Animated background shapes (grid + orbs + frame + vectors + orbit) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* animated inner grid */}
          <div className="gl-hero-grid" />

          {/* floating orbs + frame */}
          <div className="gl-hero-orb gl-float-slow -left-24 -top-32" />
          <div className="gl-hero-orb gl-float-slow right-[-80px] top-40 delay-300" />
          <div className="gl-hero-frame gl-float-slow bottom-[-60px] right-10" />

          {/* diagonal vector lines */}
          <motion.div
            className="gl-hero-vector gl-hero-vector-1"
            initial={{ x: -260, opacity: 0 }}
            animate={{ x: 260, opacity: 0.5 }}
            transition={{
              duration: 22,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }}
          />
          <motion.div
            className="gl-hero-vector gl-hero-vector-2"
            initial={{ x: 260, opacity: 0 }}
            animate={{ x: -260, opacity: 0.5 }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
              delay: 3,
            }}
          />

          {/* orbit ring + rotating glowing dot */}
          <motion.div
            className="gl-hero-orbit-dot"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* full-width hero content */}
        <div className="relative w-full">
          <motion.p
            className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            {t("home.hero.badge")}
          </motion.p>

          <motion.h1
            className={`${align} mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold`}
            dir="auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            {t("home.hero.title")}
          </motion.h1>

          <motion.p
            className={`${align} mt-4 text-slate-100/90 leading-relaxed`}
            dir="auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            {t("home.hero.subtitle")}
          </motion.p>

          <motion.p
            className={`${align} mt-2 text-slate-100/70 leading-relaxed`}
            dir="auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            {t("home.hero.bullet")}
          </motion.p>

          <motion.div
            className={`mt-6 flex flex-wrap gap-3 ${justify}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <Link
              href="/contact"
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            >
              {t("home.hero.cta.primary")}
            </Link>
            <a
              href="/services"
              className="rounded-xl bg-white/10 hover:bg-white/20 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            >
              {t("home.hero.cta.secondary")}
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* METRICS */}
      <motion.section
        className="gl-card gl-card-lg"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="gl-card__topline" />
        <header className={`${align} mb-6`} dir="auto">
          <h2 className="text-xl font-semibold">
            {t("home.metrics.title")}
          </h2>
          <p className="mt-1 text-slate-300">
            {t("home.metrics.subtitle")}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
          {metricsConfig.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={align}
            >
              <div className="text-lg md:text-xl font-semibold" dir="auto">
                {metric.prefix && <span>{metric.prefix}</span>}
                <CountUp
                  end={metric.end}
                  suffix={metric.suffix}
                  duration={2}
                  separator=","
                />
              </div>
              <p className="text-sm text-slate-400 mt-1" dir="auto">
                {t(`home.metrics.${metric.id}.label`)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/*Our clients*/}
      <ClientsSection />

      {/* PROVIDERS CTA */}
      <motion.section
        className="gl-card gl-card-lg"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="gl-card__topline" />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className={align} dir="auto">
            <h2 className="text-lg font-semibold">
              {t("home.providers.section.title")}
            </h2>
            <p className="mt-2 text-slate-300">
              {t("home.providers.section.body")}
            </p>
          </div>

          <Link
            href="/providers"
            className="rounded-xl border border-emerald-500 text-emerald-300 px-4 py-2 text-sm font-medium hover:bg-emerald-500/10 transition"
          >
            {t("home.providers.section.cta")}
          </Link>
        </div>
      </motion.section>

      {/* SME + EXPERTS */}
      <section className="grid gap-6 md:grid-cols-2">
        <motion.article
          className="gl-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="gl-card__topline" />
          <h2 className="gl-card__title" dir="auto">
            {t("home.program.sme.title")}
          </h2>
          <p className="gl-card__body" dir="auto">
            {t("home.program.sme.body")}
          </p>
        </motion.article>

        <motion.article
          className="gl-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="gl-card__topline" />
          <h2 className="gl-card__title" dir="auto">
            {t("home.experts.title")}
          </h2>
          <p className="gl-card__body" dir="auto">
            {t("home.experts.body")}
          </p>
        </motion.article>
      </section>

      {/* FINAL CONTACT CTA */}
      <motion.section
        className="gl-card gl-card-lg"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="gl-card__topline" />
        <div className={align} dir="auto">
          <h2 className="text-lg font-semibold">
            {t("home.contact.title")}
          </h2>
          <p className="mt-2 text-slate-300">
            {t("home.contact.body")}
          </p>
        </div>
        <div className={`mt-4 flex ${justify}`}>
          <Link
            href="/contact"
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
          >
            {t("home.contact.cta")}
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
