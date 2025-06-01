import SectionTitle from '@/components/section-title';
import BlogPostCard from '@/components/blog/blog-post-card';
import { placeholderBlogPosts } from '@/lib/placeholder-data';

export default function BlogPage() {
  return (
    <div className="container py-12 md:py-16">
      <SectionTitle
        title="Noticias e Inspiración Vivenza"
        description="Mantente al día con las últimas tendencias, inspiración de diseño y noticias de la empresa."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {placeholderBlogPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      {/* Añadir paginación si hay muchas entradas */}
    </div>
  );
}
