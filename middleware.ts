import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  // Fetch the session token from the request
  const token = await getToken({ req, secret });

  if (!token) {
    // If there's no token, redirect the user to the sign-in page
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // Allow the user to access the requested page if authenticated
  return NextResponse.next();
}

// Protect specific routes
export const config = {
  matcher: ['/home', '/projects', '/settings', '/pricing'], // Routes to protect
};
