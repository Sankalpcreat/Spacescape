import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "../../../lib/mongodb";
import { setSessionToken } from "../../../lib/session"; // Correct import
import { v4 as uuidv4 } from "uuid"; // UUID for generating session tokens

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const db = await connectToDatabase();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 400 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ message: "Invalid password." }, { status: 401 });
  }

  const sessionToken = uuidv4();
  await usersCollection.updateOne({ email }, { $set: { sessionToken } });

  const response = NextResponse.json({ message: "Sign in successful." });
  setSessionToken(response, sessionToken);

  return response;
}
