import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const result = schema.safeParse(body);
  if (!result.success)
    return NextResponse.json(result.error.errors, { status: 400 });
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  const updatedProduct = await prisma.product.update({
    data: {
      name: result.data.name,
      price: result.data.price,
    },
    where: {
      id: parseInt(params.id),
    },
  });
  return NextResponse.json(updatedProduct);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  await prisma.product.delete({
    where: {
      id: parseInt(params.id),
    },
  });
  return NextResponse.json({});
}
