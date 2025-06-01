'use server';

/**
 * @fileOverview Flujo de IA para sugerir productos Vivenza basado en una foto del espacio del usuario.
 *
 * - `styleFinder`: Función asíncrona para iniciar el proceso de búsqueda de estilo.
 * - `StyleFinderInput`: Interfaz que define la estructura para los datos de entrada (foto).
 * - `StyleFinderOutput`: Interfaz que define la estructura para los datos de salida (sugerencias de productos).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleFinderInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "Una foto del baño o espacio del usuario, como un URI de datos que debe incluir un tipo MIME y usar codificación Base64. Formato esperado: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type StyleFinderInput = z.infer<typeof StyleFinderInputSchema>;

const StyleFinderOutputSchema = z.object({
  productSuggestions: z.array(
    z.string().describe('Un nombre de producto sugerido de Vivenza.')
  ).describe('Un array de sugerencias de productos basadas en el estilo de la foto proporcionada.'),
  reasoning: z.string().describe('El razonamiento detrás de las sugerencias de productos.'),
});

export type StyleFinderOutput = z.infer<typeof StyleFinderOutputSchema>;

export async function styleFinder(input: StyleFinderInput): Promise<StyleFinderOutput> {
  return styleFinderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'styleFinderPrompt',
  input: {schema: StyleFinderInputSchema},
  output: {schema: StyleFinderOutputSchema},
  prompt: `Eres un asistente de IA especializado en diseño de interiores y sugerencias de productos para Vivenza, un proveedor de productos para baño y hogar. El sitio web de Vivenza es vivenzaexpo.es.

  Un usuario ha subido una foto de su espacio. Analiza la foto para determinar el estilo, la paleta de colores y la estética general del espacio. Basándote en este análisis, sugiere productos específicos de Vivenza que complementarían la decoración existente.

  Responde con un array de sugerencias de productos y una explicación detallada de tu razonamiento. Consulta el sitio web de Vivenza para asegurar la disponibilidad de los productos.

  Foto: {{media url=photoDataUri}}
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
