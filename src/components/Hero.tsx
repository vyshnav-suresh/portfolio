import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";

const TAGLINES = [
  "Empowering ideas with code.",
  "From trading bots to SEO dashboards.",
  "Crafting the future of AI-driven web."
];

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#faf6ff] flex flex-col relative overflow-hidden">
      {/* Top Nav */}
      <nav className="w-full flex items-center justify-between px-8 pt-8">
 
</nav>
      {/* Hero Content */}
      <div className="flex flex-col items-start justify-center flex-1 px-8 pt-16 md:pt-32 max-w-5xl mx-auto w-full">
  <div className="mb-2">
    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight flex flex-wrap gap-x-4">
      <span className="text-[#2d234a]">Hi, I’m</span>
      <span className="text-[#2d234a] outline-text">Vyshnav Suresh</span>
    </h1>
    <h2 className="mt-4 text-2xl md:text-3xl text-[#6c3fd1] font-semibold">
      Full Stack Developer & AI Solutions Architect
    </h2>
  </div>
  <p className="mt-8 text-lg md:text-xl max-w-2xl text-[#2d234a] opacity-80">
    I build intelligent systems that bridge AI, automation, and modern web experiences — from SEO tools to trading bots and e-commerce platforms.
  </p>
  <div className="mt-8 flex flex-col md:flex-row gap-4">
    <a href="#projects"><button className="border border-[#2d234a] text-[#2d234a] rounded-full px-6 py-2 font-semibold hover:bg-[#2d234a] hover:text-white transition shadow-sm">View Projects</button></a>
    <a href="/resume.pdf" download><button className="border border-[#2d234a] text-[#2d234a] rounded-full px-6 py-2 font-semibold hover:bg-[#2d234a] hover:text-white transition shadow-sm">Download Resume</button></a>
    <a href="/contact"><button className="border border-[#2d234a] text-[#2d234a] rounded-full px-6 py-2 font-semibold hover:bg-[#2d234a] hover:text-white transition shadow-sm">Contact Me</button></a>
  </div>
</div>
      {/* Decorative Dot */}
    
    </section>
  );
}
