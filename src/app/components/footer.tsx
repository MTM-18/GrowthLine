// src/app/components/footer.tsx
"use client";

import { useI18n } from "./i18nprovider";

const COMPANY = {
  address: "Baghdad, Al-Mansour, 14 Ramadan",
  phone: "+964 744 444 6355",
  website: "www.growth-line.com",
  email: "hello@growth-line.com",
  instagram: "https://instagram.com",
  linkedin: "https://www.linkedin.com/company/growth-line",
};

export default function Footer() {
  const { t, locale } = useI18n();
  const isAr = locale === "ar";
  const align = isAr ? "text-right" : "text-left";
  const dir = isAr ? "rtl" : "ltr";
  const year = new Date().getFullYear();

  const websiteHref =
    COMPANY.website.startsWith("http") ? COMPANY.website : `https://${COMPANY.website}`;

  return (
    <footer
      dir="ltr" // keep column order fixed
      className="mt-16 bg-[var(--color-charcoal-900,#0f1716)] text-white"
    >
      <div className="container mx-auto px-4 py-10 grid gap-6 md:grid-cols-3">
        {/* 1) Follow */}
        <div className={align} dir={dir}>
          <h4 className="font-semibold" dir="auto">{t("footer.follow")}</h4>
          <ul className="mt-2 space-y-2 text-sm opacity-90">
            <li>
              <a href={COMPANY.linkedin} target="_blank" rel="noreferrer" dir="auto">
                {t("footer.linkedin")}
              </a>
            </li>

          </ul>
        </div>

        {/* 2) Contact */}
        <div className={align} dir={dir}>
          <h4 className="font-semibold" dir="auto">{t("footer.contact")}</h4>
          <p className="text-sm opacity-80 mt-2" dir="auto">{COMPANY.address}</p>
          <p className="text-sm opacity-80 mt-1" dir="auto">{COMPANY.phone}</p>
          <p className="text-sm opacity-80 mt-1" dir="auto">
            <a href={websiteHref} target="_blank" rel="noreferrer">
              {COMPANY.website}
            </a>
          </p>
          <p className="text-sm opacity-80 mt-1" dir="auto">
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </p>
        </div>

        {/* 3) About */}
        <div className={align} dir={dir}>
          <h4 className="font-semibold" dir="auto">Growth Line</h4>
          <p className="text-sm opacity-80 mt-2" dir="auto">
            {t("footer.about")}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs opacity-70" dir={dir}>
        © {year} Growth Line. {t("footer.rights")}
      </div>
    </footer>
  );
}
