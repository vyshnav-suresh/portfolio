import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';

import Link from 'next/link';
import { CopyLinkButton } from '../CopyLinkButton';
import { DateClient } from '../DateClient';

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";

// Type inference for Next.js App Router
type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BlogPostPage({ params }: PageProps) {

  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, content, tags, created_at, updated_at, status,featured_image_url')
    .eq('id', (await params).id)
    .eq('status', 'active')
    .single();

  console.log('data', data);
  if (error || !data) {
    return notFound();
  }

  return (
    <Container size="lg" padding="default" className="py-20 min-h-screen">
      <div className="pt-6">
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 hover:underline font-semibold text-accent">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
            Back to Blog
          </Link>
        </div>

        <article className="bg-card/90 border border-border rounded-2xl shadow-lg px-4 md:px-12 py-10 md:py-16 mb-10">
          {data.featured_image_url && (
            <div className="w-full flex justify-center mb-8">
              <img
                src={data.featured_image_url}
                alt={data.title}
                className="object-cover rounded-xl border border-muted max-h-[320px] w-full max-w-2xl shadow-sm"
              />
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
  {data.tags && data.tags.map((tag: string) => (
    <Badge key={tag} variant="accent" size="sm">{tag}</Badge>
  ))}
</div>
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(data.title)}&url=${typeof window !== 'undefined' ? window.location.href : ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="accent-link flex items-center gap-1"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.09 9.09 0 0 1-2.88 1.1A4.48 4.48 0 0 0 16.5 0c-2.5 0-4.5 2-4.5 4.5 0 .35.04.7.1 1.04A12.94 12.94 0 0 1 3 1.6s-4 9 5 13a13.38 13.38 0 0 1-7 2c9 5 20 0 20-11.5 0-.18 0-.36-.02-.54A7.72 7.72 0 0 0 23 3z" />
            </svg>
            Share on Twitter
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${typeof window !== 'undefined' ? window.location.href : ''}&title=${encodeURIComponent(data.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="accent-link flex items-center gap-1"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            Share on LinkedIn
          </a>
          <CopyLinkButton />
        </div>
        <div className="prose prose-invert text-lg max-w-4xl mx-auto leading-relaxed" style={{ wordBreak: 'break-word' }} dangerouslySetInnerHTML={{ __html: data.content }} />
      </article>

      </div>
    </Container>
  );
}