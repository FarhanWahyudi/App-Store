import { signIn } from '@/lib/firebase/route';
import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn({ email });
        if (user) {
          const confirmPassword = await compare(password, user.password);
          if (confirmPassword) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === 'credentials') {
        token.name = user.fullname;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if ('name' in token) {
        session.user.fullname = token.name;
      }
      if ('email' in token) {
        session.user.email = token.email;
      }
      if ('role' in token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };