import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../lib/mongodb';

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  const db = await connectToDatabase();
  const usersCollection = db.collection('users');

  // Check if the user already exists
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user with 3 initial credits
  await usersCollection.insertOne({
    username,
    email,
    password: hashedPassword,
    credits: 5, // Default credits for new users
  });

  return NextResponse.json({ message: 'Signup successful' }, { status: 201 });
}
