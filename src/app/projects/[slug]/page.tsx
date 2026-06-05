import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Wrench, Layers, User, Calendar, CheckCircle } from 'lucide-react';
import connectToDatabase from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  if (slug === 'qiot') {
    return {
      title: 'QIoT | Project by Vyshnav Suresh',
      description: 'Real-time IoT backend with RBAC, push notifications & live data pipelines. Built with NestJS, MongoDB, and Firebase.',
      openGraph: {
        title: 'QIoT | Project by Vyshnav Suresh',
        description: 'Real-time IoT backend with RBAC, push notifications & live data pipelines. Built with NestJS, MongoDB, and Firebase.',
        type: 'article',
      }
    }
  }

  await connectToDatabase();
  let projectData = await Project.findOne({ slug }).lean();
  
  if (!projectData) {
    try {
      projectData = await Project.findById(slug).lean();
    } catch {
      // not found
    }
  }

  if (!projectData) {
    return {
      title: 'Project Not Found | Vyshnav Suresh',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${projectData.name} | Project by Vyshnav Suresh`,
    description: projectData.description,
    openGraph: {
      title: `${projectData.name} | Project by Vyshnav Suresh`,
      description: projectData.description,
      type: 'article',
      images: projectData.image ? [projectData.image] : [],
    }
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try fetching the project from DB.
  // Note: if slug matches 'qiot', we use rich hardcoded data for the perfect UI demo.
  await connectToDatabase();
  let projectData = await Project.findOne({ slug }).lean();

  if (!projectData && slug !== 'qiot') {
    // Also try finding by ID if slug wasn't found (for backwards compatibility)
    try {
      projectData = await Project.findById(slug).lean();
    } catch {
      // Not a valid ObjectId
    }
  }

  if (!projectData && slug !== 'qiot') {
    notFound();
  }

  // --- HARDCODED QIoT DATA for Perfect UI ---
  const isQIoT = slug === 'qiot' || (projectData && projectData.name === 'QIoT');
  
  const content = isQIoT ? {
    name: "QIoT",
    subtitle: "Real-time IoT backend with RBAC, push notifications & live data pipelines",
    category: "Backend Engineering",
    stack: ["NestJS", "MongoDB", "Firebase", "FCM", "RBAC"],
    github: "https://github.com/vyshnav-suresh",
    demo: "#",
    role: "Shadow Backend Engineer",
    client: "Internal Product",
    year: "2024",
    status: "Deployed / Production",
    image: projectData?.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    images: [],
    overview: [
      "QIoT is an IoT backend platform built to manage, monitor, and communicate with connected devices in real time. As a shadow backend engineer, I contributed to building and maintaining the core backend services powering the platform. The system handles secure API access via Role-Based Access Control (RBAC), real-time sensor data pipelines, and scalable push notification delivery to end users and administrators.",
      "The project demanded careful attention to security — ensuring only authorised roles could access sensitive device data — as well as reliability in the real-time data layer, where latency and data integrity were critical."
    ],
    contributions: [
      { title: "RBAC Implementation", desc: "Designed and implemented Role-Based Access Control to secure API endpoints, ensuring users only access data permitted by their assigned roles." },
      { title: "Real-time Data Pipelines", desc: "Built real-time data handling pipelines to process and route live sensor data from IoT devices to the appropriate services and dashboards." },
      { title: "Push Notifications", desc: "Integrated Firebase Cloud Messaging (FCM) to deliver scalable, reliable push notifications to mobile and web clients for system alerts and events." },
      { title: "API Testing & Hardening", desc: "Wrote and executed test cases for API endpoints, covering edge cases, permission boundaries, and error handling." }
    ],
    technicalDeepDive: [
      { title: "Authentication & Access Control", desc: "Used NestJS Guards and custom decorators to enforce RBAC at the route level. Roles were stored in MongoDB and evaluated on every protected request, with JWT tokens carrying role claims for stateless validation." },
      { title: "Real-time Data Layer", desc: "Implemented a data pipeline that ingested live sensor readings via REST endpoints and queued them for downstream processing. MongoDB's change streams were explored for reactive updates, ensuring the dashboard reflected near-real-time device status." },
      { title: "Push Notification Architecture", desc: "Integrated Firebase Admin SDK for server-side FCM message dispatch. Device tokens were stored in MongoDB and associated with user accounts and roles, allowing targeted notifications to specific user segments or device groups." }
    ],
    challenges: [
      { chal: "Handling permission complexity as the number of roles grew", learn: "Adopted a flat RBAC model with explicit permission mappings to keep it maintainable" },
      { chal: "Ensuring reliability of real-time pipelines under load", learn: "Introduced buffering and idempotent processing to handle bursts without data loss" },
      { chal: "FCM token expiry and device churn", learn: "Implemented a token refresh strategy and silent cleanup of stale device tokens" }
    ],
    outcome: "The backend services shipped on schedule and are actively used in production. RBAC enforcement significantly reduced unauthorised access attempts, and FCM integration provided reliable real-time alerts to device owners.",
    outcomeStats: ["Deployed to Production", "RBAC securing 100% of API routes", "Push notifications delivered at scale"],
    techBreakdown: [
      { layer: "Runtime", tech: "Node.js, NestJS" },
      { layer: "Database", tech: "MongoDB" },
      { layer: "Cloud", tech: "Firebase, FCM" },
      { layer: "Security", tech: "JWT, RBAC" },
      { layer: "Testing", tech: "Manual API testing" }
    ]
  } : {
    // Dynamic Fallback using DB fields if present, else defaults
    name: projectData.name,
    subtitle: projectData.description,
    category: projectData.category || (projectData.isHackathon ? "Hackathon Project" : "Software Engineering"),
    stack: projectData.stack || [],
    github: projectData.github,
    demo: projectData.demo,
    role: projectData.role || "Developer",
    client: projectData.client || "Personal/Open Source",
    year: projectData.year || (projectData.createdAt ? new Date(projectData.createdAt).getFullYear().toString() : new Date().getFullYear().toString()),
    status: projectData.status || "Completed",
    image: projectData.image || "",
    overview: projectData.overview && projectData.overview.length > 0 ? projectData.overview : [projectData.description],
    contributions: projectData.contributions || [],
    technicalDeepDive: projectData.technicalDeepDive || [],
    challenges: projectData.challenges || [],
    outcome: projectData.outcome || "Successfully built and deployed.",
    outcomeStats: projectData.outcomeStats || [],
    techBreakdown: projectData.techBreakdown && projectData.techBreakdown.length > 0
      ? projectData.techBreakdown 
      : [{ layer: "Stack", tech: (projectData.stack || []).join(", ") }],
    images: projectData.images || []
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation (non-repeating) */}
      <div className="container mx-auto max-w-6xl px-6 pt-8 hidden md:flex justify-between items-center">
        <div className="flex text-sm text-gray-400 items-center space-x-2">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#projects" className="hover:text-primary transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{content.name}</span>
        </div>
        <Link href="/#projects" className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-primary border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* 2. Project Hero Banner */}
      <section className="bg-white pt-8 pb-12 px-6">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-block bg-light-blue text-primary text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
              {content.category}
            </span>
            <h1 className="font-display text-5xl md:text-6xl text-gray-900 mb-4">{content.name}</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">{content.subtitle}</p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {content.stack.map((tag: string, i: number) => (
                <span key={i} className="border border-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full hover:bg-gray-50 cursor-default transition-colors">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              {content.github && (
                <a href={content.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
                  <Github size={18} />
                  <span>View on GitHub</span>
                </a>
              )}
              {content.demo && (
                <a href={content.demo} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:border-primary hover:text-primary transition-colors">
                  <ExternalLink size={18} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700">
                <span>📅</span>
                <span className="font-medium">Role: {content.role}</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700">
                <span>🏢</span>
                <span className="font-medium">Client: {content.client}</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700">
                <span>📆</span>
                <span className="font-medium">Year: {content.year}</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="bg-gray-100 rounded-2xl aspect-[4/3] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-gray-200 flex items-center justify-center relative group">
              {content.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={content.image} alt={content.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 font-medium">Project Screenshot</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Overview Strip */}
      <section className="bg-gray-50 border-y border-gray-100 py-8 px-6">
        <div className="container mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <Wrench size={20} className="text-primary mb-3" />
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Type</div>
            <div className="text-sm font-medium text-gray-900">{content.category}</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <Layers size={20} className="text-primary mb-3" />
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Stack</div>
            <div className="text-sm font-medium text-gray-900 line-clamp-1">{content.stack.slice(0, 3).join(' · ')}</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <User size={20} className="text-primary mb-3" />
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Role</div>
            <div className="text-sm font-medium text-gray-900">{content.role}</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <Calendar size={20} className="text-primary mb-3" />
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Timeline</div>
            <div className="text-sm font-medium text-gray-900">{content.year}</div>
          </div>
        </div>
      </section>

      {/* 4. Main Content Area */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Main */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* 4.1 Project Overview */}
            <div className="space-y-6">
              <h2 className="text-2xl font-display text-gray-900 border-l-4 border-primary pl-4">Project Overview</h2>
              <div className="prose prose-gray max-w-none text-gray-600">
                {content.overview.map((para: string, idx: number) => (
                  <p key={idx} className="leading-relaxed mb-4">{para}</p>
                ))}
              </div>
            </div>

            {/* 4.2 Key Contributions */}
            {content.contributions.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-display text-gray-900 border-l-4 border-primary pl-4">Key Contributions</h2>
                <div className="space-y-4">
                  {content.contributions.map((item: { title: string; desc: string }, idx: number) => (
                    <div key={idx} className="flex bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <div className="flex-shrink-0 mr-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-light-blue text-primary text-sm font-bold">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4.3 Technical Deep Dive */}
            {content.technicalDeepDive.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-display text-gray-900 border-l-4 border-primary pl-4">Technical Deep Dive</h2>
                <div className="space-y-8">
                  {content.technicalDeepDive.map((item: { title: string; desc: string }, idx: number) => (
                    <div key={idx}>
                      <h4 className="text-[1.1rem] font-medium text-gray-900 mb-3">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed pl-4 border-l-2 border-gray-100">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4.4 Challenges & Learnings */}
            {content.challenges.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-display text-gray-900 border-l-4 border-primary pl-4">Challenges & Learnings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.challenges.map((item: { chal: string; learn: string }, idx: number) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden flex flex-col shadow-sm">
                      <div className="p-5 border-b border-gray-200 bg-white">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Challenge</div>
                        <p className="text-sm font-medium text-gray-900">{item.chal}</p>
                      </div>
                      <div className="p-5 flex-grow">
                        <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Learning</div>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.learn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4.5 Outcome */}
            <div className="space-y-6">
              <h2 className="text-2xl font-display text-gray-900 border-l-4 border-primary pl-4">Outcome</h2>
              <p className="text-gray-600 leading-relaxed">{content.outcome}</p>
              
              {content.outcomeStats.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-6">
                  {content.outcomeStats.map((stat: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2 border border-gray-200 bg-white px-4 py-3 rounded-lg shadow-sm">
                      <CheckCircle size={18} className="text-green-500" />
                      <span className="text-sm font-medium text-gray-800">{stat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-8 sticky top-24">
            
            {/* Sidebar Card 1: Project Info */}
            <div className="bg-white border-l-4 border-primary border-y border-r border-gray-200 rounded-r-xl shadow-sm p-6">
              <h3 className="font-display text-xl text-gray-900 mb-4">Project Info</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 font-medium">Type</span>
                  <span className="text-gray-900">{content.category}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 font-medium">Role</span>
                  <span className="text-gray-900">{content.role}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 font-medium">Year</span>
                  <span className="text-gray-900">{content.year}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-gray-500 font-medium">Status</span>
                  <span className="text-gray-900">{content.status}</span>
                </div>
              </div>
            </div>

            {/* Sidebar Card 2: Tech Stack */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h3 className="font-display text-xl text-gray-900 mb-6">Tech Stack</h3>
              <div className="space-y-5">
                {content.techBreakdown.map((item: { layer: string; tech: string }, idx: number) => (
                  <div key={idx}>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{item.layer}</div>
                    <div className="flex flex-wrap gap-2">
                      {item.tech.split(',').map((t: string, i: number) => (
                        <span key={i} className="bg-gray-50 border border-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md">
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Card 3: Links */}
            {(content.github || content.demo) && (
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <h3 className="font-display text-xl text-gray-900 mb-4">Links</h3>
                <div className="space-y-3">
                  {content.github && (
                    <a href={content.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 border-2 border-gray-200 text-gray-700 w-full py-3 rounded-lg font-medium hover:border-gray-900 hover:text-gray-900 transition-colors">
                      <Github size={18} />
                      <span>GitHub Repository</span>
                    </a>
                  )}
                  {content.demo && (
                    <a href={content.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 bg-primary text-white w-full py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Sidebar Card 4: Other Projects */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h3 className="font-display text-xl text-gray-900 mb-4">Other Projects</h3>
              <div className="space-y-4">
                <Link href="/projects/dtu-power-tracker" className="block group">
                  <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors mb-1">DTU Power Tracker</h4>
                  <p className="text-xs text-gray-500 mb-2">Flask · Superset · MySQL</p>
                  <span className="text-xs font-bold text-primary flex items-center">View Project <ArrowLeft size={12} className="ml-1 rotate-180" /></span>
                </Link>
                <Link href="/projects/infopark-portal" className="block group">
                  <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors mb-1">Infopark Company Portal</h4>
                  <p className="text-xs text-gray-500 mb-2">React.js · TanStack · Redux</p>
                  <span className="text-xs font-bold text-primary flex items-center">View Project <ArrowLeft size={12} className="ml-1 rotate-180" /></span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Project Gallery */}
      {content.images && content.images.length > 0 && (
        <section className="bg-gray-50 border-t border-b border-gray-200 py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-display text-2xl md:text-3xl text-gray-900 border-l-4 border-primary pl-4 mb-8">
              Project Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {content.images.map((imgUrl: string, idx: number) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow aspect-[16/10] relative group">
                  <a href={imgUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgUrl} alt={`${content.name} Screenshot ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Contact CTA Banner */}
      <section className="bg-light-blue py-16 px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-4">Interested in working together?</h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">I&apos;m open to full-time roles, freelance projects, and collaborations.</p>
        <Link href="/#contact" className="inline-flex items-center justify-center bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
          Get in Touch
        </Link>
      </section>

    </div>
  );
}
