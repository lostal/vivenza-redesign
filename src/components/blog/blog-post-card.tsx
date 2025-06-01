import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/lib/types';
import { ArrowRight, CalendarDays, UserCircle } from 'lucide-react';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      <CardHeader className="p-0 relative aspect-[16/9]">
        <Link href={`/blog/${post.slug}`}>
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={600}
              height={338}
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
              data-ai-hint={post.dataAiHint || 'blog article'}
            />
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <div className="mb-2 flex items-center space-x-3 text-xs text-muted-foreground">
          <span className="flex items-center"><CalendarDays className="h-3.5 w-3.5 mr-1.5" /> {new Date(post.date).toLocaleDateString()}</span>
          <span className="flex items-center"><UserCircle className="h-3.5 w-3.5 mr-1.5" /> {post.author}</span>
        </div>
        <CardTitle className="text-xl mb-2 font-headline line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm text-foreground/80 line-clamp-3 mb-4">{post.excerpt}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="link" className="p-0 h-auto text-primary font-semibold">
          <Link href={`/blog/${post.slug}`}>
            Read More <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
