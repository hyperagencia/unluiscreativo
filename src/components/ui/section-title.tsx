import * as React from "react"

import { cn } from "@/lib/utils"

interface SectionTitleProps extends React.ComponentProps<"h2"> {
  as?: "h1" | "h2" | "h3"
}

function SectionTitle({
  as: Comp = "h2",
  className,
  children,
  ...props
}: SectionTitleProps) {
  return (
    <Comp
      data-slot="section-title"
      className={cn(
        "max-w-3xl text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl lg:text-6xl",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { SectionTitle }
