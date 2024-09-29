import { NextResponse } from "next/server";
import { signOut } from "next-auth/react";

export async function GET() {
  const response = NextResponse.redirect("http://localhost:3000/signin");
  
  // Clear the custom session-token cookie (if you are using it for traditional sign-in)
 

  // Perform the NextAuth signOut to clear session
  await signOut({ callbackUrl: "http://localhost:3000/signin" });

  return response;
}
