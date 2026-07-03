"use client"

import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { MotionFadeUp } from "@/components/motion/fade-up"
import { getProjects } from "@/data/projects"

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M19.6 19.6001H29.4V29.4001H19.6V19.6001Z" fill="currentColor"/>
      <path d="M9.79999 19.6001H19.6V29.4001H9.79999V19.6001Z" fill="currentColor"/>
      <path d="M0 19.6001H9.8V29.4001H0V19.6001Z" fill="currentColor"/>
      <path d="M29.4 19.6001H39.2V29.4001H29.4V19.6001Z" fill="currentColor"/>
      <path d="M39.2 19.6001H49V29.4001H39.2V19.6001Z" fill="currentColor"/>
      <path d="M29.4 29.3999H39.2V39.1999H29.4V29.3999Z" fill="currentColor"/>
      <path d="M19.6 39.2H29.4V49H19.6V39.2Z" fill="currentColor"/>
      <path d="M29.4 9.80005H39.2V19.6H29.4V9.80005Z" fill="currentColor"/>
      <path d="M19.6 0H29.4V9.8H19.6V0Z" fill="currentColor"/>
    </svg>
  )
}

type Project = ReturnType<typeof getProjects>[number]

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex cursor-pointer items-stretch gap-3 rounded-[20px] bg-[#2f2f2f] p-2 transition-colors duration-200 hover:bg-[#fff414] md:w-[380px] md:shrink-0"
    >
      <div className="relative aspect-square w-[150px] shrink-0 overflow-hidden rounded-[14px] bg-white/8">
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="150px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col justify-between py-1 pr-1">
        <div>
          <h3 className="text-lg font-normal leading-snug text-white transition-colors duration-200 group-hover:text-[#0a0a0a]">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm leading-snug text-white/70 transition-colors duration-200 group-hover:text-[#0a0a0a]/70">
            {project.description}
          </p>
          <p className="mt-3 text-xs leading-snug text-white/70 transition-colors duration-200 group-hover:text-[#0a0a0a]/70">
            {project.stack}
          </p>
        </div>

        <div className="flex justify-end">
          <span className="rounded-[10px] bg-[#fff414] p-2 text-[#0a0a0a] transition-colors duration-200 group-hover:bg-[#0a0a0a] group-hover:text-[#fff414]">
            <ArrowIcon className="size-4" />
          </span>
        </div>
      </div>
    </a>
  )
}

export function ProjectsSection() {
  const t = useTranslations("projects")
  const locale = useLocale()
  const projects = getProjects(locale)

  return (
    <section id="proyectos" data-header-theme="dark" className="px-6 py-16 lg:px-6 lg:py-24">
      <div className="mx-auto w-full max-w-[1920px]">
        <MotionFadeUp>
          <h2 className="mb-8 text-4xl font-normal tracking-tight lg:text-5xl">
            {t("section_title")}
          </h2>
        </MotionFadeUp>

        {/* Desktop: carrusel horizontal */}
        <MotionFadeUp delay={0.06} className="hidden md:block">
          <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </MotionFadeUp>

        {/* Mobile: apiladas */}
        <div className="flex flex-col gap-3 md:hidden">
          {projects.map((project, i) => (
            <MotionFadeUp key={project.slug} delay={i * 0.06}>
              <ProjectCard project={project} />
            </MotionFadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
