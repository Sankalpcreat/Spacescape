import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "../../../lib/mongodb";
import { v4 as uuidv4 } from "uuid"; // UUID for generating session tokens

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const db = await connectToDatabase();

    // Check if db is null before accessing collection
    if (!db) {
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }

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

    // Generate a session token
    const sessionToken = uuidv4();

    // Optionally, you can save the session token in the database associated with the user.
    // usersCollection.updateOne({ email }, { $set: { sessionToken } });

    // Set the session token as a cookie
    const response = NextResponse.json({
      message: "Sign in successful",
      user: { id: user._id, email: user.email },
    });

    response.cookies.set("session-token", sessionToken, {
      httpOnly: true, // Accessible only by the server
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      path: "/", // Accessible site-wide
      sameSite: "strict", // CSRF protection
      maxAge: 60 * 60 * 24 * 7, // 1 week expiry
    });

    return response;
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
