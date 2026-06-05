import Link from "next/link";
import { ArrowLeft, Clock, Tag, ChevronRight, ExternalLink } from "lucide-react";
import { Metadata } from "next";
import connectToDatabase from "@/lib/mongodb";
import { BlogPost } from "@/models/BlogPost";
import { notFound } from "next/navigation";

interface TocEntry {
  id: string;
  label: string;
}

// ── Mock fallback for the featured article ──────────────────────────────────
const MOCK_ARTICLE = {
  title: "Building an AI-Powered Product Video Generator with Veo3, Remotion, and n8n",
  subtitle: "Exploration of an automated pipeline that transforms raw product data into cinematic video ads.",
  category: "GenAI & Automation",
  readTime: "12 Min Read",
  publishedAt: new Date("2024-09-25").toISOString(),
  image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  featured: true,
  tags: ["AI", "Video Generation", "n8n", "Remotion", "React"],
  tableOfContents: [
    { id: "vision", label: "The Vision: Automating Mood Storytelling" },
    { id: "orchestration", label: "Orchestration with n8n" },
    { id: "rendering", label: "Programmatic Video Rendering" },
    { id: "challenges", label: "Challenges &amp; Lessons" },
    { id: "results", label: "Results &amp; Next Steps" },
  ],
  content: `
    <h2 id="vision">The Vision: Automating Mood Storytelling</h2>
    <p>Modern e-commerce brands spend enormous resources producing high-quality product video content. What if we could automate the entire pipeline—from a simple product sheet to a cinematic, mood-driven video ad—using AI and low-code automation?</p>
    
    <blockquote>
      <p><strong>Key Insight:</strong> The hardest part isn't generating frames—it's orchestrating the narrative flow. That's where n8n and Remotion shine together.</p>
    </blockquote>
    
    <h2 id="orchestration">Orchestration with n8n</h2>
    <p>The pipeline begins with a webhook trigger in n8n that accepts a product payload. We then:</p>
    <ol>
      <li>Extract product attributes using an LLM node (OpenAI GPT-4o)</li>
      <li>Generate mood keywords and shot descriptions</li>
      <li>Dispatch scene generation prompts to Veo3 via Google's API</li>
      <li>Download generated clips and stage them for Remotion composition</li>
    </ol>

    <h2 id="rendering">Programmatic Video Rendering</h2>
    <p>Remotion handles the final assembly. Each product becomes a React component tree—scenes, transitions, text overlays, and audio sync are all driven by JSON configuration generated upstream.</p>

    <pre><code>// Remotion composition entry
export const ProductVideoComposition = () =&gt; (
  &lt;Composition
    id="ProductAd"
    component={ProductAdVideo}
    durationInFrames={fps * 30}
    fps={fps}
    width={1920}
    height={1080}
  /&gt;
);</code></pre>

    <h2 id="challenges">Challenges &amp; Lessons</h2>
    <p>The main bottleneck was video generation latency from Veo3. We resolved this with asynchronous polling in n8n's wait node and a status webhook to notify when clips were ready—keeping the pipeline non-blocking.</p>

    <h2 id="results">Results &amp; Next Steps</h2>
    <p>The system currently produces a 30-second product video in under 4 minutes, end-to-end. Next steps include multi-language voiceover via ElevenLabs and brand-specific style presets stored in a MongoDB collection.</p>
  `,
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  if (slug === "ai-powered-video-generator") {
    return {
      title: `${MOCK_ARTICLE.title} | Blog`,
      description: MOCK_ARTICLE.subtitle,
    };
  }

  try {
    await connectToDatabase();
    const post = await BlogPost.findOne({ slug }).lean();
    if (!post) return { title: "Article Not Found | Blog" };
    return {
      title: `${post.title} | Blog`,
      description: post.subtitle,
      openGraph: {
        title: post.title,
        description: post.subtitle,
        type: "article",
        images: post.image ? [post.image] : [],
      },
    };
  } catch {
    return { title: "Blog | Vyshnav Suresh" };
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Resolve article content
  let article: typeof MOCK_ARTICLE | null = null;

  if (slug === "ai-powered-video-generator") {
    article = MOCK_ARTICLE;
  } else {
    try {
      await connectToDatabase();
      const post = await BlogPost.findOne({ slug }).lean();
      if (post) {
        article = {
          title: post.title,
          subtitle: post.subtitle,
          category: post.category,
          readTime: post.readTime,
          publishedAt: post.publishedAt instanceof Date ? post.publishedAt.toISOString() : String(post.publishedAt),
          image: post.image || "",
          featured: post.featured || false,
          tags: post.tags || [],
          tableOfContents: (post.tableOfContents as TocEntry[] | undefined) || [],
          content: post.content,
        };
      }
    } catch {
      // db error
    }
  }

  if (!article) {
    notFound();
  }

  const toc: TocEntry[] = (article.tableOfContents || []) as TocEntry[];
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

  // Related mocks
  const RELATED = [
    { title: "Distributed Caching Patterns: Redis vs Memcached", slug: "distributed-caching-redis-vs-memcached", readTime: "8 Min Read", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
    { title: "Building a Custom Dataset for AI Fine-Tuning", slug: "custom-dataset-ai-fine-tuning", readTime: "10 Min Read", image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80" },
    { title: "The AI Tools Industry-Standard Video Stacks", slug: "ai-tools-video-stacks", readTime: "7 Min Read", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto max-w-6xl px-6 pt-8 hidden md:flex items-center space-x-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <ChevronRight size={14} />
        <span className="text-gray-600 font-medium line-clamp-1 max-w-xs">{article.title}</span>
      </div>

      {/* Hero */}
      <section className="pt-8 pb-0 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-[11px] font-bold text-primary uppercase tracking-widest bg-light-blue px-3 py-1 rounded-full">{article.category}</span>
            <span className="text-sm text-gray-400 flex items-center gap-1"><Clock size={13} /> {article.readTime}</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-gray-900 mb-5 leading-tight">{article.title}</h1>
          <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">{article.subtitle}</p>

          {/* Author row */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">VS</div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">Vyshnav Suresh</p>
              <p className="text-xs text-gray-400">Senior Full Stack Engineer · {formatDate(article.publishedAt)}</p>
            </div>
            <div className="ml-4 flex gap-2">
              {(article.tags || []).slice(0, 3).map((tag, i) => (
                <span key={i} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-md font-medium">{tag}</span>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md aspect-[16/7] mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="px-6 py-12">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Main Content */}
          <article className="lg:col-span-8">
            {/* Tags row */}
            <div className="flex items-center gap-2 flex-wrap mb-8 pb-6 border-b border-gray-100">
              <Tag size={14} className="text-gray-400" />
              {(article.tags || []).map((tag, i) => (
                <span key={i} className="text-xs border border-gray-200 text-gray-600 px-2.5 py-1 rounded-md hover:border-primary hover:text-primary cursor-pointer transition-colors">{tag}</span>
              ))}
            </div>

            {/* Article HTML body */}
            <div
              className="prose prose-gray max-w-none
                prose-h2:font-display prose-h2:text-2xl prose-h2:text-gray-900 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-4 prose-h2:mt-12 prose-h2:mb-4
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-[1.05rem]
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:pr-4
                prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:rounded prose-code:px-1 prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-2xl prose-pre:overflow-x-auto
                prose-ol:text-gray-600 prose-li:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags footer */}
            <div className="mt-12 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
              {(article.tags || []).map((tag, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full font-medium">#{tag}</span>
              ))}
            </div>

            {/* Author Card */}
            <div className="mt-10 bg-gray-50 border border-gray-200 rounded-2xl p-6 flex gap-5">
              <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold flex-shrink-0">VS</div>
              <div>
                <p className="font-semibold text-gray-900 text-base">Vyshnav Suresh</p>
                <p className="text-sm text-primary font-medium">Senior Full Stack Engineer</p>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">Building scalable backend systems and exploring the frontier of AI-powered automation. Open to collaborations and technical discussions.</p>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-primary hover:underline">
                  Follow on LinkedIn <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Discussion Section */}
            <div className="mt-10">
              <h3 className="font-display text-xl text-gray-900 mb-6">Discussion</h3>
              {/* Mock comments */}
              <div className="space-y-6">
                {[
                  { name: "Akash", time: "2 hours ago", text: "This is an excellent walkthrough. The n8n polling approach for async Veo3 was exactly what I was looking for. Any plans for an open-source version?" },
                  { name: "Leonard S.", time: "5 hours ago", text: "Fascinating use of Remotion in this context. I was always unsure if it could scale for automated production pipelines but this confirms it is production ready." },
                ].map((c, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold flex-shrink-0">{c.name[0]}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">{c.name}</span>
                        <span className="text-xs text-gray-400">{c.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment form */}
              <div className="mt-8 border border-gray-200 rounded-2xl p-5 bg-white">
                <textarea
                  placeholder="Leave a comment..."
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-primary transition-colors"
                  rows={3}
                />
                <div className="flex justify-end mt-3">
                  <button className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">Post Comment</button>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
                <h3 className="font-display text-base text-gray-900 mb-4">On This Page</h3>
                <nav className="space-y-2">
                  {toc.map((entry) => (
                    <a
                      key={entry.id}
                      href={`#${entry.id}`}
                      className="block text-sm text-gray-500 hover:text-primary transition-colors py-0.5"
                      dangerouslySetInnerHTML={{ __html: entry.label }}
                    />
                  ))}
                </nav>
              </div>
            )}

            {/* Article metadata */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-display text-base text-gray-900 mb-4">About this Article</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="text-gray-900 font-medium">{article.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Read Time</span>
                  <span className="text-gray-900 font-medium">{article.readTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Published</span>
                  <span className="text-gray-900 font-medium">{formatDate(article.publishedAt)}</span>
                </div>
              </div>
            </div>

            {/* Back to blog */}
            <Link href="/blog" className="flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
          </aside>
        </div>
      </section>

      {/* More from the Blog */}
      <section className="bg-gray-50 border-t border-gray-100 px-6 py-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-display text-2xl text-gray-900 mb-8">More from the Blog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {RELATED.map((r, i) => (
              <Link key={i} href={`/blog/${r.slug}`} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-36 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">{r.title}</h4>
                  <p className="text-xs text-gray-400">{r.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 bg-white">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-display text-primary text-lg">Portfolio</p>
          <p className="text-xs text-gray-400">© 2026 Vyshnav Suresh · Senior Full Stack Engineer. Built with precision.</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            <Link href="/#contact" className="hover:text-primary transition-colors">Reach Out</Link>
            <Link href="/#contact" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
