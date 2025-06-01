
'use server';

/**
 * @fileOverview Flujo de IA para analizar el estilo de un espacio basándose en una foto del usuario.
 *
 * - `styleFinder`: Función asíncrona para iniciar el proceso de análisis de estilo.
 * - `StyleFinderInput`: Interfaz que define la estructura para los datos de entrada (foto).
 * - `StyleFinderOutput`: Interfaz que define la estructura para los datos de salida (análisis de estilo y recomendaciones generales).
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
  styleAnalysis: z.string().describe('Análisis detallado del estilo, la paleta de colores y la estética del espacio.'),
  designRecommendations: z.string().describe('Recomendaciones generales de diseño o tipos de elementos que complementarían el espacio, sin mencionar productos o marcas específicas.'),
});

export type StyleFinderOutput = z.infer<typeof StyleFinderOutputSchema>;

export async function styleFinder(input: StyleFinderInput): Promise<StyleFinderOutput> {
  return styleFinderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'styleFinderPrompt',
  input: {schema: StyleFinderInputSchema},
  output: {schema: StyleFinderOutputSchema},
  prompt: `Eres un asistente de IA especializado en diseño de interiores y análisis de estilos para espacios de hogar, particularmente baños. Tu objetivo es ayudar a los usuarios a comprender el estilo de su espacio y ofrecer inspiración general. NO menciones productos específicos de ninguna marca, ni precios, ni la marca "Vivenza".

  Un usuario ha subido una foto de su espacio. Analiza la foto para determinar el estilo (ej. minimalista, industrial, rústico, moderno, clásico, etc.), la paleta de colores predominante, y la estética general del espacio.

  Responde con:
  1.  \`styleAnalysis\`: Un análisis detallado del estilo, la paleta de colores y la estética del espacio.
  2.  \`designRecommendations\`: Recomendaciones generales de diseño o tipos de elementos (ej. "muebles de líneas simples", "textiles naturales", "iluminación cálida indirecta", "elementos metálicos en tonos oscuros") que complementarían la decoración existente, manteniendo un enfoque general y sin sugerir productos o marcas específicas.

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
    const result = await prompt(input);
    if (!result.output) {
      // Puedes registrar más detalles del 'result' aquí en el servidor si es necesario para depuración.
      console.error("StyleFinderFlow: El modelo de IA no generó una salida válida. Result:", JSON.stringify(result, null, 2));
      throw new Error("El modelo de IA no pudo generar un análisis para la imagen proporcionada. Por favor, inténtalo de nuevo.");
    }
    return result.output;
  }
);
