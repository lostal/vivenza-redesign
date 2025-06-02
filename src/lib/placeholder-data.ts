
import type { Location, Product, BlogPost } from '@/lib/types';

export const placeholderProducts: Product[] = [
  // Example product (optional, can be an empty array if preferred)
  // {
  //   id: 'prod1',
  //   name: 'Grifo Moderno XL',
  //   category: 'Baño',
  //   description: 'Un grifo elegante y moderno para tu lavabo.',
  //   imageUrl: 'https://placehold.co/600x450.png',
  //   price: 120.99,
  //   dataAiHint: 'modern faucet'
  // }
];

export const productCategories: string[] = [
  'Todo',
  'Baño',
  'Cocina',
  'Hogar',
  'Cerámica',
  'Grifería'
];

export const placeholderBlogPosts: BlogPost[] = [
  // Example blog post (optional, can be an empty array if preferred)
  // {
  //   id: 'post1',
  //   slug: 'ideas-bano-moderno',
  //   title: 'Ideas Increíbles para un Baño Moderno',
  //   date: '2024-05-15',
  //   author: 'Equipo Vivenza',
  //   imageUrl: 'https://placehold.co/600x338.png',
  //   excerpt: 'Descubre las últimas tendencias en diseño de baños modernos...',
  //   content: '<p>Contenido completo del artículo aquí...</p>',
  //   tags: ['Baño Moderno', 'Diseño'],
  //   dataAiHint: 'modern bathroom design'
  // }
];

export const placeholderLocations: Location[] = [
  {
    id: '1',
    name: 'Showroom Vivenza Centro',
    address: 'Calle Principal 123, Cualquier Ciudad, País 12345',
    phone: '+34 900 123 456',
    imageUrl: 'https://placehold.co/600x400.png',
    lat: 40.416775,
    lng: -3.703790,
    openingHours: 'Lun-Sáb: 10 AM - 7 PM, Dom: 12 PM - 5 PM',
    dataAiHint: 'modern showroom',
  },
  {
    id: '2',
    name: 'Galería Vivenza Norte',
    address: 'Avenida del Roble 456, Otra Villa, País 67890',
    phone: '+34 900 987 654',
    imageUrl: 'https://placehold.co/600x400.png',
    lat: 40.516775,
    lng: -3.803790,
    openingHours: 'Lun-Vie: 9 AM - 6 PM, Sáb: 10 AM - 4 PM',
    dataAiHint: 'store interior',
  },
];
