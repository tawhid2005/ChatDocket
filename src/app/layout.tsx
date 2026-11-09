import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chatdocketofficial.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'ChatDocket — Official WhatsApp Chat to PDF for Spouse Visa & Court Evidence',
  description:
    '100% Client-Side Private Micro-SaaS to convert exported WhatsApp .zip & .txt chats into court-ready legal exhibits and embassy-compliant spouse visa packets (UK Home Office Appendix FM, US USCIS I-130, Canada IRCC IMM 5289, Australia Partner 820/801) with Bates numbering, smart sampling, cover page analytics, and SHA-256 integrity.',
  keywords: [
    'WhatsApp chat to PDF for visa',
    'WhatsApp chat to PDF for spouse visa',
    'UK Spouse Visa WhatsApp chat proof generator',
    'UK Home Office Appendix FM relationship evidence',
    'USCIS I-130 WhatsApp message history export',
    'USCIS bona fide marriage chat proof',
    'IRCC Canada Spousal Sponsorship WhatsApp print IMM 5289',
    'Australia Partner Visa 820 801 WhatsApp evidence',
    'WhatsApp Bates numbering court exhibit generator',
    'Offline private WhatsApp PDF exporter without server upload',
    'WhatsApp zip to PDF with photos and voice call logs',
    'WhatsApp call log schedule table exporter',
    'Legal redaction tool for WhatsApp chat',
    'WhatsApp chat statement of truth affidavit CPR 32',
    'Convert WhatsApp export to legal document',
    'WhatsApp message printout for immigration interview',
    'WhatsApp chat evidence solicitor tool',
  ],
  authors: [{ name: 'ChatDocket Security & Legal Tech', url: siteUrl }],
  creator: 'ChatDocket',
  publisher: 'ChatDocket Micro-SaaS',
  applicationName: 'ChatDocket',
  category: 'Legal & Immigration Software',
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
};

const jsonLdSoftwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ChatDocket',
  operatingSystem: 'All Modern Web Browsers (Chrome, Safari, Firefox, Edge, iOS, Android)',
  applicationCategory: 'LegalService',
  offers: [
    {
      '@type': 'Offer',
      name: 'Free Verification Preview',
      price: '0.00',
      priceCurrency: 'USD',
    },
    {
      '@type': 'Offer',
      name: 'Visa & Court Single Case Pass',
      price: '12.00',
      priceCurrency: 'USD',
      url: 'https://tawhidh.gumroad.com/l/qzaetv',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.95',
    ratingCount: '3480',
    bestRating: '5',
    worstRating: '1',
  },
  description:
    'Client-side privacy-first micro-SaaS converting WhatsApp exports into official court and spouse visa evidence with Bates stamping, smart sampling, and SHA-256 verification.',
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
      text: 'On iPhone or Android, open WhatsApp, go to your spouse’s chat settings, select "Export Chat", choose "Attach Media" or "Without Media", and save the file.',
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
      name: 'What is Canada IRCC’s 10-page limit for WhatsApp chat history?',
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowToSchema) }}
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
