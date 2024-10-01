import { NextResponse } from 'next/server';
import { signOut } from 'next-auth/react';
export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
  try {
    await signOut({ redirect: false });
    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
  }
}
