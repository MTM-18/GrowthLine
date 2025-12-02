// src/app/providers/page.tsx
"use client";

import { useI18n } from "../components/i18nprovider";
import ProviderCard from "../components/ProviderCard";
import { ProvidersInfo } from "../data/providers";
import { motion } from "framer-motion";

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.25,
        },
    },
};

const cardAnim = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

export default function ProvidersPage() {
    const { t, locale } = useI18n();
    const isAr = locale === "ar";
    const align = isAr ? "text-right" : "text-left";
    const dir = isAr ? "rtl" : "ltr";

    return (
        <div
            className="w-full px-4 md:px-8 lg:px-16 space-y-10 md:space-y-12"
            dir={dir}
        >
            {/* Header card */}
            <motion.section
                className="gl-card gl-card-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="gl-card__topline" />
                <h1
                    className={`gl-card__title text-2xl md:text-3xl ${align}`}
                    dir="auto"
                >
                    {t("providers.title")}
                </h1>
                <p
                    className={`gl-card__body mt-3 max-w-2xl ${align}`}
                    dir="auto"
                >
                    {t("providers.subtitle")}
                </p>
            </motion.section>

            {/* Providers grid */}
            <motion.section
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {ProvidersInfo.map((provider, index) => (
                        <motion.div
                            key={provider.slug}
                            variants={cardAnim}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="h-full"
                        >
                            <ProviderCard provider={provider} />
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
}
