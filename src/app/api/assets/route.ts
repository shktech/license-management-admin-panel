import { v4 as uuidv4 } from "uuid";
import { mockAssets } from "./mockData";

const assets = mockAssets;

export async function GET(req: any, res: any) {
  return new Response(JSON.stringify(assets));
}

export async function POST(req: any, res: any) {
  const newAsset = req.body;
  const randomId = uuidv4();
  const newAssetWithID = { ...newAsset, id: randomId };
  assets.push(newAssetWithID);
  return new Response(JSON.stringify(newAssetWithID));
}
