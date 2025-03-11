"use client"
import Link from "next/link";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      {/* <DefaultSeo {...SEO} /> */}
      {/* <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center"> */}
      <div className="min-h-screen bg-background text-text flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold tracking-tight">Vyshnav</h1>
      <p className="text-gray-400 mt-2 text-lg">Software Engineer</p>

      {/* Call to Action */}
      <a
        href="/resume.pdf"
        className="bg-accent text-black px-6 py-3 mt-6 rounded-lg text-lg font-semibold shadow-lg hover:bg-highlight transition duration-300"
        download
      >
        View My Experience
      </a>

      {/* Projects Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold">Projects</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/projects/xopenchat" className="p-6 bg-secondary rounded-lg shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-lg font-semibold">X Open Chat</h3>
            <p className="text-gray-400 text-sm">An AI-powered assistant.</p>
          </a>
          <a href="/projects/evolveops" className="p-6 bg-secondary rounded-lg shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-lg font-semibold">EvolveOps</h3>
            <p className="text-gray-400 text-sm">Cloud-native operations platform.</p>
          </a>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="text-gray-400 text-lg">Email: vyshnav@example.com</p>
      </div>
    </div>
    </>
  );
}
