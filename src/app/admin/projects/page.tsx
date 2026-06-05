"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Trash2, 
  Plus, 
  Globe, 
  Github, 
  Info, 
  Award, 
  FolderKanban, 
  ArrowRight,
  Sparkles,
  Pencil
} from "lucide-react";

interface Project {
  _id: string;
  name: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
  image?: string;
  category?: string;
  role?: string;
  client?: string;
  year?: string;
  status?: string;
  overview?: string[];
  contributions?: { title: string; desc: string }[];
  technicalDeepDive?: { title: string; desc: string }[];
  challenges?: { chal: string; learn: string }[];
  outcome?: string;
  outcomeStats?: string[];
  techBreakdown?: { layer: string; tech: string }[];
  images?: string[];
  slug?: string;
}

export default function AdminProjects() {
  const { status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState<"list" | "create">("list");
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stack: "",
    github: "",
    demo: "",
    image: "",
    category: "",
    role: "",
    client: "",
    year: "",
    status: "",
    overviewText: "",
    outcome: "",
    outcomeStatsText: "",
  });

  // States for dynamic array sections
  const [contributions, setContributions] = useState<{ title: string; desc: string }[]>([]);
  const [newContribution, setNewContribution] = useState({ title: "", desc: "" });

  const [technicalDeepDive, setTechnicalDeepDive] = useState<{ title: string; desc: string }[]>([]);
  const [newDeepDive, setNewDeepDive] = useState({ title: "", desc: "" });

  const [challenges, setChallenges] = useState<{ chal: string; learn: string }[]>([]);
  const [newChallenge, setNewChallenge] = useState({ chal: "", learn: "" });

  const [techBreakdown, setTechBreakdown] = useState<{ layer: string; tech: string }[]>([]);
  const [newTechBreakdown, setNewTechBreakdown] = useState({ layer: "", tech: "" });

  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    } else if (status === "authenticated") {
      fetchProjects();
    }
  }, [status, router]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();
      if (res.ok) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      } else {
        alert("Image upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Upload error", error);
      alert("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uploadData = new FormData();
      uploadData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        const data = await res.json();
        if (res.ok) {
          setGalleryImages((prev) => [...prev, data.url]);
        } else {
          alert(`Image upload failed for ${file.name}: ` + data.error);
        }
      } catch (error) {
        console.error("Upload error", error);
        alert(`Image upload failed for ${file.name}`);
      }
    }
    setUploadingGallery(false);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  // Add handlers for list arrays
  const addContribution = () => {
    if (!newContribution.title || !newContribution.desc) return;
    setContributions([...contributions, newContribution]);
    setNewContribution({ title: "", desc: "" });
  };
  const removeContribution = (index: number) => {
    setContributions(contributions.filter((_, i) => i !== index));
  };

  const addDeepDive = () => {
    if (!newDeepDive.title || !newDeepDive.desc) return;
    setTechnicalDeepDive([...technicalDeepDive, newDeepDive]);
    setNewDeepDive({ title: "", desc: "" });
  };
  const removeDeepDive = (index: number) => {
    setTechnicalDeepDive(technicalDeepDive.filter((_, i) => i !== index));
  };

  const addChallenge = () => {
    if (!newChallenge.chal || !newChallenge.learn) return;
    setChallenges([...challenges, newChallenge]);
    setNewChallenge({ chal: "", learn: "" });
  };
  const removeChallenge = (index: number) => {
    setChallenges(challenges.filter((_, i) => i !== index));
  };

  const addTechBreakdown = () => {
    if (!newTechBreakdown.layer || !newTechBreakdown.tech) return;
    setTechBreakdown([...techBreakdown, newTechBreakdown]);
    setNewTechBreakdown({ layer: "", tech: "" });
  };
  const removeTechBreakdown = (index: number) => {
    setTechBreakdown(techBreakdown.filter((_, i) => i !== index));
  };

  const handleEditLoad = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name || "",
      description: project.description || "",
      stack: (project.stack || []).join(", "),
      github: project.github || "",
      demo: project.demo || "",
      image: project.image || "",
      category: project.category || "",
      role: project.role || "",
      client: project.client || "",
      year: project.year || "",
      status: project.status || "",
      overviewText: (project.overview || []).join("\n"),
      outcome: project.outcome || "",
      outcomeStatsText: (project.outcomeStats || []).join(", "),
    });
    setContributions(project.contributions || []);
    setTechnicalDeepDive(project.technicalDeepDive || []);
    setChallenges(project.challenges || []);
    setTechBreakdown(project.techBreakdown || []);
    setGalleryImages(project.images || []);
    setActiveTab("create");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        stack: formData.stack.split(",").map(s => s.trim()).filter(Boolean),
        github: formData.github || undefined,
        demo: formData.demo || undefined,
        image: formData.image || undefined,
        category: formData.category || undefined,
        role: formData.role || undefined,
        client: formData.client || undefined,
        year: formData.year || undefined,
        status: formData.status || undefined,
        overview: formData.overviewText ? formData.overviewText.split("\n").map(p => p.trim()).filter(Boolean) : undefined,
        contributions,
        technicalDeepDive,
        challenges,
        outcome: formData.outcome || undefined,
        outcomeStats: formData.outcomeStatsText ? formData.outcomeStatsText.split(",").map(s => s.trim()).filter(Boolean) : undefined,
        techBreakdown,
        images: galleryImages
      };
      
      const res = editingProject
        ? await fetch(`/api/projects/${editingProject._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      if (res.ok) {
        setFormData({
          name: "",
          description: "",
          stack: "",
          github: "",
          demo: "",
          image: "",
          category: "",
          role: "",
          client: "",
          year: "",
          status: "",
          overviewText: "",
          outcome: "",
          outcomeStatsText: "",
        });
        setContributions([]);
        setTechnicalDeepDive([]);
        setChallenges([]);
        setTechBreakdown([]);
        setGalleryImages([]);
        setEditingProject(null);
        fetchProjects();
        setActiveTab("list");
      } else {
        const errorData = await res.json();
        alert(`Failed to ${editingProject ? "update" : "create"} project: ` + (errorData.error || res.statusText));
      }
    } catch (error) {
      console.error(`Failed to ${editingProject ? "update" : "create"} project`, error);
      alert(`An error occurred while ${editingProject ? "updating" : "creating"} project`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  if (loading || status === "loading") return <div className="p-8 text-center text-gray-500 font-medium">Loading panel...</div>;

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-5 mb-8">
        <div>
          <h1 className="text-3xl font-display text-gray-900 tracking-tight flex items-center">
            <FolderKanban className="mr-3 text-primary" size={28} />
            Manage Projects
          </h1>
          <p className="text-sm text-gray-500 mt-1">Configure and manage your portfolio projects database</p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-gray-100 p-1.5 rounded-xl mt-4 md:mt-0">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "list"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Active Projects ({projects.length})
          </button>
          <button
            onClick={() => { setEditingProject(null); setActiveTab("create"); }}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all flex items-center ${
              activeTab === "create"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Plus size={16} className="mr-1.5" />
            {editingProject ? "Editing..." : "Add Project"}
          </button>
        </div>
      </div>

      {/* Tab 1: Project List */}
      {activeTab === "list" && (
        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <Sparkles size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No projects created yet.</p>
              <button 
                onClick={() => setActiveTab("create")} 
                className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:underline"
              >
                Create your first project <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {projects.map((project) => (
                <div key={project._id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex gap-5 items-start">
                    {project.image ? (
                      <div className="flex-shrink-0 w-24 h-18 md:w-28 md:h-20 rounded-xl overflow-hidden border border-gray-150 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-24 h-18 md:w-28 md:h-20 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-150">
                        <span className="text-gray-400 text-xs">No image</span>
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        {project.category && (
                          <span className="bg-light-blue text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                            {project.category}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1 mb-2 line-clamp-1 max-w-xl">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((tech: string, i: number) => (
                          <span key={i} className="text-[11px] bg-gray-50 border border-gray-150 text-gray-600 px-2 py-0.5 rounded-md font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                    <a
                      href={`/projects/${project.slug || project._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-gray-600 hover:text-primary px-3 py-1.5 border border-gray-200 hover:border-primary rounded-lg transition-colors"
                    >
                      View Detail Page
                    </a>
                    <button
                      onClick={() => handleEditLoad(project)}
                      className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-xl transition-colors"
                      title="Edit Project"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(project._id)} 
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-xl transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Create / Edit Project Form */}
      {activeTab === "create" && (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Card 1: Basic Information */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center">
                <Info className="mr-2 text-primary" size={18} />
                Basic Information
              </h2>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Project Name</label>
                <input 
                  required 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  type="text" 
                  placeholder="e.g. My Premium App"
                  className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Short Description</label>
                <textarea 
                  required 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  placeholder="Keep it brief, shown in listings."
                  className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm" 
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Tech Stack (comma separated)</label>
                <input 
                  required 
                  value={formData.stack} 
                  onChange={(e) => setFormData({...formData, stack: e.target.value})} 
                  type="text" 
                  placeholder="React, Next.js, Node.js"
                  className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Category</label>
                  <input 
                    value={formData.category} 
                    onChange={(e) => setFormData({...formData, category: e.target.value})} 
                    type="text" 
                    placeholder="e.g. Backend Engineering"
                    className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Project Status</label>
                  <input 
                    value={formData.status} 
                    onChange={(e) => setFormData({...formData, status: e.target.value})} 
                    type="text" 
                    placeholder="e.g. Deployed / Production"
                    className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Featured Image File</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload} 
                  className="w-full border border-gray-200 p-2 rounded-xl file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-light-blue file:text-primary hover:file:bg-blue-100 text-xs" 
                />
                {uploadingImage && <p className="text-xs text-primary mt-2 font-medium">Uploading image to storage...</p>}
                {formData.image && (
                  <div className="mt-3 w-40 h-24 rounded-xl overflow-hidden border border-gray-250 relative shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Gallery Screenshots (Multiple)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload} 
                  className="w-full border border-gray-200 p-2 rounded-xl file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-light-blue file:text-primary hover:file:bg-blue-100 text-xs" 
                />
                {uploadingGallery && <p className="text-xs text-primary mt-2 font-medium">Uploading gallery images...</p>}
                
                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {galleryImages.map((imgUrl, idx) => (
                      <div key={idx} className="relative w-full h-16 rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Card 2: Metadata & Links */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center">
                <Globe className="mr-2 text-primary" size={18} />
                Metadata & URLs
              </h2>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Role</label>
                  <input 
                    value={formData.role} 
                    onChange={(e) => setFormData({...formData, role: e.target.value})} 
                    type="text" 
                    placeholder="e.g. Developer"
                    className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Client</label>
                  <input 
                    value={formData.client} 
                    onChange={(e) => setFormData({...formData, client: e.target.value})} 
                    type="text" 
                    placeholder="e.g. Open Source"
                    className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Year</label>
                  <input 
                    value={formData.year} 
                    onChange={(e) => setFormData({...formData, year: e.target.value})} 
                    type="text" 
                    placeholder="e.g. 2026"
                    className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">GitHub URL</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <Github size={16} />
                  </span>
                  <input 
                    value={formData.github} 
                    onChange={(e) => setFormData({...formData, github: e.target.value})} 
                    type="text" 
                    placeholder="https://github.com/..."
                    className="w-full border border-gray-200 pl-10 pr-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Live Demo URL</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <Globe size={16} />
                  </span>
                  <input 
                    value={formData.demo} 
                    onChange={(e) => setFormData({...formData, demo: e.target.value})} 
                    type="text" 
                    placeholder="https://..."
                    className="w-full border border-gray-200 pl-10 pr-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Detailed Overview (New paragraphs on new lines)</label>
                <textarea 
                  value={formData.overviewText} 
                  onChange={(e) => setFormData({...formData, overviewText: e.target.value})} 
                  placeholder="Enter detailed paragraphs explaining the project. Press Enter to start a new paragraph."
                  className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm" 
                  rows={4}
                />
              </div>
            </div>

            {/* Card 3: Project Outcome & Metrics */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center">
                <Award className="mr-2 text-primary" size={18} />
                Project Outcome & Metrics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Outcome Summary</label>
                  <textarea 
                    value={formData.outcome} 
                    onChange={(e) => setFormData({...formData, outcome: e.target.value})} 
                    placeholder="Describe the final results, achievements, or learnings."
                    className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm" 
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Outcome Statistics / Metrics (comma separated)</label>
                  <textarea 
                    value={formData.outcomeStatsText} 
                    onChange={(e) => setFormData({...formData, outcomeStatsText: e.target.value})} 
                    placeholder="e.g. Secured 100% of API routes, Shipped on schedule, 500+ Active nodes"
                    className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm" 
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Card 4: Detailed Lists */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Contributions list */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-150 pb-2">Key Contributions</h3>
                {contributions.length > 0 && (
                  <div className="grid grid-cols-1 gap-2.5">
                    {contributions.map((c, i) => (
                      <div key={i} className="flex justify-between items-start bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900">{c.title}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{c.desc}</p>
                        </div>
                        <button type="button" onClick={() => removeContribution(i)} className="text-red-500 hover:text-red-700 text-xs font-medium bg-white px-2 py-1 rounded-md border border-gray-200">
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
                  <div className="md:col-span-4">
                    <input 
                      type="text" 
                      value={newContribution.title} 
                      onChange={(e) => setNewContribution({...newContribution, title: e.target.value})} 
                      placeholder="Contribution Title (e.g. Auth System)" 
                      className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary text-xs" 
                    />
                  </div>
                  <div className="md:col-span-6">
                    <input 
                      type="text" 
                      value={newContribution.desc} 
                      onChange={(e) => setNewContribution({...newContribution, desc: e.target.value})} 
                      placeholder="Detailed explanation of what you accomplished" 
                      className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary text-xs" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button type="button" onClick={addContribution} className="w-full bg-light-blue text-primary border border-blue-200 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-blue-100 transition-colors">
                      + Add Item
                    </button>
                  </div>
                </div>
              </div>

              {/* Technical Deep Dive list */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-150 pb-2">Technical Deep Dive</h3>
                {technicalDeepDive.length > 0 && (
                  <div className="grid grid-cols-1 gap-2.5">
                    {technicalDeepDive.map((d, i) => (
                      <div key={i} className="flex justify-between items-start bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900">{d.title}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{d.desc}</p>
                        </div>
                        <button type="button" onClick={() => removeDeepDive(i)} className="text-red-500 hover:text-red-700 text-xs font-medium bg-white px-2 py-1 rounded-md border border-gray-200">
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
                  <div className="md:col-span-4">
                    <input 
                      type="text" 
                      value={newDeepDive.title} 
                      onChange={(e) => setNewDeepDive({...newDeepDive, title: e.target.value})} 
                      placeholder="Topic Name (e.g. WebSocket Optimization)" 
                      className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary text-xs" 
                    />
                  </div>
                  <div className="md:col-span-6">
                    <input 
                      type="text" 
                      value={newDeepDive.desc} 
                      onChange={(e) => setNewDeepDive({...newDeepDive, desc: e.target.value})} 
                      placeholder="Explain how it was built, designed or tested" 
                      className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary text-xs" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button type="button" onClick={addDeepDive} className="w-full bg-light-blue text-primary border border-blue-200 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-blue-100 transition-colors">
                      + Add Item
                    </button>
                  </div>
                </div>
              </div>

              {/* Challenges list */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-150 pb-2">Challenges & Learnings</h3>
                {challenges.length > 0 && (
                  <div className="grid grid-cols-1 gap-2.5">
                    {challenges.map((c, i) => (
                      <div key={i} className="flex justify-between items-start bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900">Challenge: {c.chal}</h4>
                          <p className="text-xs text-primary mt-0.5 font-medium">Learning: {c.learn}</p>
                        </div>
                        <button type="button" onClick={() => removeChallenge(i)} className="text-red-500 hover:text-red-700 text-xs font-medium bg-white px-2 py-1 rounded-md border border-gray-200">
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
                  <div className="md:col-span-5">
                    <input 
                      type="text" 
                      value={newChallenge.chal} 
                      onChange={(e) => setNewChallenge({...newChallenge, chal: e.target.value})} 
                      placeholder="What was the challenge?" 
                      className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary text-xs" 
                    />
                  </div>
                  <div className="md:col-span-5">
                    <input 
                      type="text" 
                      value={newChallenge.learn} 
                      onChange={(e) => setNewChallenge({...newChallenge, learn: e.target.value})} 
                      placeholder="What was the learning / resolution?" 
                      className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary text-xs" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button type="button" onClick={addChallenge} className="w-full bg-light-blue text-primary border border-blue-200 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-blue-100 transition-colors">
                      + Add Item
                    </button>
                  </div>
                </div>
              </div>

              {/* Tech Breakdown list */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-150 pb-2">Tech Stack Breakdown</h3>
                {techBreakdown.length > 0 && (
                  <div className="grid grid-cols-1 gap-2.5">
                    {techBreakdown.map((t, i) => (
                      <div key={i} className="flex justify-between items-start bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                        <div>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block">{t.layer}</span>
                          <span className="text-sm font-semibold text-gray-800">{t.tech}</span>
                        </div>
                        <button type="button" onClick={() => removeTechBreakdown(i)} className="text-red-500 hover:text-red-700 text-xs font-medium bg-white px-2 py-1 rounded-md border border-gray-200">
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
                  <div className="md:col-span-4">
                    <input 
                      type="text" 
                      value={newTechBreakdown.layer} 
                      onChange={(e) => setNewTechBreakdown({...newTechBreakdown, layer: e.target.value})} 
                      placeholder="Layer (e.g. Runtime / DB / Cloud)" 
                      className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary text-xs" 
                    />
                  </div>
                  <div className="md:col-span-6">
                    <input 
                      type="text" 
                      value={newTechBreakdown.tech} 
                      onChange={(e) => setNewTechBreakdown({...newTechBreakdown, tech: e.target.value})} 
                      placeholder="Technologies used (comma separated, e.g. Node.js, Express)" 
                      className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary text-xs" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button type="button" onClick={addTechBreakdown} className="w-full bg-light-blue text-primary border border-blue-200 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-blue-100 transition-colors">
                      + Add Item
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => { setActiveTab("list"); setEditingProject(null); }}
              className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploadingImage}
              className="px-8 py-2.5 bg-primary hover:bg-blue-700 text-white font-semibold rounded-xl disabled:opacity-50 transition-colors shadow-md text-sm"
            >
              {editingProject ? "Update Project" : "Save Project"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
