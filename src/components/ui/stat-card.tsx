import * as React from "react"

import { cn } from "@/lib/utils"

interface StatCardProps extends React.ComponentProps<"div"> {
  value: string
  label: string
}

function StatCard({ value, label, className, ...props }: StatCardProps) {
  return (
    <div
      data-slot="stat-card"
      className={cn(
        "flex flex-col gap-2 rounded-[20px] border border-card-border bg-card p-6 sm:p-8",
        className
      )}
      {...props}
    >
      <span className="text-6xl leading-none font-light tracking-tight text-foreground/90 sm:text-7xl lg:text-8xl">
        {value}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}

export { StatCard }
