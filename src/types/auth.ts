export type SubscriptionPlan = 'free' | 'visa_pass' | 'agency_pro';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: SubscriptionPlan;
  licenseKey?: string;
  purchasedAt?: string;
  expiresAt?: string;
  isVerified: boolean;
}

export interface PaymentOrder {
  orderId: string;
  userId: string;
  userName: string;
  userEmail: string;
  planId: SubscriptionPlan;
  planName: string;
  amount: number;
  currency: string;
  promoCode?: string;
  discount: number;
  finalAmount: number;
  paymentMethod: 'card' | 'apple_pay' | 'google_pay' | 'paypal' | 'lemon_squeezy';
  status: 'completed' | 'pending' | 'failed';
  licenseKey: string;
  createdAt: string;
}

