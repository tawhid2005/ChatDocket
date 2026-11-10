import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { generateLicenseKey } from '@/lib/paymentConfig';
import { SubscriptionPlan } from '@/types/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      email,
      plan = 'visa_pass',
      orderId,
      provider = 'polar',
    }: {
      userId?: string;
      email?: string;
      plan?: SubscriptionPlan;
      orderId?: string;
      provider?: string;
    } = body;

    const validPlan: SubscriptionPlan = plan === 'agency_pro' ? 'agency_pro' : 'visa_pass';
    const finalOrderId = orderId || `ORD-${Date.now().toString().slice(-8)}`;
    const licenseKey = generateLicenseKey(validPlan);
    const nowIso = new Date().toISOString();
    const amount = validPlan === 'agency_pro' ? 39 : 12;
    const planName =
      validPlan === 'agency_pro' ? 'Law Firm & Agency Pro' : 'Visa & Court Single Case Pass';

    const supabaseAdmin = getSupabaseAdmin();
    let updatedProfile = null;

    if (supabaseAdmin) {
      // Lookup existing profile by userId or email
      let targetUserId = userId;
      let targetEmail = email?.trim().toLowerCase();

      if (!targetUserId && targetEmail) {
        const { data: profileByEmail } = await supabaseAdmin
          .from('profiles')
          .select('id, email, license_key, plan')
          .ilike('email', targetEmail)
          .single();

        if (profileByEmail) {
          targetUserId = profileByEmail.id;
        }
      }

      // Check if order was already processed (idempotency check)
      const { data: existingOrder } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('order_id', finalOrderId)
        .single();

      if (existingOrder) {
        return NextResponse.json({
          success: true,
          alreadyProcessed: true,
          licenseKey: existingOrder.license_key,
          orderId: existingOrder.order_id,
          plan: existingOrder.plan_id,
          planName: existingOrder.plan_name,
          purchasedAt: existingOrder.created_at,
        });
      }

      // Update user profile in Supabase
      if (targetUserId) {
        const { data: prof, error: profErr } = await supabaseAdmin
          .from('profiles')
          .update({
            plan: validPlan,
            license_key: licenseKey,
            purchased_at: nowIso,
            updated_at: nowIso,
          })
          .eq('id', targetUserId)
          .select()
          .single();

        if (!profErr && prof) {
          updatedProfile = prof;
          targetEmail = prof.email || targetEmail;
        }
      } else if (targetEmail) {
        const { data: prof } = await supabaseAdmin
          .from('profiles')
          .update({
            plan: validPlan,
            license_key: licenseKey,
            purchased_at: nowIso,
            updated_at: nowIso,
          })
          .ilike('email', targetEmail)
          .select()
          .single();
        updatedProfile = prof;
      }

      // Log completed order in orders ledger
      await supabaseAdmin.from('orders').insert({
        order_id: finalOrderId,
        user_id: targetUserId || null,
        user_email: targetEmail || 'customer@chatdocket.com',
        user_name: updatedProfile?.name || 'Verified Customer',
        plan_id: validPlan,
        plan_name: planName,
        amount,
        currency: 'USD',
        discount: 0,
        final_amount: amount,
        payment_method: provider,
        license_key: licenseKey,
        status: 'completed',
      });
    }

    return NextResponse.json({
      success: true,
      licenseKey,
      orderId: finalOrderId,
      plan: validPlan,
      planName,
      purchasedAt: nowIso,
      profileUpdated: Boolean(updatedProfile),
    });
  } catch (err: any) {
    console.error('Payment confirmation error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to confirm payment' },
      { status: 500 }
    );
  }
}

