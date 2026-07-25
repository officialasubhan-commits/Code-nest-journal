import { MetadataRoute } from 'next';
import { getSiteSettings } from '@/app/admin/settings/actions';

export const dynamic = 'force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const siteUrl = settings?.siteUrl || 'https://code-nest-journal.vercel.app';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
