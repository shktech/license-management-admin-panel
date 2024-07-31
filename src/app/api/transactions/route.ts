import { v4 as uuidv4 } from "uuid";
import { mockTransactions } from "./mockData";
import { mockAssets } from "../assets/mockData";
import { mockProducts } from "../products/mockData";

const transactions = mockTransactions;
const assets = mockAssets;
const products = mockProducts;

export async function GET(req: any, res: any) {
  return new Response(JSON.stringify(transactions));
}

export async function POST(req: any, res:any) {
  const transactionData = await req.json();
  console.log(transactionData);
  // Find the product based on the part number provided
  const product = products.find(p => p.osc_part_number === transactionData.osc_product.osc_part_number);

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  const randomLicenseKey = uuidv4();
  const assetId = uuidv4();

  const newAsset = {
    id: assetId,
    active_seats: transactionData.quantity,
    created_by: 1, // Assume the user creating this is user 1
    creation_date: new Date().toISOString().split('T')[0],
    active: true,
    end_date: transactionData.end_date,
    expired_seats: 0,
    license_key: randomLicenseKey,
    license_server_seat_count: transactionData.quantity,
    organization: "PAI", // Assume the organization is PAI
    osc_seat_count: transactionData.quantity,
    renewal_seats: 0,
    revoked_seats: 0,
    start_date: transactionData.start_date,
    suspended_seats: 0,
    terminated_seats: 0,
    last_transaction: {
      id: uuidv4(),
      transaction_number: transactions.length + 1,
      transaction_date: transactionData.source_reference_date,
      transaction_type: transactionData.transaction_type,
      duration: product.duration,
      start_date: transactionData.start_date,
      end_date: transactionData.end_date,
      status: "Draft"
    },
    osc_product: product,
    seats: [
      {
        seat_number: "1",
        osc_license_status: "Active",
        osc_start_date: transactionData.start_date,
        osc_end_date: transactionData.end_date,
        license_server_status: "Active",
        license_server_start_date: transactionData.start_date,
        license_server_end_date: transactionData.end_date,
      }
    ]
  };

  assets.push(newAsset as any);

  const newTransaction = {
    id: uuidv4(),
    organization: "PAI", // Assume the organization is PAI
    transaction_number: transactions.length + 1,
    transaction_date: transactionData.source_reference_date,
    transaction_source: transactionData.transaction_source,
    transaction_type: transactionData.transaction_type,
    transaction_action: transactionData.transaction_action,
    source_reference_id: transactionData.source_reference_id,
    source_reference_number: transactionData.source_reference_number,
    source_reference_date: transactionData.source_reference_date,
    reference: transactions.length + 1,
    bill_customer_id: 1, // Assume the customer is user 1
    bill_customer_account: "ACCT1", // Placeholder account
    bill_customer_name: transactionData.bill_customer_name,
    bill_address1: transactionData.bill_address1,
    bill_address2: transactionData.bill_address2,
    bill_city: transactionData.bill_city,
    bill_state: transactionData.bill_state,
    bill_postal_code: transactionData.bill_postal_code,
    bill_country: transactionData.bill_country,
    bill_address_id: 1, // Placeholder address ID
    bill_contact_first_name: "John", // Placeholder contact name
    bill_contact_last_name: "Doe", // Placeholder contact name
    bill_contact_phone: "1234567890", // Placeholder contact phone
    bill_contact_email: "john.doe@example.com", // Placeholder contact email
    bill_contact_id: 1, // Placeholder contact ID
    ship_customer_id: 2, // Assume the shipping customer is user 2
    ship_customer_account: transactionData.ship_customer_account,
    ship_customer_name: transactionData.ship_customer_name,
    ship_address1: transactionData.ship_address1,
    ship_address2: transactionData.ship_address2,
    ship_city: transactionData.ship_city,
    ship_state: transactionData.ship_state,
    ship_postal_code: transactionData.ship_postal_code,
    ship_country: transactionData.ship_country,
    ship_address_id: 2, // Placeholder address ID
    ship_contact_first_name: transactionData.ship_contact_first_name,
    ship_contact_last_name: transactionData.ship_contact_last_name,
    ship_contact_phone: transactionData.ship_contact_phone,
    ship_contact_email: transactionData.ship_contact_email,
    ship_contact_id: 2, // Placeholder contact ID
    notification_date: new Date().toISOString().split('T')[0],
    quantity: transactionData.quantity,
    start_date: transactionData.start_date,
    end_date: transactionData.end_date,
    reference_code: transactionData.reference_code,
    transaction_status: "Pending",
    error_message: "",
    created_at: new Date().toISOString().split('T')[0],
    created_by: 1, // Assume the user creating this is user 1
    updated_at: new Date().toISOString().split('T')[0],
    updated_by: 1, // Assume the user updating this is user 1
    asset: newAsset,
    osc_product: product
  };

  transactions.push(newTransaction as any);

  return Response.json(newTransaction);
}
