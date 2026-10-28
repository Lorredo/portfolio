import { MetadataRoute } from 'next';
import { projects } from '../../content/projects';
import { getAllPostSlugs, getPostBySlug } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://artem.dev';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...['/projects', '/blog', '/about', '/contact', '/guestbook', '/uses'].map(
      (route): MetadataRoute.Sitemap[number] => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    ),
  ];

  const blogRoutes = getAllPostSlugs()
    .map((slug): MetadataRoute.Sitemap[number] | null => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(post.frontmatter.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
      };
    })
    .filter((route): route is NonNullable<MetadataRoute.Sitemap[number]> => route !== null);

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
