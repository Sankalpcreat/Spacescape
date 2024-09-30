import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '../../lib/mongodb';

export async function GET(req: Request) {
  try {
    // Connect to the database
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');
    const guestUsersCollection = db.collection('guestUsers');

    // Get session using NextAuth (for authenticated users)
    const session = await getServerSession(authOptions);

    // Fetch guest session cookie
    const guestSession = req.headers.get('cookie')?.match(/guest-session=([^;]+)/)?.[1];

    // Log the session data to debug
    console.log("Session Data:", session);
    console.log("Guest Session ID:", guestSession);

    // If guest session exists, fetch credits for guest users
    if (guestSession) {
      const guestUser = await guestUsersCollection.findOne({ sessionId: guestSession });
      if (!guestUser) {
        return NextResponse.json({ message: "Guest session not found." }, { status: 404 });
      }

      // Return guest user credits
      return NextResponse.json({ credits: guestUser.credits });
    }

    // If no session or no email for authenticated users, return unauthorized
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized. Please log in." }, { status: 401 });
    }

    // Log the email being used for fetching credits
    console.log("Fetching credits for email:", session.user.email);

    // Find authenticated user by email
    const user = await usersCollection.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Return the user's credits for authenticated users
    return NextResponse.json({ credits: user.credits });
  } catch (error) {
    console.error("Error fetching user credits:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
