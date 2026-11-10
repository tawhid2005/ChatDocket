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

    if (data && !error) {
      return {
        id: data.id,
        email: data.email || email,
        name: data.name || fallbackName || email.split('@')[0],
        avatarUrl: data.avatar_url || avatarUrl,
        plan: (data.plan as SubscriptionPlan) || 'free',
        licenseKey: data.license_key || undefined,
        purchasedAt: data.purchased_at || undefined,
        expiresAt: data.expires_at || undefined,
        isVerified: Boolean(data.is_verified),
      };
    }

    // Create default profile if trigger hasn't populated it yet
    const newProfile = {
      id: userId,
      email,
      name: fallbackName || email.split('@')[0],
      avatar_url: avatarUrl || null,
      plan: 'free',
      is_verified: true,
    };

    await supabase.from('profiles').upsert(newProfile, { onConflict: 'id' });

    return {
      id: userId,
      email,
      name: newProfile.name,
      avatarUrl,
      plan: 'free',
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

