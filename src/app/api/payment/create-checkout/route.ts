import { NextRequest, NextResponse } from 'next/server';
import { SubscriptionPlan } from '@/types/auth';

const DEFAULT_POLAR_PRODUCTS: Record<string, string> = {
  visa_pass: process.env.POLAR_PRODUCT_ID_VISA || 'ce809790-4de5-4467-b7fd-e14e50488ef1',
  agency_pro: process.env.POLAR_PRODUCT_ID_AGENCY || '21f6f528-0025-4353-899c-8603ebd13843',
};

/**
 * Creates a 1-Click Polar.sh Hosted Checkout Session
 * Pre-fills customer email, passes user_id + plan_id metadata,
 * and configures automatic redirect back to /payment-success.
 */
export async function POST(req: NextRequest) {
  try {
    const polarAccessToken = process.env.POLAR_ACCESS_TOKEN;

    if (!polarAccessToken) {
      return NextResponse.json(
        { error: 'POLAR_ACCESS_TOKEN not configured', useFallbackUrl: true },
        { status: 400 }
      );
    }

    const body = await req.json();
    const {
      planId = 'visa_pass',
      userId,
      userEmail,
    }: {
      planId?: SubscriptionPlan;
      userId?: string;
      userEmail?: string;
    } = body;

    const validPlan: SubscriptionPlan = planId === 'agency_pro' ? 'agency_pro' : 'visa_pass';
    const productId = DEFAULT_POLAR_PRODUCTS[validPlan];

    const origin =
      req.headers.get('origin') ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://chatdocketofficial.vercel.app';

    const successUrl = `${origin}/payment-success?plan=${validPlan}&checkout_id={CHECKOUT_ID}&provider=polar${
      userEmail ? `&email=${encodeURIComponent(userEmail)}` : ''
    }`;

    const polarResponse = await fetch('https://api.polar.sh/v1/checkouts/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${polarAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: [productId],
        success_url: successUrl,
        ...(userEmail ? { customer_email: userEmail } : {}),
        metadata: {
          plan_id: validPlan,
          ...(userId ? { user_id: userId } : {}),
          ...(userEmail ? { user_email: userEmail } : {}),
        },
      }),
    });

    const data = await polarResponse.json();

    if (!polarResponse.ok || !data?.url) {
      console.error('Polar checkout creation failed:', data);
      return NextResponse.json(
        {
          error: data?.detail || 'Failed to create Polar checkout session',
          useFallbackUrl: true,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: data.url,
      checkoutId: data.id,
    });
  } catch (err: any) {
    console.error('Checkout route error:', err);
    return NextResponse.json(
      { error: err?.message || 'Internal server error', useFallbackUrl: true },
      { status: 500 }
    );
  }
}
