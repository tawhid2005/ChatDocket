import type { Metadata } from 'next';

const canonicalHost = 'www.chatdocket.xyz';
const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL || `https://${canonicalHost}`);
if (origin.hostname === 'chatdocket.xyz') {
  origin.hostname = canonicalHost;
  origin.protocol = 'https:';
}
export const siteUrl = origin.origin;

export function pageMetadata(
  path: string,
  title: string,
  description: string,
  type: 'website' | 'article' = 'website',
): Metadata {
  const url = new URL(path, siteUrl).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, type, url, siteName: 'ChatDocket',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'ChatDocket WhatsApp PDF converter' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
  };
}
