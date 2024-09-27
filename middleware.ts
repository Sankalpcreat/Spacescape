// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Log that middleware is running
  console.log("Middleware is running");

  // Get the session token from cookies
  const sessionToken = req.cookies.get("session-token");

  // Log the session token value (if exists)
  console.log("Session Token:", sessionToken);

  // If no session token is found, redirect to the landing page
  if (!sessionToken) {
    console.log("No session token found, redirecting to landing page");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Proceed to the requested page
  console.log("Session token found, allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/projects", "/settings","/pricing"], // Routes to protect
};
