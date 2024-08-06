import { v4 as uuidv4 } from "uuid";
import { mockProducts } from "./mockData";

const products = mockProducts;

export async function GET(req: any, res: any) {
  return new Response(JSON.stringify(products));
}

export async function POST(req: any, res: any) {
  const newProduct = await req.json();
  const randomId = uuidv4();
  const newProductWithId = {
    ...newProduct,
    id: randomId,
    organization: 1,
    osc_product_id: 1,
    product_name: "PaperStream Capture Pro Workgroup 2 Year Maintenance",
    vendor_name: "PFUJ",
    source_name: "VendorSource1",
    eval_set_name: "EvalSet1",
    renewal_set_name: "RenewalSet1",
    new_set_name: "NewSet1",
    active: true,
  };
  console.log(newProductWithId);
  products.push(newProductWithId);
  return new Response(JSON.stringify(newProductWithId));
}