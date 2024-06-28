import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = schema.safeParse(body);
  if (!result.success)
    return NextResponse.json(result.error.errors, { status: 400 });
  const product = await prisma.product.create({
    data: {
      name: result.data.name,
      price: result.data.price,
    },
  });
  return NextResponse.json(product);
}
