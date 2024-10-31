import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../../utility/dbconnection';
import userModel from '../../../../models/user.model';
import { sendVerificationEmail } from '../../../../utility/emailverification';
import { NextResponse } from 'next/server';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await userModel.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('Invalid Credentials');
        }
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }
        return { id: user._id, name: user.name, email: user.email, role: user.role };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        const { email, name, image } = user;
        await dbConnect();
        let existingUser = await userModel.findOne({ email });
        const verifycode = Math.floor(100000 + Math.random() * 900000).toString();
        if (!existingUser) {
          existingUser = await userModel.create({ email, name, googleid: user.id, image, verifycode });
        }
        
        
        user.role = existingUser.role; // Ensure the user role is set
        return true;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id?.toString();
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role; // Ensure role is included in the session
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};
