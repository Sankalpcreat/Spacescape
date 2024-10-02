import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  const guestSession = req.cookies.get('guest-session');
  const url = req.nextUrl.clone();

  // If the user is authenticated, allow full access
  if (token) {
    return NextResponse.next();
  }

  // Check for guest session
  if (guestSession) {
    // Allow access to the homepage for guest users
    if (url.pathname === '/home') {
      return NextResponse.next();
    }

    // If the guest user tries to access restricted pages, redirect to sign-in
    if (['/projects', '/settings', '/pricing'].includes(url.pathname)) {
      const response = NextResponse.redirect(new URL('/signin', req.url));
      response.cookies.delete('guest-session');
      return response;
    }

    return NextResponse.next();
  }

  // **NEW: Redirect to sign-in if not authenticated and trying to access /home**
  if (url.pathname === '/home') {
    url.pathname = '/signin'; // Redirect to the sign-in page
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Allow access to other routes
}

// Protect specific routes
export const config = {
  matcher: ['/home', '/projects', '/settings', '/pricing'], // Routes to protect
};
