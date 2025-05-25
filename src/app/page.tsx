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
      <section className="py-20 bg-background/90">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold">Projects</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-secondary p-6 rounded-lg shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-4">X Open Chat</h3>
              <p className="text-muted-foreground mb-4">An AI-powered chat assistant built with modern web technologies.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">React, Node.js, OpenAI</span>
                <div className="flex space-x-2">
                  <a href="/projects/xopenchat" className="text-accent hover:text-highlight">Details</a>
                  <a href="https://github.com/vyshnav-suresh/xopenchat" className="text-accent hover:text-highlight">GitHub</a>
                </div>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-secondary p-6 rounded-lg shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-4">EvolveOps</h3>
              <p className="text-muted-foreground mb-4">Cloud-native operations platform for modern infrastructure.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Kubernetes, Docker, AWS</span>
                <div className="flex space-x-2">
                  <a href="/projects/evolveops" className="text-accent hover:text-highlight">Details</a>
                  <a href="https://github.com/vyshnav-suresh/evolveops" className="text-accent hover:text-highlight">GitHub</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold">Contact Me</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-black px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-highlight transition duration-300"
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
