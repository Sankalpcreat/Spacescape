import { NextResponse } from "next/server";
import Replicate from "replicate";
import { getSessionToken } from "../../lib/session";
import connectToDatabase from "../../lib/mongodb";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const image = req.image;
    const theme = req.theme;
    const room = req.room;

    const sessionToken = getSessionToken(request);
    if (!sessionToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    // Find user by session token
    const user = await usersCollection.findOne({ sessionToken });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.credits <= 0) {
      return NextResponse.json({ message: "Insufficient credits" }, { status: 403 });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN as string,
    });

    const model =
      'jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b';

    const input = {
      image,
      prompt: `A ${theme} ${room} Editorial Style Photo, Symmetry, Straight On, Modern Living Room, Large Window, Leather, Glass, Metal, Wood Paneling, Neutral Palette, Ikea, Natural Light, Apartment, Afternoon, Serene, Contemporary, 4k`,
      a_prompt: `best quality, extremely detailed, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning`,
    };

    const output = await replicate.run(model, { input });

    if (!output) {
      console.log('Something went wrong');
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }

    // Deduct one credit
    user.credits -= 1;
    await usersCollection.updateOne({ _id: user._id }, { $set: { credits: user.credits } });

    // Return output and remaining credits
    return NextResponse.json({ output, credits: user.credits }, { status: 201 });

  } catch (error) {
    console.log('Error in replicate API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
