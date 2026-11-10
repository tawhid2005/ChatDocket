import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SubscriptionPlan, UserProfile } from '@/types/auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Public browser client (safe for client-side auth and RLS-protected queries)
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : null;

// Server-side admin client (strictly for API routes / webhooks; bypasses RLS)
export function getSupabaseAdmin(): SupabaseClient | null {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!supabaseUrl || !serviceKey) return null;
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Fetch user profile from Supabase (or create a profile row if missing)
export async function fetchUserProfile(
  userId: string,
  email: string,
  fallbackName?: string,
  avatarUrl?: string
): Promise<UserProfile> {
  if (!supabase) {
    return {
      id: userId,
      email,
      name: fallbackName || email.split('@')[0],
      avatarUrl,
      plan: 'free',
      isVerified: true,
    };
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    let resolvedPlan: SubscriptionPlan = (data?.plan as SubscriptionPlan) || 'free';
    let resolvedLicense: string | undefined = data?.license_key || undefined;
    let resolvedPurchasedAt: string | undefined = data?.purchased_at || undefined;

    // Cross-verify against completed orders tied to this email (guarantees email-bound recovery across devices)
    if (resolvedPlan === 'free' && email) {
      const { data: orderMatch } = await supabase
        .from('orders')
        .select('plan_id, license_key, created_at')
        .ilike('user_email', email.trim())
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (orderMatch) {
        resolvedPlan = (orderMatch.plan_id as SubscriptionPlan) || 'visa_pass';
        resolvedLicense = orderMatch.license_key;
        resolvedPurchasedAt = orderMatch.created_at;

        // Sync profile row immediately
        await supabase.from('profiles').upsert(
          {
            id: userId,
            email: email.trim().toLowerCase(),
            name: data?.name || fallbackName || email.split('@')[0],
            plan: resolvedPlan,
            license_key: resolvedLicense,
            purchased_at: resolvedPurchasedAt,
            is_verified: true,
          },
          { onConflict: 'id' }
        );
      }
    }

    if (data && !error) {
      return {
        id: data.id,
        email: data.email || email,
        name: data.name || fallbackName || email.split('@')[0],
        avatarUrl: data.avatar_url || avatarUrl,
        plan: resolvedPlan,
        licenseKey: resolvedLicense,
        purchasedAt: resolvedPurchasedAt,
        expiresAt: data.expires_at || undefined,
        isVerified: Boolean(data.is_verified),
      };
    }

    // Create default profile if trigger hasn't populated it yet
    const newProfile = {
      id: userId,
      email: email.trim().toLowerCase(),
      name: fallbackName || email.split('@')[0],
      avatar_url: avatarUrl || null,
      plan: resolvedPlan,
      license_key: resolvedLicense || null,
      purchased_at: resolvedPurchasedAt || null,
      is_verified: true,
    };

    await supabase.from('profiles').upsert(newProfile, { onConflict: 'id' });

    return {
      id: userId,
      email: newProfile.email,
      name: newProfile.name,
      avatarUrl,
      plan: resolvedPlan,
      licenseKey: resolvedLicense,
      purchasedAt: resolvedPurchasedAt,
      isVerified: true,
    };
  } catch {
    return {
      id: userId,
      email,
      name: fallbackName || email.split('@')[0],
      avatarUrl,
      plan: 'free',
      isVerified: true,
    };
  }
}

