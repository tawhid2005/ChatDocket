import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

    // 1. Verify HMAC SHA-256 Webhook Signature if secret configured
    const signature = req.headers.get('x-signature');
    if (secret && signature) {
      const hmac = crypto.createHmac('sha256', secret);
      const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
      const signatureBuffer = Buffer.from(signature, 'utf8');

      if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
        return NextResponse.json({ error: 'Invalid HMAC signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name;
    const customData = payload.meta?.custom_data || {};
    const orderData = payload.data?.attributes;

    console.log(`[Lemon Squeezy Webhook] Received event: ${eventName}`, {
      orderId: payload.data?.id,
      userEmail: orderData?.user_email,
      total: orderData?.total_formatted,
    });

    // Handle order creation or subscription
    if (eventName === 'order_created' || eventName === 'subscription_created') {
      const planName = orderData?.first_order_item?.product_name || 'Visa Single Pass';
      const licenseKey = orderData?.first_order_item?.license_key || `CDK-LIVE-${Date.now().toString(36).toUpperCase()}`;

      // In production with a database (e.g. Supabase/PostgreSQL), save the user license:
      // await db.users.update({ where: { email: orderData.user_email }, data: { plan: 'pro', licenseKey } });

      return NextResponse.json({
        success: true,
        message: 'Order processed successfully',
        licenseKey,
        customerEmail: orderData?.user_email,
      });
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('[Lemon Squeezy Webhook Error]:', error);
    return NextResponse.json({ error: error.message || 'Webhook handling failed' }, { status: 500 });
  }
}

