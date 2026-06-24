"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { usePreloaderDone } from "@/components/motion/preloader"

const TITLE_LINES = ["Hola, Soy Luis García.", "Product Engineer · Full Stack Developer"]

function BlurWord({ word, delay }: { word: string; delay: number }) {
  const ready = usePreloaderDone()
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, filter: "blur(14px)" }}
      animate={ready ? { opacity: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {word}
    </motion.span>
  )
}

function ComingSoonLabel() {
  const ready = usePreloaderDone()
  return (
    <motion.p
      className="text-xl font-light tracking-tight text-white/35 lg:text-2xl"
      initial={{ opacity: 0, filter: "blur(14px)" }}
      animate={ready ? { opacity: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
    >
      Coming soon
    </motion.p>
  )
}

function PageFooter() {
  const ready = usePreloaderDone()
  const year = new Date().getFullYear()
  return (
    <motion.footer
      className="absolute inset-x-0 bottom-8 px-6 lg:px-12"
      initial={{ opacity: 0 }}
      animate={ready ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-3 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <span>© {year} Luis García</span>
        <div className="flex gap-6">
          <a
            href="https://linkedin.com/in/unluiscreativo"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white/70"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com/unluiscreativo"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white/70"
          >
            @unluiscreativo
          </a>
        </div>
        <span>Las Condes, RM, Chile</span>
      </div>
    </motion.footer>
  )
}

function PageHeader() {
  const ready = usePreloaderDone()
  return (
    <motion.header
      className="fixed inset-x-0 top-4 z-50"
      initial={{ opacity: 0 }}
      animate={ready ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
    >
      <div className="mx-auto flex h-8 w-full max-w-[1920px] items-stretch gap-2 px-4 lg:px-6">
        <a
          href="#"
          className="flex shrink-0 items-center rounded-[8px] bg-[#fff414] px-2"
        >
          <Image
            src="/assets/logo-luis-garcia-large.svg"
            alt="Luis García"
            width={96}
            height={18}
            className="h-[18px] w-auto"
          />
        </a>
        <div className="flex-1" />
        <a
          href="mailto:luis@hyperagencia.com"
          className="flex items-center rounded-[8px] bg-[#fff414] px-6 text-xs font-medium text-[#0a0a0a] transition-colors duration-150 hover:bg-[#EFEFEF] hover:text-[#0a0a0a]"
        >
          Contacto
        </a>
      </div>
    </motion.header>
  )
}

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <PageHeader />

      <main className="flex flex-1 items-center px-6 lg:px-12">
        <div className="mx-auto w-full max-w-[1920px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end">
            <h1 className="text-3xl font-normal leading-[1.05] tracking-tight lg:text-5xl">
              {TITLE_LINES.map((line, lineIdx) => (
                <span key={lineIdx} className="block">
                  {line.split(" ").map((word, wordIdx) => {
                    const delay = lineIdx * 0.15 + wordIdx * 0.08
                    return (
                      <React.Fragment key={wordIdx}>
                        <BlurWord word={word} delay={delay} />
                        {wordIdx < line.split(" ").length - 1 ? " " : ""}
                      </React.Fragment>
                    )
                  })}
                </span>
              ))}
            </h1>

            <div className="md:pb-[0.15em]">
              <ComingSoonLabel />
            </div>
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  )
}
