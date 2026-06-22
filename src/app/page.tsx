import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { SectionTitle } from "@/components/ui/section-title"
import { StatCard } from "@/components/ui/stat-card"
import { MotionFadeUp } from "@/components/motion/fade-up"
import { profile } from "@/data/profile"
import { experience } from "@/data/experience"
import { stats } from "@/data/stats"
import { projects } from "@/data/projects"

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        data-header-theme="dark"
        className="relative overflow-hidden px-6 pt-44 pb-28 lg:px-10 lg:pt-56 lg:pb-36"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-20%] right-[-10%] h-136 w-136 rounded-full bg-[#fff414]/8 blur-[160px]" />
          <div className="absolute top-[30%] left-[-15%] h-112 w-md rounded-full bg-white/5 blur-[160px]" />
        </div>

        <div className="mx-auto w-full max-w-[1920px]">
          <MotionFadeUp>
            <p className="mb-8 text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
              {profile.location}
            </p>
            <h1 className="max-w-6xl text-6xl leading-[1.02] font-medium tracking-tight sm:text-8xl lg:text-9xl">
              {profile.name}.
            </h1>
            <p className="mt-4 max-w-3xl text-2xl leading-[1.2] font-normal text-muted-text sm:text-3xl lg:text-4xl">
              {profile.headline}
            </p>
            <p className="mt-10 max-w-2xl text-base leading-[1.6] text-muted-text">
              {profile.summary}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-[#fff414] px-6 py-3 text-sm font-medium text-[#0a0a0a] transition-colors hover:bg-[#fff414]/90"
              >
                Contáctame
              </Link>
              <Link
                href="/work"
                className="rounded-full border border-card-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/5"
              >
                Ver proyectos
              </Link>
            </div>
          </MotionFadeUp>
        </div>
      </section>

      {/* Yellow statement */}
      <section data-header-theme="light" className="bg-[#fff414] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-[1920px]">
          <MotionFadeUp>
            <p className="max-w-5xl text-3xl leading-tight font-normal text-[#0a0a0a] sm:text-5xl lg:text-6xl">
              Construyo productos digitales completos: arquitectura, código y la
              identidad visual que los sostiene. Una sola figura donde
              normalmente trabajan dos equipos.
            </p>
          </MotionFadeUp>
        </div>
      </section>

      {/* Experience */}
      <section data-header-theme="dark" className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <MotionFadeUp>
            <p className="mb-4 text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
              Experiencia
            </p>
            <SectionTitle as="h2">
              Una sola figura, dos disciplinas.
            </SectionTitle>
            <p className="mt-6 max-w-md text-base leading-[1.6] text-muted-text">
              8+ años liderando desarrollo y diseño para marcas en hotelería,
              retail, telecomunicaciones, minería y entretenimiento.
            </p>
          </MotionFadeUp>

          <div className="flex flex-col gap-3">
            {experience.map((item, i) => (
              <MotionFadeUp key={item.company} delay={i * 0.05}>
                <div className="group flex flex-col gap-1 rounded-[20px] border border-card-border bg-card px-6 py-5 transition-colors duration-300 hover:border-transparent hover:bg-[#fff414] sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-base font-medium text-foreground group-hover:text-[#0a0a0a]">
                      {item.role}
                    </p>
                    <p className="text-sm text-muted-text group-hover:text-[#0a0a0a]/70">
                      {item.company}
                    </p>
                  </div>
                  <p className="mt-2 text-[11px] tracking-[0.15em] text-muted-foreground uppercase group-hover:text-[#0a0a0a]/60 sm:mt-0">
                    {item.period}
                  </p>
                </div>
              </MotionFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section data-header-theme="dark" className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-4 sm:grid-cols-2">
          {stats.map((stat, i) => (
            <MotionFadeUp key={stat.label} delay={i * 0.08}>
              <StatCard value={stat.value} label={stat.label} className="min-h-64" />
            </MotionFadeUp>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section data-header-theme="dark" className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-[1920px]">
          <MotionFadeUp>
            <p className="mb-4 text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
              Portfolio
            </p>
            <SectionTitle>Proyectos seleccionados</SectionTitle>
          </MotionFadeUp>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <MotionFadeUp key={project.slug} delay={i * 0.08}>
                <Card className="h-full p-6">
                  <h3 className="text-lg font-medium">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted-text">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="accent">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </MotionFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        data-header-theme="light"
        className="relative overflow-hidden bg-[#fff414] px-6 pt-24 pb-12 lg:px-10 lg:pt-32"
      >
        <div className="mx-auto w-full max-w-[1920px]">
          <MotionFadeUp>
            <p className="max-w-3xl text-4xl leading-[1.15] font-normal text-[#0a0a0a] sm:text-5xl lg:text-6xl">
              ¿Tienes un proyecto en mente? Hablemos.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-medium text-[#fff414] transition-colors hover:bg-[#0a0a0a]/85"
            >
              Contáctame
            </Link>
          </MotionFadeUp>

          <div
            aria-hidden
            className="mt-20 -mb-8 text-[28vw] leading-none font-medium tracking-tighter text-[#0a0a0a] sm:-mb-12 lg:text-[20rem]"
          >
            LG
          </div>
        </div>
      </section>
    </>
  )
}
