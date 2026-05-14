'use server';
/**
 * @fileOverview A Genkit flow for predicting future usage trends and term frequency shifts for specific African languages.
 *
 * - predictLanguageTrends - A function that handles the language trend prediction process.
 * - AfricanLanguageTrendPredictionInput - The input type for the predictLanguageTrends function.
 * - AfricanLanguageTrendPredictionOutput - The return type for the predictLanguageTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AfricanLanguageTrendPredictionInputSchema = z.object({
  language: z.string().describe('The African language to analyze (e.g., Shona, Ndebele).'),
  context: z.string().optional().describe('Any additional context or specific areas of interest for the prediction.'),
});
export type AfricanLanguageTrendPredictionInput = z.infer<typeof AfricanLanguageTrendPredictionInputSchema>;

const AfricanLanguageTrendPredictionOutputSchema = z.object({
  predictedUsageTrends: z.array(z.string()).describe('A list of predicted future usage trends for the specified language.'),
  predictedTermFrequencyShifts: z.array(
    z.object({
      term: z.string().describe('The specific term.'),
      shift: z.string().describe('The predicted shift in frequency for the term (e.g., "increasing rapidly", "declining slowly", "stable").'),
      reason: z.string().optional().describe('The reason or context behind the predicted shift.'),
    })
  ).describe('A list of predicted term frequency shifts, including the term, shift direction, and reason.'),
});
export type AfricanLanguageTrendPredictionOutput = z.infer<typeof AfricanLanguageTrendPredictionOutputSchema>;

const prompt = ai.definePrompt({
  name: 'africanLanguageTrendPredictionPrompt',
  input: {schema: AfricanLanguageTrendPredictionInputSchema},
  output: {schema: AfricanLanguageTrendPredictionOutputSchema},
  prompt: `You are an expert linguistic analyst specializing in African languages. Your task is to predict future usage trends and term frequency shifts for the given language.

Analyze the provided language and any additional context to offer insights into its likely evolution. Focus on both general usage patterns and specific term frequency changes.

Language: {{{language}}}
{{#if context}}Context: {{{context}}}{{/if}}

Consider factors such as technological adoption, demographic shifts, cultural influences, and regional development.

Provide your predictions for 'predictedUsageTrends' as a list of distinct trends, and for 'predictedTermFrequencyShifts' as a list of terms with their predicted shift and a brief reason.`,
});

const africanLanguageTrendPredictionFlow = ai.defineFlow(
  {
    name: 'africanLanguageTrendPredictionFlow',
    inputSchema: AfricanLanguageTrendPredictionInputSchema,
    outputSchema: AfricanLanguageTrendPredictionOutputSchema,
  },
  async (input) => {
    try {
      const {output} = await prompt(input);
      if (!output) {
        throw new Error('AI failed to generate a structured prediction for the linguistic trends.');
      }
      return output;
    } catch (error) {
      console.error('Error in africanLanguageTrendPredictionFlow:', error);
      throw new Error('Linguistic analysis failed. Please verify your API configuration.');
    }
  }
);

export async function predictLanguageTrends(input: AfricanLanguageTrendPredictionInput): Promise<AfricanLanguageTrendPredictionOutput> {
  return africanLanguageTrendPredictionFlow(input);
}
