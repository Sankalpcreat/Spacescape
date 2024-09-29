import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '../../lib/mongodb';

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const image = req.image;
    const theme = req.theme;
    const room = req.room;

    // Pass the request to getServerSession to properly retrieve session info
    const session = await getServerSession({ req: request, authOptions });

    // If there's no valid session, return unauthorized error
    if (!session) {
      console.error("Session not found or unauthorized.");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    // Find user by email from the session
    const user = await usersCollection.findOne({ email: session.user?.email });
    if (!user) {
      console.error(`User not found for email: ${session.user?.email}`);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the user has enough credits
    if (user.credits <= 0) {
      console.warn(`User ${user.email} has insufficient credits.`);
      return NextResponse.json({ message: "Insufficient credits" }, { status: 403 });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN as string,
    });

    // Model and input preparation for Replicate
    const model = 'jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b';
    const input = {
      image,
      prompt: `A ${theme} ${room} Editorial Style Photo, Symmetry, Straight On, Modern Living Room, Large Window, Leather, Glass, Metal, Wood Paneling, Neutral Palette, Ikea, Natural Light, Apartment, Afternoon, Serene, Contemporary, 4k`,
      a_prompt: `best quality, extremely detailed, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning`,
    };

    // Execute Replicate API call
    const output = await replicate.run(model, { input });

    if (!output) {
      console.error("Replicate API failed to generate output.");
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }

    // Deduct one credit after successful image generation
    user.credits -= 1;
    await usersCollection.updateOne({ _id: user._id }, { $set: { credits: user.credits } });

    return NextResponse.json({ output, credits: user.credits }, { status: 201 });

  } catch (error) {
    console.error('Error in replicate API or processing:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
