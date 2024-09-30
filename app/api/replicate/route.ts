import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '../../lib/mongodb';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const { image, theme, room } = req;

    // Get authenticated session
    const session = await getServerSession({ req: request, ...authOptions });

    const db = await connectToDatabase();
    const usersCollection = db.collection("users");
    const guestUsersCollection = db.collection("guestUsers");

    let user, credits;
    
    // Check for guest session
    const guestSession = request.headers.get('cookie')?.match(/guest-session=([^;]+)/)?.[1];

    if (guestSession) {
      // Handle guest session
      const guestUser = await guestUsersCollection.findOne({ sessionId: guestSession });

      if (!guestUser) {
        return NextResponse.json({ message: 'Guest session not found' }, { status: 404 });
      }

      credits = guestUser.credits;

      // If the guest user has no credits, return an error
      if (credits <= 0) {
        return NextResponse.json({ message: 'Insufficient credits' }, { status: 403 });
      }

      // Deduct one credit for guest users
      await guestUsersCollection.updateOne({ sessionId: guestSession }, { $set: { credits: credits - 1 } });
    } else if (session && session.user?.email) {
      // Handle authenticated user session
      user = await usersCollection.findOne({ email: session.user.email });

      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }

      credits = user.credits;

      // If the authenticated user has no credits, return an error
      if (credits <= 0) {
        return NextResponse.json({ message: 'Insufficient credits' }, { status: 403 });
      }

      // Deduct one credit for authenticated users
      await usersCollection.updateOne({ email: session.user.email }, { $set: { credits: credits - 1 } });
    } else {
      // If no session is found, return unauthorized
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Call the Replicate API to generate an image
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN as string,
    });

    const model = 'jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b';
    const input = {
      image,
      prompt: `A ${theme} ${room} Editorial Style Photo, Symmetry, Straight On, Modern Living Room, Large Window, Leather, Glass, Metal, Wood Paneling, Neutral Palette, Ikea, Natural Light, Apartment, Afternoon, Serene, Contemporary, 4k`,
      a_prompt: `best quality, extremely detailed, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning`,
    };

    const output = await replicate.run(model, { input });

    if (!output) {
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }

    // Return the generated image and remaining credits
    return NextResponse.json({ output, credits: credits - 1 }, { status: 201 });
  } catch (error) {
    console.error('Error during the image generation process:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
