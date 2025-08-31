import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Build providers list conditionally so Google is optional
type AuthProvider = ReturnType<typeof CredentialsProvider> | ReturnType<typeof GoogleProvider>;
const providers: AuthProvider[] = [];

providers.push(
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }

      const email = credentials.email as string;
      const password = credentials.password as string;

      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      if (!user || !user.password) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    }
  })
);

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.unshift(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: false,
    })
  );
}

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user && token.id) {
        const sessionUser = session.user as typeof session.user & { id: string };
        sessionUser.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      // If user attempts Google sign-in with an email that already exists with credentials,
      // reject with a clear NextAuth error code so UI can explain.
      if (account?.provider === 'google') {
        const existing = await prisma.user.findUnique({ where: { email: user.email as string } });
        if (existing && !existing.emailVerified && existing.password) {
          // Keep default behavior; NextAuth will surface OAuthAccountNotLinked
          return true;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after successful authentication
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },
});

export { handler as GET, handler as POST };