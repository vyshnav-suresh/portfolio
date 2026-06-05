"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Globe,
  Info,
  FolderKanban,
  ArrowRight,
  Pencil,
  Tag,
  BookOpen,
  List,
  Star,
} from "lucide-react";

interface TocEntry {
  id: string;
  label: string;
}

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
  content: string;
  tableOfContents?: TocEntry[];
}

const CATEGORIES = ["Full Stack", "Backend", "Frontend", "GenAI & Automation", "Career"];

export default function AdminBlog() {
  const { status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState<"list" | "create">("list");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [tocEntries, setTocEntries] = useState<TocEntry[]>([]);
  const [newToc, setNewToc] = useState({ id: "", label: "" });

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    category: "Full Stack",
    readTime: "",
    image: "",
    featured: false,
    tags: "",
    content: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blog");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      console.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) setFormData((prev) => ({ ...prev, image: data.url }));
    } catch {
      alert("Image upload failed.");
    } finally {
      setUploadingImage(false);
    }
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: !editingPost ? generateSlug(value) : prev.slug,
    }));
  };

  const addTocEntry = () => {
    if (!newToc.id || !newToc.label) return;
    setTocEntries([...tocEntries, { ...newToc }]);
    setNewToc({ id: "", label: "" });
  };

  const removeTocEntry = (index: number) => {
    setTocEntries(tocEntries.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({ title: "", slug: "", subtitle: "", category: "Full Stack", readTime: "", image: "", featured: false, tags: "", content: "" });
    setTocEntries([]);
    setNewToc({ id: "", label: "" });
    setEditingPost(null);
  };

  const handleEditLoad = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title || "",
      slug: post.slug || "",
      subtitle: post.subtitle || "",
      category: post.category || "Full Stack",
      readTime: post.readTime || "",
      image: post.image || "",
      featured: post.featured || false,
      tags: (post.tags || []).join(", "),
      content: post.content || "",
    });
    setTocEntries(post.tableOfContents || []);
    setActiveTab("create");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      tableOfContents: tocEntries,
    };
    try {
      const url = editingPost ? `/api/blog/${editingPost._id}` : "/api/blog";
      const method = editingPost ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      await fetchPosts();
      resetForm();
      setActiveTab("list");
    } catch {
      alert("Failed to save post.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    await fetchPosts();
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display text-gray-900">Blog Posts</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your technical articles and insights</p>
        </div>
        <div className="flex gap-3">
          {activeTab === "list" ? (
            <button
              onClick={() => { resetForm(); setActiveTab("create"); }}
              className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus size={16} /> New Post
            </button>
          ) : (
            <button
              onClick={() => { resetForm(); setActiveTab("list"); }}
              className="flex items-center gap-2 text-sm border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              <List size={16} /> All Posts
            </button>
          )}
        </div>
      </div>

      {/* List View */}
      {activeTab === "list" && (
        <>
          {loading ? (
            <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
              <BookOpen size={40} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-sm text-gray-500 mb-4">Start writing your first technical article.</p>
              <button onClick={() => { resetForm(); setActiveTab("create"); }} className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
                Write your first post <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {posts.map((post) => (
                <div key={post._id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex gap-5 items-start">
                    {post.image ? (
                      <div className="flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border border-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-24 h-16 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                        <BookOpen size={18} className="text-gray-300" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-semibold text-gray-900">{post.title}</h3>
                        {post.featured && (
                          <span className="flex items-center gap-1 bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                            <Star size={10} /> Featured
                          </span>
                        )}
                        <span className="bg-light-blue text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1 max-w-xl">{post.subtitle}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-400">{post.readTime}</span>
                        <span className="text-xs text-gray-400">{new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</span>
                        {(post.tags || []).slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => handleEditLoad(post)} className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors">
                      <Pencil size={12} /> Edit
                    </button>
                    <button onClick={() => handleDelete(post._id)} className="flex items-center gap-1.5 px-4 py-2 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-semibold hover:bg-red-100 transition-colors">
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Create / Edit Form */}
      {activeTab === "create" && (
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Card 1: Core Content */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
            <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center">
              <Info className="mr-2 text-primary" size={18} />
              {editingPost ? "Edit Post" : "New Post"}
            </h2>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Title *</label>
              <input
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                type="text"
                placeholder="e.g. Building an AI-Powered Product Video Generator"
                className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Slug (URL)</label>
              <input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                type="text"
                placeholder="auto-generated from title"
                className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Subtitle / Description *</label>
              <textarea
                required
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="A concise summary shown in listings and SEO meta."
                className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm bg-white"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Read Time *</label>
                <input
                  required
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  type="text"
                  placeholder="e.g. 8 Min Read"
                  className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 accent-primary rounded"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Star size={14} className="text-amber-500" /> Mark as Featured Post
              </label>
            </div>
          </div>

          {/* Card 2: Featured Image */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center">
              <Globe className="mr-2 text-primary" size={18} />
              Featured Image &amp; Tags
            </h2>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Featured Image URL</label>
              <input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                type="text"
                placeholder="https://... or upload below"
                className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Upload Image File</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-gray-200 p-2 rounded-xl file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-light-blue file:text-primary hover:file:bg-blue-100 text-xs"
              />
              {uploadingImage && <p className="text-xs text-primary mt-2 font-medium">Uploading image...</p>}
              {formData.image && (
                <div className="mt-3 w-40 h-24 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Tags (comma separated)</label>
              <input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                type="text"
                placeholder="React, NestJS, AI, MongoDB"
                className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>
          </div>

          {/* Card 3: Content Body */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center">
              <FolderKanban className="mr-2 text-primary" size={18} />
              Content Body
            </h2>
            <p className="text-xs text-gray-500">Write in HTML. Use <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">&lt;h2 id=&quot;section-id&quot;&gt;</code> tags to define Table of Contents anchors.</p>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="<h2 id='intro'>Introduction</h2><p>Your post content here...</p>"
              className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm font-mono"
              rows={20}
            />
          </div>

          {/* Card 4: Table of Contents */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center">
              <Tag className="mr-2 text-primary" size={18} />
              Table of Contents
            </h2>

            {tocEntries.length > 0 && (
              <div className="space-y-2">
                {tocEntries.map((entry, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm">
                    <span className="font-mono text-gray-500 text-xs"># {entry.id}</span>
                    <span className="text-gray-800 flex-1">{entry.label}</span>
                    <button type="button" onClick={() => removeTocEntry(i)} className="text-red-400 hover:text-red-600 text-xs font-semibold">Remove</button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4">
                <input
                  type="text"
                  value={newToc.id}
                  onChange={(e) => setNewToc({ ...newToc, id: e.target.value })}
                  placeholder="section-id (matches h2 id)"
                  className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary text-xs font-mono"
                />
              </div>
              <div className="col-span-6">
                <input
                  type="text"
                  value={newToc.label}
                  onChange={(e) => setNewToc({ ...newToc, label: e.target.value })}
                  placeholder="Display label (e.g. Introduction)"
                  className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary text-xs"
                />
              </div>
              <div className="col-span-2">
                <button type="button" onClick={addTocEntry} className="w-full bg-light-blue text-primary border border-blue-200 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-blue-100 transition-colors">
                  + Add
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => { resetForm(); setActiveTab("list"); }}
              className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploadingImage}
              className="px-8 py-2.5 bg-primary hover:bg-blue-700 text-white font-semibold rounded-xl disabled:opacity-50 transition-colors shadow-md text-sm"
            >
              {editingPost ? "Update Post" : "Publish Post"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
