// src/app/components/langswitch.tsx
"use client";

import { useI18n } from "./i18nprovider";
import { useCallback } from "react";

export default function LangSwitch() {
  const { locale, setLocale } = useI18n();
  const isAr = locale === "ar";

  const toggle = useCallback(() => {
    setLocale(isAr ? "en" : "ar");
  }, [isAr, setLocale]);

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isAr}
      aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
      className={[
        "relative inline-flex h-7 w-12 items-center rounded-full transition",
        // on = brand color, off = neutral (keeps your theme)
        isAr ? "bg-[var(--brand-600,#0a7d57)]" : "bg-[var(--color-border,#e6ecea)]",
        "ring-1 ring-black/5 shadow-inner",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-600,#0a7d57)]/40",
      ].join(" ")}
    >
      {/* Thumb */}
      <span
        className={[
          "pointer-events-none absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow",
          "transition-transform duration-200 will-change-transform",
          isAr ? "translate-x-5" : "translate-x-0",
        ].join(" ")}
      />
      {/* Tiny labels for clarity (don’t change layout) */}
      <span
        className={[
          "absolute text-[10px] font-medium select-none",
          "left-1.5", // EN label at left
          isAr ? "opacity-60" : "opacity-90",
          "text-[var(--charcoal-900,#0f1716)]",
        ].join(" ")}
      >
        EN
      </span>
      <span
        className={[
          "absolute text-[10px] font-medium select-none",
          "right-1.5", // AR label at right
          isAr ? "opacity-90" : "opacity-60",
          "text-white",
        ].join(" ")}
      >
        AR
      </span>
    </button>
  );
}
