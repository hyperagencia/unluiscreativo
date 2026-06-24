"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { SkipBack, Play, SkipForward } from "lucide-react"
import { usePreloaderDone } from "@/components/motion/preloader"

const TITLE_LINES = ["Hola, Soy Luis García.", "Product Engineer · Full Stack", "Developer"]

function MusicPlayerStub() {
  return (
    <div className="flex items-center gap-3 rounded-[10px] bg-white/8 px-4 py-3 backdrop-blur-md">
      <div className="h-12 w-12 shrink-0 rounded-[10px] bg-[#fff414]" />
      <div>
        <p className="text-sm leading-snug text-white">Ver este CV con algo de música</p>
        <div className="mt-2 flex items-center gap-4 text-white/60">
          <SkipBack className="size-4" />
          <Play className="size-4" />
          <SkipForward className="size-4" />
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const ready = usePreloaderDone()

  return (
    <section
      data-header-theme="dark"
      className="relative min-h-screen overflow-hidden"
    >
      <div className="mx-auto grid min-h-screen w-full max-w-[1920px] grid-cols-1 md:grid-cols-2">
        {/* Left column */}
        <div className="relative z-10 flex flex-col px-6 pb-10 pt-20 lg:px-12 lg:pt-24">
          {/* Title — vertically centered */}
          <div className="flex flex-1 items-center">
            <h1 className="text-3xl font-normal leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
              {TITLE_LINES.map((line, lineIdx) => (
                <span key={lineIdx} className="block">
                  {line.split(" ").map((word, wordIdx) => {
                    const delay = lineIdx * 0.15 + wordIdx * 0.08
                    return (
                      <React.Fragment key={wordIdx}>
                        <motion.span
                          className="inline-block"
                          initial={{ opacity: 0, filter: "blur(14px)" }}
                          animate={ready ? { opacity: 1, filter: "blur(0px)" } : {}}
                          transition={{ duration: 0.7, delay, ease: "easeOut" }}
                        >
                          {word}
                        </motion.span>
                        {wordIdx < line.split(" ").length - 1 ? " " : ""}
                      </React.Fragment>
                    )
                  })}
                </span>
              ))}
            </h1>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[280px] text-lg leading-snug text-white/50 sm:text-xl">
              Creo que si no lo sabes explicar, seguro no lo has diseñado aún.
            </p>
             <MusicPlayerStub /> 
          </div>
        </div>

        {/* Right column — photo */}
        <div className="relative hidden md:block">
          <div className="absolute inset-x-[15%] bottom-0 top-[5%]">
            <Image
              src="/assets/luis-foto.webp"
              alt="Luis García"
              fill
              className="object-contain object-bottom"
              sizes="35vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
