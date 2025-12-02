// Centralized brand config for Growth Line
// Update contact/links as needed and the whole app stays in sync.

export type Brand = {
  name: string;
  shortName: string;
  tagline: string;
  logo: {
    full: string;   // header/footer lockup
    mark?: string;  // icon-only (optional)
    favicon?: string;
  };
  colors: {
    // Use CSS variables in UI (Tailwind v4 tokens), hex as fallbacks for non-CSS contexts
    brand: string;     // var(--color-brand-500)
    charcoal: string;  // var(--color-charcoal-900)
    accent: string;    // var(--color-accent-500)
    surface: string;   // var(--color-surface)
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  social?: {
    instagram?: string;
    linkedin?: string;
    x?: string;
    facebook?: string;
  };
  nav: Array<{ label: string; href: string }>;
};

export const BRAND: Brand = {
  name: "Growth Line",
  shortName: "GrowthLine",
  tagline: "Shifting businesses from traditional to innovative markets.",
  logo: {
    full: "/branding/growth-line-logo.svg",
    mark: "/branding/growth-line-logo.svg",
    favicon: "/favicon.svg",
  },
  colors: {
    brand: "var(--color-brand-500)",       // fallback if needed: #0e9f6e
    charcoal: "var(--color-charcoal-900)", // fallback: #0f1716
    accent: "var(--color-accent-500)",     // fallback: #f59f00
    surface: "var(--color-surface)",       // fallback: #f6f8f7
  },
  contact: {
    phone: "+964 774 444 6355",
    email: "hello@growth-line.com",
    website: "https://www.growth-line.com",
    address: "Baghdad, Al-Mansour, 14 Ramadan",
  },
  social: {
    instagram: "https://instagram.com/growthline",
    linkedin: "https://linkedin.com/company/growth-line",
    x: "https://x.com/growthline",
    facebook: "https://facebook.com/growthline",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Providers", href: "/providers" },
    { label: "Brand", href: "/brand" },
    { label: "Contact", href: "/contact" },
  ],
};

// Small helper for safe external links (optional)
export const ext = (url?: string) =>
  url ? { href: url, target: "_blank", rel: "noreferrer" } : undefined;
