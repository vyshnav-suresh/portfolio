"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ArrowRight, Star, Clock, ChevronRight } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedAt: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
}

const CATEGORIES = ["All", "Full Stack", "Backend", "Frontend", "GenAI & Automation", "Career"];

const MOCK_POSTS: BlogPost[] = [
  {
    _id: "mock-1",
    title: "Building an AI-Powered Product Video Generator with Veo3, Remotion, and n8n",
    slug: "ai-powered-video-generator",
    subtitle: "Exploration of an automated pipeline that transforms raw product data into cinematic video ads. We dive deep into React-based video orchestration and low-code automation.",
    category: "GenAI & Automation",
    readTime: "12 Min Read",
    publishedAt: new Date("2024-09-25").toISOString(),
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["AI", "Video Generation", "n8n", "Remotion"],
  },
  {
    _id: "mock-2",
    title: "Distributed Caching Patterns: Redis vs Memcached",
    slug: "distributed-caching-redis-vs-memcached",
    subtitle: "When and why to choose specific caching strategies for globally distributed applications.",
    category: "Backend",
    readTime: "8 Min Read",
    publishedAt: new Date("2024-10-12").toISOString(),
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["Redis", "Caching", "Backend"],
  },
  {
    _id: "mock-3",
    title: "Implementing Granular RBAC in NestJS and React",
    slug: "granular-rbac-nestjs-react",
    subtitle: "Securing your enterprise apps with opinionated guards and shared permission models.",
    category: "Full Stack",
    readTime: "10 Min Read",
    publishedAt: new Date("2024-09-28").toISOString(),
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["NestJS", "RBAC", "React", "Security"],
  },
  {
    _id: "mock-4",
    title: "Scaling Low-Code: n8n for Enterprise Pipelines",
    slug: "scaling-n8n-enterprise",
    subtitle: "How we replaced 300+ lines of boilerplate code with resilient, visual automation.",
    category: "GenAI & Automation",
    readTime: "11 Min Read",
    publishedAt: new Date("2024-09-15").toISOString(),
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["n8n", "Automation", "Enterprise"],
  },
  {
    _id: "mock-5",
    title: "TanStack Query vs SWR: The Data Fetching War",
    slug: "tanstack-query-vs-swr",
    subtitle: "An objective look at state management and server-cache synchronisation choices.",
    category: "Frontend",
    readTime: "8 Min Read",
    publishedAt: new Date("2024-08-20").toISOString(),
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["React", "TanStack", "SWR"],
  },
  {
    _id: "mock-6",
    title: "Event-Driven Microservices with RabbitMQ",
    slug: "event-driven-microservices-rabbitmq",
    subtitle: "Designing loosely coupled systems that scale without breaking consistency.",
    category: "Backend",
    readTime: "9 Min Read",
    publishedAt: new Date("2024-08-12").toISOString(),
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["RabbitMQ", "Microservices", "Node.js"],
  },
  {
    _id: "mock-7",
    title: "From Junior to Senior: The Unspoken Lessons",
    slug: "junior-to-senior-unspoken-lessons",
    subtitle: "Moving beyond code to focus on systems, people, and business impact.",
    category: "Career",
    readTime: "5 Min Read",
    publishedAt: new Date("2024-07-25").toISOString(),
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["Career", "Engineering", "Leadership"],
  },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCount, setShowCount] = useState(6);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        const dbPosts: BlogPost[] = Array.isArray(data) && data.length > 0 ? data : [];
        setPosts([...dbPosts, ...MOCK_POSTS]);
      } catch {
        setPosts(MOCK_POSTS);
      }
    };
    fetchPosts();
  }, []);

  const filtered = posts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q) || (p.tags || []).some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const featured = filtered.find((p) => p.featured);
  const others = filtered.filter((p) => !p.featured);
  const displayedOthers = others.slice(0, showCount);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="pt-16 pb-12 px-6 border-b border-gray-100">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="inline-block text-primary text-[11px] font-bold uppercase tracking-widest mb-4 border border-primary/20 bg-light-blue px-3 py-1 rounded-full">
            Writing &amp; Thoughts
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-gray-900 mb-4">Blog</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Technical insights on Full Stack development, Generative AI automation, and architectural patterns from a Senior Engineer&apos;s perspective.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-lg mx-auto relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for technical articles, stacks, or keywords..."
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors bg-white shadow-sm"
            />
          </div>

          {/* Category Filters */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="px-6 py-12">
          <div className="container mx-auto max-w-5xl">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-64 md:h-auto min-h-[320px] bg-gray-100 overflow-hidden">
                  {featured.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                      <span className="text-gray-400 text-4xl">📝</span>
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="bg-white p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center gap-1 bg-amber-50 text-amber-600 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-100">
                      <Star size={10} /> Featured
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider flex items-center gap-1">
                      <Clock size={11} /> {featured.readTime}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">{featured.category}</span>
                  <h2 className="font-display text-2xl md:text-3xl text-gray-900 mb-4 leading-tight group-hover:text-primary transition-colors">{featured.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">{featured.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">VS</div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Vyshnav Suresh</p>
                        <p className="text-xs text-gray-400">{formatDate(featured.publishedAt)}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Latest Articles Grid */}
      {displayedOthers.length > 0 && (
        <section className="px-6 pb-16">
          <div className="container mx-auto max-w-5xl">
            <h2 className="font-display text-2xl text-gray-900 mb-8">Latest Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {displayedOthers.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  {/* Card image */}
                  <div className="h-44 bg-gray-100 overflow-hidden">
                    {post.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                        <span className="text-gray-300 text-3xl">📝</span>
                      </div>
                    )}
                  </div>
                  {/* Card content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{post.category}</span>
                    </div>
                    <h3 className="font-display text-base text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">{post.subtitle}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{post.readTime}</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            {others.length > showCount && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowCount((c) => c + 6)}
                  className="px-8 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  Load More Articles
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-24 px-6">
          <p className="text-gray-400 text-lg">No articles match your search.</p>
          <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="mt-4 text-primary text-sm font-medium hover:underline flex items-center gap-1 mx-auto">
            Clear filters <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Newsletter CTA */}
      <section className="bg-gray-50 border-t border-gray-200 px-6 py-16 text-center">
        <h2 className="font-display text-3xl text-gray-900 mb-3">Stay updated</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
          I occasionally send out technical deep-dives and early access to my open source projects. No spam, ever.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <button className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 bg-white">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-display text-primary text-lg">Portfolio</p>
          <p className="text-xs text-gray-400">© 2026 Vyshnav Suresh · Senior Full Stack Engineer. Built with precision.</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            <Link href="/#contact" className="hover:text-primary transition-colors">Reach Out</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
