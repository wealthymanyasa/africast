"use client"

import * as React from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-lg tracking-tight uppercase">Platform Settings</span>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <main className="p-6 max-w-4xl mx-auto space-y-6 w-full">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="font-headline">Model Preferences</CardTitle>
              <CardDescription>Configure default inference parameters for your forecasts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Adjustment</Label>
                  <p className="text-xs text-muted-foreground">Automatically apply regional context to new forecasts.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Anomaly Alerts</Label>
                  <p className="text-xs text-muted-foreground">Receive notifications when drift exceeds 0.05 MAE.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="font-headline">API Configuration</CardTitle>
              <CardDescription>Manage your authentication tokens and endpoint limits.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">Primary API Key</Label>
                <div className="flex gap-2">
                  <Input id="apiKey" value="af_live_••••••••••••••••••••••••" readOnly className="font-mono bg-secondary/20" />
                  <Button variant="outline" size="sm">Rotate</Button>
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button className="bg-primary text-primary-foreground font-bold">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}