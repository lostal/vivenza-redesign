"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { UploadCloud, Loader2, Wand2 } from 'lucide-react';
import type { StyleFinderInput, StyleFinderOutput } from '@/ai/flows/style-finder';
import { styleFinder } from '@/ai/flows/style-finder'; // Ensure this path is correct

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
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        toast({ title: "File too large", description: "Please upload an image smaller than 5MB.", variant: "destructive" });
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
      toast({ title: "No image selected", description: "Please upload an image of your space.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    onLoadingChange(true);

    try {
      const input: StyleFinderInput = { photoDataUri: previewUrl };
      const result = await styleFinder(input);
      onResults(result);
      toast({ title: "Style Analysis Complete!", description: "Check out your personalized suggestions." });
    } catch (error) {
      console.error("AI Style Finder error:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not analyze the image. Please try again or use a different image.",
        variant: "destructive",
      });
      onResults({ productSuggestions: [], reasoning: "Error during analysis." }); // Clear or show error results
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
          Upload a photo of your space
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-border rounded-md hover:border-primary transition-colors">
          <div className="space-y-1 text-center">
            {previewUrl ? (
              <div className="relative w-full max-w-md mx-auto aspect-video rounded-md overflow-hidden shadow-md">
                <Image src={previewUrl} alt="Preview" layout="fill" objectFit="contain" />
              </div>
            ) : (
              <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
            )}
            <div className="flex text-sm text-muted-foreground justify-center">
              <label
                htmlFor="photoUpload"
                className="relative cursor-pointer rounded-md font-medium text-primary hover:text-accent focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
              >
                <span>{file ? 'Change image' : 'Upload a file'}</span>
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
              {!file && <p className="pl-1">or drag and drop</p>}
            </div>
            <p className="text-xs text-muted-foreground">{file ? file.name : 'PNG, JPG, WEBP up to 5MB'}</p>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full h-12 text-lg" disabled={!file || isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Analyzing Your Style...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-5 w-5" />
            Find My Style
          </>
        )}
      </Button>
    </form>
  );
}
