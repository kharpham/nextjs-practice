import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    // Validate
    // If invalid, return 400
    const validation = schema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.errors, {status: 400});
    // Else 
    const emailExist = await prisma.user.findUnique({
        where: {
            email: validation.data.email
        }
    })
    if (emailExist) return NextResponse.json({error: "Email already taken"}, {status: 400});
    const user = await prisma.user.create({
        data: {
            name: validation.data.name,
            email: validation.data.email,
        }
    })
    return NextResponse.json(user, {status: 201});
}