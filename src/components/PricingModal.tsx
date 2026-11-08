'use client';

import React, { useState } from 'react';
import { X, Check, Crown, ShieldCheck, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { SubscriptionPlan, UserProfile } from '@/types/auth';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPro: boolean;
  user: UserProfile | null;
  onSelectPlan: (planId: SubscriptionPlan) => void;
  onToggleProSimulator: (active: boolean) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  isPro,
  user,
  onSelectPlan,
  onToggleProSimulator,
}) => {
  const [billingCycle, setBillingCycle] = useState<'single' | 'annual'>('single');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative max-w-5xl w-full rounded-3xl overflow-hidden border border-white/[0.1] bg-[#070a14] shadow-2xl text-white">
        {/* Ambient background glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 px-6 sm:px-8 pt-6 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-400 to-cyan-400 flex items-center justify-center text-slate-950 font-black">
              <Crown className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wide uppercase text-slate-200 block">
                Chat Docket Pro Licensing
              </span>
              {user && (
                <span className="text-[11px] text-emerald-400">
                  Signed in as: {user.email} (Current Plan: {user.plan.toUpperCase()})
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 text-center max-w-2xl mx-auto px-4 pt-2 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trusted by 28,000+ Visa Applicants &amp; Law Firms</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Transparent, Predictable Pricing
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Generate 100% white-label, unwatermarked, Bates-numbered PDF dossiers compliant with Home Office, USCIS, and IRCC standards.
          </p>

          {/* Toggle Switch */}
          <div className="mt-6 inline-flex items-center gap-3 p-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
            <button
              onClick={() => setBillingCycle('single')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                billingCycle === 'single'
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Single Case Pass
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition ${
                billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Agency Pro (Monthly)</span>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.2 bg-emerald-950 text-emerald-300 rounded-full">
                Popular
              </span>
            </button>
          </div>
        </div>

        {/* Pro Testing Simulator Banner */}
        <div className="relative z-10 mx-6 sm:mx-8 mb-6 p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-bold text-amber-300">Live Evaluation Switch:</span>
            <span className="text-slate-300">
              Test watermark removal and agency white-labeling right now without entering a card.
            </span>
          </div>
          <button
            onClick={() => onToggleProSimulator(!isPro)}
            className={`px-4 py-1.5 rounded-xl font-extrabold text-xs transition shadow-sm ${
              isPro
                ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                : 'bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.1]'
            }`}
          >
            {isPro ? 'Pro Active (Click to Revert)' : 'Activate Pro Mode Simulator'}
          </button>
        </div>

        {/* 3 Translucent Glass Cards */}
        <div className="relative z-10 px-6 sm:px-8 pb-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Free Preview */}
          <div className="rounded-3xl p-6 flex flex-col justify-between bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl hover:border-white/[0.15] transition">
            <div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Free</div>
              <div className="text-4xl font-black text-white mb-1">$0</div>
              <p className="text-xs text-slate-400 mb-6">
                For applicants testing chat parsing and verifying visual formatting.
              </p>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>Up to 5 Pages Preview Export</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>Universal Android &amp; iOS Regex</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>Interactive Redaction Mode</span>
                </li>
                <li className="flex items-center gap-2.5 text-slate-500">
                  <div className="w-4 h-4 rounded-full bg-white/[0.05] text-slate-500 flex items-center justify-center shrink-0">
                    ✕
                  </div>
                  <span>Includes &quot;Free Preview&quot; watermark</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="mt-8 w-full py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-xs transition border border-white/[0.08]"
            >
              Continue with Free
            </button>
          </div>

          {/* Card 2: Visa & Legal Pass ($12 Single Case - Highlighted Glow Card) */}
          <div className="relative rounded-3xl p-6 flex flex-col justify-between bg-gradient-to-b from-emerald-500/[0.08] to-white/[0.03] border-2 border-emerald-400/80 shadow-[0_0_35px_-5px_rgba(16,185,129,0.3)] backdrop-blur-2xl">
            <div className="absolute -top-3.5 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-lime-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
              Most Popular
            </div>

            <div>
              <div className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
                Visa &amp; Court Single Pass
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-black text-white">$12</span>
                <span className="text-xs text-slate-400 font-medium">/ single case file</span>
              </div>
              <p className="text-xs text-slate-300 mb-6">
                Complete, official unwatermarked packet for your spouse visa or court docket.
              </p>

              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <strong>100% Watermark-Free Official PDF</strong>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Unlimited Pages &amp; Message Archive</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Relationship Analytics Cover Page</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Call Log Summary &amp; Photo Evidence Grid</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Cryptographic SHA-256 Forensic Stamp</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('visa_pass')}
              className="mt-8 w-full py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-lime-400 hover:from-emerald-300 hover:to-lime-300 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/25 active:scale-95 transition flex items-center justify-center gap-1.5"
            >
              <span>{user ? 'Proceed to Checkout ($12)' : 'Sign In & Buy Pass ($12)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Law Firm Agency Pro ($39/m) */}
          <div className="rounded-3xl p-6 flex flex-col justify-between bg-white/[0.03] border border-cyan-500/30 backdrop-blur-xl hover:border-cyan-400/60 transition">
            <div>
              <div className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">
                Law Firm / Agency
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-black text-white">$39</span>
                <span className="text-xs text-slate-400 font-medium">/ month</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                For immigration solicitors, legal counsel, and visa consultancy agencies.
              </p>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <strong>Custom Law Firm Header &amp; Seal</strong>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>Automated Bates Stamping Schedule</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>Unlimited Client Cases &amp; Exports</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>1-Click Bulk PII Auto-Redaction</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>Solicitor Statement of Truth Declaration</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('agency_pro')}
              className="mt-8 w-full py-2.5 rounded-full bg-white/[0.08] hover:bg-cyan-500 hover:text-slate-950 text-white font-bold text-xs transition border border-white/[0.1] active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>{user ? 'Subscribe Agency Pro ($39)' : 'Sign In & Subscribe ($39)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="relative z-10 px-6 sm:px-8 py-3.5 bg-black/40 border-t border-white/[0.06] flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% Embassy Acceptance Money-Back Guarantee
          </span>
          <button onClick={onClose} className="text-slate-300 hover:text-white font-semibold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
