import NextAuth, { type NextAuthOptions } from "next-auth";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "../../../server/db";
import Credentials from "next-auth/providers/credentials";
import { verify } from "argon2";
import { signInSchema } from "../../../utils/validation/auth";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
      }

      return session;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60,
  },
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (data, req) => {
        const credentials = await signInSchema.parseAsync(data);

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValidPassword = await verify(
          user.password,
          credentials.password
        );

        if (!isValidPassword) return null;

        return {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
};

export default NextAuth(authOptions);
