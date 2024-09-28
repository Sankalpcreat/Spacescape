import { NextResponse } from "next/server";
import { getSessionToken } from "../../lib/session"; // Correct import path
import connectToDatabase from "../../lib/mongodb";

export async function GET(req: Request) {
  const sessionToken = getSessionToken(req);

  if (!sessionToken) {
    return NextResponse.json({ message: "Unauthorized. Please log in." }, { status: 401 });
  }

  const db = await connectToDatabase();
  const usersCollection = db.collection("users");

  // Fetch user by sessionToken
  const user = await usersCollection.findOne({ sessionToken });
  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  return NextResponse.json({ credits: user.credits });
}
