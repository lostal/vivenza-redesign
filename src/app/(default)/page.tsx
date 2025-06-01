import HeroShowcase from '@/components/hero-showcase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Rss, Lightbulb } from 'lucide-react';
import { placeholderBlogPosts } from '@/lib/placeholder-data';
import SectionTitle from '@/components/section-title';

export default function HomePage() {
  return (
    <div>
      <HeroShowcase />

      {/* AI Style Finder Teaser */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container text-center">
           <SectionTitle
            icon={<Lightbulb className="h-8 w-8 text-primary" />}
            title="Descubre Tu Estilo Ideal"
            description="Sube una foto de tu espacio y deja que nuestra IA te ofrezca un análisis de diseño e inspiración."
          />
          <div className="mt-10">
            <Button asChild size="lg" variant="default">
              <Link href="/style-finder">Probar Buscador de Estilos IA <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
          <div className="mt-12 max-w-3xl mx-auto">
             <Image src="https://placehold.co/800x450.png" alt="Ejemplo Buscador de Estilos IA" width={800} height={450} className="rounded-lg shadow-lg" data-ai-hint="interior design moodboard" />
          </div>
        </div>
      </section>

      {/* Blog Highlights Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <SectionTitle
            icon={<Rss className="h-8 w-8 text-primary" />}
            title="De Nuestro Blog"
            description="Últimas noticias, tendencias de diseño e inspiración."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {placeholderBlogPosts.slice(0, 3).map((post) => (
              <Card key={post.id} className="overflow-hidden transition-all hover:shadow-xl animate-slide-in-up">
                 <CardHeader className="p-0">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="object-cover aspect-[3/2]"
                    data-ai-hint={post.dataAiHint}
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                  <p className="text-xs text-muted-foreground mb-2">{new Date(post.date).toLocaleDateString('es-ES')}</p>
                  <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</CardDescription>
                   <Button asChild variant="link" className="p-0 h-auto text-primary">
                     <Link href={`/blog/${post.slug}`}>Leer Más <ArrowRight className="ml-1 h-4 w-4" /></Link>
                   </Button>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/blog">Visita Nuestro Blog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Location Teaser Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container text-center">
          <SectionTitle
            icon={<MapPin className="h-8 w-8 text-primary" />}
            title="Visita Nuestros Showrooms"
            description="Experimenta la calidad Vivenza de primera mano en nuestras ubicaciones de exposición."
          />
          <div className="mt-10">
            <Button asChild size="lg" variant="default">
              <Link href="/locations">Encuentra una Ubicación <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
           <div className="mt-12 max-w-4xl mx-auto relative aspect-video">
             <Image src="https://placehold.co/1000x500.png" alt="Mapa con ubicaciones de showrooms" layout="fill" objectFit="cover" className="rounded-lg shadow-lg" data-ai-hint="city map location" />
          </div>
        </div>
      </section>
    </div>
  );
}
