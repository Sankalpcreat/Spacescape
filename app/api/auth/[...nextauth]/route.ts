import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../lib/mongodb';

export const authOptions = {
  providers: [
    // Google Authentication
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Traditional Email/Password Authentication
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(credentials?.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return { id: user._id, email: user.email };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      const db = await connectToDatabase();
      const usersCollection = db.collection('users');

      // Check if user exists in the database
      let user = await usersCollection.findOne({ email: session.user?.email });

      if (!user) {
        // If user doesn't exist, create a new entry for Google sign-in
        const newUser = {
          email: session.user?.email,
          name: session.user?.name,
          image: session.user?.image,
          credits: 3, // Default credits for new users
        };

        const result = await usersCollection.insertOne(newUser);
        user = result.ops[0]; // Get the inserted user
      }

      session.user.id = user._id;
      session.user.credits = user.credits; // Pass credits to the session
      return session;
    },
  },

  pages: {
    signIn: '/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
