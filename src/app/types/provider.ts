// src/app/types/provider.ts
export type Provider = {
  // existing fields
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  linkedin?: string;
  tags?: string[];
  image?: string;

  // NEW: optional localized fields (UI will fall back to the originals)
  slug_i18n?: { en: string; ar: string };
  name_i18n?: { en: string; ar: string };
  tagline_i18n?: { en?: string; ar?: string };
  description_i18n?: { en?: string; ar?: string };
  tags_i18n?: { en?: string[]; ar?: string[] };
};
