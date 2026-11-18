import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {

  return [
    {
      url: siteUrl,
      lastModified: '2026-11-18',
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/guide`,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    // Spouse & Partner Visas
    {
      url: `${siteUrl}/guide/whatsapp-to-pdf-uk-spouse-visa`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/guide/whatsapp-chat-proof-uscis-i130`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/guide/whatsapp-evidence-canada-ircc`,
      lastModified: '2026-11-18',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/guide/whatsapp-proof-australia-partner-visa`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Legal & Dispute Evidence
    {
      url: `${siteUrl}/guide/whatsapp-chat-court-evidence-bates-stamping`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/guide/whatsapp-evidence-child-custody-family-court`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/guide/whatsapp-chat-proof-landlord-tenant-dispute`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/guide/whatsapp-evidence-freelancer-contract-dispute`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Tutorials
    {
      url: `${siteUrl}/guide/how-to-export-whatsapp-chat-iphone-android`,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/guide/whatsapp-chat-to-pdf-with-photos`,
      lastModified: '2026-11-18',
      priority: 0.85,
    },
    // Legal Policies
    {
      url: `${siteUrl}/privacy`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/terms`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
