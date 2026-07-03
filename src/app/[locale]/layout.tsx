import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Preloader, Reveal, FadeIn } from "@/components/motion/preloader"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { routing } from "@/i18n/routing"

const SITE_URL = "https://luis.hyperagencia.com"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta" })
  const ogLocale = locale === "es" ? "es_CL" : "en_US"

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: SITE_URL,
      siteName: "Luis García",
      images: [
        {
          url: `${SITE_URL}/assets/luis-foto.webp`,
          width: 1200,
          height: 630,
          alt: "Luis García",
        },
      ],
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${SITE_URL}/assets/luis-foto.webp`],
    },
    metadataBase: new globalThis.URL(SITE_URL),
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages()
  const tPreloader = await getTranslations({ locale, namespace: "preloader" })

  return (
    <NextIntlClientProvider messages={messages}>
      <Analytics />
      <SmoothScroll>
        <Preloader phrase={tPreloader("phrase")}>
          <FadeIn>
            <Header />
          </FadeIn>
          <Reveal className="flex-1">
            <main className="pb-20 md:pb-0">{children}</main>
            <Footer />
          </Reveal>
        </Preloader>
      </SmoothScroll>
    </NextIntlClientProvider>
  )
}
