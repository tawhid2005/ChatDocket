import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Scale, ArrowLeft } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chatdocketofficial.vercel.app';

export const metadata: Metadata = {
  title: 'Terms of Service & 30-Day Guarantee',
  description:
    'Terms of Service and Refund Policy for ChatDocket WhatsApp Chat to Legal & Spouse Visa PDF Exporter.',
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
  openGraph: {
    title: 'Terms of Service — ChatDocket',
    description:
      'Licensing terms and 30-day technical guarantee for ChatDocket WhatsApp Legal & Visa PDF Exporter.',
    url: `${siteUrl}/terms`,
    type: 'website',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#060810] text-slate-200 p-4 sm:p-8 bg-tech-grid">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
          <Link href="/" className="hover:opacity-90 transition">
            <BrandLogo size="md" showText={true} />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to App</span>
          </Link>
        </div>

        <div className="rounded-3xl border border-white/[0.08] bg-[#090d16]/90 p-6 sm:p-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-400">
            <Scale className="w-4 h-4" />
            <span>Legal &amp; Licensing Terms</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white">Terms of Service</h1>
          <p className="text-xs text-slate-400">Last Updated: November 2026</p>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. Service Description</h2>
              <p>
                ChatDocket provides browser-based formatting tools that convert user-exported WhatsApp chat archives into structured legal exhibits and immigration visa dossiers. ChatDocket does not provide legal advice and is not a law firm.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. User Licenses &amp; Plans</h2>
              <p>
                Paid licenses (Visa &amp; Court Single Case Pass and Law Firm Agency Pro) are linked directly to your registered account email address and remove document preview watermarks while unlocking unlimited message formatting.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. 30-Day Money-Back Guarantee</h2>
              <p>
                If your document formatting is ever rejected for technical formatting reasons or you experience an unresolved technical issue, please contact{' '}
                <a href="mailto:support@chatdocket.com" className="text-emerald-400 underline">
                  support@chatdocket.com
                </a>{' '}
                within 30 days of purchase for a full refund.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

