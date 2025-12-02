"use client";

import React, { useState } from "react";
import { useI18n } from "./i18nprovider";

type ClientCategoryId = "healthcare" | "retail" | "beauty" | "exhibition";

type Client = {
    id: string;
    logoSrc: string | null;
    nameEn: string;
    nameAr: string;
    categoryId: ClientCategoryId;
};

const CATEGORIES: { id: "all" | ClientCategoryId; labelKey: string }[] = [
    { id: "all", labelKey: "clients.category.all" },
    { id: "healthcare", labelKey: "clients.category.healthcare" },
    { id: "retail", labelKey: "clients.category.retail" },
    { id: "beauty", labelKey: "clients.category.beauty" },
    { id: "exhibition", labelKey: "clients.category.exhibition" },
];

const CLIENTS: Client[] = [
    {
        id: "ashrqia",
        logoSrc: "/clients/ashrqia-exhibition.jpg",
        nameEn: "Al Ashrqia Exhibition",
        nameAr: "معرض الشرقية",
        categoryId: "exhibition",
    },
    {
        id: "istishari",
        logoSrc: "/clients/istishari-hospital.jpg",
        nameEn: "Al-Istishari Specialist Hospital",
        nameAr: "مستشفى الاستشاري التخصصي",
        categoryId: "healthcare",
    },
    {
        id: "kudo",
        logoSrc: "/clients/kudo-restaurant.jpg",
        nameEn: "Kudo Restaurant",
        nameAr: "مطعم كودو",
        categoryId: "retail",
    },
    {
        id: "best-care",
        logoSrc: "/clients/best-care.jpg",
        nameEn: "Best Care Center",
        nameAr: "بست كير",
        categoryId: "healthcare",
    },
    {
        id: "fayruza",
        logoSrc: "/clients/fayruza-center.jpg",
        nameEn: "Fayruza Center",
        nameAr: "مركز فيروزا",
        categoryId: "beauty",
    },
    {
        id: "honest",
        logoSrc: "/clients/honest-center.jpg",
        nameEn: "Honest Beauty Center",
        nameAr: "مركز أونست",
        categoryId: "beauty",
    },
    {
        id: "dr-nebras",
        logoSrc: null,
        nameEn: "Dr. Nebras Clinic",
        nameAr: "عيادة دكتورة نبراس",
        categoryId: "healthcare",
    },
];

export default function ClientsSection() {
    const { locale, t } = useI18n();
    const [selectedCategory, setSelectedCategory] =
        useState<"all" | ClientCategoryId>("all");

    const isArabic = locale === "ar";

    const filteredClients =
        selectedCategory === "all"
            ? CLIENTS
            : CLIENTS.filter((c) => c.categoryId === selectedCategory);

    const isMarquee = selectedCategory === "all";

    // For marquee we duplicate, for filtered we don't
    const displayClients = isMarquee
        ? [...filteredClients, ...filteredClients]
        : filteredClients;

    return (
        <section className="relative w-full border-t border-white/5 px-6 lg:px-16 xl:px-10 py-10 space-y-3">
            {/* Heading */}
            <header
                className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 ${isArabic ? "text-right" : "text-left"
                    }`}
                dir={isArabic ? "rtl" : "ltr"}
            >
                <div className="space-y-3 ">
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-300">
                        {t("clients.heading.kicker")}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                        {t("clients.heading.title")}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300">
                        {t("clients.heading.body")}
                    </p>
                </div>
            </header>

            {/* Categories */}
            <div className="flex flex-col gap-3" dir={isArabic ? "rtl" : "ltr"}>
                <div className="flex items-center justify-between gap-3">
                    <p className="text-xs sm:text-sm text-slate-400">
                        {t("clients.filter.label")}
                    </p>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                    {CATEGORIES.map((cat) => {
                        const active = selectedCategory === cat.id;
                        const label = t(cat.labelKey);
                        return (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setSelectedCategory(cat.id)}
                                className={[
                                    "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs sm:text-sm transition-all duration-200",
                                    active
                                        ? "border-brand-400 bg-brand-500/20 text-brand-50 shadow-sm shadow-brand-500/40"
                                        : "border-white/10 bg-slate-950/60 text-slate-300 hover:border-brand-400/60 hover:text-brand-100",
                                ].join(" ")}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Logos Row – marquee ONLY for "all", static for filters */}
            <div
                className={`relative w-full py-8 ${isMarquee ? "overflow-hidden" : "overflow-x-auto hide-scrollbar"
                    }`}
            >
                {filteredClients.length === 0 ? (
                    <div className="flex h-32 items-center justify-center">
                        <p className="text-sm text-slate-400">
                            {t("clients.filter.empty")}
                        </p>
                    </div>
                ) : (
                    <div
                        className={[
                            "flex items-center gap-16 px-4",
                            isMarquee ? "w-max animate-clients-marquee" : "justify-center",
                        ].join(" ")}
                    >
                        {displayClients.map((client, index) => (
                            <div key={`${client.id}-${index}`} className="flex-shrink-0">
                                {/* CIRCLE LOGO */}
                                <div className="w-40 h-40 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(16,185,129,0.45)]">
                                    {client.logoSrc ? (
                                        <img
                                            src={client.logoSrc}
                                            alt={client.nameEn}
                                            className="w-35 h-35 object-contain"
                                        />
                                    ) : (
                                        <span className="text-[11px] text-slate-400 text-center px-4">
                                            {t("clients.noLogo")}
                                        </span>
                                    )}
                                </div>

                                {/* Text Under Logo */}
                                <div className="mt-3 text-center">
                                    <p className="text-[12px] text-slate-200 font-medium">
                                        {isArabic ? client.nameAr : client.nameEn}
                                    </p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">
                                        {isArabic ? client.nameEn : client.nameAr}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
