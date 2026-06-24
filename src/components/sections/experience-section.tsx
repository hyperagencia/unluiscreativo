import { experience } from "@/data/experience"
import { MotionFadeUp } from "@/components/motion/fade-up"

/* Card shell styles */
const baseCard = "flex h-full flex-col justify-between rounded-[20px] p-9"
const regularCard = `${baseCard} bg-[#2f2f2f]`

function CardContent({ item }: { item: (typeof experience)[number] }) {
  return (
    <>
      <div>
        <h3 className="text-xl font-semibold leading-snug text-white">{item.role}</h3>
        {item.description && (
          <p className="mt-3 text-base leading-relaxed text-white/55">{item.description}</p>
        )}
      </div>
      <div className="mt-6 flex items-end justify-between gap-4">
        <span className="text-sm font-semibold text-white">{item.company}</span>
        <span className="text-xs text-white/50 shrink-0">{item.period}</span>
      </div>
    </>
  )
}

export function ExperienceSection() {
  const aida     = experience.find((e) => e.current)!
  const figmenta = experience.find((e) => e.company === "Figmenta")!
  const probel   = experience.find((e) => e.company === "Probel SpA")!
  const claro    = experience.find((e) => e.company === "Claro Chile SpA")!
  const hyper    = experience.find((e) => e.company === "Hyper™ Branding Agency")!

  return (
    <section id="experiencia" data-header-theme="dark" className="px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto w-full max-w-[1920px]">
        <MotionFadeUp>
          <h2 className="mb-12 text-4xl font-normal tracking-tight lg:text-5xl">
            Experiencia laboral
          </h2>
        </MotionFadeUp>

        <div className="flex flex-col gap-4">
          {/* Row 1: AIDA + Figmenta — same height via flex row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <MotionFadeUp delay={0}>
              <div
                className={baseCard}
                style={{
                  background:
                    "linear-gradient(to bottom, #111111 0%, #111111 70%, #2f2f2f 85%, #fff414 110%)",
                  boxShadow: "inset 0 0 20px rgba(255, 244, 20, 0.25)",
                }}
              >
                <CardContent item={aida} />
              </div>
            </MotionFadeUp>

            <MotionFadeUp delay={0.06}>
              <div className={`${regularCard} h-full`}>
                <CardContent item={figmenta} />
              </div>
            </MotionFadeUp>
          </div>

          {/* Row 2: Probel (left) + Claro & Hyper stacked (right) */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Probel — full height of row */}
            <MotionFadeUp delay={0.12}>
              <div className={`${regularCard} h-full`}>
                <CardContent item={probel} />
              </div>
            </MotionFadeUp>

            {/* Claro + Hyper stacked, together same height as Probel */}
            <div className="flex flex-col gap-4">
              <MotionFadeUp delay={0.18} className="flex-1">
                <div className={`${regularCard} h-full`}>
                  <CardContent item={claro} />
                </div>
              </MotionFadeUp>
              <MotionFadeUp delay={0.24} className="flex-1">
                <div className={`${regularCard} h-full`}>
                  <CardContent item={hyper} />
                </div>
              </MotionFadeUp>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
