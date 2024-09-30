import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  // Fetch the NextAuth session token for authenticated users (Google sign-in)
  const token = await getToken({ req, secret });

  // Fetch the guest session cookie
  const guestSession = req.cookies.get('guest-session');

  const url = req.nextUrl.clone();

  // Check if a guest session exists
  if (guestSession) {
    console.log('Guest session active, allowing guest user access');

    // Allow access to the homepage for guest users
    if (url.pathname === '/home') {
      return NextResponse.next();
    }

    // If the guest user tries to access restricted pages, delete the guest session token
    if (['/projects', '/settings', '/pricing'].includes(url.pathname)) {
      console.log('Deleting guest session and redirecting to sign-in');
      
      // Create a response and remove the guest session cookie
      const response = NextResponse.redirect(new URL('/signin', req.url));
      response.cookies.delete('guest-session'); // Delete the guest session cookie

      return response;
    }

    // Allow access to other guest-allowed pages (you can add more here)
    return NextResponse.next();
  }

  // If the user is authenticated, allow full access
  if (token) {
    console.log('Authenticated user session active, allowing access');
    return NextResponse.next();
  }

  // If neither a token nor guest session exists, redirect to the sign-in page
  url.pathname = '/signin';
  return NextResponse.redirect(url);
}

// Protect specific routes
export const config = {
  matcher: ['/home', '/projects', '/settings', '/pricing'], // Routes to protect
};
