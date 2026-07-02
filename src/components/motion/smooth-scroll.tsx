"use client"

import * as React from "react"
import Lenis from "lenis"

// Module-level instance so any component can stop/start it
let lenisInstance: Lenis | null = null

export function stopLenis() {
  lenisInstance?.stop()
}

export function startLenis() {
  lenisInstance?.start()
}

export function scrollToAnchor(href: string) {
  if (href === "#" || href === "") {
    lenisInstance?.scrollTo(0, { duration: 1.4 })
    return
  }
  const target = document.querySelector(href)
  if (target) {
    lenisInstance?.scrollTo(target as HTMLElement, { duration: 1.4, offset: -72 })
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisInstance = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return <>{children}</>
}
