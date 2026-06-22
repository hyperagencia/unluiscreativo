import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileCta } from "@/components/layout/mobile-cta";
import { Preloader, Reveal, FadeIn } from "@/components/motion/preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luis García — Full Stack Developer · UI/UX Designer · Creative Technologist",
  description:
    "Portfolio de Luis García, Full Stack Developer, UI/UX Designer y Creative Technologist en Santiago, Chile. Desarrollo web, e-commerce y diseño de producto end-to-end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Preloader>
          <FadeIn>
            <Header />
          </FadeIn>
          <Reveal className="flex-1">
            <main className="pb-20 md:pb-0">{children}</main>
            <Footer />
          </Reveal>
          <FadeIn>
            <MobileCta />
          </FadeIn>
        </Preloader>
      </body>
    </html>
  );
}
