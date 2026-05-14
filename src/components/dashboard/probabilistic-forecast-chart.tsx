
"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
} from "recharts"
import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"

const data = [
  { date: "2024-05-01", actual: 12000, p50: 12100, p10: 11000, p90: 13500 },
  { date: "2024-05-02", actual: 12500, p50: 12400, p10: 11200, p90: 13800 },
  { date: "2024-05-03", actual: 13000, p50: 12800, p10: 11500, p90: 14200 },
  { date: "2024-05-04", actual: 12800, p50: 13000, p10: 11800, p90: 14500 },
  { date: "2024-05-05", actual: 13500, p50: 13200, p10: 12000, p90: 14800 },
  { date: "2024-05-06", p50: 13600, p10: 12200, p90: 15200 },
  { date: "2024-05-07", p50: 14200, p10: 12500, p90: 16000 },
  { date: "2024-05-08", p50: 14800, p10: 13000, p90: 17200 },
  { date: "2024-05-09", p50: 14500, p10: 12800, p90: 16800 },
  { date: "2024-05-10", p50: 15200, p10: 13200, p90: 17500 },
  { date: "2024-05-11", p50: 16000, p10: 14000, p90: 18500 },
  { date: "2024-05-12", p50: 15800, p10: 13800, p90: 18200 },
  { date: "2024-05-13", p50: 16500, p10: 14500, p90: 19500 },
  { date: "2024-05-14", p50: 17200, p10: 15000, p90: 20500 },
]

const chartConfig = {
  actual: {
    label: "Actual Value",
    color: "hsl(var(--primary))",
  },
  p50: {
    label: "P50 (Median)",
    color: "hsl(var(--accent))",
  },
  p90: {
    label: "P90 (Upper Bound)",
    color: "hsl(var(--accent))",
  },
  p10: {
    label: "P10 (Lower Bound)",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function ProbabilisticForecastChart() {
  return (
    <div className="h-[400px] w-full">
      <ChartContainer config={chartConfig}>
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id="colorP90" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.1} />
              <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tickFormatter={(value) => `${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          
          {/* Confidence interval band */}
          <Area
            type="monotone"
            dataKey="p90"
            stroke="none"
            fill="url(#colorP90)"
            connectNulls
          />
          <Area
            type="monotone"
            dataKey="p10"
            stroke="none"
            fill="hsl(var(--background))"
            connectNulls
          />

          {/* Lines */}
          <Line
            type="monotone"
            dataKey="p90"
            stroke="hsl(var(--accent))"
            strokeWidth={1}
            strokeDasharray="4 4"
            dot={false}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="p10"
            stroke="hsl(var(--accent))"
            strokeWidth={1}
            strokeDasharray="4 4"
            dot={false}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="p50"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            dot={false}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ r: 4, fill: "hsl(var(--primary))" }}
            animationDuration={2000}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
