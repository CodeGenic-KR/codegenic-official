import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "@/app/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";

  const title = isKo
    ? "Codegenic — AI로 게임을 만드는 회사"
    : "Codegenic — A Game Company Powered by AI";

  const description = isKo
    ? 'AI 네이티브 게임사 Codegenic. 첫 게임 "우주 댕댕 수호대: 디펜스" 2026년 11월 출시 예정.'
    : 'Codegenic is an AI-native indie game studio. Our first game "Cosmic Daeng Guardians: Defense" launches November 2026.';

  const keywords = isKo
    ? ["Codegenic", "AI 게임", "인디 게임", "우주 댕댕 수호대", "모바일 게임"]
    : [
        "Codegenic",
        "AI games",
        "indie game studio",
        "Cosmic Daeng Guardians",
        "mobile game",
      ];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ko: `${SITE_URL}/ko`,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title,
      description,
      siteName: "Codegenic",
      locale: isKo ? "ko_KR" : "en_US",
      alternateLocale: isKo ? "en_US" : "ko_KR",
      type: "website",
      url: `${SITE_URL}/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={spaceGrotesk.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pretendard@latest/dist/web/variable/pretendardvariable.css"
        />
      </head>
      <body className="bg-bg-base text-text-primary antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="pt-[65px]">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
