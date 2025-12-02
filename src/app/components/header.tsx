"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "./i18nprovider";
import { useState } from "react";

const navLinks = [
  { href: "/", key: "nav.home" },
  { href: "/services", key: "nav.services" },
  // { href: "/providers", key: "nav.providers" },
  { href: "/contact", key: "nav.contact" },
];

export default function Header() {
  const { locale, setLocale, t } = useI18n();
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const [open, setOpen] = useState(false);

  const toggleLang = () => setLocale(isAr ? "en" : "ar");

  return (
    <header
      className="relative z-30 w-full px-6 md:px-10 py-4 flex items-center justify-between"
      dir={dir}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/images/logo3.png"
          alt="Growth Line Logo"
          width={140}
          height={40}
          className="h-10 w-auto object-contain"
          priority
        />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-slate-100 hover:text-emerald-300 transition-colors"
          >
            {t(link.key)}
          </Link>
        ))}

        {/* Language Toggle */}
        <button
          onClick={toggleLang}
          className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20 transition-colors"
        >
          {isAr ? "EN" : "AR"}
        </button>
      </nav>

      {/* Mobile controls: language + menu button */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={toggleLang}
          className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20 transition-colors"
        >
          {isAr ? "EN" : "AR"}
        </button>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-900/70 hover:bg-slate-900/90 transition-colors"
        >
          <span className="sr-only">Menu</span>
          {/* simple hamburger / close icon */}
          <div className="space-y-1.5">
            <span
              className={`block h-[2px] w-5 bg-white transition-transform ${open ? "translate-y-[5px] rotate-45" : ""
                }`}
            />
            <span
              className={`block h-[2px] w-5 bg-white transition-opacity ${open ? "opacity-0" : "opacity-100"
                }`}
            />
            <span
              className={`block h-[2px] w-5 bg-white transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <div className="absolute md:hidden top-full inset-x-0 mt-2 px-4">
          <div className="rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-soft">
            <nav
              className={`flex flex-col py-3 ${isAr ? "items-end text-right" : "items-start text-left"
                }`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="w-full px-4 py-2 text-sm text-slate-100 hover:text-emerald-300 hover:bg-white/5 transition-colors"
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
