import { placeholderBlogPosts } from '@/lib/placeholder-data';
import type { BlogPost } from '@/lib/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, UserCircle, Tag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Simulate fetching a single blog post
async function getPost(slug: string): Promise<BlogPost | undefined> {
  return placeholderBlogPosts.find((post) => post.slug === slug);
}

export async function generateStaticParams() {
  return placeholderBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container py-12 md:py-16 max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/blog">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <header className="mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center space-x-4 text-sm text-muted-foreground mb-6">
          <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1.5" /> Published on {new Date(post.date).toLocaleDateString()}</span>
          <span className="flex items-center"><UserCircle className="h-4 w-4 mr-1.5" /> By {post.author}</span>
        </div>
        {post.imageUrl && (
          <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden shadow-lg mb-8">
            <Image
              src={post.imageUrl}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint={post.dataAiHint || 'blog hero image'}
            />
          </div>
        )}
      </header>

      <div
        className="prose prose-invert prose-lg max-w-none prose-headings:font-headline prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-primary hover:prose-a:text-accent prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border/40">
          <h3 className="text-lg font-semibold mb-3 flex items-center text-foreground">
            <Tag className="h-5 w-5 mr-2 text-primary" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
