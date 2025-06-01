import HeroShowcase from '@/components/hero-showcase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Rss, Lightbulb } from 'lucide-react';
import { placeholderProducts, placeholderBlogPosts, placeholderLocations } from '@/lib/placeholder-data';
import SectionTitle from '@/components/section-title';

export default function HomePage() {
  return (
    <div>
      <HeroShowcase />

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <SectionTitle
            title="Featured Products"
            description="Handpicked selections from our latest collections."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {placeholderProducts.slice(0, 3).map((product) => (
              <Card key={product.id} className="overflow-hidden transition-all hover:shadow-xl animate-slide-in-up">
                <CardHeader className="p-0">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="object-cover aspect-[3/2]"
                    data-ai-hint={product.dataAiHint}
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-muted-foreground mb-4">{product.category}</CardDescription>
                  <Button asChild variant="outline">
                    <Link href={`/products#${product.id}`}>View Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/products">Explore All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AI Style Finder Teaser */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container text-center">
           <SectionTitle
            icon={<Lightbulb className="h-8 w-8 text-primary" />}
            title="Find Your Perfect Style"
            description="Upload a photo of your space and let our AI suggest the perfect Vivenza products."
          />
          <div className="mt-10">
            <Button asChild size="lg" variant="default">
              <Link href="/style-finder">Try AI Style Finder <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
          <div className="mt-12 max-w-3xl mx-auto">
             <Image src="https://placehold.co/800x450.png" alt="AI Style Finder example" width={800} height={450} className="rounded-lg shadow-lg" data-ai-hint="interior design moodboard" />
          </div>
        </div>
      </section>

      {/* Blog Highlights Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <SectionTitle
            icon={<Rss className="h-8 w-8 text-primary" />}
            title="From Our Blog"
            description="Latest news, design trends, and inspiration."
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
                  <p className="text-xs text-muted-foreground mb-2">{new Date(post.date).toLocaleDateString()}</p>
                  <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</CardDescription>
                   <Button asChild variant="link" className="p-0 h-auto text-primary">
                     <Link href={`/blog/${post.slug}`}>Read More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                   </Button>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/blog">Visit Our Blog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Location Teaser Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container text-center">
          <SectionTitle
            icon={<MapPin className="h-8 w-8 text-primary" />}
            title="Visit Our Showrooms"
            description="Experience Vivenza quality firsthand at our exhibition locations."
          />
          <div className="mt-10">
            <Button asChild size="lg" variant="default">
              <Link href="/locations">Find a Location <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
           <div className="mt-12 max-w-4xl mx-auto relative aspect-video">
             <Image src="https://placehold.co/1000x500.png" alt="Map with showroom locations" layout="fill" objectFit="cover" className="rounded-lg shadow-lg" data-ai-hint="city map location" />
          </div>
        </div>
      </section>
    </div>
  );
}
