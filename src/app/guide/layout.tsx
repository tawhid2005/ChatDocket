import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chatdocketofficial.vercel.app';

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#060810] text-slate-200">
      {/* Top navigation bar */}
      <nav className="border-b border-slate-800 bg-[#060810]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="currentColor"/>
            </svg>
            ChatDocket
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/guide/whatsapp-to-pdf-uk-spouse-visa" className="text-slate-400 hover:text-emerald-400 transition-colors hidden sm:block">
              UK Visa
            </Link>
            <Link href="/guide/whatsapp-chat-proof-uscis-i130" className="text-slate-400 hover:text-emerald-400 transition-colors hidden sm:block">
              USCIS
            </Link>
            <Link href="/guide/whatsapp-evidence-canada-ircc" className="text-slate-400 hover:text-emerald-400 transition-colors hidden sm:block">
              Canada
            </Link>
            <Link href="/guide/whatsapp-proof-australia-partner-visa" className="text-slate-400 hover:text-emerald-400 transition-colors hidden sm:block">
              Australia
            </Link>
            <Link
              href="/"
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors text-sm"
            >
              Try Free →
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} ChatDocket. All processing is 100% client-side — your data never leaves your browser.
          </p>
          <div className="flex justify-center gap-6 mt-3">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Use</Link>
            <Link href="/" className="hover:text-slate-300 transition-colors">Main App</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
