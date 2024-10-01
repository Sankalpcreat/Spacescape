import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../lib/mongodb';
import { Session } from 'next-auth';

// Define a custom user type that extends the default session
interface CustomSession extends Session {
  user: {
    id: string;
    credits: number;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

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

        if (!credentials?.password || !user.password) {
          throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],

  session: {
    strategy: 'jwt', // Use JWT for session management
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      if (account && profile) {
        token.id = profile.sub;
        token.email = profile.email;
        token.name = profile.name;
        token.picture = (profile as { picture?: string }).picture;
      }
      return token;
    },

    async session({ session, token }) {
      const db = await connectToDatabase();
      const usersCollection = db.collection('users');

      let user = await usersCollection.findOne({ email: token.email });

      if (!user) {
        const newUser = {
          email: token.email,
          name: token.name,
          image: token.picture,
          credits: 3,  // Default credits for new users
        };
        const result = await usersCollection.insertOne(newUser);
        user = await usersCollection.findOne({ _id: result.insertedId });
      }
      if (!user) {
        throw new Error('User not found');
      }
      (session as CustomSession).user = {
        id: user._id.toString(),
        credits: user.credits,
        name: user.name,
        email: user.email,
        image: user.image,
      };
  
      return session; 
    },
  },

  pages: {
    signIn: '/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
