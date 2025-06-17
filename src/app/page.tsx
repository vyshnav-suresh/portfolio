"use client"
import Link from "next/link";
// import { DefaultSeo } from "next-seo";
// import SEO from "../../next-seo.config";
import Hero from "../components/Hero";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      {/* <DefaultSeo {...SEO} /> */}
      
      {/* Hero Section */}
      <Hero />


      {/* Projects Section */}
      <section id="projects" className="py-20 bg-[#faf6ff]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight flex flex-wrap gap-x-4 text-[#2d234a]">Projects</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-[#e3d7fa] rounded-2xl p-6 flex flex-col transition-all duration-300 hover:border-[#6c3fd1]/30 hover:shadow-lg hover:shadow-[#6c3fd1]/10"
            >
              <h3 className="text-2xl font-extrabold mb-4 text-[#2d234a]">X Open Chat</h3>
              <p className="text-muted-foreground mb-4">An AI-powered chat assistant built with modern web technologies.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">React, Node.js, OpenAI</span>
                <div className="flex space-x-2">
                  <a href="/projects/xopenchat" className="border border-[#2d234a] text-[#2d234a] rounded-full px-4 py-1 font-semibold hover:bg-[#2d234a] hover:text-white transition shadow-sm">Details</a>
                  <a href="https://github.com/vyshnav-suresh/xopenchat" className="border border-[#2d234a] text-[#2d234a] rounded-full px-4 py-1 font-semibold hover:bg-[#2d234a] hover:text-white transition shadow-sm">GitHub</a>
                </div>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-[#e3d7fa] rounded-2xl p-6 flex flex-col transition-all duration-300 hover:border-[#6c3fd1]/30 hover:shadow-lg hover:shadow-[#6c3fd1]/10"
            >
              <h3 className="text-2xl font-extrabold mb-4 text-[#2d234a]">EvolveOps</h3>
              <p className="text-muted-foreground mb-4">Cloud-native operations platform for modern infrastructure.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Kubernetes, Docker, AWS</span>
                <div className="flex space-x-2">
                  <a href="/projects/evolveops" className="border border-[#2d234a] text-[#2d234a] rounded-full px-4 py-1 font-semibold hover:bg-[#2d234a] hover:text-white transition shadow-sm">Details</a>
                  <a href="https://github.com/vyshnav-suresh/evolveops" className="border border-[#2d234a] text-[#2d234a] rounded-full px-4 py-1 font-semibold hover:bg-[#2d234a] hover:text-white transition shadow-sm">GitHub</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#faf6ff]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight flex flex-wrap gap-x-4 text-[#2d234a]">Contact Me</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <form className="space-y-6 bg-white border border-[#e3d7fa] rounded-2xl p-8 shadow-lg">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-[#2d234a]">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6c3fd1]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-[#2d234a]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6c3fd1]"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 text-[#2d234a]">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6c3fd1]"
                />
              </div>
              <button
                type="submit"
                className="w-full border border-[#2d234a] text-[#2d234a] bg-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-[#2d234a] hover:text-white transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
