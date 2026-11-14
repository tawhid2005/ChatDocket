import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chatdocket.xyz';

export const metadata: Metadata = {
  title: 'WhatsApp Evidence for Child Custody & Family Court',
  description:
    'Document co-parenting communication, missed call logs, and child welfare messages for family court proceedings. 100% private in-browser tool.',
  keywords: [
    'whatsapp chat evidence child custody',
    'family court text message proof',
    'co-parenting communication log whatsapp',
    'whatsapp harassment proof family court',
    'child visitation schedule text evidence',
    'how to print whatsapp messages for custody court',
    'parental alienation whatsapp chat proof',
    'family court bates stamped messages',
  ],
  alternates: {
    canonical: `${siteUrl}/guide/whatsapp-evidence-child-custody-family-court`,
  },
  openGraph: {
    title: 'WhatsApp Evidence for Child Custody & Family Court',
    description:
      'Prepare admissible, chronological WhatsApp communication records for family court, custody hearings, and co-parenting mediation.',
    url: `${siteUrl}/guide/whatsapp-evidence-child-custody-family-court`,
    type: 'article',
  },
};

const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Document WhatsApp Evidence for Child Custody & Family Court Hearings',
  description:
    'Practical legal guide for parents and family solicitors on exporting and formatting WhatsApp chats, missed calls, and agreements for custody proceedings.',
  url: `${siteUrl}/guide/whatsapp-evidence-child-custody-family-court`,
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
      name: 'Are WhatsApp messages admissible in family court child custody disputes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Family court judges routinely review WhatsApp messages to evaluate co-parenting cooperation, respect for court-ordered visitation schedules, child maintenance agreements, and allegations of hostile or alienating behavior.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do family courts reject screenshot folders from parents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Selective screenshots lack context, timestamps, and verifiable authenticity. Family court judges often view cherry-picked screenshots with skepticism because hostile messages might have been provoked by unshown preceding dialogue.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I highlight missed voice and video calls with my child?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ChatDocket automatically parses WhatsApp call records, highlighting missed calls, call durations, and exact times on a dedicated Call Summary Schedule. This provides objective proof of attempted contact.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it completely private when parsing sensitive family discussions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ChatDocket operates 100% locally inside your browser RAM. No family messages, children names, photos, or audio recordings are uploaded to external servers or logged in any cloud database.',
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
      name: 'Family Court & Custody WhatsApp Evidence',
      item: `${siteUrl}/guide/whatsapp-evidence-child-custody-family-court`,
    },
  ],
};

export default function ChildCustodyFamilyCourtGuidePage() {
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

      <article lang="en" className="space-y-10">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
          <ol className="flex items-center gap-1.5 flex-wrap">
            <li>
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                ChatDocket
              </Link>
            </li>
            <li className="text-slate-700">/</li>
            <li>
              <Link href="/guide" className="hover:text-emerald-400 transition-colors">
                Guides
              </Link>
            </li>
            <li className="text-slate-700">/</li>
            <li className="text-slate-400">Family Court &amp; Custody Evidence</li>
          </ol>
        </nav>

        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-400">
            👨‍👩‍👧 Family Court · Child Custody · Co-Parenting Records
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            How to Submit WhatsApp Evidence for Child Custody &amp; Family Court
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            In family court, the welfare of the child is paramount. Learn how to present a calm, chronological,
            and complete communication record that demonstrates constructive co-parenting and adherence to visitation.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition shadow-lg shadow-emerald-500/20"
            >
              Format Family Court Exhibit Free →
            </Link>
          </div>
        </header>

        <section className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">
            What Family Court Judges Look For in Digital Messages
          </h2>
          <p>
            When assessing child arrangements orders (such as residence, contact orders, or child custody disputes), family courts are interested in the behavioral patterns of both parents:
          </p>
          <ul className="space-y-2 list-disc list-inside pl-1 text-slate-300">
            <li>
              <strong className="text-white">Flexibility &amp; Cooperation:</strong> Willingness to accommodate reasonable schedule swaps, school activities, and healthcare emergencies.
            </li>
            <li>
              <strong className="text-white">Respect for Existing Orders:</strong> Evidence that agreed visitation handovers were confirmed or repeatedly denied without reasonable excuse.
            </li>
            <li>
              <strong className="text-white">Attempted Contact (Call Logs):</strong> Documentation of consistent voice and video calls placed to speak with the child, and whether they went unanswered.
            </li>
            <li>
              <strong className="text-white">Tone &amp; Parental Alienation:</strong> Using disparaging language or attempting to turn the child against the other parent in text dialogues.
            </li>
          </ul>
        </section>

        <section className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">
            Best Practices When Formatting WhatsApp Chats for Court
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
              <span className="font-bold text-emerald-400 text-sm block">✓ What You Should Do</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Provide continuous threads rather than disjointed snippets. Include all voice call durations and missed call entries. Apply Bates stamping so each page can be referenced immediately by your solicitor.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
              <span className="font-bold text-rose-400 text-sm block">✗ What You Must Avoid</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Do not crop out your own messages or delete context. Do not dump 1,000 pages of irrelevant daily chatter. Do not file unpaginated screenshots that the judge cannot navigate.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {jsonLdFaq.mainEntity.map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-xs transition"
              >
                <summary className="font-bold text-white cursor-pointer list-none flex items-center justify-between gap-3">
                  <span>{faq.name}</span>
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform text-sm">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-slate-300 leading-relaxed border-t border-white/[0.04] pt-2">
                  {faq.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-rose-500/20 bg-gradient-to-br from-slate-900 to-rose-950/40 p-6 sm:p-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Export Your Family Court WhatsApp Evidence
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            100% private in browser memory — dedicated Call Summary Schedule, missed call tracking, and Bates-stamped exhibits.
          </p>
          <Link
            href="/"
            className="inline-block px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition"
          >
            Launch ChatDocket Exporter →
          </Link>
        </section>

        <section className="pt-4 border-t border-white/[0.08]">
          <h2 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">
            Related Legal Evidence Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <Link
              href="/guide/whatsapp-chat-court-evidence-bates-stamping"
              className="p-3 rounded-xl border border-slate-800 bg-white/[0.02] hover:border-emerald-500/40 transition"
            >
              <span className="text-emerald-400 font-bold block mb-1">⚖️ Civil Court</span>
              <span className="text-slate-300">Bates stamping &amp; SHA-256 evidence integrity</span>
            </Link>
            <Link
              href="/guide/whatsapp-chat-proof-landlord-tenant-dispute"
              className="p-3 rounded-xl border border-slate-800 bg-white/[0.02] hover:border-emerald-500/40 transition"
            >
              <span className="text-emerald-400 font-bold block mb-1">🏠 Landlord &amp; Tenant</span>
              <span className="text-slate-300">Deposit dispute &amp; repair notice proof</span>
            </Link>
            <Link
              href="/guide/how-to-export-whatsapp-chat-iphone-android"
              className="p-3 rounded-xl border border-slate-800 bg-white/[0.02] hover:border-emerald-500/40 transition"
            >
              <span className="text-emerald-400 font-bold block mb-1">📱 Export Tutorial</span>
              <span className="text-slate-300">How to export WhatsApp chats with media</span>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
