"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { createPortal } from "react-dom"
import { useTranslations } from "next-intl"

/* ─── Stacked photos ─────────────────────────────────── */

function StackedPhotos({ images }: { images: string[] }) {
  const rotations = [-8, 5, 0]
  const offsets = [{ x: -16, y: 6 }, { x: 12, y: -6 }, { x: 0, y: 0 }]

  return (
    <div className="relative h-[120px] w-[170px]">
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 overflow-hidden rounded-[8px] shadow-xl"
          style={{
            transform: `rotate(${rotations[i]}deg) translate(${offsets[i].x}px, ${offsets[i].y}px)`,
            zIndex: i + 1,
          }}
        >
          <Image src={src} alt="Fotografía" fill sizes="170px" className="object-cover" />
        </div>
      ))}
    </div>
  )
}

/* ─── Hover word ─────────────────────────────────────── */

interface HoverCardData {
  caption: string
  type: "image" | "video" | "stack"
  src?: string
  stackImages?: string[]
  href?: string
}

interface HoverWordProps {
  children: React.ReactNode
  card: HoverCardData
}

function HoverWord({ children, card }: HoverWordProps) {
  const [visible, setVisible] = React.useState(false)
  const [pos, setPos] = React.useState({ x: 0, y: 0 })
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => { setMounted(true) }, [])

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
          <div
            className="overflow-hidden rounded-[10px] bg-[#1a1a1a] p-3 shadow-2xl"
            style={{ width: card.type === "stack" ? "210px" : "180px" }}
          >
            {card.type === "stack" && card.stackImages && (
              <div className="flex items-center justify-center py-3">
                <StackedPhotos images={card.stackImages} />
              </div>
            )}
            {card.type === "video" && card.src && (
              <div className="relative h-[100px] w-full overflow-hidden rounded-[6px]">
                <video
                  src={card.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            )}
            {card.type === "image" && (
              <div className="relative h-[100px] w-full overflow-hidden rounded-[6px] bg-white/5">
                {card.src && (
                  <Image
                    src={card.src}
                    alt={card.caption}
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                )}
              </div>
            )}
            <p className="mt-2 text-[11px] leading-snug text-white/50">{card.caption}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  const spanClass =
    "underline decoration-dotted underline-offset-4 transition-colors duration-150 decoration-white/20 hover:text-[#fff414] hover:decoration-[#fff414]"

  const inner = (
    <span
      className={card.href ? undefined : spanClass}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMove}
    >
      {children}
    </span>
  )

  return (
    <>
      {card.href ? (
        <a
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${spanClass} cursor-pointer`}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          onMouseMove={handleMove}
        >
          {children}
        </a>
      ) : (
        inner
      )}
      {mounted && createPortal(floatingCard, document.body)}
    </>
  )
}

/* ─── Section ────────────────────────────────────────── */

export function AlgoMasSection() {
  const t = useTranslations("algomas")
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const radius = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 24, 24, 0])
  const marginInline = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 20, 20, 0])

  return (
    <div ref={ref} id="algo-mas">
      <motion.section
        data-header-theme="dark"
        className="bg-[#2f2f2f] px-8 py-32 lg:px-14 lg:py-48"
        style={{ borderRadius: radius, marginInline }}
      >
        <div className="mx-auto w-full max-w-[1920px]">
          <div className="w-full md:w-[70%] space-y-22 text-2xl font-normal leading-snug text-white lg:text-[1.9rem]">
            <p>
              {t.rich("p", {
                run: (chunks) => (
                  <HoverWord
                    card={{
                      caption: t("run_caption"),
                      type: "image",
                      href: "https://www.strava.com/athletes/97030991",
                      src: "/assets/luis-pp.jpg",
                    }}
                  >
                    {chunks}
                  </HoverWord>
                ),
                music: (chunks) => (
                  <HoverWord
                    card={{
                      caption: t("music_caption"),
                      type: "image",
                      src: "/assets/luis-pp3.jpg",
                    }}
                  >
                    {chunks}
                  </HoverWord>
                ),
                photo: (chunks) => (
                  <HoverWord
                    card={{
                      caption: t("photo_caption"),
                      type: "stack",
                      href: "https://www.pexels.com/es-es/@aluislens/",
                      stackImages: [
                        "/assets/fotos/p1.jpg",
                        "/assets/fotos/p2.jpg",
                        "/assets/fotos/p3.jpg",
                      ],
                    }}
                  >
                    {chunks}
                  </HoverWord>
                ),
                film: (chunks) => (
                  <HoverWord
                    card={{
                      caption: t("film_caption"),
                      type: "video",
                      src: "/assets/film-luis.webm",
                    }}
                  >
                    {chunks}
                  </HoverWord>
                ),
              })}
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
