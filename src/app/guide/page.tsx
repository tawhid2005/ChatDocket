import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chatdocket.xyz';

export const metadata: Metadata = {
  title: 'WhatsApp Legal & Visa Evidence Guides Hub',
  description:
    'Official guides to export and format WhatsApp chats into court-admissible and spouse visa PDF evidence for UKVI, USCIS, IRCC, and civil courts.',
  alternates: {
    canonical: `${siteUrl}/guide`,
  },
  openGraph: {
    title: 'WhatsApp Legal & Visa Evidence Guides Hub',
    description:
      'Official guides to export and format WhatsApp chats into court-admissible and spouse visa PDF evidence for UKVI, USCIS, IRCC, and civil courts.',
    url: `${siteUrl}/guide`,
    type: 'website',
  },
};

interface GuideItem {
  icon: string;
  category: string;
  title: string;
  href: string;
  summary: string;
  badge: string;
}

const visaGuides: GuideItem[] = [
  {
    icon: '🇬🇧',
    category: 'United Kingdom — UKVI / Home Office',
    title: 'WhatsApp Chat to PDF for UK Spouse Visa (Appendix FM)',
    href: '/guide/whatsapp-to-pdf-uk-spouse-visa',
    summary:
      'Learn how to structure 15–25 pages of continuous WhatsApp messages, call log tables, gap explanations, and Appendix FM statements of truth.',
    badge: '3 msgs/week Smart Sampling · A4 Format',
  },
  {
    icon: '🇺🇸',
    category: 'United States — USCIS',
    title: 'WhatsApp Chat Proof for USCIS I-130 & CR1/IR1 Petitions',
    href: '/guide/whatsapp-chat-proof-uscis-i130',
    summary:
      'Format chronological WhatsApp logs into Bates-stamped US Letter legal table exhibits supporting bona fide marriage requirements.',
    badge: 'Legal Table · US Letter Format',
  },
  {
    icon: '🇨🇦',
    category: 'Canada — IRCC',
    title: 'WhatsApp Evidence for Canada IRCC Spousal Sponsorship (IMM 5289)',
    href: '/guide/whatsapp-evidence-canada-ircc',
    summary:
      'Comply strictly with Canada IRCC\'s 10-page communication proof guideline using automated milestone sampling and bilingual formatting.',
    badge: '10–15 Page Target Limit',
  },
  {
    icon: '🇦🇺',
    category: 'Australia — Department of Home Affairs',
    title: 'WhatsApp Proof for Australia Partner Visa (Subclass 820 / 801)',
    href: '/guide/whatsapp-proof-australia-partner-visa',
    summary:
      'Demonstrate ongoing commitment and social communication across long-distance and de facto periods with call schedules and timestamps.',
    badge: 'DHA 820/801 · Call & Gap Logs',
  },
];

const legalGuides: GuideItem[] = [
  {
    icon: '⚖️',
    category: 'Civil Litigation & CPR 32',
    title: 'WhatsApp Chat as Court Evidence — Bates Stamping Guide',
    href: '/guide/whatsapp-chat-court-evidence-bates-stamping',
    summary:
      'Submit WhatsApp chat logs as court-admissible evidence with automated sequential Bates stamping, SHA-256 hash integrity, and statutory statements of truth.',
    badge: 'Bates Stamping · CPR Part 32 / Rule 901',
  },
  {
    icon: '👨‍👧‍👦',
    category: 'Family Court & Custody',
    title: 'WhatsApp Evidence for Child Custody & Family Court',
    href: '/guide/whatsapp-evidence-child-custody-family-court',
    summary:
      'Format co-parenting text logs, missed visitations, and parental alienation evidence into clear, objective court bundles that family judges respect.',
    badge: 'FHDRA & CAFCASS Ready · Call Schedules',
  },
  {
    icon: '🏠',
    category: 'Tenancy & Housing Tribunals',
    title: 'WhatsApp Proof for Landlord & Tenant Disputes',
    href: '/guide/whatsapp-chat-proof-landlord-tenant-dispute',
    summary:
      'Export WhatsApp evidence for tenancy deposit disputes (TDS, DPS), disrepair notices, unannounced landlord visits, and rent payment agreements.',
    badge: 'Tenancy Deposit Schemes · Small Claims',
  },
  {
    icon: '💼',
    category: 'Commercial Debt & Contracts',
    title: 'WhatsApp Proof for Freelancer & Contract Disputes',
    href: '/guide/whatsapp-evidence-freelancer-contract-dispute',
    summary:
      'Prove client approvals, project scope expansions, and unpaid invoices using formatted WhatsApp chat PDF exhibits with cryptographic verification.',
    badge: 'Small Claims Court · Debt Recovery',
  },
];

const tutorialGuides: GuideItem[] = [
  {
    icon: '📱',
    category: 'Device Tutorials & Tips',
    title: 'How to Export WhatsApp Chat on iPhone and Android',
    href: '/guide/how-to-export-whatsapp-chat-iphone-android',
    summary:
      'Step-by-step instructions for extracting WhatsApp chat histories with attached photos, voice notes, and timestamps as .zip archives on iOS and Android.',
    badge: 'Complete Device Guide · iOS & Android',
  },
];

const allGuides = [...visaGuides, ...legalGuides, ...tutorialGuides];

const jsonLdCollection = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Immigration & Legal WhatsApp Evidence Guides Hub',
  description:
    'Country and case-specific guidelines for exporting and formatting WhatsApp chat history as visa, family court, and commercial litigation PDF exhibits.',
  url: `${siteUrl}/guide`,
  inLanguage: 'en',
  hasPart: allGuides.map((g) => ({
    '@type': 'Article',
    headline: g.title,
    url: `${siteUrl}${g.href}`,
  })),
};

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: `${siteUrl}/guide` },
  ],
};

function GuideCard({ guide }: { guide: GuideItem }) {
  return (
    <article className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-emerald-500/50 hover:bg-slate-900/90 transition-all duration-300">
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-2xl" role="img" aria-hidden="true">
          {guide.icon}
        </span>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800/80 text-emerald-400 font-medium border border-emerald-500/20">
          {guide.badge}
        </span>
      </div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
        {guide.category}
      </p>
      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
        <Link href={guide.href} className="focus:outline-none focus:underline">
          <span className="absolute inset-0" aria-hidden="true" />
          {guide.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-3">
        {guide.summary}
      </p>
      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
        Read complete guide &rarr;
      </div>
    </article>
  );
}

export default function GuidesHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollection) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <div lang="en" className="space-y-12">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
            Official Immigration, Court &amp; Dispute Evidence Hub
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            WhatsApp Legal &amp; Visa Evidence Guides
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Every legal case and visa authority has distinct evidentiary expectations. Use these official guides to format your WhatsApp chat logs into persuasive, compliant PDF bundles.
          </p>
        </header>

        {/* Section 1: Spouse & Partner Visas */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💑</span> Spouse, Partner &amp; Fiancé Visa Petitions
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Official country-by-country guidelines for UKVI, USCIS, IRCC, and DHA immigration officers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visaGuides.map((guide) => (
              <GuideCard key={guide.href} guide={guide} />
            ))}
          </div>
        </section>

        {/* Section 2: Court & Litigation */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚖️</span> Civil Court, Family Law &amp; Contract Disputes
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Courtroom-admissible formatting with automated Bates numbering, hash verification, and statements of truth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legalGuides.map((guide) => (
              <GuideCard key={guide.href} guide={guide} />
            ))}
          </div>
        </section>

        {/* Section 3: Device Tutorials */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📱</span> Technical &amp; Device Tutorials
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Step-by-step export tutorials for iPhone, iPad, Android, and WhatsApp Web.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorialGuides.map((guide) => (
              <GuideCard key={guide.href} guide={guide} />
            ))}
          </div>
        </section>

        {/* Bottom Callout */}
        <section className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 p-8 sm:p-10 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Ready to Format Your WhatsApp Evidence?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Drag and drop your exported WhatsApp chat file. 100% private, client-side browser processing with zero server uploads.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20"
            >
              Start Free WhatsApp Conversion
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
