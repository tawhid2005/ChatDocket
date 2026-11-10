import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = 'https://chatdocketofficial.vercel.app';

export const metadata: Metadata = {
  title: 'WhatsApp Proof for Australia Partner Visa 820/801 — Step-by-Step Guide',
  description:
    'How to prepare WhatsApp chat history as evidence of a genuine relationship for an Australia DHA Partner Visa (subclass 820/801 or 309/100). Smart-sampled, Bates-numbered PDF — 100% private.',
  keywords: [
    'Australia partner visa 820 801 whatsapp proof',
    'whatsapp evidence Australia partner visa',
    'DHA partner visa whatsapp chat export',
    'subclass 820 genuine relationship evidence',
    'Australia spouse visa whatsapp history',
    'whatsapp chat PDF Australia immigration',
    'partner visa 309 whatsapp evidence',
    'genuine relationship whatsapp proof Australia',
  ],
  alternates: {
    canonical: `${siteUrl}/guide/whatsapp-proof-australia-partner-visa`,
  },
  openGraph: {
    title: 'WhatsApp Proof for Australia Partner Visa 820/801 — Free Guide | ChatDocket',
    description:
      'Prepare WhatsApp chat evidence of a genuine de facto or spousal relationship for an Australia DHA Partner Visa (subclass 820/801). Smart-sampled PDF, 100% private.',
    url: `${siteUrl}/guide/whatsapp-proof-australia-partner-visa`,
    type: 'article',
  },
};

const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Prepare WhatsApp Chat Evidence for an Australia Partner Visa (Subclass 820/801)',
  description:
    'Complete guide to formatting WhatsApp exports as genuine relationship evidence for Australia DHA Partner Visa applications (subclass 820/801 and 309/100).',
  url: `${siteUrl}/guide/whatsapp-proof-australia-partner-visa`,
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
      name: 'Does the Australian DHA accept WhatsApp chats as evidence for a Partner Visa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. The Department of Home Affairs (DHA) accepts digital communication records as evidence of a genuine and continuing relationship under the partner visa criteria. WhatsApp exports, when presented as a clear, paginated, chronological PDF, can support all four relationship aspects DHA evaluates: financial, household, social, and commitment.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are the four aspects of a genuine relationship for Australian Partner Visa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "DHA evaluates the genuineness of a relationship across four aspects: (1) Financial — joint accounts, shared expenses; (2) Nature of household — shared living arrangements; (3) Social — recognition as a couple by others; (4) Commitment — future plans, communication history. WhatsApp evidence primarily supports the commitment and social aspects.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I export WhatsApp chats for an Australian visa application?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "On iPhone: open the chat → tap the contact name → Export Chat → Attach Media. On Android: open the chat → ⋮ → More → Export Chat. Upload the .zip file to ChatDocket, select the Australia Partner Visa preset, and download your Bates-numbered PDF.",
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
      name: 'Australia Partner Visa WhatsApp Guide',
      item: `${siteUrl}/guide/whatsapp-proof-australia-partner-visa`,
    },
  ],
};

export default function AustraliaPartnerVisaGuidePage() {
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
            <li className="text-slate-300">Australia Partner Visa WhatsApp Guide</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="inline-block bg-yellow-900/40 border border-yellow-700/50 text-yellow-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            🇦🇺 Australia DHA · Subclass 820/801 · 309/100
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            How to Prepare WhatsApp Chat Evidence for an Australia Partner Visa (Subclass 820/801)
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            The Australian Department of Home Affairs (DHA) requires substantial evidence of a genuine and continuing relationship for a Partner Visa. WhatsApp communication history is a key component, particularly for demonstrating ongoing commitment and social recognition as a couple.
          </p>
        </header>

        {/* CTA */}
        <div className="bg-yellow-950/30 border border-yellow-700/40 rounded-xl p-6 mb-10 text-center">
          <p className="text-yellow-300 font-semibold mb-3">Create your Australia Partner Visa WhatsApp evidence PDF</p>
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
          <h2 className="text-2xl font-bold text-white mb-4">Does DHA Accept WhatsApp as Evidence for a Partner Visa?</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Yes. The Department of Home Affairs accepts digital communication records — including WhatsApp message exports — as evidence of a <strong className="text-white">genuine and continuing relationship</strong>. This applies to both the onshore <strong className="text-white">Partner Visa (Subclass 820/801)</strong> and the offshore <strong className="text-white">Partner Visa (Subclass 309/100)</strong>.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            DHA assesses relationships across <strong className="text-white">four aspects</strong>:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 ml-2 mb-4">
            <li><strong className="text-white">Financial aspects</strong> — joint accounts, shared expenses, financial support</li>
            <li><strong className="text-white">Nature of the household</strong> — shared living arrangements and responsibilities</li>
            <li><strong className="text-white">Social aspects</strong> — recognised as a couple by family, friends, and the community</li>
            <li><strong className="text-white">Commitment</strong> — long-term plans, exclusivity, communication history</li>
          </ol>
          <p className="text-slate-300 leading-relaxed">
            WhatsApp evidence from <a href={siteUrl} className="text-emerald-400 hover:underline">ChatDocket</a> primarily supports the <strong className="text-white">commitment</strong> and <strong className="text-white">social aspects</strong> — demonstrating consistent, intimate long-distance communication over the entire relationship period.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Step-by-Step: Export WhatsApp for Australian DHA Submission</h2>

          <h3 className="text-xl font-semibold text-emerald-400 mb-3">Step 1 — Export the WhatsApp Chat</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            <strong className="text-white">iPhone:</strong> Open your partner&apos;s chat → tap their name at the top → scroll down → tap <strong>Export Chat</strong> → choose <strong>Attach Media</strong> to include photos.<br/>
            <strong className="text-white">Android:</strong> Open the chat → tap ⋮ menu → <strong>More</strong> → <strong>Export Chat</strong>.<br/>
            Save the resulting <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs">.zip</code> archive to your computer.
          </p>

          <h3 className="text-xl font-semibold text-emerald-400 mb-3">Step 2 — Upload to ChatDocket</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            Visit <Link href="/" className="text-emerald-400 hover:underline">ChatDocket</Link> and drop the WhatsApp zip file into the upload area. All parsing and PDF generation happens 100% inside your browser — your personal messages are never sent anywhere.
          </p>

          <h3 className="text-xl font-semibold text-emerald-400 mb-3">Step 3 — Apply the Australia Partner Visa Preset</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            Select the <strong className="text-white">Australia Partner Visa Preset</strong>. ChatDocket will proportionally sample your chat messages across the full relationship timeline, generate a cover page analytics summary, compile a voice and video call log table, and add professional <strong className="text-white">Bates-style page numbering</strong> (e.g. <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs">AUS-PARTNER-0001</code>).
          </p>

          <h3 className="text-xl font-semibold text-emerald-400 mb-3">Step 4 — Redact PII and Download</h3>
          <p className="text-slate-300 leading-relaxed">
            Use ChatDocket&apos;s <strong className="text-white">PII redaction tool</strong> to black out sensitive details (account numbers, addresses). Download the final PDF and include it in your DHA application package as your communication history exhibit, labelled clearly (e.g. <em className="text-slate-200">&ldquo;Attachment D: WhatsApp Communication History — [Date Range]&rdquo;</em>).
          </p>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Manual Screenshots vs. ChatDocket for Australian Partner Visa</h2>
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
                  ['Full relationship timeline coverage', '✗ Often cherry-picked', '✓ Proportional milestone sampling'],
                  ['Paginated with Bates numbers', '✗ Manual only', '✓ Automatic professional numbering'],
                  ['Call log (voice & video)', '✗ Not included', '✓ Auto-generated chronological table'],
                  ['Cover page analytics', '✗ No', '✓ Relationship summary with stats'],
                  ['SHA-256 tamper evidence', '✗ No', '✓ Cryptographic integrity hash'],
                  ['PII redaction tool', '✗ Manual, error-prone', '✓ 1-click bulk or interactive'],
                  ['Server privacy risk', '✗ Risk with online tools', '✓ 100% client-side, zero upload'],
                  ['Time to prepare', 'Hours to days', 'Under 5 minutes'],
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
          <h2 className="text-2xl font-bold text-white mb-4">Tips for a Strong Australian Partner Visa Application</h2>
          <ul className="list-disc list-inside space-y-3 text-slate-300 ml-2">
            <li>Include <strong className="text-white">all four relationship aspects</strong> in separate evidence categories — don&apos;t rely on WhatsApp alone.</li>
            <li>Ensure your WhatsApp PDF covers <strong className="text-white">the entire relationship period</strong>, not just recent months, to show consistency.</li>
            <li>Photographs with metadata timestamps can supplement your WhatsApp call logs as evidence of in-person meetings.</li>
            <li>Statutory declarations from family or friends who have met you as a couple can powerfully corroborate your WhatsApp evidence.</li>
            <li>For de facto relationships, <strong className="text-white">12 months of cohabitation</strong> (or longer) evidence is typically required — your WhatsApp history spanning that period is valuable proof.</li>
            <li>Consider registering your de facto relationship in your state/territory for additional points under the genuine relationship criteria.</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions — Australia Partner Visa WhatsApp Evidence</h2>
          <div className="space-y-5">
            {[
              {
                q: 'Does the Australian DHA accept WhatsApp chats as evidence for a Partner Visa?',
                a: 'Yes. DHA accepts digital communication records as evidence of a genuine and continuing relationship under the partner visa criteria. WhatsApp exports should be presented as a clear, paginated, chronological PDF.',
              },
              {
                q: 'What are the four aspects of a genuine relationship for Australian Partner Visa?',
                a: 'DHA evaluates: (1) Financial — joint accounts and expenses; (2) Nature of household — shared living; (3) Social — recognised as a couple; (4) Commitment — communication history and future plans. WhatsApp evidence supports the commitment and social aspects.',
              },
              {
                q: 'How long should my WhatsApp evidence cover for a Partner Visa?',
                a: "Ideally, the PDF should span your entire relationship from first contact to the present day. ChatDocket's proportional sampling ensures messages from every period are included, even if you're submitting a concise 20–30 page document.",
              },
              {
                q: 'Is ChatDocket safe for my private immigration documents?',
                a: 'Absolutely. ChatDocket processes everything 100% inside your browser — no WhatsApp data is ever uploaded to any server. It is designed specifically for sensitive immigration and legal documents.',
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
        <section className="bg-gradient-to-br from-yellow-950/40 to-slate-900/60 border border-yellow-700/30 rounded-xl p-8 text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-3">Create Your Australia Partner Visa WhatsApp Evidence Now</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            Generate a professional, Bates-numbered WhatsApp evidence PDF covering your full relationship history for DHA subclass 820/801 — in under 5 minutes, with complete privacy.
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
            <Link href="/guide/whatsapp-chat-proof-uscis-i130" className="p-4 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-colors text-sm">
              <span className="text-xs text-slate-400 block mb-1">🇺🇸 United States</span>
              <span className="font-semibold text-white">USCIS I-130 WhatsApp Evidence</span>
            </Link>
            <Link href="/guide/whatsapp-evidence-canada-ircc" className="p-4 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-colors text-sm">
              <span className="text-xs text-slate-400 block mb-1">🇨🇦 Canada</span>
              <span className="font-semibold text-white">Canada IRCC 10-Page Guide</span>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
