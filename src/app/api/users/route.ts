import { v4 as uuidv4 } from "uuid";
import { mockProducts } from "./mockData";

const products = mockProducts;

export async function GET(req: any, res: any) {
  return new Response(JSON.stringify(products));
}