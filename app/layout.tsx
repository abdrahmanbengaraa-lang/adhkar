import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import MaintenanceBanner from "./MaintenanceBanner";

export const metadata: Metadata = {
  title: "مشكاة الهداية - منصة شاملة للأذكار والأدعية",
  description: "منصة إسلامية تضم أذكار الصباح والمساء، حصن المسلم، والأدعية الصحيحة.",
  keywords: ["أذكار", "أذكار الصباح", "أذكار المساء", "أدعية", "حصن المسلم"],
  authors: [{ name: "عبد الرحمان بن قرعة" }],
  manifest: "/manifest.json",
  other: {
    "google-site-verification": "aThYdFwCCz-4XNI4VWdFrRTQi6w0JZ49FgZchriz94",
  },
  openGraph: {
    title: "مشكاة الهداية",
    description: "منصة شاملة للأذكار والأدعية اليومية",
    url: "https://mishkat-alhidaia.vercel.app",
    siteName: "مشكاة الهداية",
    locale: "ar_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Google Analytics Tag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YE939KRGG6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YE939KRGG6');
          `}
        </Script>
      </head>
      <body>
        <MaintenanceBanner />
        {children}
      </body>
    </html>
  );
}