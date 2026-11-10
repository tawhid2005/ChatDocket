import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = 'https://chatdocketofficial.vercel.app';

export const metadata: Metadata = {
  title: 'WhatsApp Chat Evidence for Canada IRCC Spousal Sponsorship — 10-Page Guide',
  description:
    'How to prepare WhatsApp chat history as evidence for a Canada IRCC spousal sponsorship application (IMM 5289). Meet the 10-page guideline with smart sampling. 100% private, no data upload.',
  keywords: [
    'Canada IRCC whatsapp chat history',
    'whatsapp evidence Canada spousal sponsorship',
    'IMM 5289 whatsapp chat PDF',
    'IRCC 10 page communication history',
    'Canada PR spouse whatsapp proof',
    'whatsapp chat export Canada immigration',
    'IRCC relationship evidence whatsapp',
    'Canadian spouse visa whatsapp history',
  ],
  alternates: {
    canonical: `${siteUrl}/guide/whatsapp-evidence-canada-ircc`,
  },
  openGraph: {
    title: 'WhatsApp Evidence for Canada IRCC Spousal Sponsorship — Free Guide | ChatDocket',
    description:
      'Prepare WhatsApp chat history that meets Canada IRCC\'s ~10-page guideline (IMM 5289) for spousal sponsorship. Smart-sampled, Bates-numbered PDF — 100% private.',
    url: `${siteUrl}/guide/whatsapp-evidence-canada-ircc`,
    type: 'article',
  },
};

const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Prepare WhatsApp Chat Evidence for Canada IRCC Spousal Sponsorship (IMM 5289)',
  description:
    'Complete guide to meeting the IRCC 10-page communication history guideline using ChatDocket\'s smart sampling for Canadian spousal sponsorship applications.',
  url: `${siteUrl}/guide/whatsapp-evidence-canada-ircc`,
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
      name: "What is Canada IRCC's 10-page guideline for WhatsApp chat history?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "IRCC Guide IMM 5289 advises that applicants submit no more than approximately 10 pages of communication history (such as texts, emails, or social media messages). ChatDocket's Canada IRCC preset automatically samples your WhatsApp export to produce a 10–15 page PDF covering your full relationship timeline.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does IRCC accept WhatsApp chats as proof of a genuine relationship?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Immigration, Refugees and Citizenship Canada (IRCC) accepts digital communication records including WhatsApp messages as evidence of a genuine relationship under IMM 5289 guidelines. The evidence should be clearly dated, paginated, and representative of the relationship.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I export WhatsApp chat for a Canadian immigration application?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On iPhone: open the chat → tap the contact name → Export Chat → Attach Media. On Android: open the chat → ⋮ menu → More → Export Chat. Upload the .zip or .txt file to ChatDocket, select the Canada IRCC preset, and download your ready-to-submit PDF.',
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
      name: 'Canada IRCC WhatsApp Evidence Guide',
      item: `${siteUrl}/guide/whatsapp-evidence-canada-ircc`,
    },
  ],
};

export default function CanadaIRCCGuidePage() {
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
            <li className="text-slate-300">Canada IRCC WhatsApp Evidence</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="inline-block bg-red-900/40 border border-red-700/50 text-red-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            🇨🇦 Canada IRCC · IMM 5289 · Spousal Sponsorship
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            How to Prepare WhatsApp Chat Evidence for Canada IRCC Spousal Sponsorship (IMM 5289)
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Canada&apos;s IRCC (Immigration, Refugees and Citizenship Canada) accepts WhatsApp message history as proof of a genuine relationship — but specifies a strict approximately <strong className="text-white">10-page limit</strong> in Guide IMM 5289. This guide shows you how to format your chats correctly and stay within that limit automatically.
          </p>
        </header>

        {/* CTA */}
        <div className="bg-red-950/30 border border-red-700/40 rounded-xl p-6 mb-10 text-center">
          <p className="text-red-300 font-semibold mb-3">Generate your 10-page IRCC-compliant WhatsApp evidence PDF</p>
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
          <h2 className="text-2xl font-bold text-white mb-4">Understanding IRCC&apos;s 10-Page Communication History Guideline</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            IRCC Guide <strong className="text-white">IMM 5289</strong> (Sponsoring your spouse, common-law partner, conjugal partner or dependent child) explicitly advises applicants to include communication history as evidence of a genuine relationship. The guide states that submissions should be concise — typically around <strong className="text-white">10 pages</strong> of chat history.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            This creates a critical challenge: if your WhatsApp chat with your partner spans years, the full export may contain thousands of pages. Manually selecting 10 representative pages is tedious and prone to bias. ChatDocket&apos;s <strong className="text-white">Canada IRCC preset</strong> solves this by using <em>proportional milestone sampling</em> — automatically selecting messages from across the entire relationship timeline to produce a 10–15 page representative PDF.
          </p>
          <div className="bg-amber-900/20 border border-amber-700/40 rounded-lg p-4 text-amber-300 text-sm">
            <strong className="text-amber-200">⚠ Important:</strong> The 10-page guideline is a recommendation for communication history (texts, emails). You may still submit additional evidence categories such as photos, flight records, and financial documents separately.
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Step-by-Step: Create a 10-Page IRCC WhatsApp Evidence PDF</h2>

          <h3 className="text-xl font-semibold text-emerald-400 mb-3">Step 1 — Export the WhatsApp Chat</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            <strong className="text-white">iPhone:</strong> Open the chat → tap the contact name → <strong>Export Chat</strong> → <strong>Attach Media</strong> (or Without Media).<br/>
            <strong className="text-white">Android:</strong> Open the chat → ⋮ → <strong>More</strong> → <strong>Export Chat</strong>.<br/>
            Save the <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs">.zip</code> file to your computer.
          </p>

          <h3 className="text-xl font-semibold text-emerald-400 mb-3">Step 2 — Upload to ChatDocket</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            Visit <Link href="/" className="text-emerald-400 hover:underline">ChatDocket</Link> and drop your WhatsApp export. Everything is processed locally — your intimate messages never touch a server.
          </p>

          <h3 className="text-xl font-semibold text-emerald-400 mb-3">Step 3 — Select the Canada IRCC Preset</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            Choose the <strong className="text-white">Canada IRCC (IMM 5289) Preset</strong>. ChatDocket&apos;s algorithm proportionally samples messages across your entire relationship timeline — early months, midway milestones, and recent exchanges — targeting a final PDF of <strong className="text-white">10–15 pages</strong>.
          </p>

          <h3 className="text-xl font-semibold text-emerald-400 mb-3">Step 4 — Review, Redact, and Download</h3>
          <p className="text-slate-300 leading-relaxed">
            Preview the PDF. Use ChatDocket&apos;s <strong className="text-white">PII redaction tool</strong> to black out any sensitive information (bank account numbers, addresses). Download the final PDF and label it in your IRCC application package as your communication history exhibit.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Manual Selection vs. ChatDocket for IRCC 10-Page Limit</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-800/60">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-200">Feature</th>
                  <th className="px-4 py-3 font-semibold text-slate-400">Manual Selection</th>
                  <th className="px-4 py-3 font-semibold text-emerald-400">ChatDocket</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  ['Meets ~10-page IRCC guideline', '✗ Hard to control precisely', '✓ Preset targets exactly 10–15 pages'],
                  ['Proportional timeline coverage', '✗ Often biased to recent messages', '✓ Proportional milestone sampling'],
                  ['Includes call log table', '✗ Not included', '✓ Auto-generated'],
                  ['Cover page with analytics', '✗ No', '✓ Relationship summary included'],
                  ['PII redaction', '✗ Manual, error-prone', '✓ 1-click bulk or interactive redaction'],
                  ['Privacy (no server upload)', '✓ Yes', '✓ 100% client-side'],
                  ['Time required', 'Hours', 'Under 5 minutes'],
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
          <h2 className="text-2xl font-bold text-white mb-4">What Else Does IRCC Require for Spousal Sponsorship?</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Beyond communication history, IRCC looks for a broad body of evidence to establish a genuine relationship:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
            <li><strong className="text-white">Photos together</strong> — clearly dated, showing different stages of the relationship</li>
            <li><strong className="text-white">Financial co-mingling</strong> — joint accounts, money transfers, proof of financial support</li>
            <li><strong className="text-white">Travel evidence</strong> — flight bookings, hotel receipts, itineraries of visits</li>
            <li><strong className="text-white">Communication history</strong> — your 10-page WhatsApp PDF from ChatDocket</li>
            <li><strong className="text-white">Statutory declarations</strong> — from friends or family attesting to the relationship</li>
            <li><strong className="text-white">Marriage certificate or common-law declaration</strong></li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions — IRCC WhatsApp Evidence</h2>
          <div className="space-y-5">
            {[
              {
                q: "What is Canada IRCC's 10-page guideline for WhatsApp chat history?",
                a: "IRCC Guide IMM 5289 advises submitting approximately 10 pages of communication history. ChatDocket's Canada IRCC preset automatically samples your WhatsApp export to produce a representative 10–15 page PDF covering your entire relationship timeline.",
              },
              {
                q: 'Does IRCC accept WhatsApp chats as proof of a genuine relationship?',
                a: 'Yes. IRCC accepts digital communication records including WhatsApp messages as evidence of a genuine relationship. The evidence should be clearly dated, paginated, and representative of the relationship.',
              },
              {
                q: 'Should I submit my entire WhatsApp chat history to IRCC?',
                a: "No. IRCC explicitly asks for concise, representative evidence — approximately 10 pages. Submitting hundreds of pages may actually be counterproductive. Use ChatDocket's Canada preset to produce a smart-sampled, 10-page representative document.",
              },
              {
                q: 'Is it safe to use ChatDocket for IRCC immigration documents?',
                a: 'Absolutely. ChatDocket processes everything 100% inside your browser — your WhatsApp data is never uploaded to any server. It is specifically designed for sensitive immigration documents.',
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
        <section className="bg-gradient-to-br from-red-950/40 to-slate-900/60 border border-red-700/30 rounded-xl p-8 text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-3">Generate Your IRCC-Ready WhatsApp Evidence PDF Now</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            Automatically create a 10-page, proportionally sampled WhatsApp evidence PDF for your Canada IRCC spousal sponsorship — in under 5 minutes, with zero data uploaded.
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
