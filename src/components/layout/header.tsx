"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Sobre mí" },
  { href: "/work", label: "Proyectos" },
  { href: "/contact", label: "Contacto" },
]

type Surface = "dark" | "light"

function Header() {
  const pathname = usePathname()
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
    <header
      data-surface={surface}
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    >
      <div className="mx-auto flex h-20 w-full max-w-[1920px] items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className={cn(
            "text-lg font-medium tracking-tight transition-colors duration-300",
            isLight ? "text-[#0a0a0a]" : "text-foreground"
          )}
        >
          LG
        </Link>

        <nav className="hidden items-center gap-1 rounded-full p-1 backdrop-blur-xl transition-colors duration-300 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors duration-300",
                isLight
                  ? pathname === link.href
                    ? "bg-[#0a0a0a]/10 text-[#0a0a0a]"
                    : "text-[#0a0a0a]/60 hover:bg-[#0a0a0a]/10 hover:text-[#0a0a0a]"
                  : pathname === link.href
                    ? "bg-white/10 text-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className={cn(
            "hidden rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 md:inline-flex",
            isLight
              ? "bg-[#0a0a0a] text-[#fff414]"
              : "bg-[#fff414] text-[#0a0a0a] hover:bg-[#fff414]/90"
          )}
        >
          Contáctame
        </Link>

        <button
          type="button"
          className={cn(
            "transition-colors duration-300 md:hidden",
            isLight ? "text-[#0a0a0a]" : "text-foreground"
          )}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-6 flex flex-col gap-2 rounded-3xl border border-white/6 bg-[#0a0a0a]/95 p-4 backdrop-blur-xl md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-2xl border border-card-border bg-card px-4 py-3 text-sm",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-[#fff414] px-5 py-3 text-center text-sm font-medium text-[#0a0a0a]"
          >
            Contáctame
          </Link>
        </div>
      )}
    </header>
  )
}

export { Header }
