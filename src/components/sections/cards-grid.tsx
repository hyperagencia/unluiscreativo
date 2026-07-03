"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { useLocale, useTranslations } from "next-intl"
import { stopLenis, startLenis } from "@/components/motion/smooth-scroll"
import { getExperience } from "@/data/experience"

/* ─── Inline SVG icons ───────────────────────────────── */

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

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M0 22.9843V18.3662H4.64954V22.9843H0Z" fill="currentColor"/>
      <path d="M4.58765 18.3965V13.7784H9.23719V18.3965H4.58765Z" fill="currentColor"/>
      <path d="M13.7627 9.22158V4.60352H18.4122V9.22158H13.7627Z" fill="currentColor"/>
      <path d="M9.27295 13.7115V9.09338H13.9225V13.7115H9.27295Z" fill="currentColor"/>
      <path d="M18.3503 4.63382V0.0157471H22.9999V4.63382H18.3503Z" fill="currentColor"/>
      <path d="M0.015625 0H4.63369V4.64954H0.015625V0Z" fill="currentColor"/>
      <path d="M4.60352 4.58777H9.22158V9.23731H4.60352V4.58777Z" fill="currentColor"/>
      <path d="M13.7791 13.7627H18.3971V18.4122H13.7791V13.7627Z" fill="currentColor"/>
      <path d="M18.3662 18.3505H22.9843V23H18.3662V18.3505Z" fill="currentColor"/>
    </svg>
  )
}

/* ─── Drawer content: Stack ──────────────────────────── */

const STACK_GROUPS = [
  { label: "Frontend", items: ["React", "Next.js", "Vite", "JavaScript", "TypeScript", "Tailwind", "HTML / CSS"] },
  { label: "Backend & Infra", items: ["Node.js", "Git / GitHub", "PHP", "Firebase", "REST APIs", "PostgreSQL", "Supabase", "Vercel", "Cloudinary"] },
  { label: "CMS & E-commerce", items: ["WordPress", "Webflow", "Shopify", "Sanity"] },
  { label: "UI/UX & Product", items: ["Figma", "Design Systems", "Wireframing", "Prototyping"] },
  { label: "AI & Workflow", items: ["Claude", "Cursor", "VSCode", "Notion", "Monday"] },
  { label: "Visual & Motion", items: ["Adobe Ai", "Adobe Ps", "Adobe Pr", "Adobe Ae", "Adobe Lr", "Davinci Resolve"] },
]

function StackContent() {
  return (
    <div className="flex flex-col gap-3">
      {STACK_GROUPS.map((group) => (
        <div key={group.label} className="rounded-[14px] bg-[#191919] px-5 py-5">
          <p className="mb-6 text-lg font-normal text-white">{group.label}</p>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span key={item} className="rounded-[6px] bg-white/8 px-2.5 py-1 text-sm text-white/80">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Drawer content: Experiencia ───────────────────── */

function ExperienceContent() {
  const locale = useLocale()
  const experience = getExperience(locale)

  return (
    <div className="flex flex-col gap-4">
      {experience.map((item) => (
        <div
          key={item.company}
          className="flex flex-col justify-between rounded-[20px] p-6"
          style={
            item.current
              ? {
                  background: "linear-gradient(to bottom, #111111 0%, #111111 70%, #2f2f2f 85%, #fff414 110%)",
                  boxShadow: "inset 0 0 20px rgba(255,244,20,0.25)",
                }
              : { background: "#191919" }
          }
        >
          <div>
            <h3 className="text-lg font-semibold leading-snug text-white">{item.role}</h3>
            {item.description && (
              <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
            )}
          </div>
          <div className="mt-5 flex items-end justify-between gap-4">
            <span className="text-sm font-semibold text-white">{item.company}</span>
            <span className="shrink-0 text-xs text-white/50">{item.period}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Drawer content: Sobre mí ───────────────────────── */

function SobreMiContent() {
  const t = useTranslations("drawer_about")

  return (
    <div className="flex flex-col gap-8">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-[12px]">
        <Image
          src="/assets/luis-pp.jpg"
          alt="Luis García"
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
        />
      </div>

      <div>
        <h3 className="mb-4 text-xl font-medium text-white">{t("personal_title")}</h3>
        <div className="space-y-1 text-sm text-white/60">
          <p>{t("dob")}</p>
          <p>luis@hyperagencia.com</p>
          <p>{t("call")} · {t("location")}</p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-medium text-white">{t("studies_title")}</h3>
        <div className="space-y-5">
          <div>
            <p className="text-sm font-medium text-white">{t("degree1_title")}</p>
            <p className="mt-0.5 text-sm text-white/60">{t("degree1_school")}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-white">{t("degree2_title")}</p>
            <p className="mt-0.5 text-sm text-white/60">{t("degree2_school")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Drawer ─────────────────────────────────────────── */

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

function Drawer({ open, onClose, children }: DrawerProps) {
  const t = useTranslations("cards")
  const [mounted, setMounted] = React.useState(false)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const mobilePanelRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => { setMounted(true) }, [])

  React.useEffect(() => {
    if (open) {
      stopLenis()
      const onWheel = (e: WheelEvent) => {
        const desktop = panelRef.current
        const mobile = mobilePanelRef.current
        if (desktop?.contains(e.target as Node)) {
          e.stopPropagation()
          desktop.scrollTop += e.deltaY
        } else if (mobile?.contains(e.target as Node)) {
          e.stopPropagation()
          mobile.scrollTop += e.deltaY
        }
      }
      window.addEventListener("wheel", onWheel, { capture: true, passive: false })
      return () => {
        window.removeEventListener("wheel", onWheel, { capture: true })
        startLenis()
      }
    } else {
      startLenis()
    }
  }, [open])

  const content = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[99] bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-[4%] right-[4%] bottom-[4%] z-[100] hidden w-[40%] gap-3 md:flex h-[92vh]"
            initial={{ x: "110%" }}
            animate={{ x: 0 }}
            exit={{ x: "110%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              className="group self-start mt-1 shrink-0 rounded-[15px] bg-[#fff414] p-2.5 text-[#0a0a0a] transition-colors duration-150 hover:bg-[#0a0a0a] hover:text-[#fff414]"
              aria-label={t("close")}
            >
              <CloseIcon className="size-5" />
            </button>
            <div ref={panelRef} className="flex-1 min-h-0 overflow-y-scroll rounded-[25px] bg-[#2f2f2f] p-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20">
              {children}
            </div>
          </motion.div>

          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-[#2f2f2f] md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex shrink-0 justify-end p-6 pb-0">
              <button
                onClick={onClose}
                className="group rounded-[15px] bg-[#fff414] p-2.5 text-[#0a0a0a] transition-colors duration-150 hover:bg-[#0a0a0a] hover:text-[#fff414]"
                aria-label={t("close")}
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
            <div ref={mobilePanelRef} className="flex-1 overflow-y-auto p-6 pt-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  if (!mounted) return null
  return createPortal(content, document.body)
}

/* ─── Card ───────────────────────────────────────────── */

interface CardItemProps {
  title: string
  description: string
  onClick: () => void
}

function CardItem({ title, description, onClick }: CardItemProps) {
  return (
    <button
      onClick={onClick}
      className="group cursor-pointer flex min-h-[260px] w-full flex-col justify-between rounded-[20px] bg-[#2f2f2f] p-[5%] text-left transition-colors duration-200 hover:bg-[#fff414]"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-3xl font-normal text-white transition-colors duration-200 group-hover:text-[#0a0a0a]">
          {title}
        </h3>
        <ArrowIcon className="size-8 shrink-0 text-[#fff414] transition-colors duration-200 group-hover:text-[#0a0a0a]" />
      </div>
      <p className="max-w-[300px] text-lg text-white/70 transition-colors duration-200 group-hover:text-[#0a0a0a]/70">
        {description}
      </p>
    </button>
  )
}

/* ─── CardsGrid ──────────────────────────────────────── */

export function CardsGrid() {
  const t = useTranslations("cards")
  const [open, setOpen] = React.useState<"sobre-mi" | "stack" | "experiencia" | null>(null)

  return (
    <section id="cards" className="px-4 py-6 lg:px-6">
      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-4 md:grid-cols-3">
        <CardItem
          title={t("about_title")}
          description={t("about_desc")}
          onClick={() => setOpen("sobre-mi")}
        />
        <CardItem
          title={t("stack_title")}
          description={t("stack_desc")}
          onClick={() => setOpen("stack")}
        />
        <CardItem
          title={t("experience_title")}
          description={t("experience_desc")}
          onClick={() => setOpen("experiencia")}
        />
      </div>

      <Drawer open={open === "sobre-mi"} onClose={() => setOpen(null)}>
        <SobreMiContent />
      </Drawer>
      <Drawer open={open === "stack"} onClose={() => setOpen(null)}>
        <StackContent />
      </Drawer>
      <Drawer open={open === "experiencia"} onClose={() => setOpen(null)}>
        <ExperienceContent />
      </Drawer>
    </section>
  )
}
