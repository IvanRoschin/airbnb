import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
// import prisma from "../../libs/prismadb";
// import { NextResponse } from "next/server";
// import User from "@/app/models/user";
// import { connectToDB } from "@/app/libs/mongodb";

// export async function POST(request: Request) {
//   await connectToDB();
//   const body = await request.json();
//   const { email, name, password } = body;
//   if (!email) {
//     throw new Error("Email not provided");
//   } else if (!name) {
//     throw new Error("Name not provided");
//   } else if (!password) {
//     throw new Error("Password not provided");
//   }
//   const userEmail = await User.findOne({ email });
//   if (userEmail) {
//     throw new Error(`${email} in use`);
//   }

//   const user = await User.create({
//     email,
//     name,
//     password,
//   });

//   return NextResponse.json(user);
// }
