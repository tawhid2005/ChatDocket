import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = 'https://chatdocketofficial.vercel.app';

export const metadata: Metadata = {
  title: 'WhatsApp Chat to PDF for UK Spouse Visa (UKVI)',
  description:
    'Convert WhatsApp chats into UK Home Office Appendix FM spouse visa PDFs with smart sampling, call logs & Bates numbers. 100% private in browser.',
  keywords: [
    'UK spouse visa whatsapp evidence',
    'whatsapp chat proof for spouse visa UK',
    'Appendix FM relationship evidence whatsapp',
    'UK Home Office whatsapp chat PDF',
    'UK spouse visa communication evidence',
    'whatsapp to pdf UK visa application',
    'UKVI whatsapp chat history',
    'UK partner visa whatsapp proof',
  ],
  alternates: {
    canonical: `${siteUrl}/guide/whatsapp-to-pdf-uk-spouse-visa`,
  },
  openGraph: {
    title: 'WhatsApp Chat to PDF for UK Spouse Visa — Free Guide | ChatDocket',
    description:
      'Step-by-step guide: convert your WhatsApp chat into Home Office-compliant evidence for a UK Spouse Visa (Appendix FM). 100% client-side, Bates-numbered PDFs.',
    url: `${siteUrl}/guide/whatsapp-to-pdf-uk-spouse-visa`,
    type: 'article',
  },
};

const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Convert WhatsApp Chat to PDF for a UK Spouse Visa Application',
  description:
    'Complete guide on preparing WhatsApp chat history as compliant evidence for a UK Spouse Visa (Appendix FM) using ChatDocket.',
  url: `${siteUrl}/guide/whatsapp-to-pdf-uk-spouse-visa`,
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
      name: 'Does the UK Home Office accept WhatsApp chats as evidence for a Spouse Visa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Under Appendix FM of the Immigration Rules, the Home Office accepts digital communication records — including WhatsApp message exports — as evidence of a genuine and subsisting relationship. The chats should be presented in a clear, paginated, chronological format with dates visible.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many pages of WhatsApp chat should I include for a UK Spouse Visa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "UKVI caseworkers prefer concise, representative evidence. A 15–25 page sampled PDF covering your full relationship timeline is typically ideal — ChatDocket's UK Home Office preset automatically produces this using smart sampling (approx. 3 messages per week).",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I export WhatsApp media (photos) for UK visa evidence?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. When you export a WhatsApp chat with media on Android or iPhone, photos are included in the .zip archive. ChatDocket renders these inline in the PDF or as a photo grid appendix, clearly labelled with timestamps.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is ChatDocket safe for sensitive immigration documents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '100% safe. All processing is entirely client-side — your zip file is parsed and your PDF is generated inside your browser. No data is ever uploaded to a server, making it ideal for sensitive immigration documents.',
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
      name: 'UK Spouse Visa WhatsApp Guide',
      item: `${siteUrl}/guide/whatsapp-to-pdf-uk-spouse-visa`,
    },
  ],
};

export default function UKSpouseVisaGuidePage() {
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

      <article lang="en">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-6">
          <ol className="flex flex-wrap gap-1 items-center">
            <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
            <li aria-hidden="true" className="mx-1">›</li>
            <li><span className="text-slate-400">Guides</span></li>
            <li aria-hidden="true" className="mx-1">›</li>
            <li className="text-slate-300">UK Spouse Visa WhatsApp Guide</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="inline-block bg-emerald-900/40 border border-emerald-700/50 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            🇬🇧 UK Home Office · Appendix FM
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            How to Convert WhatsApp Chat to PDF for a UK Spouse Visa Application
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Your WhatsApp conversation history is one of the most compelling pieces of relationship evidence for a UK Spouse Visa (Appendix FM). This guide explains exactly how to export it and format it into a Home Office-compliant PDF document — quickly, privately, and for free.
          </p>
        </header>

        {/* CTA */}
        <div className="bg-emerald-950/50 border border-emerald-700/40 rounded-xl p-6 mb-10 text-center">
          <p className="text-emerald-300 font-semibold mb-3">Ready to generate your evidence PDF?</p>
          <Link
            href="/"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-3 rounded-lg transition-colors text-lg"
          >
            Try ChatDocket Free →
          </Link>
          <p className="text-slate-500 text-xs mt-3">No sign-up. No upload. 100% private in-browser processing.</p>
        </div>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Does the UK Home Office Accept WhatsApp Chat as Visa Evidence?</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Yes. Under <strong className="text-white">Appendix FM</strong> of the UK Immigration Rules, UKVI caseworkers accept digital communication records — including WhatsApp message exports — as valid evidence of a genuine and subsisting relationship. This applies to both the <strong className="text-white">UK Spouse Visa</strong> (also called the Partner Visa) and the <strong className="text-white">UK Family Visa</strong>.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            However, raw WhatsApp screenshots or unformatted text files are rarely sufficient. Caseworkers expect documents that are:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2 mb-4">
            <li>Clearly paginated and dated</li>
            <li>Covering a representative timeline of the relationship</li>
            <li>Including call logs (voice and video calls) where available</li>
            <li>Accompanied by a cover page or summary</li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            ChatDocket — available at <a href={siteUrl} className="text-emerald-400 hover:underline">{siteUrl}</a> — formats your WhatsApp export into exactly this kind of document automatically.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Step-by-Step: Export Your WhatsApp Chat (iOS & Android)</h2>

          <h3 className="text-xl font-semibold text-emerald-400 mb-3">On iPhone (iOS)</h3>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 ml-2 mb-6">
            <li>Open WhatsApp and navigate to your spouse&apos;s or partner&apos;s chat.</li>
            <li>Tap their name at the top to open Contact Info.</li>
            <li>Scroll down and tap <strong className="text-white">Export Chat</strong>.</li>
            <li>Choose <strong className="text-white">Attach Media</strong> (recommended) to include photos, or <strong className="text-white">Without Media</strong> for text only.</li>
            <li>Save the <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs">.zip</code> file to Files, then transfer to your computer.</li>
          </ol>

          <h3 className="text-xl font-semibold text-emerald-400 mb-3">On Android</h3>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 ml-2 mb-6">
            <li>Open WhatsApp and tap the three-dot menu (⋮) in the top-right of the conversation.</li>
            <li>Select <strong className="text-white">More</strong> → <strong className="text-white">Export Chat</strong>.</li>
            <li>Choose to include or exclude media.</li>
            <li>Share or save the exported <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs">.zip</code> or <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs">.txt</code> file.</li>
          </ol>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">How ChatDocket Formats WhatsApp Chat for UK Visa Evidence</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Once you have your exported file, upload it to <Link href="/" className="text-emerald-400 hover:underline">ChatDocket</Link> and select the <strong className="text-white">UK Home Office Preset</strong>. The tool will automatically:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-slate-300 ml-2 mb-4">
            <li><strong className="text-white">Smart-sample messages</strong> — approximately 3 messages per week, proportionally distributed across your entire relationship history to show consistency over time.</li>
            <li><strong className="text-white">Generate a cover page</strong> — with a relationship timeline summary, message count, date range, and photo statistics.</li>
            <li><strong className="text-white">Include call logs</strong> — a chronological table of all voice and video WhatsApp calls, invaluable for showing regular contact.</li>
            <li><strong className="text-white">Add Bates numbering</strong> — sequential page stamps (e.g. UKSPOUSE-0001) that give your submission a professional, legally indexed format.</li>
            <li><strong className="text-white">SHA-256 integrity hash</strong> — a cryptographic checksum proving the document has not been altered after export.</li>
          </ol>
          <p className="text-slate-300 leading-relaxed">
            The result is a 15–25 page PDF, optimised to satisfy the evidence requirements for <strong className="text-white">Appendix FM</strong> without overwhelming the caseworker with thousands of pages.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Manual Screenshots vs. ChatDocket: A Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-800/60">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-200">Feature</th>
                  <th className="px-4 py-3 font-semibold text-slate-400">Manual Screenshots</th>
                  <th className="px-4 py-3 font-semibold text-emerald-400">ChatDocket</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  ['Time to prepare', 'Hours to days', 'Under 5 minutes'],
                  ['Paginated & numbered', '✗ No', '✓ Automatic Bates stamps'],
                  ['Call log table', '✗ Not included', '✓ Auto-generated'],
                  ['Cover page analytics', '✗ No', '✓ Relationship timeline summary'],
                  ['Tamper-evident hash', '✗ No', '✓ SHA-256 integrity stamp'],
                  ['Representative sampling', '✗ Manual, often inconsistent', '✓ Smart proportional sampling'],
                  ['Privacy (no server upload)', '✓ Yes', '✓ 100% client-side'],
                ].map(([feature, manual, chatdocket]) => (
                  <tr key={feature} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 text-slate-300 font-medium">{feature}</td>
                    <td className="px-4 py-3 text-slate-500">{manual}</td>
                    <td className="px-4 py-3 text-emerald-400 font-medium">{chatdocket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Tips for Strengthening Your UK Spouse Visa Application</h2>
          <ul className="list-disc list-inside space-y-3 text-slate-300 ml-2">
            <li>Include WhatsApp chats that span your <strong className="text-white">entire relationship period</strong>, not just recent months.</li>
            <li>Supplement your WhatsApp PDF with other evidence: bank statements showing joint finances, photos, flight itineraries, and hotel bookings.</li>
            <li>Use ChatDocket&apos;s <strong className="text-white">PII redaction</strong> feature to black out sensitive information like bank account numbers before submitting.</li>
            <li>Add a brief cover letter that contextualises the WhatsApp evidence (e.g. &quot;Exhibit A: WhatsApp communication log, covering [date] to [date]&quot;).</li>
            <li>Consult an OISC-regulated immigration adviser for complex cases or refusals.</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              {
                q: 'Does the UK Home Office accept WhatsApp chats as evidence for a Spouse Visa?',
                a: 'Yes. Under Appendix FM, digital communication records including WhatsApp exports are accepted as evidence of a genuine relationship. Present them in a clear, paginated, chronological PDF format.',
              },
              {
                q: 'How many pages of WhatsApp chat should I include?',
                a: 'A 15–25 page sampled document covering your full relationship history is typically ideal. ChatDocket\'s UK preset automatically produces this. Submitting thousands of pages is unnecessary and may frustrate the caseworker.',
              },
              {
                q: 'Can I include WhatsApp photos in my UK visa application?',
                a: 'Yes. Export with media on WhatsApp, then upload the .zip to ChatDocket. Photos will appear inline or in a photo grid appendix with timestamps.',
              },
              {
                q: 'Is ChatDocket safe for sensitive immigration documents?',
                a: '100% safe. All processing is client-side — your data is parsed and your PDF is generated entirely inside your browser. Nothing is uploaded to any server.',
              },
            ].map(({ q, a }) => (
              <details key={q} className="group border border-slate-700 rounded-lg overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-slate-200 hover:text-white flex justify-between items-center list-none">
                  {q}
                  <span className="text-emerald-400 group-open:rotate-180 transition-transform duration-200 ml-3 shrink-0">▾</span>
                </summary>
                <div className="px-5 pb-4 text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-3">{a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-emerald-950/60 to-slate-900/60 border border-emerald-700/40 rounded-xl p-8 text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-3">Generate Your UK Spouse Visa WhatsApp Evidence Now</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            Create clean, Home Office-ready WhatsApp evidence PDFs in minutes — 100% private in your browser with zero data uploaded.
          </p>
          <Link
            href="/"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-10 py-3.5 rounded-lg transition-colors text-lg"
          >
            Try ChatDocket Free →
          </Link>
        </section>

        {/* Related Guides */}
        <section>
          <h2 className="text-lg font-bold text-white mb-4">Related Immigration Evidence Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/guide/whatsapp-chat-proof-uscis-i130" className="p-4 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-colors text-sm">
              <span className="text-xs text-slate-400 block mb-1">🇺🇸 United States</span>
              <span className="font-semibold text-white">USCIS I-130 WhatsApp Evidence</span>
            </Link>
            <Link href="/guide/whatsapp-evidence-canada-ircc" className="p-4 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-colors text-sm">
              <span className="text-xs text-slate-400 block mb-1">🇨🇦 Canada</span>
              <span className="font-semibold text-white">Canada IRCC 10-Page Guide</span>
            </Link>
            <Link href="/guide/whatsapp-proof-australia-partner-visa" className="p-4 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-colors text-sm">
              <span className="text-xs text-slate-400 block mb-1">🇦🇺 Australia</span>
              <span className="font-semibold text-white">Australia Partner Visa 820/801</span>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
