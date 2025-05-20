import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Github, Linkedin, Instagram } from "lucide-react";
import VoiceAssistant from "./VoiceAssistant";

const TAGLINES = [
  "Empowering ideas with code.",
  "From trading bots to SEO dashboards.",
  "Crafting the future of AI-driven web."
];

export default function Hero() {
  // Typing animation state
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const full = TAGLINES[taglineIdx];
    if (typing) {
      if (displayed.length < full.length) {
        timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 40);
      } else {
        setTyping(false);
        timeout = setTimeout(() => setTyping(true), 1200);
      }
    } else {
      timeout = setTimeout(() => {
        setDisplayed("");
        setTaglineIdx((prev) => (prev + 1) % TAGLINES.length);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, taglineIdx]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-background to-background/90 flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">

        {/* Left: Textual Content */}
        <div className="flex-1 flex flex-col justify-center md:justify-center items-center md:items-start w-full md:max-w-xl z-10">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/80">
          Hi, I’m <span className="text-primary">Vyshnav Suresh</span>
        </h1>
        <h2 className="mt-2 text-2xl md:text-3xl text-muted-foreground">
          Full Stack Developer & AI Solutions Architect
        </h2>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          I build intelligent systems that bridge AI, automation, and modern web experiences — from SEO tools to trading bots and e-commerce platforms.
        </p>
        {/* Tagline with Typing Animation */}
        <div className="mt-4 min-h-[32px] text-lg md:text-xl text-accent font-mono">
          <span className="inline-block border-r-2 border-accent animate-blink pr-1">{displayed}</span>
        </div>
        {/* CTAs */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <Link href="#projects"><Button variant="default" size="lg">View Projects</Button></Link>
          <Link href="/resume.pdf" download><Button variant="outline" size="lg">Download Resume</Button></Link>
          <Link href="/contact"><Button variant="ghost" size="lg">Contact Me</Button></Link>
        </div>
        {/* Social Links */}
        <div className="mt-8 flex gap-4">
          <a href="https://github.com/vyshnav-suresh" target="_blank" rel="noopener noreferrer"><Button variant="ghost" size="icon"><Github className="w-5 h-5" /></Button></a>
          <a href="https://linkedin.com/in/vyshnav-suresh" target="_blank" rel="noopener noreferrer"><Button variant="ghost" size="icon"><Linkedin className="w-5 h-5" /></Button></a>
          <a href="https://instagram.com/vyshnav_suresh" target="_blank" rel="noopener noreferrer"><Button variant="ghost" size="icon"><Instagram className="w-5 h-5" /></Button></a>
        </div>
      </div>
        {/* Right: Voice Assistant Only */}
        <div className="flex-1 flex flex-col items-center justify-center mt-8 md:mt-0 gap-8">
          <VoiceAssistant />
        </div>
      </div>
      {/* Optional: Animated Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-10 pointer-events-none" />
    </section>
  );
}
