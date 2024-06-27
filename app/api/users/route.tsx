import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export function GET(request: NextRequest) {
    return NextResponse.json([
        {id: 1, name: 'Kha'},
        {id: 2, name: 'Linh'},
    ]);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    // Validate
    // If invalid, return 400
    const validation = schema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.errors, {status: 400});
    // Else 
    return NextResponse.json({id: 1, name: body.name}, {status: 201});
}