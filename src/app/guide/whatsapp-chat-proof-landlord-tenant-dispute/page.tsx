import Link from 'next/link';

import { pageMetadata, siteUrl } from '@/lib/seo';

export const metadata = pageMetadata(
  '/guide/whatsapp-chat-proof-landlord-tenant-dispute',
  'WhatsApp Proof for Landlord & Tenant Cases',
  'Export WhatsApp chat evidence for tenancy deposit disputes, repair notices, and rent agreements. Generate Bates-stamped PDFs locally.',
  'article',
);

const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Use WhatsApp Chat History in Landlord-Tenant Disputes & Deposit Tribunals',
  description:
    'Complete practical guide to preparing WhatsApp messages as legal evidence for tenancy deposit protection schemes, small claims court, repair defaults, and housing tribunals.',
  url: `${siteUrl}/guide/whatsapp-chat-proof-landlord-tenant-dispute`,
  author: { '@type': 'Organization', name: 'ChatDocket' },
  publisher: {
    '@type': 'Organization',
    name: 'ChatDocket',
    logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.svg` },
  },
  datePublished: '2026-11-01',
  inLanguage: 'en',
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can WhatsApp messages be used in a tenancy deposit dispute (TDS, DPS, MyDeposits)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Tenancy deposit adjudicators routinely accept WhatsApp message threads as evidence of repair notifications, move-in condition agreements, check-out discussions, and return promises, provided the export is complete and chronological.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I prove I notified my landlord about damp, mould, or broken heating?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Export your entire WhatsApp message thread with attached media (photos of damage, videos, timestamps) and compile it into a paginated PDF with Bates numbering and an integrity hash. This demonstrates continuous notice without missing or cherry-picked messages.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are phone screenshots enough for small claims court or housing tribunal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Screenshots are easily disputed because they lack metadata, can be cropped, and do not prove continuous context. A formatted WhatsApp export PDF with SHA-256 verification and chronological message continuity is significantly more persuasive and legally defensible.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will my landlord see my private data when I submit the PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ChatDocket runs 100% locally in your browser RAM. Your chats are never uploaded to any remote server, and you can redact sensitive details like bank accounts or personal phone numbers prior to PDF export.',
      },
    },
  ],
};

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: `${siteUrl}/guide` },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Landlord & Tenant Dispute Evidence',
      item: `${siteUrl}/guide/whatsapp-chat-proof-landlord-tenant-dispute`,
    },
  ],
};

export default function LandlordTenantDisputeGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <article className="prose prose-invert max-w-none">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm not-prose">
          <ol className="flex items-center gap-2 text-slate-400">
            <li>
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-slate-600">/</li>
            <li>
              <Link href="/guide" className="hover:text-emerald-400 transition-colors">
                Guides
              </Link>
            </li>
            <li className="text-slate-600">/</li>
            <li className="text-emerald-400 font-medium">Landlord-Tenant Dispute Evidence</li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header className="mb-12 not-prose border-b border-slate-800 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold tracking-wide uppercase mb-4">
            Tenancy Deposit & Housing Tribunal Evidence
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            How to Submit WhatsApp Evidence for Landlord & Tenant Disputes
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            Whether you are claiming your deposit back from TDS/DPS, proving uninhabitable living conditions, or defending against an unfair eviction, formatted WhatsApp message logs provide unassailable documentary proof.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 items-center not-prose">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20"
            >
              Export Landlord / Tenant PDF Free
            </Link>
            <span className="text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              100% Client-Side Privacy &bull; Zero Server Upload
            </span>
          </div>
        </header>

        {/* Key Tenancy Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Common Landlord-Tenant Disputes Resolved with WhatsApp Proof
          </h2>
          <div className="grid md:grid-cols-2 gap-4 not-prose">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-emerald-400 font-semibold mb-2">1. Deposit Return & Deduction Disputes</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Prove agreed move-in conditions, prompt move-out keys handover, or explicit written promises from the landlord or letting agent to return the full security deposit.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-emerald-400 font-semibold mb-2">2. Disrepair & Heating Outages</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Establish exact date and time stamps of when you notified the landlord regarding boiler failure, leaks, mould, or appliance breakdowns to prove neglect.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-emerald-400 font-semibold mb-2">3. Unauthorised Entry & Quiet Enjoyment</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Document unannounced landlord visits, threatening messages, or violations of statutory 24-hour written notice required under housing law.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-emerald-400 font-semibold mb-2">4. Rent Payment & Grace Period Agreements</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Provide definitive evidence that the landlord consented to a delayed rent payment, partial payment instalment plan, or waiver of late fees.
              </p>
            </div>
          </div>
        </section>

        {/* Why Screenshots Fail */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Why Adjudicators Reject Loose Smartphone Screenshots
          </h2>
          <p className="text-slate-300 mb-4">
            Submitting 40 loose screenshots to an ombudsman or small claims court judge creates confusion and weakens your case:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li><strong>Missing Context:</strong> Opposing landlords or tenants can claim that screenshots were selectively cropped or that important follow-up messages were omitted.</li>
            <li><strong>Unreferenced Pages:</strong> Adjudicators cannot easily reference page numbers or search through dozens of JPEG images in an evidence bundle.</li>
            <li><strong>Tampering Allegations:</strong> Simple image editing tools make screenshots vulnerable to claims of digital forgery.</li>
          </ul>
          <p className="text-slate-300 mt-4">
            ChatDocket eliminates this issue by compiling the raw exported WhatsApp archive into a clean, paginated PDF with sequential Bates stamps and a cryptographic SHA-256 integrity hash.
          </p>
        </section>

        {/* How to Prepare Step-by-Step */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            4 Steps to Generate Admissible Housing Evidence
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-slate-300">
            <li><strong>Export WhatsApp Chat:</strong> Open WhatsApp &gt; Tap Landlord/Tenant Contact Info &gt; Export Chat &gt; Choose <em>Attach Media</em>.</li>
            <li><strong>Drop Archive into ChatDocket:</strong> Drop the resulting <code>.zip</code> file onto ChatDocket. Processing runs 100% in your browser RAM.</li>
            <li><strong>Filter Dispute Dates:</strong> Set custom date ranges covering the specific tenancy period or disrepair timeline.</li>
            <li><strong>Download Bates-Stamped PDF:</strong> Generate a formal court-ready PDF with a Statutory Statement of Truth ready for tribunal submission.</li>
          </ol>
        </section>

        {/* CTA Banner */}
        <div className="my-12 p-8 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30 text-center not-prose">
          <h3 className="text-2xl font-bold text-white mb-2">Prepare Your Tenancy Dispute Exhibit in 2 Minutes</h3>
          <p className="text-slate-300 max-w-xl mx-auto mb-6 text-sm">
            Zero cloud uploads. Your rental agreements, bank receipts, and messages stay 100% private on your machine.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/25"
          >
            Open ChatDocket Generator
          </Link>
        </div>

        {/* FAQ Section */}
        <section className="border-t border-slate-800 pt-10">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6 not-prose">
            {jsonLdFaq.mainEntity.map((faq, index) => (
              <div key={index} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                <h3 className="text-white font-semibold text-base mb-2">{faq.name}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
