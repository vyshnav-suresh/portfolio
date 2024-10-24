import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";
import data, { gallery } from '../../data'
import Image from "next/image";
import GallerySection from "../components/gallery/GallerSection";

export const revalidate = 60;
export default async function ProjectsPage() {
  const views = data
  const featured= data;
  const top2 = data.find((project) => project.slug === "planetfall")!;
  const top3 = data.find((project) => project.slug === "highstorm")!;

  console.log(gallery);
  
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Gallery
          </h2>
          <p className="mt-4 text-zinc-400">
            Its just me and me.
          </p>
        </div>
        <GallerySection items={gallery.hobies} title="Hobbies"/>
        <GallerySection items={gallery.hobies} title="Fun"/>
        <GallerySection items={gallery.hobies} title="Hobbies"/>
          
      </div>
    </div>
  );
}