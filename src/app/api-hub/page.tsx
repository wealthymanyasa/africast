"use client"

import * as React from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"
import { Terminal, Shield, Cpu, RefreshCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ApiHubPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-lg tracking-tight uppercase">Live Inference API Hub</span>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <main className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="glass-panel">
              <CardContent className="pt-6">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Requests</div>
                <div className="text-2xl font-bold font-headline">1.2M</div>
                <div className="text-[10px] text-emerald-500 font-medium">+5% (1h)</div>
              </CardContent>
            </Card>
            <Card className="glass-panel">
              <CardContent className="pt-6">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Avg Latency</div>
                <div className="text-2xl font-bold font-headline">84ms</div>
                <div className="text-[10px] text-primary font-medium">Optimal</div>
              </CardContent>
            </Card>
            <Card className="glass-panel">
              <CardContent className="pt-6">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Error Rate</div>
                <div className="text-2xl font-bold font-headline">0.02%</div>
                <div className="text-[10px] text-emerald-500 font-medium">Stable</div>
              </CardContent>
            </Card>
            <Card className="glass-panel">
              <CardContent className="pt-6">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Credits Used</div>
                <div className="text-2xl font-bold font-headline">14.8k</div>
                <div className="text-[10px] text-muted-foreground font-medium">Monthly Quota: 50k</div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-panel">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="font-headline">API Endpoints</CardTitle>
                <CardDescription>Managed access to African-specific ML models.</CardDescription>
              </div>
              <Button size="sm" variant="outline">
                <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "POST /v1/forecast/regional-adjustment", status: "Active", security: "AES-256", load: "Medium" },
                  { name: "GET /v1/linguistics/dialect-shift", status: "Active", security: "TLS 1.3", load: "Low" },
                  { name: "POST /v2/finance/pattern-detect", status: "Maintenance", security: "AES-256", load: "N/A" },
                ].map((api, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border/50 group hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-md bg-secondary/50">
                        <Terminal className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="space-y-1">
                        <code className="text-sm font-mono font-bold text-primary">{api.name}</code>
                        <div className="flex items-center gap-3 text-[10px] uppercase font-bold text-muted-foreground">
                          <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> {api.security}</span>
                          <span className="flex items-center gap-1"><Cpu className="h-3 w-3" /> Load: {api.load}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={api.status === "Maintenance" ? "destructive" : "outline"}>
                      {api.status}
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