'use client';

import React, { useState } from 'react';
import {
  X,
  CreditCard,
  ShieldCheck,
  Check,
  Lock,
  Tag,
  Sparkles,
  ArrowRight,
  Zap,
  Globe,
  Building2,
} from 'lucide-react';
import { UserProfile, SubscriptionPlan, PaymentOrder } from '@/types/auth';
import {
  SAAS_PLANS,
  VALID_PROMO_CODES,
  generateLicenseKey,
  openGumroadOverlay,
} from '@/lib/paymentConfig';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  planId: SubscriptionPlan;
  onPaymentSuccess: (order: PaymentOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  user,
  planId,
  onPaymentSuccess,
}) => {
  const plan = SAAS_PLANS[planId] || SAAS_PLANS.visa_pass;

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'paypal' | 'lemon_squeezy'>('card');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Card form states
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  if (!isOpen) return null;

  const basePrice = plan.priceUSD;
  const discountAmount = appliedPromo ? (basePrice * appliedPromo.percent) / 100 : 0;
  const finalPrice = Math.max(0, basePrice - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (VALID_PROMO_CODES[code]) {
      setAppliedPromo({ code, percent: VALID_PROMO_CODES[code].discountPercent });
    } else {
      setPromoError('Invalid coupon. Try: VISA20 (20% off) or LEGAL30 (30% off)');
    }
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();

    // If real live checkout URL is configured (Gumroad), trigger in-page overlay directly over the page
    if (plan.checkoutUrl) {
      onClose();
      openGumroadOverlay(plan.checkoutUrl, user?.email);
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const licenseKey = generateLicenseKey(planId);
      const order: PaymentOrder = {
        orderId: `ORD-${Date.now().toString().slice(-8)}`,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        planId,
        planName: plan.name,
        amount: basePrice,
        currency: 'USD',
        promoCode: appliedPromo?.code,
        discount: discountAmount,
        finalAmount: finalPrice,
        paymentMethod: paymentMethod === 'lemon_squeezy' ? 'lemon_squeezy' : 'card',
        status: 'completed',
        licenseKey,
        createdAt: new Date().toISOString(),
      };

      setIsProcessing(false);
      onPaymentSuccess(order);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-150">
      <div className="relative max-w-2xl w-full rounded-3xl overflow-hidden border border-white/[0.1] bg-[#070a14] shadow-2xl text-white">
        {/* Top Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-400 to-lime-400 text-slate-950 font-black flex items-center justify-center">
              <Lock className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Secure 256-Bit SSL Checkout</h3>
              <p className="text-[11px] text-slate-400">Account: {user.email} (Bound to License)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.08] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Order Summary */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block">
                    Selected Plan
                  </span>
                  <h4 className="text-base font-bold text-white">{plan.name}</h4>
                  <p className="text-[11px] text-slate-400">{plan.tagline}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white">${basePrice}</span>
                  <span className="text-[10px] text-slate-400 block">
                    {plan.billingPeriod === 'monthly' ? '/ month' : 'one-time'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.06] space-y-1.5 text-xs text-slate-300">
                {plan.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px]">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                <span>Promo / Coupon Code:</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. VISA20, LEGAL30"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  className="flex-1 p-2 bg-slate-900 border border-white/[0.12] rounded-xl text-xs uppercase text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
                <button
                  type="submit"
                  disabled={!promoCodeInput.trim()}
                  className="px-3.5 py-2 bg-white/[0.08] hover:bg-white/[0.15] disabled:opacity-40 text-xs font-bold rounded-xl transition"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-[10px] text-red-400">{promoError}</p>}
              {appliedPromo && (
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 flex justify-between items-center">
                  <span>Coupon {appliedPromo.code} applied!</span>
                  <span className="font-bold">-{appliedPromo.percent}% OFF</span>
                </div>
              )}
            </form>

            {/* Totals */}
            <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span>${basePrice.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Discount:</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Taxes &amp; VAT:</span>
                <span>$0.00 (Merchant Included)</span>
              </div>
              <div className="pt-2 border-t border-white/[0.08] flex justify-between text-sm font-black text-white">
                <span>Total Due Today:</span>
                <span className="text-emerald-400">${finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Methods & Action */}
          <form onSubmit={handleProcessPayment} className="space-y-4 flex flex-col justify-between">
            {plan.checkoutUrl ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-teal-500/5 border border-emerald-500/20 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-black text-sm">
                      G
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Official Gumroad Checkout</h4>
                      <p className="text-[11px] text-slate-400">Global SSL Encrypted Payment Portal</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-black/30 border border-white/5">
                      <CreditCard className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Credit &amp; Debit Cards</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-black/30 border border-white/5">
                      <Zap className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                      <span>PayPal &amp; Apple Pay</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Clicking below will launch the official SSL-encrypted payment modal right over this page. Enter your card or PayPal, and upon confirmation your subscription and watermark-free PDF export will activate immediately!
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[10px] text-slate-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>30-Day Money-Back Guarantee if rejected by caseworker or court.</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400/80 pl-6">
                    <Building2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                    <span>Direct Bank Payouts enabled via Gumroad / Payoneer / Wise.</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-slate-300 block">
                  Select Payment Gateway:
                </label>

                {/* Payment Method Pills */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 ${
                      paymentMethod === 'card'
                        ? 'border-emerald-400 bg-emerald-500/10 text-white font-bold'
                        : 'border-white/[0.08] text-slate-400 bg-white/[0.02]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('lemon_squeezy')}
                    className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 ${
                      paymentMethod === 'lemon_squeezy'
                        ? 'border-yellow-400 bg-yellow-500/10 text-white font-bold'
                        : 'border-white/[0.08] text-slate-400 bg-white/[0.02]'
                    }`}
                  >
                    <Globe className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span className="text-xs">Lemon Squeezy</span>
                  </button>
                </div>

                {/* Card Inputs */}
                <div className="space-y-2 pt-1">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">
                      Card Number:
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2 bg-slate-900 border border-white/[0.12] rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">
                        Expiry (MM/YY):
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-white/[0.12] rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">CVC:</label>
                      <input
                        type="text"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-white/[0.12] rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[10px] text-slate-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>30-Day Money-Back Guarantee if rejected by caseworker or court.</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400/80 pl-6">
                    <Building2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                    <span>Direct Bank Payouts enabled via Gumroad / Payoneer / Wise.</span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-gradient-to-r from-emerald-400 to-lime-400 hover:from-emerald-300 hover:to-lime-300 active:scale-95 text-slate-950 font-black text-xs rounded-2xl shadow-xl shadow-emerald-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {plan.checkoutUrl
                      ? `Open Payment Popup ($${finalPrice.toFixed(2)})`
                      : `Pay $${finalPrice.toFixed(2)} & Unlock Instant License`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

