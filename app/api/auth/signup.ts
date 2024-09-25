import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const client = await clientPromise;
  const usersCollection = client.db().collection("users");

  const existingUser = await usersCollection.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    username,
    email,
    password: hashedPassword,
    credits: 3, // Initial 3 credits
  };

  await usersCollection.insertOne(newUser);

  return res.status(201).json({ message: "User registered successfully" });
}
