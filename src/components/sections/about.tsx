"use client"

import * as React from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { createPortal } from "react-dom"

/* ─── Hover card ─────────────────────────────────────── */

interface HoverCardData {
  caption: string
  bg?: string
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
              className="flex h-[100px] w-full items-center justify-center overflow-hidden rounded-[6px]"
              style={{ background: card.bg ?? "rgba(255,255,255,0.08)" }}
            >
              <span className="text-[10px] text-white/30 uppercase tracking-widest">imagen</span>
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
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const radius = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 24, 24, 0])
  const marginInline = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 20, 20, 0])

  return (
    <div ref={ref}>
      <motion.section
        data-header-theme="light"
        className="bg-[#fff414] px-8 py-32 lg:px-14 lg:py-48"
        style={{ borderRadius: radius, marginInline }}
      >
        <div className="mx-auto w-full max-w-[1920px]">
        <div className="w-full md:w-[70%] space-y-8 text-2xl font-normal leading-snug text-[#1a1a0a] lg:text-[1.9rem]">
          <p>
            Soy desarrollador Full Stack con más de 8 años construyendo{" "}
            <HoverWord card={{ caption: "Productos que van de la arquitectura hasta la interfaz", bg: "rgba(26,26,10,0.12)" }}>
              productos digitales
            </HoverWord>
            , con un background profundo en{" "}
            <HoverWord card={{ caption: "UI, UX y dirección creativa", bg: "rgba(26,26,10,0.12)" }}>
              diseño
            </HoverWord>
            .
          </p>

          <p>
            He liderado proyectos para marcas en hotelería, retail, telecomunicaciones, minería y
            entretenimiento. Soy fundador de{" "}
            <HoverWord card={{ caption: "Hyper™ — Branding & Digital Agency", bg: "#fff414" }}>
              Hyper™
            </HoverWord>
            , donde opero como desarrollador y product owner.
          </p>

          <p>
            Lo que más me define es que en mis proyectos todo converge: marcas que funcionan,
            interfaces que se sienten bien y tecnologías que sostienen todo eso.
          </p>
        </div>
        </div>
      </motion.section>
    </div>
  )
}
