"use client"

import * as React from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"
import { Cpu, Database, Activity, Globe, HardDrive } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function SystemPerformancePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-lg tracking-tight uppercase">System Health Monitoring</span>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <main className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="glass-panel">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm font-medium">Inference Load</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-headline">42%</div>
                <Progress value={42} className="h-1.5 mt-2" />
              </CardContent>
            </Card>
            <Card className="glass-panel">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-accent" />
                  <CardTitle className="text-sm font-medium">Global Latency</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-headline">112ms</div>
                <div className="text-[10px] text-emerald-500 font-medium">Within SLA</div>
              </CardContent>
            </Card>
            <Card className="glass-panel">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm font-medium">Vector Storage</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-headline">8.4 TB</div>
                <Progress value={68} className="h-1.5 mt-2" />
              </CardContent>
            </Card>
            <Card className="glass-panel">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm font-medium">Model Cache</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-headline">94%</div>
                <div className="text-[10px] text-primary font-medium">Hit Rate Optimal</div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="font-headline">Regional Node Status</CardTitle>
              <CardDescription>Real-time availability of inference clusters across the continent.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { region: "Johannesburg (ZA-1)", status: "Healthy", uptime: "99.99%", latency: "24ms" },
                  { region: "Lagos (NG-1)", status: "Healthy", uptime: "99.95%", latency: "42ms" },
                  { region: "Nairobi (KE-1)", status: "Degraded", uptime: "98.20%", latency: "115ms" },
                  { region: "Cairo (EG-1)", status: "Healthy", uptime: "99.98%", latency: "38ms" },
                ].map((node, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Globe className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-bold">{node.region}</div>
                        <div className="text-xs text-muted-foreground">Uptime: {node.uptime}</div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-sm font-mono font-bold text-primary">{node.latency}</div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest ${node.status === "Degraded" ? "text-accent" : "text-emerald-500"}`}>
                        {node.status}
                      </div>
                    </div>
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
