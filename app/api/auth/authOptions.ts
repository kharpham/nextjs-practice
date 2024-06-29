import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcrypt';
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "Email" },
          password: {
            label: "Password",
            type: "password",
            placeholder: "Password",
          },
        },
        async authorize(credentials, req) {
          if (!credentials?.email || !credentials.password) return null;
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (!user) return null;
          if (!user.hashedPassword) return null;
          const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);
          return passwordMatch ? user : null;
  
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    session: {
      strategy: "jwt",
    },
  };

// function GoogleProvider(arg0: { clientId: string; clientSecret: string; }): import("next-auth/providers/index").Provider {
//     throw new Error("Function not implemented.");
// }
