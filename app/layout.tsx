import type { Metadata } from "next";
import { Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Valusophy City - 발루소사이어시티",
    template: "%s | Valusophy City",
  },
  description: "철학적 세계관 위의 디지털 도시 - 각자의 삶과 창작을 시각화하는 메타 커뮤니티",
  keywords: ["발루소사이어시티", "Valusophy City", "포트폴리오", "커뮤니티", "창작", "협업"],
  authors: [{ name: "Valusophy City" }],
  creator: "Valusophy City",
  publisher: "Valusophy City",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://valusophy-city.vercel.app'),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://valusophy-city.vercel.app',
    title: "Valusophy City - 발루소사이어시티",
    description: "철학적 세계관 위의 디지털 도시 - 각자의 삶과 창작을 시각화하는 메타 커뮤니티",
    siteName: "Valusophy City",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valusophy City - 발루소사이어시티",
    description: "철학적 세계관 위의 디지털 도시 - 각자의 삶과 창작을 시각화하는 메타 커뮤니티",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${spaceGrotesk.variable} ${cormorant.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
