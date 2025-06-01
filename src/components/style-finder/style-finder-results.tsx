import type { StyleFinderOutput } from '@/ai/flows/style-finder';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Palette } from 'lucide-react';

interface StyleFinderResultsProps {
  results: StyleFinderOutput | null;
  isLoading: boolean;
}

export default function StyleFinderResults({ results, isLoading }: StyleFinderResultsProps) {
  if (isLoading) {
    return (
      <div className="mt-10 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-6"></div>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!results) {
    return null;
  }

  return (
    <div className="mt-10 space-y-8">
      {results.styleAnalysis && (
        <Card className="bg-card/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-headline">
              <Palette className="h-7 w-7 mr-3 text-primary" />
              Análisis de Estilo IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 whitespace-pre-wrap">{results.styleAnalysis}</p>
          </CardContent>
        </Card>
      )}

      {results.designRecommendations && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-headline">
              <Lightbulb className="h-7 w-7 mr-3 text-primary" />
              Recomendaciones de Diseño
            </CardTitle>
            <CardDescription>
              Ideas generales para complementar y realzar tu espacio.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/80 whitespace-pre-wrap">{results.designRecommendations}</p>
            {!results.styleAnalysis && !results.designRecommendations && !isLoading && (
                 <p className="text-muted-foreground text-center py-4">No se pudo generar un análisis detallado para la imagen proporcionada.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
