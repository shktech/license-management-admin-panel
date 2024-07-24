import { v4 as uuidv4 } from "uuid";
import { mockAssetsDetails } from "./mockData";
import { NextRequest } from "next/server";

const assetsDetails = mockAssetsDetails;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const assetId = params.id;
  const assetDetails = assetsDetails.filter(
    (detail) => detail.asset_id === assetId
  );
  return new Response(JSON.stringify(assetDetails));
}

export async function POST(req: any, res: any) {
  const newAssetDetail = req.body;
  const randomId = uuidv4();
  const assetDetailWithId = { ...newAssetDetail, id: randomId };
  assetsDetails.push(assetDetailWithId);
  return res.status(200).json(assetDetailWithId);
}
