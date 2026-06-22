"use client"

import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

interface MotionFadeUpProps extends HTMLMotionProps<"div"> {
  delay?: number
}

function MotionFadeUp({ delay = 0, children, ...props }: MotionFadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { MotionFadeUp }
