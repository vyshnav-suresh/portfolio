import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
;
import { Redis } from "@upstash/redis";
import { Eye, Navigation } from "lucide-react";
import Image from "next/image";
import { gallery } from "@/data";
import { Card } from "../card";
import GalleryCard from "./GalleryImageCard";

export const revalidate = 60;
type GallerySectionType={
title:string;
items:any;
}
export default async function GallerySection({title,items}:GallerySectionType) {
  
  return (
    <div>
        <div className="w-full h-px bg-zinc-800" />
		<h2 className="text-3xl font-bold tracking-tight py-8 text-zinc-100 sm:text-4xl">
            {title}
          </h2>
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
			{items.map((featured:any,id:number)=>{
				console.log("fsd",featured.src);
				
				return(
			<GalleryCard id={id} image={featured.image}/>
			)})}
        </div>
      </div>  );
}