import { Trophy, Github } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import { Project } from "@/models/Project";
import Link from "next/link";

export default async function Projects() {
  await connectToDatabase();
  const dbProjects = await Project.find({}).sort({ createdAt: -1 }).lean();
  
  // For backwards compatibility or default if empty
  const defaultProjects = [
    {
      name: "QIoT",
      stack: ["NestJS", "MongoDB", "Firebase"],
      description: "Shadow backend engineer — RBAC-secured APIs, real-time data pipelines, Firebase Cloud Messaging for push notifications.",
      github: "https://github.com/vyshnav-suresh"
    }
  ];

  const projectsToDisplay = dbProjects.length > 0 ? dbProjects : defaultProjects;

  return (
    <section id="projects" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="mb-12">
          <span className="text-primary text-[11px] font-medium uppercase tracking-widest mb-2 block">Projects</span>
          <h2 className="font-display text-4xl md:text-5xl text-gray-900">Featured Work</h2>
        </div>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {(projectsToDisplay as Array<{
            _id?: { toString(): string };
            name: string;
            description: string;
            stack: string[];
            github?: string;
            demo?: string;
            image?: string;
            slug?: string;
          }>).map((project, index: number) => {
            const projectLink = project.slug ? `/projects/${project.slug}` : `/projects/${project._id ? project._id.toString() : 'qiot'}`;
            return (
            <Link 
              href={projectLink}
              key={index} 
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-primary transition-colors duration-300 flex flex-col h-full shadow-sm hover:shadow-md group block cursor-pointer"
            >
              {project.image && (
                <div className="w-full h-48 overflow-hidden bg-gray-100 border-b border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="font-medium text-[1.1rem] text-gray-900 mb-3 group-hover:text-primary transition-colors">{project.name}</h3>
                
                <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100">
                  {project.stack?.map((tech: string, tIdx: number) => (
                    <span 
                      key={tIdx} 
                      className="bg-gray-100 text-gray-600 text-[11px] px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          )})}
        </div>

        {/* Hackathon Highlight Card */}
        <div className="bg-primary rounded-2xl overflow-hidden shadow-lg relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
          
          <div className="p-8 md:p-10 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <Trophy size={16} className="text-light-blue" />
                <span className="text-light-blue text-[11px] font-bold uppercase tracking-widest">Hackathon Winner</span>
              </div>
              
              <h3 className="font-display text-2xl md:text-3xl text-white mb-4">Snavy</h3>
              <p className="text-blue-100 mb-6 text-sm md:text-base leading-relaxed">
                AI-powered pipeline to generate short-form product videos. Veo2/Veo3 for synthesis, Remotion for automated rendering, n8n for pipeline validation. (August 2025)
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6 md:mb-0">
                {["GenAI", "Remotion", "Veo2", "Veo3", "n8n"].map((tag, i) => (
                  <span key={i} className="bg-white/10 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <a 
                href="https://github.com/vyshnav-suresh" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-14 h-14 bg-white text-primary rounded-full hover:bg-light-blue transition-colors shadow-md"
              >
                <Github size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
