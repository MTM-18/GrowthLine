// src/app/layout.tsx
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { I18nProvider } from "./components/i18nprovider";
import { Inter, Cairo } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="auto"
      className={`${inter.variable} ${cairo.variable}`}
    >
      <body className="font-sans min-h-dvh text-slate-50 antialiased">
        <I18nProvider>
          {/* Wrapper that holds background + all content */}
          <div className="relative min-h-dvh">
            {/* 🔥 Global animated background (grid + glow + diagonal vector) */}
            <div className="gl-global-bg" />

            {/* 🔁 Global orbits floating around the whole app */}
            <div className="gl-global-orbit gl-global-orbit-1" />
            <div className="gl-global-orbit gl-global-orbit-2" />
            <div className="gl-global-orbit gl-global-orbit-3" />

            {/* Actual page content above all backgrounds */}
            <div className="relative z-10 flex min-h-dvh flex-col">
              <Header />

              <main className="flex-1 w-full px-4 py-10 md:px-8 lg:px-12">
                {children}
              </main>

              <Footer />
            </div>
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
