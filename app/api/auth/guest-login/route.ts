import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { setCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests per IP
  duration: 60 * 60 * 24, // Per 24 hours
});

export async function POST(req: Request) {
  try {
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    // Enforce rate limiting
    await rateLimiter.consume(clientIP);

    const db = await connectToDatabase();
    const usersCollection = db.collection('guestUsers');

    // Check if the guest already has an active session
    const guestUser = await usersCollection.findOne({ ip: clientIP });
    if (guestUser) {
      return NextResponse.json({ message: 'Guest session already exists for this IP.' }, { status: 403 });
    }

    // Create a new guest session
   // Create a new guest session
const guestSession = {
  sessionId: uuidv4(),
  ip: clientIP,
  credits: 1, // Ensure this value is set
  createdAt: new Date(),
};

await usersCollection.insertOne(guestSession);


    // Create the response and set the cookie for the guest session
    const response = NextResponse.json({ message: 'Guest login successful', credits: 1 });
    response.cookies.set('guest-session', guestSession.sessionId, {
      maxAge: 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Error during guest login:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
