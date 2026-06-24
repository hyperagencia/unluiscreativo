"use client"

import * as React from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#stack", label: "Stack" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#algo-mas", label: "Algo más" },
]

type Surface = "dark" | "light"

function Header() {
  const [open, setOpen] = React.useState(false)
  const [surface, setSurface] = React.useState<Surface>("dark")

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

  const isLight = surface === "light"

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      {/* Desktop */}
      <div className="mx-auto hidden h-8 w-full max-w-[1920px] items-stretch gap-2 px-4 md:flex lg:px-6">
        {/* Logo */}
        <a
          href="#"
          className="flex shrink-0 items-center rounded-[8px] bg-[#fff414] px-4"
        >
          <Image
            src="/assets/logo-luis-garcia-large.svg"
            alt="Luis García"
            width={100}
            height={12}
            className="h-3 w-auto"
          />
        </a>

        {/* Nav — flex-1 so all items together fill remaining space */}
        <nav className="flex flex-1 items-stretch gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-1 items-center justify-left px-6 rounded-[8px] text-xs backdrop-blur-md transition-colors duration-200",
                isLight
                  ? "bg-black/10 text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white"
                  : "bg-[#383A39]/70 text-white hover:bg-[#EFEFEF] hover:text-[#0a0a0a]"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contacto"
          className={cn(
            "flex shrink-0 items-center rounded-[8px] px-6 text-xs font-medium transition-colors duration-200",
            isLight
              ? "bg-[#0a0a0a] text-[#fff414] hover:bg-[#0a0a0a]/85"
              : "bg-[#fff414] text-[#0a0a0a] hover:bg-[#fff414]/90"
          )}
        >
          Contacto
        </a>
      </div>

      {/* Mobile */}
      <div className="mx-auto flex h-14 w-full max-w-[1920px] items-center justify-between px-4 md:hidden">
        <a href="#" className="flex items-center rounded-[12px] bg-[#fff414] px-3 py-2">
          <Image
            src="/assets/logo-luis-garcia-large.svg"
            alt="Luis García"
            width={100}
            height={12}
            className="h-3 w-auto"
          />
        </a>
        <button
          type="button"
          className={cn("transition-colors duration-200", isLight ? "text-[#0a0a0a]" : "text-white")}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mx-4 flex flex-col gap-2 rounded-2xl border border-white/6 bg-[#0a0a0a]/95 p-3 backdrop-blur-xl md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-[10px] bg-[#383A39]/70 px-4 py-3 text-sm text-white backdrop-blur-md"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-[10px] bg-[#fff414] px-4 py-3 text-center text-sm font-medium text-[#0a0a0a]"
          >
            Contacto
          </a>
        </div>
      )}
    </header>
  )
}

export { Header }
