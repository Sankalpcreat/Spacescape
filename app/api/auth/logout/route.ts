import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect("http://localhost:3000/signin");
  
  // Clear the session-token cookie
  response.cookies.set("session-token", "", { path: "/", maxAge: 0 });

  return response;
}
