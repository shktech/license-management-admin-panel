import { v4 as uuidv4 } from "uuid";
import { mockProducts } from "./mockData";

const products = mockProducts;

export async function GET(req: any, res: any) {
  const url = new URL(req.url || '', 'http://localhost:3000'); // Use the full URL
  const limit = parseInt(url.searchParams.get('limit') as string);
  const page = parseInt(url.searchParams.get('page') as string);
  const offset = parseInt(url.searchParams.get('offset') as string);
  const s = url.searchParams.get('s');
  let searchKey = '';

  if (s) {
    try {
      const parsed = JSON.parse(s);
      if (parsed.$and && parsed.$and[0] && parsed.$and[0].searchKey) {
        searchKey = parsed.$and[0].searchKey.$contL || '';
      }
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  }

  let testProducts = products;
  if (searchKey != '') {
    console.log(searchKey);
    testProducts = testProducts.filter(product => {
      return Object.values(product).some(value =>
        String(value).toLowerCase().includes(searchKey.toLowerCase())
      )
    })
  }

  const responseProducts = testProducts.slice(offset, offset + limit);

  return new Response(JSON.stringify({
    total: testProducts.length,
    data: responseProducts
  }));
}

export async function POST(req: any, res: any) {
  const newProduct = await req.json();
  console.log(newProduct);
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