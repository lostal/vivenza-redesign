"use client";

import { useState, useMemo } from 'react';
import ProductCard from '@/components/product/product-card';
import ProductFilter from '@/components/product/product-filter';
import SectionTitle from '@/components/section-title';
import { placeholderProducts } from '@/lib/placeholder-data';
import type { Product } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return placeholderProducts.filter((product) => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const searchTermMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchTermMatch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="container py-12 md:py-16">
      <SectionTitle
        title="Our Products"
        description="Explore our wide range of high-quality bathroom and home solutions."
      />
      
      <div className="my-8 max-w-md mx-auto relative">
        <Input 
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 text-lg"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      <ProductFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
