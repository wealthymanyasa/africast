"use client"

import * as React from "react"
import { HelpCircle, X, MessageSquare, Send, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { navigatePlatform, NavigatorOutput } from "@/ai/flows/navigator-assistant-flow"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function NavigatorAssistant() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<NavigatorOutput | null>(null)
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim() || loading) return
    
    setLoading(true)
    try {
      const response = await navigatePlatform({ query })
      setResult(response)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleNavigate = () => {
    if (result?.suggestedRoute) {
      router.push(result.suggestedRoute)
      setIsOpen(false)
      setResult(null)
      setQuery("")
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-[350px] shadow-2xl border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-primary/5 rounded-t-lg">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-headline font-bold uppercase tracking-tight">Africast Guide</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {!result && !loading && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                Welcome to Africast. How can I assist you in exploring African market intelligence today?
              </p>
            )}
            
            {loading && (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-2">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <p className="text-[10px] font-bold uppercase text-muted-foreground animate-pulse">Mapping platform routes...</p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-4 animate-in fade-in zoom-in-95">
                <p className="text-sm leading-relaxed text-foreground">
                  {result.response}
                </p>
                {result.suggestedRoute && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-between group border-primary/30 hover:border-primary"
                    onClick={handleNavigate}
                  >
                    <span className="text-xs font-bold uppercase">{result.suggestedAction || "Go to module"}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-0">
            <form onSubmit={handleSearch} className="flex w-full gap-2">
              <Input 
                placeholder="Ask about the platform..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-9 text-xs"
              />
              <Button type="submit" size="icon" className="h-9 w-9 shrink-0" disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button 
          size="lg" 
          className="rounded-full h-14 w-14 shadow-xl border-2 border-primary/20 hover:scale-105 transition-transform"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
