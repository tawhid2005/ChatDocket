import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chatdocket.xyz';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    // Spouse & Partner Visas
    {
      url: `${baseUrl}/guide/whatsapp-to-pdf-uk-spouse-visa`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guide/whatsapp-chat-proof-uscis-i130`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guide/whatsapp-evidence-canada-ircc`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guide/whatsapp-proof-australia-partner-visa`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Legal & Dispute Evidence
    {
      url: `${baseUrl}/guide/whatsapp-chat-court-evidence-bates-stamping`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guide/whatsapp-evidence-child-custody-family-court`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guide/whatsapp-chat-proof-landlord-tenant-dispute`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guide/whatsapp-evidence-freelancer-contract-dispute`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Tutorials
    {
      url: `${baseUrl}/guide/how-to-export-whatsapp-chat-iphone-android`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // Legal Policies
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
