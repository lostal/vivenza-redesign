
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Intentar leer la API key de las variables de entorno.
// Asegúrate de que GEMINI_API_KEY esté definida en tu archivo .env.
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  // Esta advertencia aparecerá en la consola del servidor donde se ejecuta Next.js/Genkit.
  console.warn(
    'ADVERTENCIA: La variable de entorno GEMINI_API_KEY no está definida o no es accesible. ' +
    'El Buscador de Estilos IA no funcionará sin ella. ' +
    'Por favor, verifica tu archivo .env y reinicia el servidor.'
  );
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKey, // Pasar la API key explícitamente.
                      // Si apiKey es undefined aquí, el plugin podría seguir fallando,
                      // pero la advertencia anterior nos dará una pista.
    }),
  ],
  model: 'googleai/gemini-2.0-flash', // Modelo por defecto para la instancia `ai`
});

