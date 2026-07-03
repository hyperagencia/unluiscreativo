"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

/* ─── Coffee button ──────────────────────────────────── */

interface CoffeeParticle {
  id: number
  x: number
  rotate: number
}

function ContactButton() {
  const t = useTranslations("cta")
  const [particles, setParticles] = React.useState<CoffeeParticle[]>([])
  const counterRef = React.useRef(0)
  const timerRefs = React.useRef<ReturnType<typeof setTimeout>[]>([])

  const spawnParticles = () => {
    const count = 5
    timerRefs.current.forEach(clearTimeout)
    timerRefs.current = []

    Array.from({ length: count }).forEach((_, i) => {
      const t = setTimeout(() => {
        const p: CoffeeParticle = {
          id: counterRef.current++,
          x: Math.random() * 20 - 50,
          rotate: Math.random() * 40 - 20,
        }
        setParticles((prev) => [...prev, p])
        setTimeout(() => {
          setParticles((prev) => prev.filter((pp) => pp.id !== p.id))
        }, 1000)
      }, i * 120)
      timerRefs.current.push(t)
    })
  }

  return (
    <div className="relative inline-block">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="pointer-events-none absolute text-xl"
            style={{ left: "8%", bottom: "calc(100% + 8px)" }}
            initial={{ opacity: 1, y: 0, x: p.x, rotate: p.rotate, scale: 0.5 }}
            animate={{ opacity: 0, y: -64, x: p.x + (Math.random() * 24 - 12), rotate: p.rotate + 25, scale: 1.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            ☕
          </motion.span>
        ))}
      </AnimatePresence>
      <a
        href="mailto:luis@hyperagencia.com"
        onMouseEnter={spawnParticles}
        className="inline-flex items-center rounded-[8px] bg-[#fff414] px-6 py-2 text-xs font-medium text-[#0a0a0a] transition-colors duration-200 hover:bg-[#fff414]/80"
      >
        {t("button")}
      </a>
    </div>
  )
}

/* ─── CTA Section ────────────────────────────────────── */

export function CtaSection() {
  const t = useTranslations("cta")

  return (
    <section data-header-theme="dark" className="bg-[#0a0a0a] px-8 py-32 lg:px-14 lg:py-40">
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="flex flex-col gap-6">
          <p className="text-2xl font-normal leading-snug text-white lg:text-[1.9rem]">
            {t("text")}
          </p>
          <ContactButton />
        </div>
      </div>
    </section>
  )
}
