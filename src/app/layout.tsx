import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Preloader, Reveal, FadeIn } from "@/components/motion/preloader";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Luis García — Product Engineer · Full Stack Developer"
const DESCRIPTION =
  "Portfolio de Luis García, Product Engineer y Full Stack Developer en Santiago, Chile. Desarrollo web, e-commerce y diseño de producto end-to-end."
const URL = "https://unluiscreativo.com"

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Luis García",
    images: [{ url: `${URL}/assets/luis-foto.webp`, width: 1200, height: 630, alt: "Luis García" }],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${URL}/assets/luis-foto.webp`],
  },
  metadataBase: new globalThis.URL(URL),
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
      <Analytics />
      <body className="flex min-h-full flex-col">
        <SmoothScroll>
          <Preloader>
            <FadeIn>
              <Header />
            </FadeIn>
            <Reveal className="flex-1">
              <main className="pb-20 md:pb-0">{children}</main>
              <Footer />
            </Reveal>
          </Preloader>
        </SmoothScroll>
      </body>
    </html>
  );
}
