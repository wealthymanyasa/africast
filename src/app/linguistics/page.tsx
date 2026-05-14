"use client"

import * as React from "react"
import { 
  SidebarInset, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Languages, Search, TrendingUp, BookOpen, Loader2, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { predictLanguageTrends, AfricanLanguageTrendPredictionOutput } from "@/ai/flows/african-language-trend-prediction-flow"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"

export default function LinguisticsPage() {
  const [language, setLanguage] = React.useState("Shona")
  const [context, setContext] = React.useState("Focus on digital slang and mobile commerce terminology.")
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<AfricanLanguageTrendPredictionOutput | null>(null)

  const handlePredict = async () => {
    setLoading(true)
    try {
      const response = await predictLanguageTrends({ language, context })
      setResult(response)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-lg tracking-tight uppercase">Linguistic Growth Analytics</span>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="font-headline">Language Context</CardTitle>
                <CardDescription>Predict evolution of African dialects for resource allocation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Target Language</Label>
                  <Input 
                    placeholder="e.g., Shona, Ndebele, Swahili" 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Analysis Context</Label>
                  <textarea 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Provide specific areas like tech adoption or urban migration..."
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-primary text-primary-foreground font-bold" 
                  onClick={handlePredict}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Flux...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Predict Trends
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="font-headline text-lg">Dataset Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { lang: "Shona", words: "1.2M", growth: "+4.2%", health: "Optimized" },
                  { lang: "Ndebele", words: "840k", growth: "+1.8%", health: "Expansion" },
                  { lang: "Zulu", words: "2.5M", growth: "+0.5%", health: "Stable" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-secondary/50 border border-border/20">
                    <div>
                      <div className="text-sm font-bold">{item.lang}</div>
                      <div className="text-[10px] text-muted-foreground uppercase">{item.words} tokens</div>
                    </div>
                    <Badge variant={item.health === "Expansion" ? "destructive" : "outline"} className="text-[10px]">
                      {item.health}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {!result ? (
              <div className="h-[400px] rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground p-12 text-center">
                <Languages className="h-12 w-12 mb-4 opacity-20" />
                <h3 className="font-headline text-xl mb-2">No Prediction Data</h3>
                <p className="max-w-xs text-sm">Enter language parameters and execute the analysis flow to generate linguistic trend forecasts.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <Card className="glass-panel">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <CardTitle className="font-headline">Predicted Usage Trends</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.predictedUsageTrends.map((trend, i) => (
                        <div key={i} className="p-4 rounded-lg bg-secondary/30 border border-border/50 flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-primary font-bold text-xs">{i + 1}</span>
                          </div>
                          <p className="text-sm leading-relaxed">{trend}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-panel">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-accent" />
                      <CardTitle className="font-headline">Term Frequency Shifts</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {result.predictedTermFrequencyShifts.map((shift, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border/50 gap-4 hover:border-accent/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-md bg-accent/10">
                              {shift.shift.toLowerCase().includes("increasing") ? <ArrowUpRight className="text-emerald-500 h-5 w-5" /> : 
                               shift.shift.toLowerCase().includes("declining") ? <ArrowDownRight className="text-rose-500 h-5 w-5" /> : <Minus className="text-muted-foreground h-5 w-5" />}
                            </div>
                            <div>
                              <div className="font-bold text-lg">"{shift.term}"</div>
                              <Badge variant="secondary" className="text-[10px]">{shift.shift}</Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground max-w-md md:text-right italic">
                            {shift.reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}