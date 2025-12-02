// src/app/providers/[slug]/providerdetailsclient.tsx
"use client";

import Image from "next/image";
import ContactForm from "../../contact/contactform";
import { useI18n } from "../../components/i18nprovider";

type ProviderDetailsClientProps = {
  provider: any;
  routeSlug: string;
};

export default function ProviderDetailsClient({
  provider,
}: ProviderDetailsClientProps) {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const align = isAr ? "text-right" : "text-left";

  // Localized fields from *_i18n
  const name =
    (isAr ? provider.name_i18n?.ar : provider.name_i18n?.en) ||
    provider.name;

  const title =
    (isAr ? provider.tagline_i18n?.ar : provider.tagline_i18n?.en) ||
    provider.tagline;

  const longBio =
    (isAr ? provider.description_i18n?.ar : provider.description_i18n?.en) ||
    provider.description;

  const tags: string[] =
    (isAr ? provider.tags_i18n?.ar : provider.tags_i18n?.en) ||
    provider.tags ||
    [];

  const location =
    (isAr ? provider.location_i18n?.ar : provider.location_i18n?.en) ||
    provider.location ||
    "";

  return (
    <div className="space-y-10" dir={dir}>
      {/* Main provider profile */}
      <section className="gl-card gl-card-lg">
        <div className="gl-card__topline" />

        <div className="grid gap-8 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] items-start">
          {/* Photo */}
          <div className="relative h-72 w-full max-w-sm overflow-hidden rounded-2xl">
            <Image
              src={
                provider.image ||
                provider.photo ||
                "/images/provider-placeholder.png"
              }
              alt={name}
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 260px, 100vw"
            />
          </div>

          {/* Text info */}
          <div className={align}>
            <h1
              className="text-2xl md:text-3xl font-semibold text-slate-50"
              dir="auto"
            >
              {name}
            </h1>

            {title && (
              <p
                className="mt-1 text-sm md:text-base text-emerald-300"
                dir="auto"
              >
                {title}
              </p>
            )}

            {location && (
              <p className="mt-2 text-sm text-slate-300" dir="auto">
                {location}
              </p>
            )}

            {longBio && (
              <p
                className="mt-4 text-sm md:text-[0.95rem] leading-relaxed text-slate-200"
                dir="auto"
              >
                {longBio}
              </p>
            )}

            {tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2" dir="auto">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-800/80 px-3 py-1 text-[0.72rem] text-slate-100 border border-slate-600/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section className="gl-card gl-card-lg">
        <div className="gl-card__topline" />
        <h2 className="gl-card__title mb-2" dir="auto">
          {isAr ? `أرسل استفسارًا بخصوص ${name}` : `Send an enquiry about ${name}`}
        </h2>
        <p className="gl-card__body mb-4" dir="auto">
          {isAr
            ? "شاركنا متطلباتك وسنقوم بربطك مع هذا المزود وفريقنا لتصميم الحل المناسب."
            : "Share your requirements and we’ll connect you with this provider and our team to design the right engagement."}
        </p>

        <ContactForm
          providerSlug={provider.slug}
          providerName={name}
          providerEmail={provider.email}
        />
      </section>
    </div>
  );
}
