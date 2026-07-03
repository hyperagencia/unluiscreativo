"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useLocale, useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { scrollToAnchor } from "@/components/motion/smooth-scroll"
import { usePathname, useRouter } from "@/i18n/navigation"

/* ─── Language switcher ──────────────────────────────── */

function LanguageSwitcher({ surface }: { surface: "dark" | "light" }) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next })
  }

  const activeClass = surface === "light"
    ? "text-[#0a0a0a] font-medium"
    : "text-white font-medium"
  const inactiveClass = surface === "light"
    ? "text-[#0a0a0a]/40 hover:text-[#0a0a0a]"
    : "text-white/40 hover:text-white"
  const separatorClass = surface === "light"
    ? "text-[#0a0a0a]/20"
    : "text-white/20"

  return (
    <div className="flex items-center gap-1 text-xs">
      <button
        onClick={() => switchLocale("es")}
        className={cn("transition-colors duration-150 cursor-pointer", locale === "es" ? activeClass : inactiveClass)}
      >
        ES
      </button>
      <span className={separatorClass}>/</span>
      <button
        onClick={() => switchLocale("en")}
        className={cn("transition-colors duration-150 cursor-pointer", locale === "en" ? activeClass : inactiveClass)}
      >
        EN
      </button>
    </div>
  )
}

/* ─── Icons ──────────────────────────────────────────── */

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="4" height="4" rx="1" fill="currentColor"/>
      <rect x="6" y="0" width="4" height="4" rx="1" fill="currentColor"/>
      <rect x="12" y="0" width="4" height="4" rx="1" fill="currentColor"/>
      <rect x="0" y="6" width="4" height="4" rx="1" fill="currentColor"/>
      <rect x="6" y="6" width="4" height="4" rx="1" fill="currentColor"/>
      <rect x="12" y="6" width="4" height="4" rx="1" fill="currentColor"/>
      <rect x="0" y="12" width="4" height="4" rx="1" fill="currentColor"/>
      <rect x="6" y="12" width="4" height="4" rx="1" fill="currentColor"/>
      <rect x="12" y="12" width="4" height="4" rx="1" fill="currentColor"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

/* ─── Header ─────────────────────────────────────────── */

type Surface = "dark" | "light"

function Header() {
  const t = useTranslations("nav")
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const [open, setOpen] = React.useState(false)
  const [surface, setSurface] = React.useState<Surface>("dark")

  const navLinks = [
    { href: "#", label: t("home") },
    { href: "#sobre-mi", label: t("about") },
    { href: "#cards", label: t("stack") },
    { href: "#cards", label: t("experience") },
    { href: "#proyectos", label: t("projects") },
    { href: "#algo-mas", label: t("algomas") },
  ]

  React.useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-header-theme]")
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute("data-header-theme") as Surface
            setSurface(theme)
          }
        })
      },
      { rootMargin: "-64px 0px -97% 0px", threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    window.dispatchEvent(new CustomEvent("mobilemenu", { detail: { open } }))
    return () => { document.body.style.overflow = "" }
  }, [open])

  const isLight = surface === "light"

  const handleNav = (href: string) => {
    setOpen(false)
    setTimeout(() => scrollToAnchor(href), 300)
  }

  const switchLocale = (next: string) => {
    setOpen(false)
    router.replace(pathname, { locale: next })
  }

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50">
        {/* Desktop */}
        <div className="mx-auto hidden h-8 w-full max-w-[1920px] items-stretch gap-2 px-4 md:flex lg:px-6">
          <button
            onClick={() => scrollToAnchor("#")}
            className="flex shrink-0 items-center rounded-[8px] bg-[#fff414] px-4 cursor-pointer"
          >
            <Image
              src="/assets/logo-luis-garcia-large.svg"
              alt="Luis García"
              width={100}
              height={12}
              className="h-3 w-auto"
            />
          </button>

          <nav className="flex flex-1 items-stretch gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToAnchor(link.href)}
                className={cn(
                  "flex flex-1 items-center justify-left px-6 rounded-[8px] text-xs backdrop-blur-md transition-colors duration-200 cursor-pointer",
                  isLight
                    ? "bg-black/10 text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white"
                    : "bg-[#383A39]/70 text-white hover:bg-[#EFEFEF] hover:text-[#0a0a0a]"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <a
            href="mailto:luis@hyperagencia.com"
            className={cn(
              "flex shrink-0 items-center rounded-[8px] px-6 text-xs font-medium transition-colors duration-200",
              isLight
                ? "bg-[#0a0a0a] text-[#fff414] hover:bg-[#0a0a0a]/85"
                : "bg-[#fff414] text-[#0a0a0a] hover:bg-[#fff414]/90"
            )}
          >
            {t("contact")}
          </a>

          {/* Language switcher desktop */}
          <div className={cn(
            "flex shrink-0 items-center rounded-[8px] px-3 backdrop-blur-md",
            isLight ? "bg-black/10" : "bg-[#383A39]/70"
          )}>
            <LanguageSwitcher surface={surface} />
          </div>
        </div>

        {/* Mobile bar */}
        <div className="mx-4 flex h-14 items-center justify-between rounded-[16px] bg-[#fff414] px-4 md:hidden">
          <button onClick={() => handleNav("#")} className="flex items-center cursor-pointer">
            <Image
              src="/assets/logo-luis-garcia-large.svg"
              alt="Luis García"
              width={100}
              height={12}
              className="h-3 w-auto"
            />
          </button>
          <button
            type="button"
            aria-label={open ? t("close_menu") : t("open_menu")}
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#0a0a0a] text-[#fff414] transition-colors duration-200 cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  <CloseIcon />
                </motion.span>
              ) : (
                <motion.span
                  key="grid"
                  initial={{ opacity: 0, rotate: 45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.2 }}
                >
                  <GridIcon />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-[#0a0a0a] md:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Nav items */}
            <div className="flex flex-1 flex-col justify-center gap-2 px-4 pt-28 pb-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex w-full items-center justify-between rounded-[14px] bg-[#191919] px-5 py-5 text-left text-xl font-normal text-white transition-colors duration-150 active:bg-[#fff414] active:text-[#0a0a0a] cursor-pointer"
                >
                  <span>{link.label}</span>
                  <span className="text-white/20 text-sm">↗</span>
                </motion.button>
              ))}

              {/* Language switcher mobile */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-2"
              >
                {["es", "en"].map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={cn(
                      "flex-1 rounded-[14px] py-4 text-center text-base font-normal transition-colors duration-150 cursor-pointer",
                      locale === loc
                        ? "bg-[#fff414] text-[#0a0a0a]"
                        : "bg-[#191919] text-white/50"
                    )}
                  >
                    {loc.toUpperCase()}
                  </button>
                ))}
              </motion.div>
            </div>

            {/* CTA fijo abajo */}
            <motion.div
              className="px-4 pb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href="mailto:luis@hyperagencia.com"
                onClick={() => setOpen(false)}
                className="block w-full rounded-[14px] bg-[#fff414] py-5 text-center text-base font-medium text-[#0a0a0a]"
              >
                {t("contact")}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export { Header }
