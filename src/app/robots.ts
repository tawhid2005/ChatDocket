import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chatdocket.xyz';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/payment-success'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
