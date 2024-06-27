import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export function GET(request: NextRequest) {
    return NextResponse.json([
        {id: 1, name: "Milk", price: 2.5},
        {id: 2, name: "Bread", price: 3.5},
    ]);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const result = schema.safeParse(body);
    if (!result.success) return NextResponse.json(result.error.errors,  {status: 400});
    return NextResponse.json(body);
}