import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '../../lib/mongodb';

export async function GET(req: Request) {
  try {
    // Get session using NextAuth
    const session = await getServerSession(authOptions);

    // Log the session data to debug
    console.log("Session Data:", session);

    // If no session or no email, return unauthorized
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized. Please log in." }, { status: 401 });
    }

    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Log the email being used for fetching credits
    console.log("Fetching credits for email:", session.user.email);

    // Find user by email
    const user = await usersCollection.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Return the user's credits
    return NextResponse.json({ credits: user.credits });
  } catch (error) {
    console.error("Error fetching user credits:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
