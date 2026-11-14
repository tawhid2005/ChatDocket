import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chatdocket.xyz';

export const metadata: Metadata = {
  title: 'WhatsApp Proof for Freelancer & Contract Cases',
  description:
    'Prove client approvals, scope changes, and unpaid invoices using formatted WhatsApp chat PDF exhibits with Bates stamps and hash verification.',
  keywords: [
    'whatsapp proof freelancer contract dispute',
    'whatsapp message proof unpaid client invoice',
    'scope creep whatsapp agreement evidence',
    'freelance client chat exhibit small claims',
    'contractor whatsapp message legal proof',
    'bates stamped whatsapp exhibit client dispute',
    'verbal contract whatsapp text message proof',
  ],
  alternates: {
    canonical: `${siteUrl}/guide/whatsapp-evidence-freelancer-contract-dispute`,
  },
  openGraph: {
    title: 'WhatsApp Proof for Freelancer & Contract Cases',
    description:
      'Prove client approvals, scope changes, and unpaid invoices using formatted WhatsApp chat PDF exhibits with Bates stamps and hash verification.',
    url: `${siteUrl}/guide/whatsapp-evidence-freelancer-contract-dispute`,
    type: 'article',
  },
};

const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How Freelancers & Agencies Win Unpaid Invoice Disputes with WhatsApp Evidence',
  description:
    'Comprehensive legal guide on using WhatsApp client message logs to prove contract formation, milestone approvals, scope modifications, and debt recovery in small claims court.',
  url: `${siteUrl}/guide/whatsapp-evidence-freelancer-contract-dispute`,
  author: { '@type': 'Organization', name: 'ChatDocket' },
  publisher: {
    '@type': 'Organization',
    name: 'ChatDocket',
    logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.svg` },
  },
  datePublished: '2026-11-01',
  dateModified: new Date().toISOString().split('T')[0],
  inLanguage: 'en',
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are WhatsApp messages legally binding as a business contract?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. In the UK, US, Canada, Australia, and most jurisdictions, contracts do not require formal legal parchment to be enforceable. Mutual offer, acceptance, and consideration communicated over WhatsApp constitute a binding contract under commercial law.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I prove a client approved extra work or scope changes via WhatsApp?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Export the complete WhatsApp chat containing your price quote, delivery links, and the client’s explicit confirmation (e.g., "looks good, go ahead", "approved"). ChatDocket packages these messages into a sequentially numbered PDF exhibit with exact timestamps.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I submit WhatsApp PDF exhibits to Small Claims Court or debt collectors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ChatDocket produces courtroom-standard PDF documents complete with sequential Bates stamping (e.g., BATES-0001), cover sheets, message statistics, and a statutory Statement of Truth compliant with civil evidence standards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are my confidential client files or NDA-protected messages safe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. ChatDocket runs completely client-side in your local browser sandbox. Your proprietary chat logs, client files, and invoices are never sent to our servers or stored in any cloud database.',
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
      name: 'Freelancer & Contract Dispute Proof',
      item: `${siteUrl}/guide/whatsapp-evidence-freelancer-contract-dispute`,
    },
  ],
};

export default function FreelancerContractDisputeGuidePage() {
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
        {/* Breadcrumb */}
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
            <li className="text-emerald-400 font-medium">Freelancer & Contract Dispute Evidence</li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header className="mb-12 not-prose border-b border-slate-800 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wide uppercase mb-4">
            Commercial Litigation & Debt Recovery
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            How Freelancers & Agencies Prove Unpaid Invoices with WhatsApp
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            Turn WhatsApp text messages, voice notes, and file exchanges into admissible commercial court exhibits. Prove client instructions, scope expansions, and debt acknowledgment without expensive e-discovery software.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 items-center not-prose">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20"
            >
              Format Client Dispute Exhibit Free
            </Link>
            <span className="text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              100% Client-Side &bull; NDA Compliant &bull; No Server Upload
            </span>
          </div>
        </header>

        {/* Core Commercial Scenarios */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Essential Contract Disputes Solved by WhatsApp Exhibits
          </h2>
          <div className="grid md:grid-cols-2 gap-4 not-prose">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-emerald-400 font-semibold mb-2">1. Scope Creep & Additional Deliverables</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                When a client asks for &ldquo;quick changes&rdquo; or extra features over chat and subsequently refuses to pay, your chronological PDF proves they requested and received the additional work.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-emerald-400 font-semibold mb-2">2. Milestone Acceptance & Final Sign-Off</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Show definitive proof that the client confirmed delivery (&ldquo;Received and approved, looks fantastic!&rdquo;) prior to raising fictitious grievances to withhold final invoice payment.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-emerald-400 font-semibold mb-2">3. Verbal & Informal Agreement Terms</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Even without a signed 20-page master service agreement, an agreed hourly rate or project budget confirmed in WhatsApp messages constitutes an enforceable contract in small claims court.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-emerald-400 font-semibold mb-2">4. Admission of Debt & Payment Promises</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Messages such as &ldquo;Will pay by next Friday once invoice clears&rdquo; defeat any defense that the work was substandard or that no debt is owed.
              </p>
            </div>
          </div>
        </section>

        {/* Legal Evidentiary Standard */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            How Courts Evaluate Digital Business Communications
          </h2>
          <p className="text-slate-300 mb-4">
            Small claims judges and arbitration tribunals demand chronological integrity. A messy folder of random screenshots will often be rejected or challenged by opposing legal counsel:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li><strong>Continuous Context:</strong> Raw exports contain every consecutive message, proving you did not delete inconvenient discussions.</li>
            <li><strong>Cryptographic SHA-256 Hashing:</strong> ChatDocket computes a unique SHA-256 digital fingerprint from the raw export, certifying that no text was altered post-export.</li>
            <li><strong>Bates Stamping for Counsel Reference:</strong> Every page is labeled (e.g., <code>BATES-0001</code> to <code>BATES-0042</code>), allowing you or your solicitor to reference exact points in your Statement of Claim.</li>
          </ul>
        </section>

        {/* Step-by-Step Guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Quick 3-Step Guide to Prepare Your Invoice Evidence
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-slate-300">
            <li><strong>Export WhatsApp Chat:</strong> In WhatsApp, navigate to the client chat &gt; Tap Contact Info &gt; Export Chat &gt; Select <em>Attach Media</em> (or Without Media for pure text).</li>
            <li><strong>Drop into ChatDocket:</strong> Drop the <code>.zip</code> or <code>.txt</code> file directly into ChatDocket. All parsing occurs inside your local browser memory.</li>
            <li><strong>Export Small Claims PDF:</strong> Filter by the relevant contract dates, apply automatic Bates numbering, and print or save the court-ready PDF exhibit.</li>
          </ol>
        </section>

        {/* CTA Banner */}
        <div className="my-12 p-8 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30 text-center not-prose">
          <h3 className="text-2xl font-bold text-white mb-2">Recover Your Unpaid Invoices with Indisputable Proof</h3>
          <p className="text-slate-300 max-w-xl mx-auto mb-6 text-sm">
            Fast, courtroom-grade formatting. 100% private and protected by your own local browser sandbox.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/25"
          >
            Create Small Claims Exhibit
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
