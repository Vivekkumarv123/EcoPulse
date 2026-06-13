import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/components/providers/AppProvider";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

/**
 * Application metadata used by Next.js for SEO and manifest generation.
 */
export const metadata: Metadata = {
  title: "EcoPulse - Carbon Footprint Tracker",
  description: "Track, understand, and reduce your carbon footprint with actionable insights."
};

/**
 * Root application layout. Wraps pages with `AppProvider`, `Header`, and `Footer`.
 * This file should remain minimal and focused on layout concerns only.
 */
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[rgb(var(--bg))] text-slate-200 antialiased selection:bg-emerald-600 selection:text-slate-900">
        <AppProvider>
          <Header />
          <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
