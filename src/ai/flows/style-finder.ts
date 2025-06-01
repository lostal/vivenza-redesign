'use server';

/**
 * @fileOverview AI flow to suggest Vivenza products based on a user-provided photo of their space.
 *
 * - `styleFinder`: Asynchronous function to initiate the style finding process.
 * - `StyleFinderInput`: Interface defining the structure for input data (photo).
 * - `StyleFinderOutput`: Interface defining the structure for output data (product suggestions).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleFinderInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user's bathroom or space, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type StyleFinderInput = z.infer<typeof StyleFinderInputSchema>;

const StyleFinderOutputSchema = z.object({
  productSuggestions: z.array(
    z.string().describe('A suggested product name from Vivenza.')
  ).describe('An array of product suggestions based on the style of the provided photo.'),
  reasoning: z.string().describe('The reasoning behind the product suggestions.'),
});

export type StyleFinderOutput = z.infer<typeof StyleFinderOutputSchema>;

export async function styleFinder(input: StyleFinderInput): Promise<StyleFinderOutput> {
  return styleFinderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'styleFinderPrompt',
  input: {schema: StyleFinderInputSchema},
  output: {schema: StyleFinderOutputSchema},
  prompt: `You are an AI assistant specializing in interior design and product suggestions for Vivenza, a provider of bathroom and home products. Vivenza's website is vivenzaexpo.es.

  A user has uploaded a photo of their space. Analyze the photo to determine the style, color palette, and overall aesthetic of the space. Based on this analysis, suggest specific Vivenza products that would complement the existing decor.

  Respond with an array of product suggestions and a detailed explanation of your reasoning.  Reference the Vivenza website to ensure product availability.

  Photo: {{media url=photoDataUri}}
  `,
});

const styleFinderFlow = ai.defineFlow(
  {
    name: 'styleFinderFlow',
    inputSchema: StyleFinderInputSchema,
    outputSchema: StyleFinderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
