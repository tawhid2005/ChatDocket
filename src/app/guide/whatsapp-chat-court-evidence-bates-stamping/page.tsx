import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chatdocket.xyz';

export const metadata: Metadata = {
  title: 'WhatsApp Chat as Court Evidence — Bates Stamping Guide',
  description:
    'Submit WhatsApp chat logs as court-admissible evidence with automated Bates stamping, cryptographic SHA-256 hashes & statement of truth.',
  keywords: [
    'whatsapp chat as court evidence',
    'whatsapp bates numbering court exhibit',
    'court admissible whatsapp text messages',
    'whatsapp message affidavit CPR 32',
    'submit whatsapp chat in court litigation',
    'whatsapp digital evidence civil litigation',
    'bates stamped chat exhibit generator',
    'whatsapp evidence chain of custody',
  ],
  alternates: {
    canonical: `${siteUrl}/guide/whatsapp-chat-court-evidence-bates-stamping`,
  },
  openGraph: {
    title: 'WhatsApp Chat as Court Evidence — Bates Stamping Guide',
    description:
      'Format WhatsApp chat logs into court-admissible PDF exhibits with automated sequential Bates numbering, SHA-256 hashes, and Statements of Truth.',
    url: `${siteUrl}/guide/whatsapp-chat-court-evidence-bates-stamping`,
    type: 'article',
  },
};

const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Submit WhatsApp Chat Logs as Admissible Court Evidence with Bates Stamping',
  description:
    'Complete legal practitioner and litigant guide to formatting WhatsApp message history into admissible court exhibits with Bates stamping, cryptographic SHA-256 hash integrity, and statutory statements of truth.',
  url: `${siteUrl}/guide/whatsapp-chat-court-evidence-bates-stamping`,
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
      name: 'Are WhatsApp messages admissible as evidence in civil court?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. WhatsApp messages are widely admissible as electronic documentary evidence in civil courts (under UK CPR Part 32/33, US Federal Rules of Evidence Rule 901/902, and similar Commonwealth statutes), provided their authenticity and provenance can be established with clear timestamps, sender identification, and an intact chain of custody.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Bates numbering and why is it mandatory for court bundles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bates numbering is a sequential page-identification system (e.g., EXHIBIT-0001, EXHIBIT-0002) used by judges, solicitors, and barristers to cite specific pages during hearings and cross-examinations. Unpaginated screenshot piles are frequently rejected by court clerks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does SHA-256 cryptographic hashing prove chat integrity?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A cryptographic SHA-256 hash creates a unique 64-character digital fingerprint of the original raw WhatsApp export file. If even a single comma or emoji is altered, the hash changes completely. ChatDocket computes this hash locally using the browser Web Crypto API and stamps it onto every page.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I redact sensitive personal information before filing in court?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Court rules require redaction of non-material personal data like credit card numbers, national insurance/SSN numbers, and home addresses. ChatDocket provides 1-click bulk PII redaction and interactive black-out bars that preserve surrounding context without wiping out the entire dialogue.',
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
      name: 'Court Evidence & Bates Stamping Guide',
      item: `${siteUrl}/guide/whatsapp-chat-court-evidence-bates-stamping`,
    },
  ],
};

export default function CourtEvidenceBatesGuidePage() {
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
            <li className="text-slate-400">Court Evidence &amp; Bates Stamping</li>
          </ol>
        </nav>

        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
            ⚖️ Civil Litigation · Court Exhibits · CPR Part 32
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            How to Submit WhatsApp Chat as Admissible Court Evidence with Bates Stamping
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Judges, barristers, and court clerks routinely dismiss raw screenshots and unorganized text dumps.
            Learn the legal evidentiary standards required to prepare a court-ready WhatsApp exhibit bundle.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition shadow-lg shadow-emerald-500/20"
            >
              Generate Court-Ready Exhibit PDF Free →
            </Link>
          </div>
        </header>

        <section className="space-y-4 text-slate-300 leading-relaxed text-sm">
          <h2 className="text-xl font-bold text-white">
            The Legal Challenge: Proving Authenticity &amp; Integrity
          </h2>
          <p>
            In modern civil proceedings — from contractual breach and debt collection to partnership disputes and defamation — contemporaneous WhatsApp messages often represent the single most critical contemporaneous record of what the parties actually agreed.
          </p>
          <p>
            However, under rules of evidence (such as <strong>UK Civil Procedure Rules Part 32 and Part 33</strong>, or <strong>US Federal Rules of Evidence Rule 901(b)(4)</strong>), electronic records must overcome two primary hurdles: <em>authenticity</em> (proving the records are genuine and unmodified) and <em>admissibility</em> (demonstrating relevance and overcoming hearsay objections).
          </p>
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-xs space-y-1">
            <strong className="text-indigo-300 block text-sm">Judicial Expectation:</strong>
            Courts expect exhibits to feature uninterrupted chronological sequences, full participant names, precise timestamps, and continuous page indexing so counsel can cross-examine witnesses effectively.
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">
            Why Screenshots Fail vs. Professional Forensic Formatting
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.02]">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.04] text-slate-300 border-b border-white/[0.08]">
                <tr>
                  <th className="py-3 px-4 font-bold">Standard</th>
                  <th className="py-3 px-4 font-bold">Phone Screenshots</th>
                  <th className="py-3 px-4 font-bold text-emerald-400">ChatDocket Legal Bundle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-slate-300">
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-white">Bates Numbering</td>
                  <td className="py-2.5 px-4 text-rose-400">None (causes indexing confusion)</td>
                  <td className="py-2.5 px-4 text-emerald-400 font-bold">Sequential (EXHIBIT-0001...)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-white">Chain of Custody</td>
                  <td className="py-2.5 px-4 text-rose-400">Vulnerable to tampering allegations</td>
                  <td className="py-2.5 px-4 text-emerald-400 font-bold">SHA-256 Cryptographic Hash</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-white">Line Numbers</td>
                  <td className="py-2.5 px-4 text-slate-500">Not available</td>
                  <td className="py-2.5 px-4 text-emerald-400 font-bold">Every message numbered (#0001)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-white">Call Records</td>
                  <td className="py-2.5 px-4 text-slate-500">Separated in phone log tabs</td>
                  <td className="py-2.5 px-4 text-emerald-400 font-bold">Dedicated Call Summary Schedule</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-white">Statement of Truth</td>
                  <td className="py-2.5 px-4 text-slate-500">Must be drafted separately</td>
                  <td className="py-2.5 px-4 text-emerald-400 font-bold">Embedded statutory declaration</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">
            Step-by-Step: Preparing a Court-Admissible WhatsApp Exhibit
          </h2>
          <ol className="space-y-3 list-decimal list-inside pl-1 text-slate-300">
            <li>
              <strong className="text-white">Export raw archive:</strong> Use WhatsApp&apos;s native Export Chat function to download the unedited <code>.zip</code> file with media attachments.
            </li>
            <li>
              <strong className="text-white">Verify SHA-256 hash:</strong> Upload the archive to ChatDocket. The browser Web Crypto API instantly computes a forensic hash of the raw file before rendering.
            </li>
            <li>
              <strong className="text-white">Switch to Legal Table mode:</strong> In the sidebar under Purpose, select <strong>Court &amp; Litigation</strong>. This sets the theme to an official courtroom grid with line-by-line numbering.
            </li>
            <li>
              <strong className="text-white">Configure Bates Prefix &amp; Case Reference:</strong> In the Names &amp; ID tab, enter your Case Reference (e.g. <code>HC-2026-00492</code>), Exhibit Letter (e.g. <code>Exhibit B</code>), and Law Firm details.
            </li>
            <li>
              <strong className="text-white">Apply Redactions:</strong> Black-out any non-material bank details, third-party phone numbers, or privileged discussions using interactive click-redaction.
            </li>
            <li>
              <strong className="text-white">Export &amp; Download Certificate:</strong> Click <em>Print / Save PDF</em> to obtain your vector document, and click <em>Download Forensic Certificate</em> to obtain a standalone <code>.txt</code> proof certificate.
            </li>
          </ol>
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

        <section className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 to-emerald-950/50 p-6 sm:p-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Generate Your Court-Admissible Exhibit Packet
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            100% private in browser memory — zero server uploads, automated Bates stamping, and cryptographic hash verification.
          </p>
          <Link
            href="/"
            className="inline-block px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition"
          >
            Open ChatDocket Legal Exporter →
          </Link>
        </section>

        <section className="pt-4 border-t border-white/[0.08]">
          <h2 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">
            Related Legal &amp; Evidence Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <Link
              href="/guide/whatsapp-evidence-child-custody-family-court"
              className="p-3 rounded-xl border border-slate-800 bg-white/[0.02] hover:border-emerald-500/40 transition"
            >
              <span className="text-emerald-400 font-bold block mb-1">👨‍👩‍👧 Family Court</span>
              <span className="text-slate-300">Child custody communication logs &amp; missed calls</span>
            </Link>
            <Link
              href="/guide/whatsapp-chat-proof-landlord-tenant-dispute"
              className="p-3 rounded-xl border border-slate-800 bg-white/[0.02] hover:border-emerald-500/40 transition"
            >
              <span className="text-emerald-400 font-bold block mb-1">🏠 Landlord &amp; Tenant</span>
              <span className="text-slate-300">Deposit dispute &amp; repair notice proof</span>
            </Link>
            <Link
              href="/guide/whatsapp-evidence-freelancer-contract-dispute"
              className="p-3 rounded-xl border border-slate-800 bg-white/[0.02] hover:border-emerald-500/40 transition"
            >
              <span className="text-emerald-400 font-bold block mb-1">💼 Freelance &amp; Business</span>
              <span className="text-slate-300">Client approvals &amp; unpaid invoice recovery</span>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
