"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { UploadCloud, Loader2, Wand2 } from 'lucide-react';
import type { StyleFinderInput, StyleFinderOutput } from '@/ai/flows/style-finder';
import { styleFinder } from '@/ai/flows/style-finder';

interface StyleFinderFormProps {
  onResults: (results: StyleFinderOutput) => void;
  onLoadingChange: (loading: boolean) => void;
}

export default function StyleFinderForm({ onResults, onLoadingChange }: StyleFinderFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // Límite de 5MB
        toast({ title: "Archivo demasiado grande", description: "Por favor, sube una imagen de menos de 5MB.", variant: "destructive" });
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !previewUrl) {
      toast({ title: "No se seleccionó ninguna imagen", description: "Por favor, sube una imagen de tu espacio.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    onLoadingChange(true);

    try {
      const input: StyleFinderInput = { photoDataUri: previewUrl };
      const result = await styleFinder(input);
      onResults(result);
      toast({ title: "¡Análisis de Estilo Completado!", description: "Consulta tus sugerencias personalizadas." });
    } catch (error) {
      console.error("Error del Buscador de Estilos IA:", error);
      toast({
        title: "Falló el Análisis",
        description: "No se pudo analizar la imagen. Por favor, inténtalo de nuevo o usa una imagen diferente.",
        variant: "destructive",
      });
      onResults({ productSuggestions: [], reasoning: "Error durante el análisis." });
    } finally {
      setIsLoading(false);
      onLoadingChange(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="photoUpload"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Sube una foto de tu espacio
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-border rounded-md hover:border-primary transition-colors">
          <div className="space-y-1 text-center">
            {previewUrl ? (
              <div className="relative w-full max-w-md mx-auto aspect-video rounded-md overflow-hidden shadow-md">
                <Image src={previewUrl} alt="Vista previa" layout="fill" objectFit="contain" />
              </div>
            ) : (
              <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
            )}
            <div className="flex text-sm text-muted-foreground justify-center">
              <label
                htmlFor="photoUpload"
                className="relative cursor-pointer rounded-md font-medium text-primary hover:text-accent focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
              >
                <span>{file ? 'Cambiar imagen' : 'Subir un archivo'}</span>
                <Input
                  id="photoUpload"
                  name="photoUpload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/webp"
                  disabled={isLoading}
                />
              </label>
              {!file && <p className="pl-1">o arrastra y suelta</p>}
            </div>
            <p className="text-xs text-muted-foreground">{file ? file.name : 'PNG, JPG, WEBP hasta 5MB'}</p>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full h-12 text-lg" disabled={!file || isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Analizando Tu Estilo...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-5 w-5" />
            Encontrar Mi Estilo
          </>
        )}
      </Button>
    </form>
  );
}
