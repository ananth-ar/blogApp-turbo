import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "database";
import { authOptions } from "../../../../lib/auth";


const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
