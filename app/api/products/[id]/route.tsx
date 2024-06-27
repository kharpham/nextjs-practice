
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

export function GET(request: NextRequest, {params}: {params: {id: number}}) {
    if (params.id > 10) return NextResponse.json({error: "product not found"}, {status: 404});
    return NextResponse.json({id: params.id, name: "washing machine", price: 1000});
}

export async function PUT(request: NextRequest, {params}: {params: {id: number}}) {
    const body = await request.json();
    const result = schema.safeParse(body);
    if (!result.success) return NextResponse.json(result.error.errors, {status: 400});
    if (params.id > 10) return NextResponse.json({error: "product not found"}, {status: 404});
    return NextResponse.json(body);
}

export async function DELETE(request: NextRequest, {params}: {params: {id: number}}) {
    if (params.id > 10) return NextResponse.json({error: "product not found"}, {status: 404});
    return NextResponse.json({});
}