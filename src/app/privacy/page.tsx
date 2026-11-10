import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chatdocketofficial.vercel.app';

export const metadata: Metadata = {
  title: 'Privacy Policy — Zero-Knowledge Client-Side Processing',
  description:
    'ChatDocket Zero-Knowledge Privacy Policy: 100% client-side in-browser WhatsApp PDF processing with zero chat uploads.',
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  openGraph: {
    title: 'Privacy Policy — ChatDocket',
    description:
      '100% client-side WhatsApp PDF exporter with zero server uploads of personal messages or media.',
    url: `${siteUrl}/privacy`,
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero-Knowledge Privacy Architecture</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Last Updated: November 2026</p>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                1. 100% Client-Side Chat Processing (Zero Server Uploads)
              </h2>
              <p>
                ChatDocket processes your exported WhatsApp <code>.zip</code> and <code>.txt</code> files strictly within your own browser&apos;s local RAM memory. Your private messages, phone numbers, call logs, and photos are never uploaded to, transmitted to, or stored on any external ChatDocket server.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">
                2. Account Information &amp; Authentication
              </h2>
              <p>
                When you sign up or sign in using Email &amp; Password or Google Sign-In (powered by Supabase Authentication), we store only your account identifier, email address, display name, and subscription license status so that your paid pass remains permanently accessible across devices.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">
                3. Payments &amp; Billing Data
              </h2>
              <p>
                Payments are securely handled by our Merchant of Record payment partner (Polar.sh / Gumroad). ChatDocket never sees, collects, or stores your raw credit card number or banking details.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">
                4. Data Deletion &amp; Contact
              </h2>
              <p>
                You can request deletion of your account record or ask privacy questions at any time by contacting our support team at{' '}
                <a href="mailto:support@chatdocket.com" className="text-emerald-400 underline">
                  support@chatdocket.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

