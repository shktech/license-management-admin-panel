import { NextRequest, NextResponse } from "next/server";
import { mockAssetsDetails } from "../mockData";

const assetsDetails = mockAssetsDetails;

export async function GET(
  req: NextRequest,
  { params }: { params: { detailsid: string } }
) {
  const assetDetails = assetsDetails.find(
    (detail) => detail.id === params.detailsid
  );
  return NextResponse.json(assetDetails);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { detailid: string } }
) {
  const updatedAssetDetails = req.body as any;
  const index = assetsDetails.findIndex(
    (detail) => detail.id === params.detailid
  );
  assetsDetails[index] = updatedAssetDetails;
  return NextResponse.json(updatedAssetDetails);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { detailid: string } }
) {
  const index = assetsDetails.findIndex(
    (detail) => detail.id === params.detailid
  );
  assetsDetails.splice(index, 1);
  return NextResponse.json({ id: +params.detailid });
}
