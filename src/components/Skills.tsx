import { Code2, Database, Cloud, Bot, Wrench, Sparkles } from "lucide-react";

const skillCategories = [
  {
    title: "Languages & Frameworks",
    icon: <Code2 size={20} className="text-primary" />,
    skills: ["JavaScript", "TypeScript", "Python", "Node.js", "React.js", "Next.js", "NestJS", "Flask", "React Native", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    title: "Databases",
    icon: <Database size={20} className="text-primary" />,
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud size={20} className="text-primary" />,
    skills: ["Vercel", "Firebase", "Git", "GitHub", "AWS", "Docker"],
  },
  {
    title: "AI & Automation",
    icon: <Bot size={20} className="text-primary" />,
    skills: ["GenAI", "LangChain", "n8n", "Google App Script"],
  },
  {
    title: "Tools",
    icon: <Wrench size={20} className="text-primary" />,
    skills: ["TanStack", "Redux", "JWT", "CoreUI", "Apache Superset", "Postman", "Figma"],
  },
  {
    title: "Specialities",
    icon: <Sparkles size={20} className="text-primary" />,
    skills: ["Microservices", "RESTful APIs", "RBAC", "OAuth 2.0", "Real-time systems"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="mb-12">
          <span className="text-primary text-[11px] font-medium uppercase tracking-widest mb-2 block">Technical Skills</span>
          <h2 className="font-display text-4xl md:text-5xl text-gray-900">Technical Expertise</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-light-blue rounded-lg">
                  {category.icon}
                </div>
                <h3 className="font-medium text-[0.95rem] text-gray-900">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="bg-gray-100 text-gray-700 text-[11px] px-3 py-1.5 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
