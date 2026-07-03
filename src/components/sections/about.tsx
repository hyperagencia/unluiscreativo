"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { createPortal } from "react-dom"
import { useTranslations } from "next-intl"

/* ─── Hover card ─────────────────────────────────────── */

interface HoverCardData {
  caption: string
  bg?: string
  image?: string
}

interface HoverWordProps {
  children: React.ReactNode
  card: HoverCardData
}

function HoverWord({ children, card }: HoverWordProps) {
  const [visible, setVisible] = React.useState(false)
  const [pos, setPos] = React.useState({ x: 0, y: 0 })
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleMove = (e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY })
  }

  const floatingCard = (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed z-[200]"
          style={{ left: pos.x + 18, top: pos.y + 18 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <div className="w-[180px] overflow-hidden rounded-[10px] bg-[#1a1a1a] p-3 shadow-2xl">
            <div
              className="relative h-[100px] w-full overflow-hidden rounded-[6px]"
              style={{ background: card.bg ?? "rgba(255,255,255,0.08)" }}
            >
              {card.image ? (
                <Image
                  src={card.image}
                  alt={card.caption}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              ) : null}
            </div>
            <p className="mt-2 text-[11px] leading-snug text-white/50">{card.caption}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <span
        className="cursor-default underline decoration-[#1a1a0a]/30 decoration-dotted underline-offset-4 transition-colors duration-150 hover:decoration-[#1a1a0a]"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onMouseMove={handleMove}
      >
        {children}
      </span>
      {mounted && createPortal(floatingCard, document.body)}
    </>
  )
}

/* ─── About section ──────────────────────────────────── */

export function About() {
  const t = useTranslations("about")
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const radius = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 24, 24, 0])
  const marginInline = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 20, 20, 0])

  return (
    <div ref={ref}>
      <motion.section
        data-header-theme="light"
        id="sobre-mi"
        className="bg-[#fff414] px-8 py-32 lg:px-14 lg:py-48"
        style={{ borderRadius: radius, marginInline }}
      >
        <div className="mx-auto w-full max-w-[1920px]">
          <div className="w-full md:w-[70%] space-y-8 text-2xl font-normal leading-snug text-[#1a1a0a] lg:text-[1.9rem]">
            <p>
              {t.rich("p1", {
                products: (chunks) => (
                  <HoverWord
                    card={{
                      caption: t("p1_products_caption"),
                      bg: "rgba(26,26,10,0.12)",
                      image: "/assets/projects/art-stgo-cover.jpg",
                    }}
                  >
                    {chunks}
                  </HoverWord>
                ),
                design: (chunks) => (
                  <HoverWord
                    card={{
                      caption: t("p1_design_caption"),
                      bg: "rgba(26,26,10,0.12)",
                      image: "/assets/projects/general-focus.jpg",
                    }}
                  >
                    {chunks}
                  </HoverWord>
                ),
              })}
            </p>

            <p>
              {t.rich("p2", {
                hyper: (chunks) => (
                  <HoverWord
                    card={{
                      caption: t("p2_hyper_caption"),
                      bg: "#fff414",
                      image: "/assets/hyper.jpg",
                    }}
                  >
                    {chunks}
                  </HoverWord>
                ),
              })}
            </p>

            <p>{t("p3")}</p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
