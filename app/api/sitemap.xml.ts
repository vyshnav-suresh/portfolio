import { NextApiRequest, NextApiResponse } from "next";
import { projects } from "../page";

export default function handler(req:NextApiRequest, res:NextApiResponse) {
  const baseUrl = "https://vyshnav-suresh.vercel.app";
  const staticPages = ["", "/#projects", "/#contact", "/contact"];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${baseUrl}${url}</loc>
              <lastmod>2025-03-06</lastmod>
              <changefreq>monthly</changefreq>
              <priority>${url === "" ? "1.0" : "0.7"}</priority>
            </url>
          `;
        })
        .join("")}
      ${projects
        .map((project:any) => {
          return `
            <url>
              <loc>${baseUrl}/projects/${project.slug}</loc>
              <lastmod>2025-03-06</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(sitemap);
}