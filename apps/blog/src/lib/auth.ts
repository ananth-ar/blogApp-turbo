import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "database";
import { NextAuthOptions } from "next-auth";
import { generateUsernameFromEmail } from "./utiles/helper";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (!existingUser) {
          let username = generateUsernameFromEmail(user.email);
          try {
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                image: user.image,
                username: username,
              },
            });

            await prisma.account.create({
              data: {
                userId: newUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              },
            });
            return true;
          } catch (error) {
            console.error("Error creating new user:", error);
            return false;
          }
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      console.log("inside jwt creation...");
      if (user) {
        token.username = user.username;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.username = token.username as string | null;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};
