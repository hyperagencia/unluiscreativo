"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

const PHRASE = "Si no lo sabes explicar, seguro no lo has diseñado aún"
const WORDS = PHRASE.split(" ")

const START_DELAY = 0.3
const WORD_STEP = 0.1
const HOLD = 0.5
const EXIT_DURATION = 0.7

const REVEAL_DELAY = START_DELAY + WORDS.length * WORD_STEP + 0.6 + HOLD

const PreloaderContext = React.createContext(false)

function usePreloaderDone() {
  return React.useContext(PreloaderContext)
}

function Preloader({ children }: { children: React.ReactNode }) {
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true)
      return
    }

    document.body.style.overflow = "hidden"
    const timer = setTimeout(() => {
      setDone(true)
      document.body.style.overflow = ""
    }, REVEAL_DELAY * 1000)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <PreloaderContext.Provider value={done}>
      <AnimatePresence>
        {!done && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center bg-background px-6"
            exit={{ opacity: 0 }}
            transition={{ duration: EXIT_DURATION, ease: "easeInOut" }}
          >
            <p className="max-w-4xl text-center text-2xl leading-snug font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {WORDS.map((word, i) => (
                <React.Fragment key={i}>
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0, filter: "blur(14px)", y: "0.2em" }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: START_DELAY + i * WORD_STEP,
                      ease: "easeOut",
                    }}
                  >
                    {word}
                  </motion.span>
                  {i < WORDS.length - 1 ? " " : ""}
                </React.Fragment>
              ))}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </PreloaderContext.Provider>
  )
}

interface RevealProps {
  children: React.ReactNode
  className?: string
}

/** Slides content up from below while fading in, once the preloader finishes. */
function Reveal({ children, className }: RevealProps) {
  const done = usePreloaderDone()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 48 }}
      animate={done ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Fades content in without a transform, safe for fixed-position elements. */
function FadeIn({ children, className }: RevealProps) {
  const done = usePreloaderDone()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={done ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export { Preloader, Reveal, FadeIn }
