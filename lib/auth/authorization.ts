import { getSupabaseServerClient } from '../supabase/server';
import { getSupabaseAdminClient } from '../supabase/admin';

export interface AuthVerificationResult {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userId?: string;
  email?: string;
  error?: string;
}

export async function verifyAdminRequest(): Promise<AuthVerificationResult> {
  const supabase = getSupabaseServerClient();
  
  // If running in local fallback mode (no Supabase credentials provided yet)
  if (!supabase) {
    // In local development preview mode without Supabase connection,
    // we allow local development session
    return {
      isAuthenticated: true,
      isAdmin: true,
      userId: 'local-dev-admin-id',
      email: 'admin@punithchowdary.com',
    };
  }

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        isAuthenticated: false,
        isAdmin: false,
        error: 'Not authenticated',
      };
    }

    // Check administrators table for authorized admin role
    const { data: adminRecord, error: adminError } = await supabase
      .from('administrators')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (adminError || !adminRecord) {
      return {
        isAuthenticated: true,
        isAdmin: false,
        userId: user.id,
        email: user.email,
        error: 'Forbidden: User is authenticated but does not possess administrator privileges.',
      };
    }

    return {
      isAuthenticated: true,
      isAdmin: true,
      userId: user.id,
      email: user.email,
    };
  } catch (err: any) {
    return {
      isAuthenticated: false,
      isAdmin: false,
      error: err?.message || 'Server authorization failure',
    };
  }
}
