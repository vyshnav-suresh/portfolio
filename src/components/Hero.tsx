import Link from "next/link";
import { ArrowRight, Github, Linkedin, Download } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="min-h-[90vh] flex items-center justify-center py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        <div className="order-2 md:order-1 flex flex-col space-y-6">
          <div className="inline-flex items-center space-x-2 bg-light-blue text-primary px-3 py-1 rounded-full w-fit">
            <span className="text-xs font-medium uppercase tracking-wider">Full Stack Engineer</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight text-gray-900">
            Building scalable web applications with precision.
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            Node.js &middot; React &middot; Python &middot; MongoDB &middot; GenAI enthusiast with a passion for clean APIs, microservices, and workflow automation.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link 
              href="#contact" 
              className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              <span>Get in touch</span>
              <ArrowRight size={18} />
            </Link>
            
            <a 
              href="https://github.com/vyshnav-suresh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
            
            <a 
              href="https://linkedin.com/in/vyshnav-suresh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
            
            {/* Optional Resume Button placeholder */}
            <a 
              href="#" 
              className="inline-flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <Download size={18} />
              <span>Resume</span>
            </a>
          </div>
        </div>
        
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-80 bg-light-blue rounded-full flex items-center justify-center shadow-inner border-4 border-white">
            <span className="font-display text-7xl md:text-8xl text-primary opacity-80">VS</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
