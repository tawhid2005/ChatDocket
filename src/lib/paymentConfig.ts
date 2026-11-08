import { SubscriptionPlan, PaymentOrder } from '@/types/auth';

export interface PlanDetails {
  id: SubscriptionPlan;
  name: string;
  tagline: string;
  priceUSD: number;
  billingPeriod: 'one_time' | 'monthly';
  features: string[];
  stripePriceId: string;
  lemonSqueezyVariantId: string;
  checkoutUrl?: string;
}

export const SAAS_PLANS: Record<SubscriptionPlan, PlanDetails> = {
  free: {
    id: 'free',
    name: 'Free Verification Preview',
    tagline: 'Test regex parser & preview document layout',
    priceUSD: 0,
    billingPeriod: 'one_time',
    features: [
      'Up to 5 Pages Preview Export',
      'Universal iOS & Android Regex Parser',
      'Interactive 1-Click Redaction Mode',
      'Includes "Free Preview" watermark',
    ],
    stripePriceId: '',
    lemonSqueezyVariantId: '',
    checkoutUrl: '',
  },
  visa_pass: {
    id: 'visa_pass',
    name: 'Visa & Court Single Case Pass',
    tagline: 'Official unwatermarked exhibit packet for your petition',
    priceUSD: 12,
    billingPeriod: 'one_time',
    features: [
      '100% Watermark-Free Official PDF',
      'Unlimited Pages & Complete Message Archive',
      'Relationship Analytics Cover Page',
      'Call Log Schedule & Photo Evidence Grid',
      'Forensic SHA-256 Hash Integrity Stamp',
      'Certified Translator Declaration Block',
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_VISA_PASS || 'price_1P_visa_pass_12',
    lemonSqueezyVariantId: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VISA_VARIANT_ID || 'variant_482910',
    checkoutUrl:
      process.env.NEXT_PUBLIC_PAYMENT_URL_VISA ||
      process.env.NEXT_PUBLIC_GUMROAD_VISA_URL ||
      process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VISA_URL ||
      'https://tawhidh.gumroad.com/l/qzaetv',
  },
  agency_pro: {
    id: 'agency_pro',
    name: 'Law Firm & Agency Pro',
    tagline: 'For immigration solicitors, legal counsel & consultants',
    priceUSD: 39,
    billingPeriod: 'monthly',
    features: [
      'Everything in Single Pass + Unlimited Client Cases',
      'Custom Law Firm Header, Logo & Official Seal',
      'Automated Sequential Bates Stamping',
      '1-Click Bulk PII Auto-Redaction Tool',
      'Solicitor Statement of Truth (CPR Part 32)',
      'Forensic Verification Certificate (.txt) Export',
      'Multi-Format Dossiers (US Letter & A4)',
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_AGENCY_PRO || 'price_1P_agency_pro_39',
    lemonSqueezyVariantId: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_AGENCY_VARIANT_ID || 'variant_918234',
    checkoutUrl:
      process.env.NEXT_PUBLIC_PAYMENT_URL_AGENCY ||
      process.env.NEXT_PUBLIC_GUMROAD_AGENCY_URL ||
      process.env.NEXT_PUBLIC_LEMON_SQUEEZY_AGENCY_URL ||
      '',
  },
};

// Available Promo Codes
export const VALID_PROMO_CODES: Record<string, { discountPercent: number; description: string }> = {
  VISA20: { discountPercent: 20, description: '20% Off Spouse Visa Special' },
  LEGAL30: { discountPercent: 30, description: '30% Off Law Firm Special' },
  AGENCY50: { discountPercent: 50, description: '50% Off Agency Annual Launch' },
  CHAT10: { discountPercent: 10, description: '10% Welcome Discount' },
};

// Generate authentic license key format (e.g. CD-9A2F-88BC-E410)
export function generateLicenseKey(plan: SubscriptionPlan): string {
  const prefix = plan === 'agency_pro' ? 'CDPRO' : 'CDPASS';
  const seg1 = Math.random().toString(36).substring(2, 6).toUpperCase();
  const seg2 = Math.random().toString(36).substring(2, 6).toUpperCase();
  const seg3 = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${seg1}-${seg2}-${seg3}`;
}

