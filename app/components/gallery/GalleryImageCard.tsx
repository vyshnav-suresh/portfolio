import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
;
import { Redis } from "@upstash/redis";
import { Eye, Navigation } from "lucide-react";
import Image from "next/image";
import { gallery } from "@/data";
import { Card } from "../card";

export const revalidate = 60;
type GalleryCardType={
id:number;
image:string;
}
export default async function GalleryCard({id,image}:GalleryCardType) {
  
  return (

			<Card key={id}>
				<Image src={image} width={300} height={300} className="w-full max-h-[200px] object-contain" alt="sfdsf"/>
			</Card>
  );
}