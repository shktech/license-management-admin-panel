import { NextRequest, NextResponse } from "next/server";
import { mockTransactions } from "../mockData";
import { mockAssets } from "../../assets/mockData";
import { v4 as uuidv4 } from "uuid";

const transactions = mockTransactions;
const assets = mockAssets;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("GET HERE");
  const transaction = transactions.find(
    (transaction) => transaction.id === params.id
  );
  return NextResponse.json(transaction);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const updatedTransaction = await req.json();
  const transactionIndex = transactions.findIndex(
    (transaction) => transaction.id === params.id
  );

  const assetIndex = assets.findIndex(
    (asset) => asset.last_transaction?.id === updatedTransaction.id
  );

  if (assetIndex !== -1) {
    const randomLicenseKey = generateRandomLicenseKey();

    const updatedAsset = {
      ...assets[assetIndex],
      active_seats: updatedTransaction.quantity,
      end_date: updatedTransaction.end_date,
      license_key: randomLicenseKey,
      license_server_seat_count: updatedTransaction.quantity,
      osc_seat_count: updatedTransaction.quantity,
      last_transaction: {
        id: updatedTransaction.id,
        transaction_number: updatedTransaction.transaction_number,
        transaction_date: updatedTransaction.transaction_date,
        transaction_type: updatedTransaction.transaction_type,
        duration: updatedTransaction.duration,
        start_date: updatedTransaction.start_date,
        end_date: updatedTransaction.end_date,
        status: updatedTransaction.transaction_status
      },
      seats: [
        {
          seat_number: "1",
          osc_license_status: "Active",
          osc_start_date: updatedTransaction.start_date,
          osc_end_date: updatedTransaction.end_date,
          license_server_status: "Active",
          license_server_start_date: updatedTransaction.start_date,
          license_server_end_date: updatedTransaction.end_date,
        },
        {
          seat_number: "2",
          osc_license_status: "Active",
          osc_start_date: updatedTransaction.start_date,
          osc_end_date: updatedTransaction.end_date,
          license_server_status: "Active",
          license_server_start_date: updatedTransaction.start_date,
          license_server_end_date: updatedTransaction.end_date,
        }
      ]
    };

    assets[assetIndex] = updatedAsset;
    transactions[transactionIndex] = { ...transactions[transactionIndex], ...updatedTransaction, transaction_status: "Completed", asset: { ...updatedAsset } };
  }

  return NextResponse.json(transactions[transactionIndex]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const index = transactions.findIndex(
    (transaction) => transaction.id === params.id
  );
  transactions.splice(index, 1);
  return NextResponse.json({ id: +params.id });
}

function generateRandomLicenseKey() {
  return 'LIC-' + uuidv4().toUpperCase();
}