
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  content: string; // HTML content
  author: string;
  tags: string[];
  dataAiHint?: string;
}

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
