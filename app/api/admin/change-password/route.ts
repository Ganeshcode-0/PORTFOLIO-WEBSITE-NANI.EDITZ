import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { newPassword, email = 'admin@nanieditz.com' } = await request.json();

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: 'Supabase configuration is missing from environment variables.' },
        { status: 500 }
      );
    }

    // 1. Fetch user list from Supabase admin endpoint
    const listRes = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    });

    const listData = await listRes.json();
    const adminUser = listData.users?.find((u: any) => u.email === email);

    if (adminUser) {
      // 2. Update password for existing admin user
      const updateRes = await fetch(`${supabaseUrl}/auth/v1/admin/users/${adminUser.id}`, {
        method: 'PUT',
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!updateRes.ok) {
        const errJson = await updateRes.json();
        return NextResponse.json(
          { error: errJson.message || 'Failed to update password in Supabase Auth.' },
          { status: 500 }
        );
      }
    } else {
      // 3. Create admin user with the new password if not found
      const createRes = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
        method: 'POST',
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: newPassword,
          email_confirm: true,
          user_metadata: { role: 'admin', name: 'NANI.EDITZ Admin' },
        }),
      });

      if (!createRes.ok) {
        const errJson = await createRes.json();
        return NextResponse.json(
          { error: errJson.message || 'Failed to create user with new password.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Password successfully updated in Supabase and admin console.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Unexpected server error while updating password.' },
      { status: 500 }
    );
  }
}
