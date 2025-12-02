"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "./i18nprovider";

type ProviderCardProps = {
  provider: any;
};

export default function ProviderCard({ provider }: ProviderCardProps) {
  const { locale } = useI18n();
  const isAr = locale === "ar";

  const align = isAr ? "text-right" : "text-left";
  const justify = isAr ? "justify-end" : "justify-start";

  const name =
    (isAr ? provider.name_i18n?.ar : provider.name_i18n?.en) ||
    provider.name;

  const tagline =
    (isAr ? provider.tagline_i18n?.ar : provider.tagline_i18n?.en) ||
    provider.tagline;

  const short =
    (isAr ? provider.description_i18n?.ar : provider.description_i18n?.en) ||
    provider.description;

  const tags: string[] =
    (isAr ? provider.tags_i18n?.ar : provider.tags_i18n?.en) ||
    provider.tags ||
    [];

  const imageSrc = provider.image || provider.photo;

  return (
    <Link href={`/providers/${provider.slug}`} className="block group h-full">
      <article
        className="gl-card gl-card-lg h-full cursor-pointer flex flex-col
                   transition-transform duration-200 group-hover:-translate-y-1
                   group-hover:bg-slate-900/95"
      >
        <div className="gl-card__topline" />

        {imageSrc && (
          <div className="mb-4 -mx-3 -mt-3">
            <div
              className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl
                         border border-slate-800/60 bg-slate-900"
            >
              <Image
                src={imageSrc}
                alt={name}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
              {/* soft gradient at bottom for readability */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            </div>
          </div>
        )}

        <div className="flex flex-col flex-1 gap-2">
          <h2 className={`gl-card__title text-lg ${align}`} dir="auto">
            {name}
          </h2>

          {tagline && (
            <p
              className={`mt-1 text-sm text-slate-300 ${align}`}
              dir="auto"
            >
              {tagline}
            </p>
          )}

          {short && (
            <p
              className={`gl-card__body mt-2 line-clamp-3 ${align}`}
              dir="auto"
            >
              {short}
            </p>
          )}

          {tags.length > 0 && (
            <div
              className={`mt-3 flex flex-wrap gap-2 ${justify}`}
            >
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-800/80 px-3 py-1 text-[0.72rem]
                             text-slate-100 border border-slate-600/60
                             transition-colors duration-200 group-hover:bg-slate-700/80"
                  dir="auto"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div
          className={`mt-4 flex items-center gap-2 text-[0.78rem] text-emerald-200/90 ${justify}`}
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-xs transition-transform duration-200 group-hover:scale-110 group-hover:bg-emerald-500/30">
            ✓
          </span>
          <span dir="auto">
            {isAr
              ? "مناسب للشركات المتوسطة والنامية"
              : "Ideal for growing teams & SMEs"}
          </span>
        </div>
      </article>
    </Link>
  );
}
