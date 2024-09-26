import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
 

  const sessionToken = req.cookies.get("session-token");
  
  // Log all cookies


  if (!sessionToken) {
  
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to landing page
  }

 

  return NextResponse.next(); // Proceed to the requested page
}

export const config = {
  matcher: ["/home", "/projects", "/settings"], // Routes to protect
};
