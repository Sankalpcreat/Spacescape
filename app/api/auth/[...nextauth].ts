// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import connectToDatabase from "../../lib/mongodb";
import { User } from "../../models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();

        // Find the user in the database
        const user = await User.findOne({ email: credentials?.email });

        if (user && bcrypt.compareSync(credentials?.password, user.password)) {
          return {
            id: user._id,
            username: user.username,
            email: user.email,
            credits: user.credits || 3, // Ensure the user has credits
          };
        }

        // If the user is not found or password doesn't match, return null
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.credits = user.credits || 3; // Ensure user has credits
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.credits = token.credits;
      return session;
    },
  },
};

export default NextAuth(authOptions);
