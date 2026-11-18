import Link from 'next/link';
import { pageMetadata, siteUrl } from '@/lib/seo';

const path = '/guide/whatsapp-chat-to-pdf-with-photos';
const title = 'How to Save a WhatsApp Chat as PDF With Photos';
const description = 'Export WhatsApp with media, open the ZIP in ChatDocket, and check which photos appear before saving a PDF from iPhone or Android.';

export const metadata = pageMetadata(path, title, description, 'article');

const breadcrumbs = [
  { name: 'ChatDocket', path: '/' },
  { name: 'Guides', path: '/guide' },
  { name: 'WhatsApp PDF with photos', path },
];
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Article', headline: title, description, mainEntityOfPage: siteUrl + path, author: { '@type': 'Organization', name: 'ChatDocket', url: siteUrl } },
    {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem', position: index + 1, name: item.name, item: siteUrl + item.path,
      })),
    },
  ],
};

export default function WhatsAppPhotosGuide() {
  return (
    <article className="mx-auto max-w-3xl space-y-8 leading-relaxed">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav aria-label="Breadcrumb" className="flex flex-wrap gap-3 text-sm text-emerald-400">
        <Link href="/">ChatDocket</Link>
        <span aria-hidden="true">/</span>
        <Link href="/guide">Guides</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="text-slate-300">WhatsApp PDF with photos</span>
      </nav>
      <header className="space-y-4">
        <h1 className="text-3xl font-black text-white sm:text-5xl">{title}</h1>
        <p>Open the conversation in WhatsApp and export it with media. Open the ZIP containing the chat text and images in ChatDocket, then review the photos in the preview before saving the PDF. Keep the original export if you need the image files later.</p>
        <Link href="/" className="inline-block rounded-lg bg-emerald-400 px-4 py-2 font-bold text-slate-950">Open the WhatsApp PDF converter</Link>
      </header>
      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-white">Export with media on iPhone or Android</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li><strong>iPhone.</strong> Open the chat, tap the contact or group name, select Export Chat and choose Attach Media. Save the exported archive to Files.</li>
          <li><strong>Android.</strong> Open the chat, tap the three-dot menu, then More and Export chat. Choose Include media. If your share destination saves the text and photos separately, put the original files together in a ZIP without renaming them.</li>
          <li><strong>ChatDocket.</strong> Open the ZIP and preview the entries. If you choose a date range, check that it includes the messages connected to the photos you want.</li>
        </ol>
        <p>Menu labels may vary by version. See <a className="text-emerald-400 underline" href="https://faq.whatsapp.com/1180414079177245/">WhatsApp’s chat export instructions</a> and the <Link className="text-emerald-400 underline" href="/guide/how-to-export-whatsapp-chat-iphone-android">full iPhone and Android export guide</Link>.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-white">What to check when photos are missing</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-white"><tr><th scope="col" className="p-3">What you see</th><th scope="col" className="p-3">What to check</th></tr></thead>
            <tbody className="divide-y divide-slate-800">
              <tr><th scope="row" className="p-3">The export is only a TXT file</th><td className="p-3">Look for separately saved attachments or export again with media.</td></tr>
              <tr><th scope="row" className="p-3">An attachment name appears without a photo</th><td className="p-3">Open the ZIP and check whether it contains the corresponding image under its original name.</td></tr>
              <tr><th scope="row" className="p-3">Some older chats or photos are absent</th><td className="p-3">Compare the first date in the export with the conversation on your phone. Review any filters and keep track of which dates the PDF covers.</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-white">Review before saving or sharing</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Compare a few photos and adjacent messages with the original conversation.</li>
          <li>Check whether any photos show private details that should be excluded from the shared copy.</li>
          <li>Open the saved PDF and check that the photos are readable at normal zoom.</li>
        </ul>
        <p>For evidence bundles, see the <Link className="text-emerald-400 underline" href="/guide/whatsapp-chat-court-evidence-bates-stamping">guide to Bates numbering and court exhibits</Link> or browse the <Link className="text-emerald-400 underline" href="/guide">visa and evidence guides</Link>.</p>
      </section>
    </article>
  );
}
