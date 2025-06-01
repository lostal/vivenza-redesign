import type { Product, BlogPost, Location } from '@/lib/types';

export const placeholderProducts: Product[] = [
  {
    id: '1',
    name: 'AquaSleek Faucet',
    category: 'Faucets',
    imageUrl: 'https://placehold.co/600x400.png',
    description: 'A modern and elegant faucet with water-saving technology.',
    price: 199.99,
    dataAiHint: 'modern faucet',
  },
  {
    id: '2',
    name: 'Zenith Shower System',
    category: 'Showers',
    imageUrl: 'https://placehold.co/600x400.png',
    description: 'Experience luxury with this all-in-one rainfall shower system.',
    price: 499.50,
    dataAiHint: 'luxury shower',
  },
  {
    id: '3',
    name: 'Terra Vanity Unit',
    category: 'Vanities',
    imageUrl: 'https://placehold.co/600x400.png',
    description: 'Spacious and stylish vanity unit with ample storage.',
    price: 349.00,
    dataAiHint: 'bathroom vanity',
  },
  {
    id: '4',
    name: 'Lumina Mirror Cabinet',
    category: 'Mirrors',
    imageUrl: 'https://placehold.co/600x400.png',
    description: 'LED-lit mirror cabinet with anti-fog feature.',
    price: 279.99,
    dataAiHint: 'led mirror',
  },
  {
    id: '5',
    name: 'Serene Freestanding Tub',
    category: 'Bathtubs',
    imageUrl: 'https://placehold.co/600x400.png',
    description: 'A beautiful centerpiece for any modern bathroom.',
    price: 899.00,
    dataAiHint: 'freestanding bathtub',
  },
  {
    id: '6',
    name: 'Compacto Toilet',
    category: 'Toilets',
    imageUrl: 'https://placehold.co/600x400.png',
    description: 'Space-saving and efficient dual-flush toilet.',
    price: 299.00,
    dataAiHint: 'modern toilet',
  },
];

export const placeholderBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'top-bathroom-trends-2024',
    title: 'Top Bathroom Trends for 2024',
    date: '2024-07-15',
    excerpt: 'Discover the latest styles and innovations in bathroom design for the upcoming year.',
    imageUrl: 'https://placehold.co/800x500.png',
    content: '<p>The world of bathroom design is constantly evolving. In 2024, we\'re seeing a shift towards...</p>',
    author: 'Jane Doe',
    tags: ['trends', 'design', 'bathroom'],
    dataAiHint: 'bathroom design',
  },
  {
    id: '2',
    slug: 'creating-a-spa-like-retreat',
    title: 'Creating a Spa-Like Retreat at Home',
    date: '2024-06-28',
    excerpt: 'Transform your bathroom into a personal sanctuary with these tips and tricks.',
    imageUrl: 'https://placehold.co/800x500.png',
    content: '<p>Your bathroom can be more than just a functional space. With a few key changes, you can create...</p>',
    author: 'John Smith',
    tags: ['spa', 'luxury', 'home improvement'],
    dataAiHint: 'spa bathroom',
  },
  {
    id: '3',
    slug: 'sustainable-bathroom-choices',
    title: 'Sustainable Choices for an Eco-Friendly Bathroom',
    date: '2024-05-10',
    excerpt: 'Learn how to make your bathroom greener with sustainable products and practices.',
    imageUrl: 'https://placehold.co/800x500.png',
    content: '<p>Sustainability is more important than ever. Here\'s how you can make eco-friendly choices for your bathroom...</p>',
    author: 'Alice Green',
    tags: ['sustainability', 'eco-friendly', 'green design'],
    dataAiHint: 'eco bathroom',
  },
];

export const placeholderLocations: Location[] = [
  {
    id: '1',
    name: 'Vivenza Downtown Showroom',
    address: '123 Main Street, Anytown, USA 12345',
    phone: '+1 (555) 123-4567',
    imageUrl: 'https://placehold.co/600x400.png',
    lat: 34.0522,
    lng: -118.2437,
    openingHours: 'Mon-Sat: 10 AM - 7 PM, Sun: 12 PM - 5 PM',
    dataAiHint: 'modern showroom',
  },
  {
    id: '2',
    name: 'Vivenza Northside Gallery',
    address: '456 Oak Avenue, Otherville, USA 67890',
    phone: '+1 (555) 987-6543',
    imageUrl: 'https://placehold.co/600x400.png',
    lat: 34.1522,
    lng: -118.3437,
    openingHours: 'Mon-Fri: 9 AM - 6 PM, Sat: 10 AM - 4 PM',
    dataAiHint: 'store interior',
  },
];

export const productCategories = [
  'All', 'Faucets', 'Showers', 'Vanities', 'Mirrors', 'Bathtubs', 'Toilets'
];
