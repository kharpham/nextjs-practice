import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  if (params.id > 10)
    return NextResponse.json("User not found", { status: 404 });
  return NextResponse.json({ id: params.id, name: "Kha" });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // Validate the request body
  const body = await request.json();
  // If invalid, return 400
  const validation = schema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error.errors, {status: 400});
  // Fetch the user with the given id
  // If the user doesn't exist, return 404
  if (params.id > 10) return NextResponse.json({error: "User not found"}, {status: 404});
  // Update the user  
  // Return the updated user
  return NextResponse.json({id: params.id, name: body.name});
}

export function DELETE(
  request: NextRequest,
  {params}: {params: {id: number}}
) {
  // Fetch user from db
  // If user doesn't exist, return 404
  if (params.id > 10) return NextResponse.json({error: "user not found"}, {status: 404});
  // Delete user
  // Return 200
  return NextResponse.json({});
}
