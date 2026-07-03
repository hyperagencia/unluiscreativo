"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { stats } from "@/data/stats"

export function StatsSection() {
  const t = useTranslations("stats")

  return (
    <section data-header-theme="dark" className="bg-[#0a0a0a] px-4 py-6 lg:px-6">
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="group flex min-h-[200px] cursor-default flex-col justify-between rounded-[20px] bg-[#2f2f2f] p-[8%] transition-colors duration-200 hover:bg-[#fff414] lg:min-h-[220px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <span className="text-5xl font-normal leading-none text-[#fff414] transition-colors duration-200 group-hover:text-[#0a0a0a] lg:text-7xl">
                {stat.value}
              </span>
              <span className="text-sm leading-snug text-white/70 transition-colors duration-200 group-hover:text-[#0a0a0a]/70">
                {t(`label${i}` as `label${0 | 1 | 2 | 3}`)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
