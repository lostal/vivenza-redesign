/**
 * Tipos centralizados del proyecto
 */

// Tipos de ubicación
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

// Tipos de producto
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
  dataAiHint?: string;
}

// Tipos de blog
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  imageUrl: string;
  excerpt: string;
  content: string;
  tags?: string[];
  dataAiHint?: string;
}

// Tipos de exposición (showrooms)
export interface Showroom {
  id: string;
  name: string;
  addressLines: string[];
  phone: string;
}

export interface CommunityExhibitions {
  id: string;
  communityName: string;
  showrooms: Showroom[];
}

// Tipos de navegación
export interface NavLink {
  href: string;
  label: string;
  isScroll: boolean;
}
