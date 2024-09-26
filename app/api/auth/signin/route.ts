import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "../../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    // Check if the user exists
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    // Set the session-token in a cookie on successful authentication
    const response = NextResponse.json({ message: "Sign in successful", user: { id: user._id, email: user.email } }, { status: 200 });
    response.cookies.set('session-token', 'YOUR_SESSION_TOKEN', { httpOnly: true, path: '/' });

    return response;
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
