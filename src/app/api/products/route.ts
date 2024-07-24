import { v4 as uuidv4 } from "uuid";
import { mockProducts } from "./mockData";

const products = mockProducts;

export async function GET(req: any, res: any) {
  return new Response(JSON.stringify(products));
}

export async function POST(req: any, res: any) {
  const newProduct = req.body;
  const randomId = uuidv4();
  const newProductWithId = { ...newProduct, id: randomId };
  products.push(newProductWithId);
  return new Response(JSON.stringify(newProductWithId));
}
