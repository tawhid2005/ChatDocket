import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chatdocketofficial.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ChatDocket — WhatsApp Chat to PDF for Spouse Visa & Court Evidence',
    template: '%s | ChatDocket',
  },
  description:
    'Convert exported WhatsApp chats into court-ready legal exhibits and embassy-compliant spouse visa packets (UK Home Office Appendix FM, US USCIS I-130, Canada IRCC, Australia Partner Visa 820/801). 100% client-side, private, with Bates numbering and SHA-256 integrity.',
  keywords: [
    'whatsapp chat to pdf for visa',
    'whatsapp chat proof for spouse visa',
    'how to export whatsapp chat for immigration',
    'UK spouse visa whatsapp evidence',
    'USCIS I-130 whatsapp chat logs',
    'Canada IRCC whatsapp chat history',
    'Australia partner visa 820 801 whatsapp proof',
    'whatsapp bates numbering court exhibit',
    'convert whatsapp export to legal document',
    'WhatsApp chat to PDF for spouse visa',
    'UK Home Office Appendix FM relationship evidence',
    'USCIS I-130 WhatsApp message history export',
    'IRCC Canada Spousal Sponsorship WhatsApp IMM 5289',
    'WhatsApp chat statement of truth affidavit CPR 32',
    'Offline private WhatsApp PDF exporter without server upload',
    'WhatsApp zip to PDF with photos and voice call logs',
    'Legal redaction tool for WhatsApp chat',
  ],
  authors: [{ name: 'ChatDocket Legal Tech', url: siteUrl }],
  creator: 'ChatDocket',
  publisher: 'ChatDocket',
  applicationName: 'ChatDocket',
  generator: 'Next.js',
  category: 'Legal & Immigration Software',
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'ChatDocket — WhatsApp Chat to Legal & Spouse Visa PDF Exporter',
    description:
      'Official client-side WhatsApp PDF generator for UKVI, USCIS, IRCC, Australia partner visa petitions and forensic court evidence. Smart sampling, Bates numbering, call logs, and SHA-256 cryptographic integrity.',
    siteName: 'ChatDocket',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'ChatDocket - WhatsApp to Legal & Spouse Visa PDF Exporter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChatDocket — WhatsApp Chat to Legal & Visa PDF Exporter',
    description:
      'Turn exported WhatsApp .zip and .txt chats into official, paginated, embassy-ready PDF documents without uploading any data to servers.',
    images: ['/opengraph-image'],
    creator: '@chatdocket',
  },
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
  alternates: {
    canonical: siteUrl,
  },
  appleWebApp: {
    capable: true,
    title: 'ChatDocket',
    statusBarStyle: 'black-translucent',
  },
};

const jsonLdWebApp = {
  '@context': 'https://schema.org',
  '@type': ['SoftwareApplication', 'WebApplication'],
  name: 'ChatDocket',
  url: siteUrl,
  description:
    'Client-side privacy-first web application converting WhatsApp exports into official court and spouse visa evidence with Bates stamping, smart sampling, and SHA-256 verification.',
  applicationCategory: 'UtilitiesApplication',
  applicationSubCategory: 'Legal & Immigration Document Formatter',
  operatingSystem: 'All Modern Web Browsers (Chrome, Safari, Firefox, Edge, iOS, Android)',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  inLanguage: 'en',
  featureList: [
    'WhatsApp .zip and .txt archive parsing in local browser RAM',
    'UK Home Office Appendix FM spouse visa preset',
    'US USCIS I-130 and CR1 bona fide marriage exhibit formatting',
    'Canada IRCC IMM 5289 10-page target sampling preset',
    'Australia DHA Partner Visa Subclass 820/801 preset',
    'Sequential Bates stamping and SHA-256 integrity hash',
    'Auto-redaction of phone numbers, emails, and IDs',
    'Chronological voice/video call schedule and photo gallery',
  ],
  offers: [
    {
      '@type': 'Offer',
      name: 'Free Verification Preview',
      price: '0.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: siteUrl,
    },
    {
      '@type': 'Offer',
      name: 'Visa & Court Single Case Pass',
      price: '12.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: siteUrl,
    },
    {
      '@type': 'Offer',
      name: 'Law Firm & Agency Pro Monthly',
      price: '39.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: siteUrl,
    },
  ],
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ChatDocket',
  url: siteUrl,
  description:
    'WhatsApp Chat to Official Spouse Visa & Legal PDF Exporter for UKVI, USCIS, IRCC, and Australia DHA.',
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

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Guides',
      item: `${siteUrl}/guide`,
    },
  ],
};

const jsonLdHowToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert WhatsApp Chat to Legal Spouse Visa Evidence PDF',
  description:
    'Step-by-step tutorial on exporting your WhatsApp chat history and compiling it into an embassy-compliant spouse visa PDF dossier for UKVI, USCIS, or IRCC.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Export WhatsApp Chat as .ZIP or .TXT',
      text: "On iPhone or Android, open WhatsApp, go to your spouse's chat settings, select \"Export Chat\", choose \"Attach Media\" or \"Without Media\", and save the file.",
    },
    {
      '@type': 'HowToStep',
      name: 'Upload Archive to ChatDocket',
      text: 'Drop the exported .zip or .txt archive into ChatDocket. All parsing runs 100% locally in your browser memory with zero server uploads.',
    },
    {
      '@type': 'HowToStep',
      name: 'Apply Embassy Preset & Smart Sampling',
      text: 'Select your target preset (UK Home Office Appendix FM, US USCIS I-130, or Canada IRCC 10-page limit) to automatically sample messages across your relationship timeline.',
    },
    {
      '@type': 'HowToStep',
      name: 'Download Official PDF with Bates Stamping',
      text: 'Export your print-ready PDF packet complete with relationship analytics cover page, chronological call logs, and cryptographic SHA-256 integrity stamp.',
    },
  ],
};

const jsonLdFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I export WhatsApp chat for a UK Spouse Visa (Appendix FM)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Export your chat with your spouse as a .zip or .txt file from WhatsApp. Upload it to ChatDocket, select UK Home Office Preset, apply 3 messages per week smart sampling, and print your 15-25 page document complete with Cover Page Analytics, Call Summary, and Photo Grid.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does USCIS accept WhatsApp chat logs for I-130 and CR1 visa petitions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, USCIS accepts chronological WhatsApp chat exports as secondary corroborating evidence of a bona fide marriage. ChatDocket formats these into official exhibit packets with date stamps, call logs, and Bates numbering.',
      },
    },
    {
      '@type': 'Question',
      name: "What is Canada IRCC's 10-page limit for WhatsApp chat history?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IRCC Guide IMM 5289 advises submitting a maximum of approximately 10 pages of communication history. ChatDocket includes a dedicated Canada IRCC preset that targets exactly 10-15 pages using proportional milestone sampling.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my chat private and safe from server data leaks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '100% safe. ChatDocket is an offline-capable, client-side web application. All zip extraction, regex parsing, media blob rendering, and PDF generation happen strictly inside your browser memory. Zero bytes are uploaded to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I redact sensitive financial and personal numbers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! ChatDocket features 1-click bulk PII redaction for phone numbers, email addresses, and bank accounts, as well as an interactive redaction mode where you can click any specific message to apply a black-out redaction bar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does ChatDocket support Bates numbering for court exhibits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, sequential Bates stamping (e.g. EXHIBIT-0001) is fully supported with custom prefixes, certified statements of truth (CPR Part 32), and SHA-256 tamper-evident digital hashes.',
      },
    },
  ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowToSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaqSchema) }}
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
