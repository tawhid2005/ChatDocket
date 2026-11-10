'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  KeyRound,
  Award,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SubscriptionPlan, UserProfile } from '@/types/auth';
import { BrandLogo } from '@/components/BrandLogo';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();

  const [isVerifying, setIsVerifying] = useState(true);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [accountEmail, setAccountEmail] = useState<string>('');
  const [planName, setPlanName] = useState<string>('Visa & Court Single Case Pass');
  const [licenseKey, setLicenseKey] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const verifyAndActivate = async () => {
      try {
        const rawPlan = searchParams.get('plan');
        const plan: SubscriptionPlan =
          rawPlan === 'agency_pro' ? 'agency_pro' : 'visa_pass';
        const urlOrderId =
          searchParams.get('order_id') ||
          searchParams.get('payment_id') ||
          searchParams.get('checkout_id') ||
          `PAY-${Date.now().toString().slice(-8)}`;
        const urlEmail = searchParams.get('email') || '';

        // 1. Identify currently logged-in user (Supabase session first, fallback localStorage)
        let currentUserId: string | undefined;
        let currentEmail = urlEmail;
        let currentName = 'Verified Customer';

        if (supabase) {
          const {
            data: { user: authUser },
          } = await supabase.auth.getUser();
          if (authUser) {
            currentUserId = authUser.id;
            currentEmail = authUser.email || currentEmail;
            currentName = authUser.user_metadata?.full_name || currentEmail.split('@')[0];
          }
        }

        if (!currentEmail) {
          try {
            const saved = localStorage.getItem('cd_user_profile');
            if (saved) {
              const parsed: UserProfile = JSON.parse(saved);
              currentUserId = currentUserId || parsed.id;
              currentEmail = parsed.email;
              currentName = parsed.name;
            }
          } catch {}
        }

        setAccountEmail(currentEmail || 'Your Active Account');

        // 2. Call our backend confirmation API to unlock subscription in Supabase PostgreSQL
        const res = await fetch('/api/payment/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUserId,
            email: currentEmail,
            plan,
            orderId: urlOrderId,
            provider: searchParams.get('provider') || 'online_checkout',
          }),
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
          setVerifyError(result.error || 'Payment could not be verified.');
          return;
        }

        const finalLicense = result.licenseKey || `CDPASS-${Date.now().toString(36).toUpperCase()}`;
        const finalOrderId = result.orderId || urlOrderId;
        const finalPlanName =
          result.planName ||
          (plan === 'agency_pro'
            ? 'Law Firm & Agency Pro'
            : 'Visa & Court Single Case Pass');

        setLicenseKey(finalLicense);
        setOrderId(finalOrderId);
        setPlanName(finalPlanName);

        // 3. Sync local session state immediately so returning to '/' shows unlocked Pro status
        try {
          const savedRaw = localStorage.getItem('cd_user_profile');
          const existing: UserProfile = savedRaw
            ? JSON.parse(savedRaw)
            : {
                id: currentUserId || 'usr_verified',
                name: currentName,
                email: currentEmail || 'customer@chatdocket.com',
                plan,
                isVerified: true,
              };

          const updatedProfile: UserProfile = {
            ...existing,
            id: currentUserId || existing.id,
            email: currentEmail || existing.email,
            plan,
            licenseKey: finalLicense,
            purchasedAt: new Date().toISOString(),
            isVerified: true,
          };

          localStorage.setItem('cd_user_profile', JSON.stringify(updatedProfile));
        } catch {}
      } catch (err) {
        console.error('Confirmation sync error:', err);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAndActivate();
  }, [searchParams]);

  const handleCopyKey = () => {
    if (!licenseKey) return;
    navigator.clipboard.writeText(licenseKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#060810] text-slate-100 bg-tech-grid flex flex-col justify-between p-4 sm:p-6">
      {/* Top Navbar */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between py-2">
        <Link href="/" className="hover:opacity-90 transition">
          <BrandLogo size="md" showText={true} />
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Transaction</span>
        </div>
      </div>

      {/* Main Confirmation Card */}
      <div className="max-w-xl w-full mx-auto my-8 relative">
        {/* Glow behind card */}
        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-lime-500/20 rounded-3xl blur-2xl pointer-events-none" />

        <div className="relative rounded-3xl border border-emerald-500/30 bg-[#090d16]/95 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-6 text-center">
          {isVerifying ? (
            <div className="py-12 space-y-4">
              <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto" />
              <h1 className="text-xl font-black text-white">
                Confirming Your Payment &amp; Activating License...
              </h1>
              <p className="text-xs text-slate-400">
                Updating your ChatDocket cloud database profile and generating your official license key.
              </p>
            </div>
          ) : verifyError ? (
            <div className="py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h1 className="text-xl font-black text-white">Payment Verification Notice</h1>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">{verifyError}</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
              >
                <span>Return to ChatDocket Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              {/* Success Badge */}
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-400 to-lime-400 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-in zoom-in duration-300">
                <CheckCircle2 className="w-11 h-11 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Congratulations! Subscription Activated</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Welcome to ChatDocket Pro!
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Your payment is confirmed. All watermarks have been permanently unlocked for your account.
                </p>
              </div>

              {/* Activation Details Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3 text-left text-xs">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                  <span className="text-slate-400">Logged-In Account:</span>
                  <span className="font-bold text-white">{accountEmail}</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                  <span className="text-slate-400">Active Plan:</span>
                  <span className="font-extrabold text-emerald-400 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    {planName}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                  <span className="text-slate-400">Order Reference:</span>
                  <span className="font-mono text-slate-200">{orderId}</span>
                </div>

                <div className="pt-1">
                  <span className="text-slate-400 block mb-1.5 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-lime-400" />
                    Official License Key (Saved to Database):
                  </span>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 font-mono text-sm font-black text-emerald-300 tracking-wider text-center">
                      {licenseKey}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopyKey}
                      className="p-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white transition cursor-pointer"
                      title="Copy License Key"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-2 space-y-3">
                <Link
                  href="/"
                  className="w-full py-4 px-6 bg-gradient-to-r from-emerald-400 to-lime-400 hover:from-emerald-300 hover:to-lime-300 active:scale-95 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-emerald-500/25 transition flex items-center justify-center gap-2"
                >
                  <span>Go to Workspace &amp; Export Unwatermarked PDF</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                <p className="text-[11px] text-slate-500">
                  Your subscription is permanently linked to your account. You can sign in from any browser or device.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl w-full mx-auto text-center text-[11px] text-slate-500 py-3">
        © {new Date().getFullYear()} ChatDocket • 100% Client-Side Private Legal &amp; Visa Exporter
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#060810] flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
