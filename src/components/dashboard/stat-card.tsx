
import * as React from "react"
import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon
  className?: string
}

export function StatCard({ title, value, change, changeType = "neutral", icon: Icon, className }: StatCardProps) {
  return (
    <Card className={cn("glass-panel overflow-hidden relative", className)}>
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Icon className="h-12 w-12" />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground tracking-tight">{title}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold font-headline">{value}</h3>
          {change && (
            <span className={cn(
              "text-xs font-semibold",
              changeType === "positive" ? "text-emerald-500" : 
              changeType === "negative" ? "text-rose-500" : "text-muted-foreground"
            )}>
              {change}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
