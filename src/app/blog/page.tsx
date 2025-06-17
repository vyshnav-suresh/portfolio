"use client"
import React, { useState } from "react";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { BlogPost } from "./supabase.types";
import Link from "next/link";
import { DateClient } from "./DateClient";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";



export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, content, tags, created_at, updated_at, status,featured_image_url")
        .eq("status", "active");
      if (error) {
        // Optionally handle error (show toast, etc.)
        setPosts([]);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="blog-main min-h-screen py-12 bg-gradient-to-br from-background via-accent/10 to-muted text-foreground">
  {/* <Container size="lg" padding="default" className="mt-20"> */}
    {/* Hero Section */}
    <section className="text-center mb-10">
      <Heading as="h1" size="display" variant="gradient" align="center" className="mb-3">
        Blog & Insights
      </Heading>
      <Text as="p" size="lg" variant="muted" align="center" className="max-w-2xl mx-auto mb-2">
        Insights, tutorials, and stories from my journey in tech, AI, and beyond.
      </Text>
    </section>

        {/* Search Bar */}
        <div className="flex items-center max-w-lg mx-auto mb-10 bg-card border border-accent rounded-xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-accent">
  <svg className="w-5 h-5 text-muted mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
  <input
    type="text"
    placeholder="Search blog posts..."
    value={search}
    onChange={e => setSearch(e.target.value)}
    className="w-full bg-transparent outline-none text-lg text-foreground placeholder:text-muted-foreground"
  />
</div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-6 max-w-3xl mx-auto">
  <Text as="span" size="sm" variant="muted">{filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}</Text>
  <div className="flex items-center gap-2">
    <Badge variant="accent" size="sm">All</Badge>
    <Badge variant="info" size="sm">Trending</Badge>
    <Badge variant="secondary" size="sm">Recent</Badge>
  </div>
</div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <article
            className="group flex flex-col justify-between h-full bg-card border border-border rounded-xl shadow-lg transition-shadow duration-200 p-6 mb-10 relative"
            tabIndex={0}
          >
            <Link href={`/blog/${filteredPosts[0].id}`} tabIndex={-1}>
              {filteredPosts[0].featured_image_url ? (
                <Image
                  src={filteredPosts[0].featured_image_url}
                  alt={`Featured image for ${filteredPosts[0].title}`}
                  className="w-full object-cover rounded-xl mb-2 border border-accent max-h-[240px]"
                  width={800}
                  height={400}
                  priority
                />
              ) : (
                <div className="w-full h-[120px] flex items-center justify-center bg-muted rounded-xl mb-2">
                  <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="2 2" />
                    <circle cx="8" cy="8" r="2" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              )}
              {filteredPosts[0].status === 'featured' && (
                <Badge variant="accent" size="sm" className="absolute top-4 left-4 z-10 shadow">FEATURED</Badge>
              )}
            </Link>
            <Link href={`/blog/${filteredPosts[0].id}`} className="block focus:outline-none group-hover:underline mt-3">
              <Heading as="h2" size="h3" weight="bold" className="text-accent group-hover:text-primary cursor-pointer mb-1">
                {filteredPosts[0].title}
              </Heading>
            </Link>
            <div className="flex flex-wrap gap-2 mb-2 mt-2">
              {filteredPosts[0].tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" size="sm">#{tag}</Badge>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
              <span className="flex items-center gap-1"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> <DateClient iso={filteredPosts[0].created_at} /></span>
              <span className="italic">Updated: <DateClient iso={filteredPosts[0].updated_at} /></span>
              <Badge variant={filteredPosts[0].status === 'featured' ? 'accent' : 'secondary'} size="sm" className="ml-auto">{filteredPosts[0].status}</Badge>
            </div>
            <Text as="div" size="base" className="line-clamp-4 mt-2 mb-4 relative text-primary text-lg">
              <span className="bg-gradient-to-t from-background via-background/80 to-transparent absolute bottom-0 left-0 w-full h-6 pointer-events-none" aria-hidden="true" />
              {filteredPosts[0].excerpt ? filteredPosts[0].excerpt : (filteredPosts[0].content.length > 180 ? filteredPosts[0].content.slice(0, 180) + '...' : filteredPosts[0].content)}
            </Text>
          </article>
        )}

        {/* Blog Posts Grid */}
        <div className="flex flex-col lg:flex-row lg:justify-between mb-10">
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
  {loading ? (
    <div className="col-span-full text-center text-slate-400 animate-pulse py-12">
      Loading posts...
    </div>
  ) : filteredPosts.length === 0 ? (
    <div className="col-span-full text-center text-slate-400 py-12">
      No posts found.
    </div>
  ) : (
    filteredPosts.map((post) => (
      <Link href={`/blog/${post.id}`} key={post.id} className="group">
  <article className="flex flex-col justify-between h-full bg-card border border-border rounded-xl shadow hover:shadow-lg transition-shadow duration-200 p-4 min-h-[200px]">
    {/* Category/Tag at top */}
    <div>
      <Badge variant="accent" size="sm" className="mb-1">
        {post.tags && post.tags.length > 0 ? post.tags[0] : 'Blog'}
      </Badge>
      <Heading as="h3" size="h5" weight="semibold" className="mb-1 line-clamp-2 group-hover:text-accent transition-colors">
        {post.title}
      </Heading>
      {/* Show additional tags as chips below title, if any */}
      {post.tags && post.tags.length > 1 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {post.tags.slice(1).map(tag => (
            <Badge key={tag} variant="secondary" size="sm" className="text-[10px]">#{tag}</Badge>
          ))}
        </div>
      )}
    </div>
    {/* Image or placeholder always at bottom */}
    <div className="w-full mt-2 rounded-lg overflow-hidden border border-muted bg-muted/40 flex items-center justify-center min-h-[70px] max-h-[90px]">
      {post.featured_image_url ? (
        <img
          src={post.featured_image_url}
          alt={post.title}
          className="object-contain w-full h-full max-h-[90px]"
        />
      ) : (
        <div className="w-full h-[60px] flex items-center justify-center text-muted-foreground">
          <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="2 2" />
            <circle cx="8" cy="8" r="2" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
      )}
    </div>
  </article>
</Link>
    ))
  )}
</section>

          {/* Trending/Recent Posts */}
          <aside className="hidden lg:block lg:w-1/4 lg:ml-10">
            <Heading as="h3" size="h4" weight="bold" className="mb-2 text-accent">Trending Posts</Heading>
            <ul>
              {filteredPosts.slice(0, 5).map((post) => (
                <li key={post.id} className="mb-4">
                  <Link href={`/blog/${post.id}`}>
                    <Text as="div" size="base" weight="semibold" className="text-accent hover:text-primary transition-colors cursor-pointer">
                      {post.title}
                    </Text>
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    <DateClient iso={post.created_at} />
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Newsletter/CTA Section */}
        <section className="mt-16 flex flex-col items-center justify-center">
          <div className="bg-gradient-to-r from-highlight to-primary text-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-3xl flex flex-col items-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Join our newsletter</h3>
            <p className="mb-4 text-lg text-white/90">Be the first to hear about new posts, insights, and tips!</p>
            <form className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
              <input type="email" placeholder="Your email" className="px-4 py-2 rounded-full text-slate-900 focus:outline-none w-full" />
              <button type="submit" className="bg-white text-highlight font-semibold px-6 py-2 rounded-full hover:bg-slate-100 transition">Subscribe</button>
            </form>
          </div>
        </section>
    {/* </Container> */}
      </div>
);
}

