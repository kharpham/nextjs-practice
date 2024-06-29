import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(result.error.errors, { status: 400 });
  }
  const user = await prisma.user.findUnique({
    where: { email: result.data.email },
  });
  if (user)
    return NextResponse.json({ error: "Email already taken" }, { status: 400 });
  const hashedPassword = await bcrypt.hash(result.data.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: result.data.email,
      hashedPassword,
    },
  });
  return NextResponse.json({email: newUser.email}, { status: 201 });
}
