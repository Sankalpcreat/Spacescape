import { NextResponse } from "next/server";

// Set session token
export function setSessionToken(response: NextResponse, token: string) {
  response.cookies.set("session-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    path: "/",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week expiry
  });
}

// Get session token from request
export function getSessionToken(req: Request): string | null {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;

  const cookies = new Map(
    cookieHeader.split(";").map((cookie) => cookie.trim().split("="))
  );

  return cookies.get("session-token") || null;
}

// Clear session token
export function clearSessionToken(response: NextResponse) {
  response.cookies.set("session-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    path: "/",
    sameSite: "strict",
    maxAge: 0, // Expire the token immediately
  });
}
