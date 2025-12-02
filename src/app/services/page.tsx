"use client";

import { ServicesInfo } from "../services/services";
import type { Service } from "../services/services";
import { useI18n } from "../components/i18nprovider";
import { motion } from "framer-motion";

export default function ServicesPage() {
    const { locale, t } = useI18n();
    const isAr = locale === "ar";
    const dir = isAr ? "rtl" : "ltr";
    const align = isAr ? "text-right" : "text-left";

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2,
            },
        },
    };

    const cardAnim = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div
            className="w-full px-4 md:px-8 lg:px-16 space-y-10 md:space-y-12"
            dir={dir}
        >
            {/* Header */}
            <motion.header
                className={`space-y-3 ${align}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                    {t("services.badge")}
                </p>
                <h1
                    className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white"
                    dir="auto"
                >
                    {t("services.title")}
                </h1>
                <p
                    className="max-w-2xl text-sm md:text-base text-slate-100/80"
                    dir="auto"
                >
                    {t("services.subtitle")}
                </p>
            </motion.header>

            {/* Services grid */}
            <motion.section
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {ServicesInfo.map((service: Service & { nameAr?: string; shortAr?: string }) => {
                        const name = isAr ? service.nameAr || service.nameEn : service.nameEn;
                        const short = isAr ? service.shortAr || service.shortEn : service.shortEn;

                        return (
                            <motion.article
                                key={service.id}
                                variants={cardAnim}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="group relative overflow-hidden rounded-2xl bg-white/5
                           border border-white/10 backdrop-blur-sm
                           px-5 py-5 md:px-6 md:py-6
                           transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10"
                            >
                                {/* top gradient line */}
                                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 opacity-70" />

                                <h2
                                    className={`mt-3 text-base md:text-lg font-semibold tracking-tight text-white ${align}`}
                                    dir="auto"
                                >
                                    {name}
                                </h2>

                                <p
                                    className={`mt-2 text-xs md:text-sm text-slate-100/80 leading-relaxed ${align}`}
                                    dir="auto"
                                >
                                    {short}
                                </p>

                                <div
                                    className={`mt-4 flex items-center gap-2 text-[0.78rem] text-emerald-200/90 ${isAr ? "justify-end" : ""
                                        }`}
                                >
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-xs">
                                        ✓
                                    </span>
                                    <span>{t("services.chip")}</span>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </motion.section>
        </div>
    );
}
