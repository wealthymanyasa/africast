'use server';
/**
 * @fileOverview A Genkit flow for adjusting forecasts based on regional African contexts.
 *
 * - regionalContextForecastAdjustment - A function that adjusts a forecast based on regional events.
 * - RegionalContextForecastAdjustmentInput - The input type for the regionalContextForecastAdjustment function.
 * - RegionalContextForecastAdjustmentOutput - The return type for the regionalContextForecastAdjustment function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const mockPublicHolidays: Record<string, Array<{ date: string; name: string; type: string }>> = {
  Zimbabwe: [
    { date: '2024-01-01', name: 'New Year\'s Day', type: 'Public Holiday' },
    { date: '2024-04-18', name: 'Independence Day', type: 'Public Holiday' },
    { date: '2024-12-25', name: 'Christmas Day', type: 'Public Holiday' }
  ],
  Nigeria: [
    { date: '2024-01-01', name: 'New Year\'s Day', type: 'Public Holiday' },
    { date: '2024-05-01', name: 'Workers\' Day', type: 'Public Holiday' },
    { date: '2024-10-01', name: 'Independence Day', type: 'Public Holiday' }
  ],
  Kenya: [
    { date: '2024-01-01', name: 'New Year\'s Day', type: 'Public Holiday' },
    { date: '2024-06-01', name: 'Madaraka Day', type: 'Public Holiday' },
    { date: '2024-12-12', name: 'Jamhuri Day', type: 'Public Holiday' }
  ]
};

const getPublicHolidays = ai.defineTool(
  {
    name: 'getPublicHolidays',
    description: 'Retrieves public holidays for a specified African country within a given date range.',
    inputSchema: z.object({
      country: z.string(),
      startDate: z.string(),
      endDate: z.string()
    }),
    outputSchema: z.array(z.object({
      date: z.string(),
      name: z.string(),
      type: z.string()
    }))
  },
  async (input) => {
    const holidays = mockPublicHolidays[input.country] || [];
    return holidays.filter(h => h.date >= input.startDate && h.date <= input.endDate);
  }
);

const mockMobileNetworkOutages: Record<string, Array<{ date: string; durationHours: number; region: string; impact: string }>> = {
  Nigeria: [
    { date: '2024-03-10', durationHours: 6, region: 'Lagos', impact: 'High' },
    { date: '2024-07-20', durationHours: 3, region: 'Abuja', impact: 'Medium' }
  ],
  Kenya: [
    { date: '2024-02-05', durationHours: 4, region: 'Nairobi', impact: 'High' },
    { date: '2024-09-15', durationHours: 2, region: 'Mombasa', impact: 'Low' }
  ]
};

const getMobileNetworkOutages = ai.defineTool(
  {
    name: 'getMobileNetworkOutages',
    description: 'Retrieves known mobile network outages for a specified African country.',
    inputSchema: z.object({
      country: z.string(),
      startDate: z.string(),
      endDate: z.string()
    }),
    outputSchema: z.array(z.object({
      date: z.string(),
      durationHours: z.number(),
      region: z.string(),
      impact: z.string()
    }))
  },
  async (input) => {
    const outages = mockMobileNetworkOutages[input.country] || [];
    return outages.filter(o => o.date >= input.startDate && o.date <= input.endDate);
  }
);

const RegionalContextForecastAdjustmentInputSchema = z.object({
  country: z.string(),
  forecastDate: z.string(),
  initialForecastValue: z.number(),
  forecastMetric: z.string()
});
export type RegionalContextForecastAdjustmentInput = z.infer<typeof RegionalContextForecastAdjustmentInputSchema>;

const RegionalContextForecastAdjustmentOutputSchema = z.object({
  adjustedForecastValue: z.number(),
  adjustmentReason: z.string(),
  identifiedEvents: z.array(z.string())
});
export type RegionalContextForecastAdjustmentOutput = z.infer<typeof RegionalContextForecastAdjustmentOutputSchema>;

const regionalContextPrompt = ai.definePrompt({
  name: 'regionalContextForecastAdjustmentPrompt',
  input: {
    schema: z.object({
      country: z.string(),
      forecastDate: z.string(),
      initialForecastValue: z.number(),
      forecastMetric: z.string(),
      startDate: z.string(),
      endDate: z.string()
    })
  },
  output: { schema: RegionalContextForecastAdjustmentOutputSchema },
  tools: [getPublicHolidays, getMobileNetworkOutages],
  prompt: `You are an expert forecast analyst specializing in African market dynamics.

Adjust the forecast for {{{country}}} on {{{forecastDate}}} considering regional events between {{{startDate}}} and {{{endDate}}}.

Metric: {{{forecastMetric}}}
Initial Value: {{{initialForecastValue}}}

Use the provided tools to identify holidays or outages and explain how they impact the results.`
});

const regionalContextForecastAdjustmentFlow = ai.defineFlow(
  {
    name: 'regionalContextForecastAdjustmentFlow',
    inputSchema: RegionalContextForecastAdjustmentInputSchema,
    outputSchema: RegionalContextForecastAdjustmentOutputSchema
  },
  async (input) => {
    try {
      const forecastDateObj = new Date(input.forecastDate);
      const startDateObj = new Date(forecastDateObj);
      startDateObj.setDate(forecastDateObj.getDate() - 3);
      const endDateObj = new Date(forecastDateObj);
      endDateObj.setDate(forecastDateObj.getDate() + 3);

      const formatToYYYYMMDD = (date: Date) => date.toISOString().split('T')[0];

      const { output } = await regionalContextPrompt({
        ...input,
        startDate: formatToYYYYMMDD(startDateObj),
        endDate: formatToYYYYMMDD(endDateObj)
      });

      if (!output) {
        return {
          adjustedForecastValue: input.initialForecastValue,
          adjustmentReason: "AI could not generate an adjustment. Returning initial value.",
          identifiedEvents: []
        };
      }

      return output;
    } catch (error) {
      console.error('Error in regionalContextForecastAdjustmentFlow:', error);
      return {
        adjustedForecastValue: input.initialForecastValue,
        adjustmentReason: "Forecast adjustment service unavailable. Defaulting to base model.",
        identifiedEvents: []
      };
    }
  }
);

export async function regionalContextForecastAdjustment(
  input: RegionalContextForecastAdjustmentInput
): Promise<RegionalContextForecastAdjustmentOutput> {
  return regionalContextForecastAdjustmentFlow(input);
}
