import type { StyleFinderOutput } from '@/ai/flows/style-finder';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderProducts } from '@/lib/placeholder-data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Lightbulb, Package } from 'lucide-react';

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
              <div key={i} className="h-24 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!results) {
    return null;
  }

  const suggestedFullProducts = results.productSuggestions
    .map(name => placeholderProducts.find(p => p.name.toLowerCase() === name.toLowerCase()))
    .filter(p => p !== undefined);

  return (
    <div className="mt-10 space-y-8">
      <Card className="bg-card/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-headline">
            <Lightbulb className="h-7 w-7 mr-3 text-primary" />
            Análisis de Diseño IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80 whitespace-pre-wrap">{results.reasoning || "No se proporcionó razonamiento."}</p>
        </CardContent>
      </Card>

      {results.productSuggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-headline">
              <Package className="h-7 w-7 mr-3 text-primary" />
              Productos Sugeridos
            </CardTitle>
            <CardDescription>
              Basándonos en tu espacio, creemos que estos productos Vivenza encajarían genial.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {suggestedFullProducts.length > 0 ? (
              suggestedFullProducts.map((product) => product && (
                <Link key={product.id} href={`/products#${product.id}`} className="block hover:bg-muted/50 p-4 rounded-lg transition-colors -m-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover aspect-square"
                      data-ai-hint={product.dataAiHint}
                    />
                    <div>
                      <h4 className="font-semibold text-lg text-foreground">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <p className="text-sm text-primary font-medium">${product.price.toFixed(2)}</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">Ver Producto</Button>
                  </div>
                </Link>
              ))
            ) : (
              results.productSuggestions.map((name, index) => (
                 <div key={index} className="p-4 border border-dashed rounded-md">
                    <h4 className="font-semibold text-lg text-foreground">{name}</h4>
                    <p className="text-sm text-muted-foreground">Detalles del producto no encontrados en el catálogo actual. Podría ser un artículo nuevo o personalizado.</p>
                  </div>
              ))
            )}
            {results.productSuggestions.length === 0 && !isLoading && (
                 <p className="text-muted-foreground text-center py-4">No se pudieron encontrar productos específicos de nuestro catálogo actual basados en el análisis.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
