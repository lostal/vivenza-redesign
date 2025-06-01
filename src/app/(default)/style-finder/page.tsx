"use client";

import { useState } from 'react';
import SectionTitle from '@/components/section-title';
import StyleFinderForm from '@/components/style-finder/style-finder-form';
import StyleFinderResults from '@/components/style-finder/style-finder-results';
import type { StyleFinderOutput } from '@/ai/flows/style-finder';
import { Wand2 } from 'lucide-react';

export default function StyleFinderPage() {
  const [results, setResults] = useState<StyleFinderOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewResults = (newResults: StyleFinderOutput) => {
    setResults(newResults);
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <div className="container py-12 md:py-16">
      <SectionTitle
        icon={<Wand2 className="h-10 w-10 text-primary" />}
        title="AI Style Finder"
        description="Let our AI analyze your space and suggest the perfect Vivenza products to match your style. Simply upload a photo to get started."
      />
      <div className="max-w-2xl mx-auto mt-10 p-6 md:p-8 bg-card rounded-xl shadow-2xl">
        <StyleFinderForm onResults={handleNewResults} onLoadingChange={handleLoadingChange} />
      </div>
      
      {(results || isLoading) && (
        <div className="max-w-3xl mx-auto mt-12">
         <StyleFinderResults results={results} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
}
