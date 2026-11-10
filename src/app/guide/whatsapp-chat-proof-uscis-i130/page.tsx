import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = 'https://chatdocketofficial.vercel.app';

export const metadata: Metadata = {
  title: 'WhatsApp Chat Proof for USCIS I-130 & CR1 Visa — Step-by-Step Guide',
  description:
    'How to prepare WhatsApp chat logs as corroborating evidence for a USCIS I-130 petition or CR1 spouse visa. Format chat exports into Bates-numbered PDF exhibits accepted by USCIS.',
  keywords: [
    'USCIS I-130 whatsapp chat logs',
    'whatsapp proof for I-130 petition',
    'CR1 visa whatsapp evidence',
    'bona fide marriage whatsapp proof USCIS',
    'whatsapp chat export for immigration USA',
    'I-130 supporting evidence whatsapp',
    'USCIS communication history whatsapp PDF',
    'whatsapp to pdf for US green card application',
  ],
  alternates: {
    canonical: `${siteUrl}/guide/whatsapp-chat-proof-uscis-i130`,
  },
  openGraph: {
    title: 'WhatsApp Chat Proof for USCIS I-130 & CR1 Visa — Free Guide | ChatDocket',
    description:
      'Prepare Bates-numbered WhatsApp chat PDF exhibits as evidence of a bona fide marriage for USCIS I-130 and CR1 visa petitions. 100% client-side, private tool.',
    url: `${siteUrl}/guide/whatsapp-chat-proof-uscis-i130`,
    type: 'article',
  },
};

const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Use WhatsApp Chat Logs as Evidence for a USCIS I-130 or CR1 Visa Petition',
  description:
    'Complete guide to formatting WhatsApp exports into Bates-numbered USCIS exhibit packets for I-130 and CR1 spousal petitions.',
  url: `${siteUrl}/guide/whatsapp-chat-proof-uscis-i130`,
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
      name: 'Does USCIS accept WhatsApp chat logs as evidence for I-130?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. USCIS accepts digital communication history — including WhatsApp exports — as secondary corroborating evidence of a bona fide marriage. It should be presented in a clear, paginated, chronological format alongside primary evidence like joint bank statements.',
      },
    },
    {
      '@type': 'Question',
      name: 'What evidence do I need for a USCIS I-130 bona fide marriage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'USCIS looks for joint bank accounts, joint lease or mortgage, insurance policies listing both spouses, children\'s birth certificates, photos, and communication history. WhatsApp chat exports formatted as a dated, paginated PDF can serve as strong communication history evidence.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should I format WhatsApp chats for a USCIS I-130 exhibit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'USCIS expects exhibits to be clearly labeled (e.g., "Exhibit A: WhatsApp Communication Log"), paginated, and dated. ChatDocket automatically adds Bates numbering, a cover page, and a chronological call log table to your WhatsApp export.',
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
      name: 'USCIS I-130 WhatsApp Evidence Guide',
      item: `${siteUrl}/guide/whatsapp-chat-proof-uscis-i130`,
    },
  ],
};

export default function USCISI130GuidePage() {
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
            <li className="text-slate-300">USCIS I-130 WhatsApp Evidence</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="inline-block bg-blue-900/40 border border-blue-700/50 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            🇺🇸 USCIS · Form I-130 · CR1 / IR1 Visa
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            How to Use WhatsApp Chat Logs as USCIS I-130 Evidence of a Bona Fide Marriage
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            USCIS requires compelling evidence that your marriage is genuine and not entered for immigration purposes. WhatsApp chat exports — when properly formatted — serve as powerful corroborating proof of continuous communication across the relationship timeline.
          </p>
        </header>

        {/* CTA */}
        <div className="bg-blue-950/40 border border-blue-700/40 rounded-xl p-6 mb-10 text-center">
          <p className="text-blue-300 font-semibold mb-3">Generate your USCIS-ready WhatsApp exhibit in minutes</p>
          <Link
            href="/"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-3 rounded-lg transition-colors text-lg"
          >
            Try ChatDocket Free →
          </Link>
          <p className="text-slate-500 text-xs mt-3">No sign-up. 100% private. All processing happens in your browser.</p>
        </div>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Does USCIS Accept WhatsApp Chat Logs for I-130 Petitions?</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Yes. USCIS adjudicators consider digital communication records as valid secondary evidence of a <strong className="text-white">bona fide marriage</strong>. Under the Immigration and Nationality Act (INA § 204), petitioners filing a <strong className="text-white">Form I-130</strong> (Petition for Alien Relative) for a spouse must demonstrate the marriage was entered in good faith.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            WhatsApp chat history, when formatted as a clear, paginated, Bates-numbered exhibit, demonstrates:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2 mb-4">
            <li>Continuous communication over a sustained period</li>
            <li>Personal, intimate messages consistent with a genuine marital relationship</li>
            <li>Video and voice call history showing regular contact</li>
            <li>Shared plans, travel discussions, and future-oriented conversations</li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            ChatDocket at <a href={siteUrl} className="text-emerald-400 hover:underline">{siteUrl}</a> formats your WhatsApp export into a professional <strong className="text-white">USCIS exhibit packet</strong> with all the elements adjudicators expect.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Step-by-Step: Preparing WhatsApp Evidence for USCIS I-130</h2>

          <h3 className="text-xl font-semibold text-emerald-400 mb-3">Step 1 — Export Your WhatsApp Chat</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            On iPhone: open the chat → tap the contact name → <strong className="text-white">Export Chat</strong> → choose <strong className="text-white">Attach Media</strong>.<br/>
            On Android: open the chat → ⋮ menu → <strong className="text-white">More</strong> → <strong className="text-white">Export Chat</strong>.<br/>
            Save the resulting <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs">.zip</code> or <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs">.txt</code> file to your computer.
          </p>

          <h3 className="text-xl font-semibold text-emerald-400 mb-3">Step 2 — Upload to ChatDocket</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            Go to <Link href="/" className="text-emerald-400 hover:underline">ChatDocket</Link> and drop your WhatsApp export file. All parsing occurs 100% inside your browser. Nothing is sent to any server — critical for sensitive immigration data.
          </p>

          <h3 className="text-xl font-semibold text-emerald-400 mb-3">Step 3 — Apply the USCIS I-130 Preset</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            Select the <strong className="text-white">US USCIS I-130 Preset</strong>. ChatDocket samples messages proportionally across your entire relationship period, generates a cover page with statistics, compiles a call log table, and adds Bates numbering (e.g. <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs">USCIS-0001</code>).
          </p>

          <h3 className="text-xl font-semibold text-emerald-400 mb-3">Step 4 — Download and Label the Exhibit</h3>
          <p className="text-slate-300 leading-relaxed">
            Download the finished PDF. Label it in your I-130 cover letter as <em className="text-slate-200">&ldquo;Exhibit [X]: WhatsApp Communication History — [Date Range]&rdquo;</em>. Include it in your petition package alongside primary evidence like joint bank statements and insurance documents.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Manual Screenshots vs. ChatDocket for USCIS Evidence</h2>
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
                  ['Preparation time', 'Days of work', 'Under 5 minutes'],
                  ['Bates / exhibit numbering', '✗ Manual only', '✓ Automatic'],
                  ['Chronological call log', '✗ Not included', '✓ Auto-generated table'],
                  ['Cover page with analytics', '✗ No', '✓ Included'],
                  ['Representative date sampling', '✗ Inconsistent', '✓ Smart proportional'],
                  ['Tamper-evidence (SHA-256)', '✗ No', '✓ Cryptographic hash'],
                  ['Server-side data exposure', '✗ Risk if using online tools', '✓ 100% client-side, zero upload'],
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

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">What Other Evidence Should You Include with I-130?</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            WhatsApp evidence is most effective as <strong className="text-white">secondary corroborating evidence</strong>. USCIS adjudicators weigh it alongside primary evidence. Here is a recommended evidence bundle:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
            <li><strong className="text-white">Primary:</strong> Joint bank account statements, joint lease/mortgage, joint insurance, children&apos;s birth certificates</li>
            <li><strong className="text-white">Secondary:</strong> WhatsApp chat PDF (from ChatDocket), photographs together at multiple events, flight itineraries showing visits, hotel bookings</li>
            <li><strong className="text-white">Supporting declarations:</strong> Sworn affidavits from friends or family members attesting to the genuine nature of the marriage</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions — USCIS WhatsApp Evidence</h2>
          <div className="space-y-5">
            {[
              {
                q: 'Does USCIS accept WhatsApp chat logs as evidence for I-130?',
                a: 'Yes. USCIS accepts digital communication records as secondary corroborating evidence of a bona fide marriage. Format them as a clear, paginated, Bates-numbered PDF exhibit for best results.',
              },
              {
                q: 'How many messages or pages should I submit to USCIS?',
                a: 'A representative 20–40 page sampled PDF covering the entire relationship period is typically most effective. ChatDocket\'s USCIS preset automatically handles this sampling.',
              },
              {
                q: 'What if my relationship started online? Is WhatsApp chat proof important?',
                a: 'Absolutely. For international couples who met online, digital communication history is often the primary evidence of a continuous relationship before meeting in person. A well-formatted WhatsApp PDF can be particularly compelling.',
              },
              {
                q: 'Is ChatDocket safe to use for sensitive USCIS documents?',
                a: 'Yes. ChatDocket processes everything 100% inside your browser — no chat data is ever uploaded to any server. It\'s designed specifically for sensitive immigration documents.',
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
        <section className="bg-gradient-to-br from-blue-950/50 to-slate-900/60 border border-blue-700/40 rounded-xl p-8 text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-3">Create Your USCIS I-130 WhatsApp Exhibit Now</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            Prepare professional, Bates-numbered WhatsApp chat evidence for your I-130 petition or CR1 visa application in under 5 minutes — with zero data uploaded anywhere.
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
            <Link href="/guide/whatsapp-to-pdf-uk-spouse-visa" className="p-4 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-colors text-sm">
              <span className="text-xs text-slate-400 block mb-1">🇬🇧 United Kingdom</span>
              <span className="font-semibold text-white">UK Spouse Visa Appendix FM</span>
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
