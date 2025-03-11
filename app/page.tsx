"use client"; // Mark as Client Component due to useState

import Link from "next/link";
import React, { useState } from "react";
import { Download } from "lucide-react";
import toast from "react-hot-toast";
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
    link: "https://xopenchat-ai.vercel.app",
  },
  {
    title: "EvolveOps",
    description: "A software solutions company.",
    link: "https://evolveops.vercel.app",
  },
];

export default function Home() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    const processingToast = toast.loading("Processing...", {
      icon: "⏳",
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });

    setTimeout(() => {
      toast.dismiss(processingToast);
      toast.success("Download Successful! ✅", {
        duration: 4000,
        icon: "✅",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });

      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={100} />
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <section className="text-center">
        <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
          Vyshnav
        </h1>
        <h2 className="z-10 text-xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-xl md:text-2xl whitespace-nowrap bg-clip-text">
          Software Engineer
        </h2>
        <p className="my-16 text-sm text-zinc-500 animate-fade-in">
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
        <h2 className="text-2xl font-bold text-white">On Going Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {projects.map((project, index) => (
            <article
              key={index}
              className="p-6 bg-zinc-800 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-zinc-700"
            >
              <h3 className="text-lg font-semibold text-white">{project.title}</h3>
              <p className="text-sm text-zinc-400">{project.description}</p>
              <Link href={project.link} className="text-sm text-blue-400 hover:underline mt-2 inline-block">
                View Project →
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section id="contact" className="my-16 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-white">Contact</h2>
        <p className="text-zinc-400">Email: vyshnav@example.com</p>
      </section>
    </div>
  );
}