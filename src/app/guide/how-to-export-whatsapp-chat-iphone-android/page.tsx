import Link from 'next/link';

import { pageMetadata, siteUrl } from '@/lib/seo';

export const metadata = pageMetadata(
  '/guide/how-to-export-whatsapp-chat-iphone-android',
  'How to Export WhatsApp Chat: iPhone & Android',
  'Step-by-step guide to exporting WhatsApp chats with photos and call logs as .zip or .txt on iPhone and Android. 100% private, no cloud upload.',
  'article',
);

const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Export WhatsApp Chat History with Media on iPhone and Android (Complete Tutorial)',
  description:
    'Comprehensive step-by-step guide to extracting your full WhatsApp message archives, photos, and voice notes into .zip or .txt files for legal formatting and permanent backup.',
  url: `${siteUrl}/guide/how-to-export-whatsapp-chat-iphone-android`,
  author: { '@type': 'Organization', name: 'ChatDocket' },
  publisher: {
    '@type': 'Organization',
    name: 'ChatDocket',
    logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.svg` },
  },
  datePublished: '2026-11-01',
  inLanguage: 'en',
};

const jsonLdHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Export WhatsApp Chat on iOS and Android',
  description:
    'Step-by-step instructions for extracting WhatsApp chat histories with attached photos, voice notes, and timestamps.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Open WhatsApp Chat',
      text: 'Open WhatsApp and navigate to the individual or group conversation you wish to export.',
    },
    {
      '@type': 'HowToStep',
      name: 'Access Contact Info / Menu',
      text: 'On iPhone, tap the contact name at the top. On Android, tap the three dots in the top-right corner and tap More.',
    },
    {
      '@type': 'HowToStep',
      name: 'Select Export Chat',
      text: 'Tap Export Chat and choose whether to export With Media or Without Media.',
    },
    {
      '@type': 'HowToStep',
      name: 'Save or Share the Archive',
      text: 'Save the exported .zip or .txt file to Files, Google Drive, AirDrop to your computer, or email it to yourself.',
    },
  ],
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the message limit when exporting WhatsApp chats?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WhatsApp allows up to 10,000 messages when exporting with media, or up to 40,000 messages without media. These limits are set by WhatsApp to prevent excessive file sizes during export.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I choose "Attach Media" or "Without Media"?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For visa petitions and court exhibits, choosing "Attach Media" is recommended because it bundles attached photos, documents, and voice call records into a single .zip file for complete evidentiary credibility.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I transfer the exported file to my computer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On iPhone, use AirDrop, Save to Files, or iCloud Drive. On Android, share the .zip to Google Drive, Nearby Share / Quick Share, or connect via USB cable.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does ChatDocket store my exported WhatsApp chat on any server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. ChatDocket operates 100% locally in your web browser RAM using JavaScript. Your personal chats, photos, and call logs never leave your device.',
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
      name: 'Export WhatsApp Chat Tutorial',
      item: `${siteUrl}/guide/how-to-export-whatsapp-chat-iphone-android`,
    },
  ],
};

export default function HowToExportWhatsAppChatGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
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
            <li className="text-emerald-400 font-medium">Export WhatsApp Chat Tutorial</li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header className="mb-12 not-prose border-b border-slate-800 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wide uppercase mb-4">
            Official Device Walkthrough &bull; iOS &amp; Android
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            How to Export WhatsApp Chat on iPhone and Android
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            Follow this step-by-step tutorial to extract your entire WhatsApp conversation history, images, and call timestamps into a clean <code>.zip</code> or <code>_chat.txt</code> archive ready for PDF conversion.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 items-center not-prose">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20"
            >
              Convert Export to PDF Now
            </Link>
            <span className="text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Works on Any Device &bull; 100% Private in Browser
            </span>
          </div>
        </header>

        {/* Section: iPhone Tutorial */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            How to Export WhatsApp Chat on iPhone (iOS)
          </h2>
          <div className="space-y-4 not-prose">
            <div className="flex gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1">Open Chat &amp; Tap Contact Name</h3>
                <p className="text-sm text-slate-300">
                  Open WhatsApp on your iPhone and tap into the specific conversation. Tap the contact or group name at the very top of the screen to open <strong>Contact Info</strong>.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1">Scroll Down &amp; Tap &ldquo;Export Chat&rdquo;</h3>
                <p className="text-sm text-slate-300">
                  Scroll toward the bottom of the page and tap <strong>Export Chat</strong>.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1">Choose &ldquo;Attach Media&rdquo;</h3>
                <p className="text-sm text-slate-300">
                  Select <strong>Attach Media</strong> if you want photos and voice call logs included in your legal evidence bundle, or <strong>Without Media</strong> for a lightweight text-only export.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">
                4
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1">Save to Files or AirDrop</h3>
                <p className="text-sm text-slate-300">
                  From the iOS Share Sheet, tap <strong>Save to Files</strong> (to save on iCloud/device) or AirDrop the <code>.zip</code> file directly to your Mac or iPad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Android Tutorial */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            How to Export WhatsApp Chat on Android
          </h2>
          <div className="space-y-4 not-prose">
            <div className="flex gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1">Tap the Three Dots Menu</h3>
                <p className="text-sm text-slate-300">
                  Open the chat in WhatsApp and tap the three vertical dots (<strong>&vellip;</strong>) in the top-right corner.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1">Select More &gt; Export Chat</h3>
                <p className="text-sm text-slate-300">
                  Tap <strong>More</strong>, then tap <strong>Export chat</strong>.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1">Choose Include Media or Without Media</h3>
                <p className="text-sm text-slate-300">
                  Select <strong>Include Media</strong> to bundle photos, voice notes, and call stamps, or <strong>Without Media</strong> for plain text only.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-sm">
                4
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1">Save to Google Drive or Files</h3>
                <p className="text-sm text-slate-300">
                  Select <strong>Save to Drive</strong>, email the file to yourself, or use Quick Share / USB cable to transfer the <code>.zip</code> file to your computer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Converting with ChatDocket */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Next Step: Convert the Exported ZIP into Official PDF
          </h2>
          <p className="text-slate-300 mb-4">
            Raw WhatsApp text exports are unformatted, difficult to read, and lack official legal credentials. Once you have saved your <code>.zip</code> or <code>.txt</code> file:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li>Open <strong>ChatDocket.xyz</strong> in any modern web browser.</li>
            <li>Drag &amp; drop the exported <code>.zip</code> archive onto the upload box.</li>
            <li>Select an official embassy preset (UKVI, USCIS, IRCC, DHA) or Court Evidence preset.</li>
            <li>Download a beautifully paginated, Bates-stamped PDF exhibit with cover page and statistics.</li>
          </ul>
        </section>

        {/* CTA Banner */}
        <div className="my-12 p-8 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30 text-center not-prose">
          <h3 className="text-2xl font-bold text-white mb-2">Ready to Format Your Exported WhatsApp Chat?</h3>
          <p className="text-slate-300 max-w-xl mx-auto mb-6 text-sm">
            Fast, zero-knowledge processing right inside your browser RAM. Your messages never leave your computer.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/25"
          >
            Start Free Chat Conversion
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
