import { NextRequest, NextResponse } from "next/server";
import { mockProducts } from "../mockData";

const products = mockProducts;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = products.find((product) => product.id === params.id);
  return NextResponse.json(product);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const updatedProduct = await req.json();
  const index = products.findIndex((product) => product.id === params.id);
  products[index] = updatedProduct;
  return NextResponse.json(products[index]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const index = products.findIndex((product) => product.id === params.id);
  products.splice(index, 1);
  return NextResponse.json({ id: +params.id });
}
