import type { Metadata } from 'next';
import './globals.css';

import { pageMetadata, siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  ...pageMetadata('/', 'WhatsApp Chat to PDF for Visa & Court | ChatDocket',
    'Convert exported WhatsApp TXT or ZIP chats into a PDF. Preview messages, choose a date range and add Bates numbering for visa or court documents.'),
  metadataBase: new URL(siteUrl),
  title: { default: 'WhatsApp Chat to PDF for Visa & Court | ChatDocket', template: '%s | ChatDocket' },
  authors: [{ name: 'ChatDocket Legal Tech', url: siteUrl }],
  creator: 'ChatDocket',
  publisher: 'ChatDocket',
  applicationName: 'ChatDocket',
  generator: 'Next.js',
  category: 'Legal & Immigration Software',
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: 'ChatDocket',
    statusBarStyle: 'black-translucent',
  },
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ChatDocket',
  url: siteUrl,
  description:
    'Browser-based WhatsApp chat PDF converter and evidence formatting guides.',
  inLanguage: 'en',
};

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ChatDocket',
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/icon.svg`,
  },
  sameAs: ['https://github.com/tawhid2005/ChatDocket'],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@chatdocket.com',
    contactType: 'customer support',
    availableLanguage: 'English',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && window.location.hostname === 'chatdocketofficial.vercel.app') {
                window.location.replace('https://www.chatdocket.xyz' + window.location.pathname + window.location.search + window.location.hash);
              }
            `,
          }}
        />
        <meta name="theme-color" content="#060810" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ChatDocket" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#060810] text-slate-100 selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
