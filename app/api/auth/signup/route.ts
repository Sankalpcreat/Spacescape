import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "../../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const db = await connectToDatabase();

    // Check if db is null before accessing collection
    if (!db) {
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }

    const usersCollection = db.collection("users");

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const newUser = await usersCollection.insertOne({
      username,
      email,
      password: hashedPassword,
      credits: 3, // Default credits for new users
    });

    // Respond with success
    return NextResponse.json({ message: "Signup successful", user: { id: newUser.insertedId, email } }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
