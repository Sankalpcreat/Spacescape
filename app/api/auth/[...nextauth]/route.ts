import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../lib/mongodb';

export const authOptions = {
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
    async jwt({ token, user, account, profile }) {
      console.log('JWT Callback - Token:', token);
      if (account && profile) {
        token.id = profile.sub; // Google user ID
        token.email = profile.email;
        token.name = profile.name || profile.email;
        token.picture = profile.picture;
        console.log('JWT Callback - Google Profile:', profile);
      }
      if (user) token.id = user.id; // Traditional login user ID
      return token;
    },

    async session({ session, token }) {
      console.log('Session Callback - Token:', token);
      const db = await connectToDatabase();
      const usersCollection = db.collection('users');
    
      // Check if the user exists in the database
      let user = await usersCollection.findOne({ email: token.email });
    
      // If the user doesn't exist, create a new user (Google sign-in)
      if (!user) {
        const newUser = {
          email: token.email,
          name: token.name|| token.email,
          image: token.picture,
          credits: 3,  // Default credits for new users
        };
        if (newUser.name) {
          newUser.username = newUser.name.replace(/\s/g, "").toLowerCase(); // Generate username if needed
        }
        const result = await usersCollection.insertOne(newUser);
        user = await usersCollection.findOne({ _id: result.insertedId });
      }
    
      // Set user information in the session
      session.user.id = user._id;
      session.user.credits = user.credits;
      session.user.name = user.name;
      session.user.email = user.email;
      session.user.image = user.image;
    
      console.log('Session Callback - Session:', session);
      return session;
    },
  },

  pages: {
    signIn: '/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
