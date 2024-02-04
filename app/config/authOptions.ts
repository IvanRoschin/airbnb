import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import User from "../models/user";
// import { connectToDB } from "../libs/mongodb";

import prisma from "../libs/prismadb";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          throw new Error("User not found");
        }
        if (!user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }
        return user;
      }, // async authorize(credentials) {
      //   await connectToDB();

      //   if (!credentials?.email || !credentials?.password) {
      //     throw new Error("Email or password not provided");
      //   }

      //   const user = await User.findOne({
      //     email: credentials.email,
      //   });

      //   if (!user || credentials.password) {
      //     throw new Error("User or password not found");
      //   }

      //   const isCorrectPassword = await bcrypt.compare(
      //     credentials.password,
      //     user.password
      //   );

      //   if (!isCorrectPassword) {
      //     throw new Error("Incorrect password");
      //   }

      //   return user;
      // },
    }),
  ],
  
  pages: { signIn: "/" },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
