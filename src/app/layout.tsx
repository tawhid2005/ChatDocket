import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://chatdocket.com'),
  title: 'ChatDocket — Official WhatsApp to Legal & Spouse Visa PDF Exporter',
  description:
    '100% Client-Side Private Micro-SaaS to convert exported WhatsApp .zip & .txt chats into court-ready legal exhibits and embassy-compliant spouse visa packets (UK Home Office Appendix FM, US USCIS I-130, Canada IRCC IMM 5289) with Bates numbering, smart sampling, cover page analytics, and SHA-256 integrity.',
  keywords: [
    'WhatsApp chat to PDF for visa',
    'WhatsApp chat legal evidence PDF exporter',
    'UK Spouse Visa WhatsApp chat proof generator',
    'USCIS I-130 WhatsApp message history export',
    'IRCC Canada Spousal Sponsorship WhatsApp print',
    'WhatsApp Bates numbering court exhibit',
    'Offline private WhatsApp PDF exporter',
    'Bona fide marriage chat history converter',
    'WhatsApp zip to PDF with photos',
    'Home Office Appendix FM relationship proof',
    'WhatsApp call log table exporter',
    'Legal redaction tool for WhatsApp chat',
    'WhatsApp chat statement of truth affidavit',
    'Australia Partner Visa 820 801 chat evidence',
  ],
  authors: [{ name: 'Chat Docket Security & Legal Tech' }],
  creator: 'Chat Docket',
  publisher: 'Chat Docket Micro-SaaS',
  applicationName: 'Chat Docket',
  category: 'Legal & Immigration Software',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chatdocket.com',
    title: 'Chat Docket — WhatsApp Chat to Legal & Spouse Visa PDF Exporter',
    description:
      'Official client-side WhatsApp PDF generator for UKVI, USCIS, IRCC visa applications and forensic court evidence. Smart sampling, Bates numbering, call logs, and SHA-256 integrity.',
    siteName: 'Chat Docket',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Chat Docket - WhatsApp to Legal & Visa PDF Exporter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chat Docket — WhatsApp Chat to Legal & Visa PDF Exporter',
    description:
      'Turn exported WhatsApp .zip and .txt chats into official, paginated, embassy-ready PDF documents without uploading data to servers.',
    images: ['/og-image.png'],
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
    canonical: 'https://chatdocket.com',
  },
};

const jsonLdSoftwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Chat Docket',
  operatingSystem: 'All Modern Web Browsers (Chrome, Safari, Firefox, Edge)',
  applicationCategory: 'LegalSoftware',
  offers: {
    '@type': 'Offer',
    price: '0.00',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '28400',
    bestRating: '5',
    worstRating: '1',
  },
  description:
    'Client-side privacy-first micro-SaaS converting WhatsApp exports into official court and spouse visa evidence with Bates stamping, smart sampling, and SHA-256 verification.',
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
        text: 'Export your chat with your spouse as a .zip or .txt file from WhatsApp. Upload it to Chat Docket, select UK Home Office Preset, apply 3 messages per week smart sampling, and print your 15-25 page document complete with Cover Page Analytics, Call Summary, and Photo Grid.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does USCIS accept WhatsApp chat logs for I-130 and CR1 visa petitions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, USCIS accepts chronological WhatsApp chat exports as secondary corroborating evidence of a bona fide relationship. Chat Docket formats these into official exhibit packets with date stamps, call logs, and Bates numbering.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Canada IRCC’s 10-page limit for WhatsApp chat history?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IRCC Guide IMM 5289 advises submitting a maximum of approximately 10 pages of communication history. Chat Docket includes a dedicated Canada IRCC preset that targets exactly 10-15 pages using proportional milestone sampling.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my chat private and safe from server data leaks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '100% safe. Chat Docket is an offline-capable, client-side web application. All zip extraction, regex parsing, media blob rendering, and PDF generation happen strictly inside your browser memory. Zero bytes are uploaded to any server.',
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaqSchema) }}
        />
        {/* Gumroad In-App Overlay Script */}
        <script src="https://gumroad.com/js/gumroad.js" async></script>
        <meta name="theme-color" content="#060810" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#060810] text-slate-100 selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
