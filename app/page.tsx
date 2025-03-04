import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import { Download } from "lucide-react";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];
const projects = [
  {
    title: "X Open Chat",
    description: "An AI-powered conversational assistant built using Next.js and OpenRouter API.",
    link: "https://github.com/yourusername/XOpenChat",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        Vyshnav
      </h1>
      <h1 className="z-10 text-xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-xl md:text-2xl whitespace-nowrap bg-clip-text ">
        Software Engineer
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">
          I'm building{" "}
          <Link
            target="_blank"
            href="https://exp.dev"
            className="underline duration-500 hover:text-zinc-300"
          >
            exp.dev
          </Link>{" "}to solve Expense tracking for normal people.
        </h2>
      </div>
      
      {/* Enhanced Resume Download Section */}
      <div className="my-10 text-center animate-fade-in">
        <Link
          href="/resume.pdf"
          download
          className="flex items-center gap-2 px-6 py-3 text-white bg-zinc-800 hover:bg-zinc-600 rounded-lg text-base font-semibold transition-transform duration-300 hover:scale-105 shadow-lg"
        >
          <Download className="w-5 h-5" />
          View My Experience
        </Link>
      </div>
       
      {/* Project Showcase Section */}
      <div className="my-16 text-center animate-fade-in w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {projects.map((project, index) => (
            <div key={index} className="p-6 bg-zinc-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
              <h3 className="text-lg font-semibold text-white">{project.title}</h3>
              <p className="text-sm text-zinc-400">{project.description}</p>
              <Link href={project.link} className="text-sm text-blue-400 hover:underline mt-2 inline-block">
                View Project →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
