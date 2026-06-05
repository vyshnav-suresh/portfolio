import { MetadataRoute } from 'next';
import connectToDatabase from '@/lib/mongodb';
import { Project } from '@/models/Project';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vyshnav.dev';

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  try {
    await connectToDatabase();
    const projects = await Project.find({}).lean();
    const projectRoutes = (projects as unknown as Array<{ _id: unknown; slug?: string; updatedAt?: Date; createdAt?: Date }>).map((project) => {
      const id = String(project._id);
      const slug = project.slug;
      const date = project.updatedAt || project.createdAt || new Date();
      return {
        url: `${baseUrl}/projects/${slug || id}`,
        lastModified: new Date(date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      };
    });
    
    // Add hardcoded QIoT route
    projectRoutes.push({
      url: `${baseUrl}/projects/qiot`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    });

    return [...routes, ...projectRoutes];
  } catch (error) {
    console.error('Failed to generate sitemap', error);
    return routes;
  }
}
