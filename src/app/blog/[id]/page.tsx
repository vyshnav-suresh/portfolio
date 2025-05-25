import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';

import { DateClient } from "../DateClient";
import { CopyLinkButton } from "../CopyLinkButton";

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, content, tags, created_at, updated_at, image')
    .eq('id', params.id)
    .single();
  if (!data) return {};
  const description = data.content?.replace(/<[^>]+>/g, '').slice(0, 160) || data.title;
  return {
    title: data.title,
    description,
    keywords: data.tags,
    openGraph: {
      title: data.title,
      description,
      type: 'article',
      publishedTime: data.created_at,
      modifiedTime: data.updated_at,
      tags: data.tags,
      images: data.image ? [data.image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description,
      images: data.image ? [data.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  console.log("datadsfsdf");

  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, content, tags, created_at, updated_at, status')
    .eq('id', params.id)
    .eq('status', 'active')
    .single();

  console.log("data",data);
  if (error || !data) {
    return notFound();
  }

  return (
    <main className="max-w-6xl mx-auto py-20 px-4 min-h-screen bg-background text-foreground">
      {/* Back to Blog */}
      <div className="mb-8">
        <a href="/blog" className="inline-flex items-center gap-2 text-accent hover:underline font-semibold">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          Back to Blog
        </a>
      </div>
      <article className="bg-card border border-border rounded-2xl p-6 md:p-16 lg:p-24 shadow-xl mb-16 mt-8 animate-fade-in">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-accent">{data.title}</h1>
        {/* Meta: Date, Updated, Tags */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-muted text-sm">
          <span className="flex items-center gap-1">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <DateClient iso={data.created_at} />
          </span>
          {data.updated_at && data.updated_at !== data.created_at && (
            <span className="flex items-center gap-1">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
              Updated: <DateClient iso={data.updated_at} />
            </span>
          )}
          <span className="flex items-center gap-2 flex-wrap">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 7h10M7 12h4m1 8a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/></svg>
            {data.tags.map((tag: string) => (
              <span key={tag} className="inline-block px-3 py-1 rounded-lg bg-muted text-xs font-semibold text-foreground/80 mr-1">#{tag}</span>
            ))}
          </span>
        </div>
        {/* Share & Copy */}
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(data.title)}&url=${typeof window !== 'undefined' ? window.location.href : ''}`} target="_blank" rel="noopener noreferrer" className="accent-link flex items-center gap-1">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.09 9.09 0 0 1-2.88 1.1A4.48 4.48 0 0 0 16.5 0c-2.5 0-4.5 2-4.5 4.5 0 .35.04.7.1 1.04A12.94 12.94 0 0 1 3 1.6s-4 9 5 13a13.38 13.38 0 0 1-7 2c9 5 20 0 20-11.5 0-.18 0-.36-.02-.54A7.72 7.72 0 0 0 23 3z"/></svg>
            Share on Twitter
          </a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${typeof window !== 'undefined' ? window.location.href : ''}&title=${encodeURIComponent(data.title)}`} target="_blank" rel="noopener noreferrer" className="accent-link flex items-center gap-1">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            Share on LinkedIn
          </a>
          <CopyLinkButton />
        </div>
        {/* Content */}
        <div className="prose prose-invert text-lg max-w-4xl mx-auto leading-relaxed" style={{wordBreak: 'break-word'}} dangerouslySetInnerHTML={{ __html: data.content }} />
      </article>
    </main>
  );
}
