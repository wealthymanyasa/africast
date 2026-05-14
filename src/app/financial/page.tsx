"use client"

import * as React from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"
import { Wallet, TrendingUp, BarChart, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function FinancialPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-lg tracking-tight uppercase">Financial Pattern Projector</span>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <main className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-panel">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <CardTitle className="font-headline">Market Liquidity</CardTitle>
                </div>
                <CardDescription>Real-time cross-border exchange flow projection.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-headline">$4.2B</div>
                <div className="text-xs text-emerald-500 font-medium mt-1">+1.2% versus 24h average</div>
              </CardContent>
            </Card>
            
            <Card className="glass-panel">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <CardTitle className="font-headline">Consumer Spend</CardTitle>
                </div>
                <CardDescription>Mobile money velocity in East African regions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-headline">84.5</div>
                <div className="text-xs text-rose-500 font-medium mt-1">High Volatility Detected</div>
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  <CardTitle className="font-headline">Remittance Drift</CardTitle>
                </div>
                <CardDescription>Quarterly forecast for diaspora payment routes.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-headline">Low</div>
                <div className="text-xs text-muted-foreground font-medium mt-1">Stable confidence interval</div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="font-headline">Regional Transaction Hotspots</CardTitle>
              <CardDescription>Identify significant deviations in standard payment patterns.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { region: "Lagos, NG", activity: "Extreme", reason: "Salary cycle peak + Tech conference" },
                  { region: "Nairobi, KE", activity: "Steady", reason: "Agricultural harvest season" },
                  { region: "Harare, ZW", activity: "High", reason: "Import duty deadline shift" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-secondary/20">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Wallet className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-bold">{item.region}</div>
                        <div className="text-xs text-muted-foreground">{item.reason}</div>
                      </div>
                    </div>
                    <Badge variant={item.activity === "Extreme" ? "destructive" : "outline"} className="px-3">
                      {item.activity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
