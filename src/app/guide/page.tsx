import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chatdocketofficial.vercel.app';

export const metadata: Metadata = {
  title: 'Immigration & Court WhatsApp Evidence Guides',
  description:
    'Country-by-country guides to format WhatsApp chat history into official spouse visa & court PDFs for UKVI, USCIS, Canada IRCC & Australia DHA.',
  alternates: {
    canonical: `${siteUrl}/guide`,
  },
  openGraph: {
    title: 'Immigration & Court WhatsApp Evidence Guides | ChatDocket',
    description:
      'Step-by-step guides to preparing WhatsApp chat proof for UK, US, Canada, and Australia spouse/partner visa applications.',
    url: `${siteUrl}/guide`,
    type: 'website',
  },
};

const guides = [
  {
    flag: '🇬🇧',
    country: 'United Kingdom — UKVI / Home Office',
    title: 'WhatsApp Chat to PDF for UK Spouse Visa (Appendix FM)',
    href: '/guide/whatsapp-to-pdf-uk-spouse-visa',
    summary:
      'Learn how to structure 15–25 pages of continuous WhatsApp messages, call log tables, gap explanations, and Appendix FM statements of truth.',
    badge: '3 msgs/week Smart Sampling · A4',
  },
  {
    flag: '🇺🇸',
    country: 'United States — USCIS',
    title: 'WhatsApp Chat Proof for USCIS I-130 & CR1/IR1 Petitions',
    href: '/guide/whatsapp-chat-proof-uscis-i130',
    summary:
      'Format chronological WhatsApp logs into Bates-stamped US Letter legal table exhibits supporting bona fide marriage requirements.',
    badge: 'Legal Table · US Letter Format',
  },
  {
    flag: '🇨🇦',
    country: 'Canada — IRCC',
    title: 'WhatsApp Evidence for Canada IRCC Spousal Sponsorship (IMM 5289)',
    href: '/guide/whatsapp-evidence-canada-ircc',
    summary:
      'Comply strictly with Canada IRCC\'s 10-page communication proof guideline using automated milestone sampling and bilingual formatting.',
    badge: '10–15 Page Target Limit',
  },
  {
    flag: '🇦🇺',
    country: 'Australia — Department of Home Affairs',
    title: 'WhatsApp Proof for Australia Partner Visa (Subclass 820 / 801)',
    href: '/guide/whatsapp-proof-australia-partner-visa',
    summary:
      'Demonstrate ongoing commitment and social communication across long-distance and de facto periods with call schedules and timestamps.',
    badge: 'DHA 820/801 · Call & Gap Logs',
  },
];

const jsonLdCollection = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Immigration & Legal WhatsApp Evidence Guides',
  description:
    'Country-specific guidelines for exporting and formatting WhatsApp chat history as visa and legal PDF evidence.',
  url: `${siteUrl}/guide`,
  inLanguage: 'en',
  hasPart: guides.map((g) => ({
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

      <div lang="en" className="space-y-10">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
            Official Immigration &amp; Court Formatting Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            WhatsApp Chat Evidence Guides by Country &amp; Visa Type
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
            Every immigration department enforces strict rules on how digital chat history must be curated, translated, and submitted. Select your destination country below to review compliance rules and generate an official PDF packet with{' '}
            <Link href="/" className="text-emerald-400 underline font-semibold">
              ChatDocket
            </Link>
            .
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {guides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group p-6 rounded-2xl border border-slate-800 bg-white/[0.02] hover:border-emerald-500/50 hover:bg-emerald-500/[0.04] transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-400">
                    {g.flag} {g.country}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    {g.badge}
                  </span>
                </div>
                <h2 className="text-lg font-extrabold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {g.title}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">{g.summary}</p>
              </div>
              <span className="text-xs font-bold text-emerald-400 inline-flex items-center gap-1">
                Read Complete Guide →
              </span>
            </Link>
          ))}
        </section>

        <section className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 to-emerald-950/50 p-6 sm:p-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Ready to Convert Your WhatsApp Export?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            100% client-side processing inside your browser RAM — zero server uploads, sequential Bates numbers, and cryptographic SHA-256 verification.
          </p>
          <Link
            href="/"
            className="inline-block px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition"
          >
            Launch ChatDocket Exporter →
          </Link>
        </section>
      </div>
    </>
  );
}

