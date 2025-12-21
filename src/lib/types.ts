export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  imageUrl: string;
  lat: number;
  lng: number;
  openingHours: string;
  dataAiHint?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
  dataAiHint?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string; // Consider using Date type if performing date operations
  author: string;
  imageUrl: string;
  excerpt: string;
  content: string; // HTML content
  tags?: string[];
  dataAiHint?: string;
}
