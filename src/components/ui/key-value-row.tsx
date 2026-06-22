import * as React from "react"

import { cn } from "@/lib/utils"

interface KeyValueRowProps extends React.ComponentProps<"div"> {
  label: string
  value: React.ReactNode
}

function KeyValueRow({ label, value, className, ...props }: KeyValueRowProps) {
  return (
    <div
      data-slot="key-value-row"
      className={cn(
        "flex flex-col gap-1 border-b border-white/6 py-4 sm:flex-row sm:items-baseline sm:gap-6",
        className
      )}
      {...props}
    >
      <span className="w-full shrink-0 text-[11px] tracking-[0.15em] text-muted-foreground uppercase sm:w-40">
        {label}
      </span>
      <span className="text-base text-foreground">{value}</span>
    </div>
  )
}

export { KeyValueRow }
