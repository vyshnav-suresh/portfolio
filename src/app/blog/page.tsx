"use client"
import React, { useState } from "react";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { BlogPost } from "./supabase.types";
import Link from "next/link";
import { DateClient } from "./DateClient";



export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, content, tags, created_at, updated_at, status")
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
    <main className="blog-main min-h-screen py-12 px-4 md:px-0" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      
      {/* Hero Section */}
      <section className="text-center py-12 md:py-16 mb-10 bg-gradient-to-br from-accent via-blue-400 to-accent-hover rounded-3xl shadow-lg">
        <h1 className="font-heading text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-hover drop-shadow-lg mb-4">
          Welcome to the Blog
        </h1>
        <p className="text-xl md:text-2xl text-foreground/90 max-w-2xl mx-auto mb-2">
          Insights, tutorials, and stories from my journey in tech, AI, and beyond.
        </p>
      </section>

      {/* Search Bar */}
      <div className="flex items-center max-w-lg mx-auto mb-10 bg-card border border-border rounded-2xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-accent">
        <svg className="w-5 h-5 text-muted mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        <input
          type="text"
          placeholder="Search blog posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-transparent outline-none text-lg placeholder:text-muted"
        />
      </div>

      {/* Blog Posts Grid */}
      <div className="flex items-center justify-between mb-6 max-w-3xl mx-auto">
        <span className="text-sm text-muted">{filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}</span>
      </div>
      <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {loading ? (
          <div className="col-span-full text-center text-muted animate-pulse py-12">
            Loading posts...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="col-span-full text-center text-muted py-12">
            No posts found.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <article
              key={post.id}
              className="card group flex flex-col gap-3 transition-transform duration-200 hover:scale-[1.03] relative overflow-hidden"
              tabIndex={0}
            >
              {/* Featured image */}
              {post.image && (
                <Link href={`/blog/${post.id}`} tabIndex={-1}>
                  <img src={post.image} alt={post.title} className="card-image w-full object-cover" />
                </Link>
              )}
              {/* Accent bar */}
              <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent to-accent-hover rounded-l-2xl" aria-hidden="true" />
              <Link href={`/blog/${post.id}`} className="block focus:outline-none group-hover:underline">
                <h2 className="card-title transition-colors group-hover:text-accent-hover">
                  {post.title}
                </h2>
              </Link>
              {/* Author, category, reading time */}
              <div className="flex items-center gap-3 card-meta mb-1">
                {post.author?.image && (
                  <img src={post.author.image} alt={post.author.name} className="w-7 h-7 rounded-full object-cover border border-border" />
                )}
                {post.author?.name && <span className="card-author">{post.author.name}</span>}
                {post.category && <span className="card-tag">{post.category}</span>}
                {post.reading_time && <span className="text-muted">{post.reading_time}</span>}
              </div>
              {/* Tags */}
              <div className="mb-2">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="card-tag">
                    #{tag}
                  </span>
                ))}
              </div>
              {/* Date */}
              <div className="card-date">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <DateClient iso={post.created_at} />
              </div>
              {/* Excerpt */}
              <div className="card-excerpt line-clamp-4 mt-2 mb-4 relative">
                <span className="bg-gradient-to-t from-background via-background/80 to-transparent absolute bottom-0 left-0 w-full h-6 pointer-events-none" aria-hidden="true" />
                {post.excerpt ? post.excerpt : (post.content.length > 180 ? post.content.slice(0, 180) + '...' : post.content)}
              </div>
              {/* Read More button */}
              <Link href={`/blog/${post.id}`} className="accent-link inline-block mt-auto ml-auto rounded px-3 py-1 transition-colors">
                Read more &rarr;
              </Link>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
