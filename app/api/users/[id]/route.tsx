import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id)
    }
  });
  if (!user) return NextResponse.json({error: "User not found"}, {status: 404});
  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Validate the request body
  const body = await request.json();
  // If invalid, return 400
  const validation = schema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error.errors, {status: 400});
  // Fetch the user with the given id
  // If the user doesn't exist, return 404
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    }
  });
  if (!user) return NextResponse.json({error: "user not found"}, {status: 404});
  const emailExist = await prisma.user.findUnique({
    where: {
      email: validation.data.email,
    }
  });
  if (emailExist && user.email !== validation.data.email) return NextResponse.json({error: "Email already taken"}, {status: 400});
  const updatedUser = await prisma.user.update({
    data: {
      name: validation.data.name,
      email: validation.data.email,
    },
    where: {
      id: parseInt(params.id),
    }
  })
  // Update the user  
  // Return the updated user
  return NextResponse.json(updatedUser);
}

export async function DELETE(
  request: NextRequest,
  {params}: {params: {id: string}}
) {
  // Fetch user from db
  // If user doesn't exist, return 404
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    }
  });
  if (!user) return NextResponse.json({"error": "User not found"}, {status: 404});
  // Delete user
  await prisma.user.delete({
    where: {
      id: parseInt(params.id)
    }
  })
  // Return 200
  return NextResponse.json({});
}
