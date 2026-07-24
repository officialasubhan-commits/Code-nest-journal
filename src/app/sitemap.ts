import { MetadataRoute } from 'next';
import { getSiteSettings } from '@/app/admin/settings/actions';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings();
  const siteUrl = settings?.siteUrl || 'https://code-nest-journal.vercel.app';

  // Static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/projects',
    '/journal',
    '/courses',
    '/certifications',
    '/gallery'
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Fetch dynamic items (posts, projects)
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true }
    });

    const postUrls = posts.map((post) => ({
      url: `${siteUrl}/journal/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    const projects = await prisma.project.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true }
    });

    const projectUrls = projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...routes, ...postUrls, ...projectUrls];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return routes;
  }
}
