"use client"

import * as React from "react"
import { 
  SidebarInset, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { StatCard } from "@/components/dashboard/stat-card"
import { ProbabilisticForecastChart } from "@/components/dashboard/probabilistic-forecast-chart"
import { ForecastAdjuster } from "@/components/dashboard/forecast-adjuster"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  TrendingUp, 
  Server, 
  Database, 
  Calendar,
  Zap,
  ChevronRight,
  ShieldAlert,
  Activity,
  Globe,
  ArrowRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-lg tracking-tight uppercase">Operational Intelligence</span>
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">LIVE</Badge>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground mr-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>Oct 12, 2024</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-accent" />
                <span className="text-accent font-medium">2 Alerts</span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Avg. Transaction Volume" 
              value="14,205" 
              change="+12.5%" 
              changeType="positive"
              icon={TrendingUp} 
            />
            <StatCard 
              title="Linguistic API Load" 
              value="48.2k" 
              change="-2.1%" 
              changeType="negative"
              icon={Server} 
            />
            <StatCard 
              title="Model Accuracy (MAE)" 
              value="0.042" 
              change="Optimal" 
              changeType="positive"
              icon={Database} 
            />
            <StatCard 
              title="Forecast Confidence" 
              value="94.8%" 
              change="+0.4%" 
              changeType="positive"
              icon={Zap} 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 glass-panel">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="font-headline text-xl">Probabilistic Performance Forecast</CardTitle>
                  <CardDescription>Multi-quantile time-series analysis for resource optimization.</CardDescription>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Actual</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">P10/P50/P90</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ProbabilisticForecastChart />
              </CardContent>
            </Card>

            <ForecastAdjuster />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-panel">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-headline text-lg">Drift & Anomaly Logs</CardTitle>
                  <CardDescription>Recent system events and detected deviations.</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/alerts" className="text-xs">View all <ArrowRight className="ml-1 h-3 w-3" /></Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { time: "10:24 AM", type: "Drift", msg: "Feature 'SalaryCycle' detected distribution shift in Nigeria cluster.", severity: "medium" },
                  { time: "08:12 AM", type: "Anomaly", msg: "API Latency spike (450ms) detected in Zimbabwe region nodes.", severity: "high" },
                  { time: "Yesterday", type: "System", msg: "Retraining cycle completed for 'Shona-Ndebele-Hybrid' model.", severity: "low" },
                ].map((log, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 rounded-md bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/50 group cursor-pointer">
                    <div className={cn(
                      "mt-1.5 h-2 w-2 rounded-full shrink-0",
                      log.severity === "high" ? "bg-accent shadow-[0_0_8px_rgba(232,126,137,0.5)]" : 
                      log.severity === "medium" ? "bg-primary" : "bg-muted-foreground"
                    )} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{log.type}</span>
                        <span className="text-[10px] text-muted-foreground/60">{log.time}</span>
                      </div>
                      <p className="text-sm leading-snug">{log.msg}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/0 group-hover:text-muted-foreground/100 transition-all self-center" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-headline text-lg">Market Intelligence Hub</CardTitle>
                  <CardDescription>Regional economic and linguistic signals.</CardDescription>
                </div>
                <Globe className="h-5 w-5 text-primary opacity-50" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">East Africa Velocity</div>
                    <div className="text-xl font-bold font-headline">84.2</div>
                    <p className="text-[10px] text-muted-foreground mt-1">Mobile money drift: +0.2%</p>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/5 border border-accent/10">
                    <div className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1">West Africa Stability</div>
                    <div className="text-xl font-bold font-headline">96.8%</div>
                    <p className="text-[10px] text-muted-foreground mt-1">Uptime: 99.98%</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Currency Volatility Index</span>
                    <span className="font-bold">12.4 Low</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Cross-Border Flow Efficiency</span>
                    <span className="font-bold text-emerald-500">92.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
