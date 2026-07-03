import { setRequestLocale } from "next-intl/server"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { CardsGrid } from "@/components/sections/cards-grid"
import { ProjectsSection } from "@/components/sections/projects-section"
import { StatsSection } from "@/components/sections/stats-section"
import { AlgoMasSection } from "@/components/sections/algo-mas-section"
import { CtaSection } from "@/components/sections/cta-section"
import { MusicPlayer } from "@/components/motion/music-player"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <About />
      <CardsGrid />
      <ProjectsSection />
      <StatsSection />
      <AlgoMasSection />
      <CtaSection />
      <MusicPlayer />
    </>
  )
}
