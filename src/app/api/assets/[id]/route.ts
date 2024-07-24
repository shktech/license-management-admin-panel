import { NextRequest, NextResponse } from "next/server";
import { mockAssets } from "../mockData";

const assets = mockAssets;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const asset = assets.find((asset) => asset.id === params.id);
  return NextResponse.json(asset);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const updatedAsset = req.body as any;
  const index = assets.findIndex((asset) => asset.id === params.id);
  assets[index] = updatedAsset;
  return NextResponse.json(updatedAsset);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const index = assets.findIndex((asset) => asset.id === params.id);
  assets.splice(index, 1);
  return NextResponse.json({ id: +params.id });
}
