"use client"

import * as React from "react"
import { Activity, Loader2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { regionalContextForecastAdjustment } from "@/ai/flows/regional-context-forecast-adjustment"
import { Badge } from "@/components/ui/badge"

export function ForecastAdjuster() {
  const [country, setCountry] = React.useState("Zimbabwe")
  const [date, setDate] = React.useState("2024-04-18")
  const [metric, setMetric] = React.useState("Daily transaction volume")
  const [initialValue, setInitialValue] = React.useState(12500)
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<any>(null)

  const handleAdjust = async () => {
    setLoading(true)
    try {
      const response = await regionalContextForecastAdjustment({
        country,
        forecastDate: date,
        initialForecastValue: initialValue,
        forecastMetric: metric
      })
      setResult(response)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="glass-panel h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <CardTitle className="font-headline text-lg">Regional Intelligence</CardTitle>
        </div>
        <CardDescription>Adjust base models with African regional context and events.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Target Country</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger id="country">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
                <SelectItem value="Nigeria">Nigeria</SelectItem>
                <SelectItem value="Kenya">Kenya</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Forecast Date</Label>
            <Input 
              type="date" 
              id="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="initial">Base Prediction</Label>
          <Input 
            type="number" 
            id="initial" 
            value={initialValue} 
            onChange={(e) => setInitialValue(Number(e.target.value))}
          />
        </div>

        {result && (
          <div className="mt-6 space-y-4 p-4 rounded-lg bg-secondary/50 border border-border animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Adjusted Forecast:</span>
              <span className="text-2xl font-bold text-primary font-headline">
                {result.adjustedForecastValue.toLocaleString()}
              </span>
            </div>
            
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <Info className="h-3 w-3" /> Identified Events
              </span>
              <div className="flex flex-wrap gap-2">
                {result.identifiedEvents.map((event: string, i: number) => (
                  <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {event}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-accent pl-3">
              "{result.adjustmentReason}"
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          disabled={loading}
          onClick={handleAdjust}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Regional Factors...
            </>
          ) : (
            <>
              <Activity className="mr-2 h-4 w-4" />
              Adjust Forecast
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
