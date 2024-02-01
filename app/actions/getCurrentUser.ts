import { getServerSession } from "next-auth/next";

import { authOptions } from "../config/authOptions";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt,
      updatedAt: currentUser.updatedAt,
      emailVerified: currentUser.emailVerified || null,
    };
  } catch (error: any) {
    return null;
  }
}

// import { getServerSession } from "next-auth";
// import { authOptions } from "../config/authOptions";
// // import prisma from "../libs/prismadb";
// import { connectToDB } from "../libs/mongodb";
// import User from "../models/user";

// export async function getSession() {
//   await connectToDB();

//   await getServerSession(authOptions);
// }

// export async function getCurrentUser() {
//   await connectToDB();

//   try {
//     const session = await getServerSession();

//     if (!session?.user?.email) {
//       return null;
//     }
//     const currentUser = await User.findOne({
//       email: session.user.email as string,
//     });
//     if (!currentUser) {
//       return null;
//     }
//     // return currentUser;
//     return JSON.parse(JSON.stringify(currentUser));
//   } catch (error: any) {
//     return null;
//   }
// }
