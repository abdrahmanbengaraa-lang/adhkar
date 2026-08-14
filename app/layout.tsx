import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مشكاة الهداية - منصة شاملة للأذكار والأدعية",
  description: "منصة إسلامية تضم أذكار الصباح والمساء، حصن المسلم، والأدعية الصحيحة.",
  keywords: ["أذكار", "أذكار الصباح", "أذكار المساء", "أدعية", "حصن المسلم"],
  authors: [{ name: "عبد الرحمان بن قرعة" }],
  openGraph: {
    title: "مشكاة الهداية",
    description: "منصة شاملة للأذكار والأدعية اليومية",
    url: "https://adhkar-seven.vercel.app",
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
      <body>{children}</body>
    </html>
  );
}