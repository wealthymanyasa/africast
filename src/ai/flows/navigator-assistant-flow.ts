'use server';
/**
 * @fileOverview A flow for assisting users in navigating the Africast platform.
 *
 * - navigatePlatform - A function that handles navigation queries.
 * - NavigatorInput - The input type for the assistant.
 * - NavigatorOutput - The return type for the assistant.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NavigatorInputSchema = z.object({
  query: z.string().describe('The user\'s question about how to use the platform.'),
});
export type NavigatorInput = z.infer<typeof NavigatorInputSchema>;

const NavigatorOutputSchema = z.object({
  response: z.string().describe('A helpful response explaining where to go.'),
  suggestedRoute: z.string().optional().describe('The path to the recommended page (e.g., "/financial").'),
  suggestedAction: z.string().optional().describe('A label for the suggested action button.'),
});
export type NavigatorOutput = z.infer<typeof NavigatorOutputSchema>;

const prompt = ai.definePrompt({
  name: 'navigatorAssistantPrompt',
  input: {schema: NavigatorInputSchema},
  output: {schema: NavigatorOutputSchema},
  prompt: `You are the Africast Guide, a professional assistant designed to help users navigate our African market forecasting platform.

Structure:
- Dashboard (/)
- Financial (/financial)
- Linguistics (/linguistics)
- API (/api-hub)
- System Performance (/system)
- Alerts (/alerts)

User Query: "{{{query}}}"

Instructions: Provide a clear explanation and suggest the most relevant route. Your tone should be helpful, intelligent, and corporate.`,
});

const navigatorAssistantFlow = ai.defineFlow(
  {
    name: 'navigatorAssistantFlow',
    inputSchema: NavigatorInputSchema,
    outputSchema: NavigatorOutputSchema,
  },
  async (input) => {
    try {
      const {output} = await prompt(input);
      if (!output) {
        return {
          response: "I'm having trouble finding the right information right now. You can try browsing the sidebar to find our forecasting modules.",
          suggestedRoute: "/"
        };
      }
      return output;
    } catch (error) {
      console.error('Error in navigatorAssistantFlow:', error);
      return {
        response: "Navigation assistant is currently offline. Please use the sidebar to navigate the platform.",
        suggestedRoute: "/"
      };
    }
  }
);

export async function navigatePlatform(input: NavigatorInput): Promise<NavigatorOutput> {
  return navigatorAssistantFlow(input);
}
