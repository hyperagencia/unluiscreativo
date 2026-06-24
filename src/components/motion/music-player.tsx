"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import useSound from "use-sound"
import { usePreloaderDone } from "@/components/motion/preloader"

const BARS = 5
const SONG_LABEL = "Sting — Every Breath You Take  ·  "
const AUDIO_SRC = "/assets/sounds/Sting-Every-Breath-You-Take.mp3"

function randomHeights() {
  return Array.from({ length: BARS }, () => Math.random() * 0.8 + 0.2)
}

export function MusicPlayer() {
  const ready = usePreloaderDone()
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [heights, setHeights] = React.useState(() => Array(BARS).fill(0.1))

  const [play, { pause, sound }] = useSound(AUDIO_SRC, {
    loop: true,
    volume: 0,
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onstop: () => setIsPlaying(false),
  })

  React.useEffect(() => {
    if (!isPlaying) {
      setHeights(Array(BARS).fill(0.1))
      return
    }
    const id = setInterval(() => setHeights(randomHeights()), 100)
    return () => clearInterval(id)
  }, [isPlaying])

  const handleClick = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
      sound?.fade(0, 0.7, 1500)
    }
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 md:right-auto md:left-1/2 md:-translate-x-1/2 md:items-center"
      initial={{ opacity: 0, y: 24 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-52 overflow-hidden rounded-[10px] bg-[#2f2f2f]/80 px-3 py-1.5 backdrop-blur-md">
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="ticker"
              className="overflow-hidden"
              style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="whitespace-nowrap text-[10px] text-white/50"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
              >
                {SONG_LABEL + SONG_LABEL}
              </motion.p>
            </motion.div>
          ) : (
            <motion.p
              key="prompt"
              className="text-[10px] text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              Escucha algo de música
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={handleClick}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        initial={{ padding: "14px 14px" }}
        whileHover={{ padding: "18px 22px" }}
        whileTap={{ padding: "16px 20px" }}
        transition={{ duration: 0.8, bounce: 0.5, type: "spring" }}
        className="cursor-pointer rounded-[15px] bg-[#2f2f2f]"
      >
        <div className="flex h-[18px] items-center gap-[3px]">
          {heights.map((h, i) => (
            <motion.div
              key={i}
              className="w-[2px] rounded-full bg-[#fff414]"
              animate={{ height: Math.max(3, h * 14) }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            />
          ))}
        </div>
      </motion.button>
    </motion.div>
  )
}
