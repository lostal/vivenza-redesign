"use client";

import { Button } from '@/components/ui/button';
import { productCategories } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';

interface ProductFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function ProductFilter({ selectedCategory, onSelectCategory }: ProductFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-2 justify-center">
      {productCategories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          onClick={() => onSelectCategory(category)}
          className={cn("transition-all", selectedCategory === category ? "shadow-md" : "")}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
