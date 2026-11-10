import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { generateLicenseKey } from '@/lib/paymentConfig';
import { SubscriptionPlan } from '@/types/auth';

/**
 * Unified Payment Webhook Handler
 * Supports Polar.sh, Dodo Payments, and Lemon Squeezy instant server webhooks.
 * Automatically activates user subscription inside Supabase PostgreSQL.
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const payload = JSON.parse(rawBody);

    // Detect event type & extract customer metadata across providers
    const eventType: string =
      payload?.type || payload?.event_name || payload?.meta?.event_name || '';

    const isSuccessEvent =
      eventType === 'order.created' ||
      eventType === 'order.paid' ||
      eventType === 'checkout.updated' ||
      eventType === 'payment.succeeded' ||
      eventType === 'subscription.active' ||
      eventType === 'order_created' ||
      payload?.data?.status === 'succeeded' ||
      payload?.data?.status === 'paid';

    if (!isSuccessEvent) {
      return NextResponse.json({ received: true, ignored: true, eventType });
    }

    const data = payload?.data || {};
    const metadata = data?.metadata || payload?.meta?.custom_data || {};

    const customerEmail: string =
      data?.customer?.email ||
      data?.user_email ||
      data?.attributes?.user_email ||
      data?.customer_email ||
      metadata?.user_email ||
      '';

    const userId: string | undefined = metadata?.user_id || data?.customer_id;

    const rawPlan = (metadata?.plan_id || 'visa_pass') as string;
    const validPlan: SubscriptionPlan =
      rawPlan === 'agency_pro' ? 'agency_pro' : 'visa_pass';

    const orderId = String(
      data?.id || data?.payment_id || data?.order_id || `WH-${Date.now()}`
    );

    const licenseKey = generateLicenseKey(validPlan);
    const nowIso = new Date().toISOString();
    const amount = validPlan === 'agency_pro' ? 39 : 12;
    const planName =
      validPlan === 'agency_pro' ? 'Law Firm & Agency Pro' : 'Visa & Court Single Case Pass';

    const supabaseAdmin = getSupabaseAdmin();

    if (supabaseAdmin && (userId || customerEmail)) {
      let targetUserId = userId;

      if (!targetUserId && customerEmail) {
        const { data: prof } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .ilike('email', customerEmail.trim())
          .single();
        if (prof) targetUserId = prof.id;
      }

      if (targetUserId) {
        await supabaseAdmin
          .from('profiles')
          .update({
            plan: validPlan,
            license_key: licenseKey,
            purchased_at: nowIso,
            updated_at: nowIso,
          })
          .eq('id', targetUserId);
      } else if (customerEmail) {
        await supabaseAdmin
          .from('profiles')
          .update({
            plan: validPlan,
            license_key: licenseKey,
            purchased_at: nowIso,
            updated_at: nowIso,
          })
          .ilike('email', customerEmail.trim());
      }

      await supabaseAdmin.from('orders').upsert(
        {
          order_id: orderId,
          user_id: targetUserId || null,
          user_email: customerEmail || 'customer@chatdocket.com',
          plan_id: validPlan,
          plan_name: planName,
          amount,
          currency: 'USD',
          final_amount: amount,
          payment_method: 'webhook',
          license_key: licenseKey,
          status: 'completed',
        },
        { onConflict: 'order_id' }
      );
    }

    return NextResponse.json({
      received: true,
      activated: true,
      orderId,
      licenseKey,
    });
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    return NextResponse.json(
      { error: err?.message || 'Webhook processing error' },
      { status: 400 }
    );
  }
}

