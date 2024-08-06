"use client";
import React, { useMemo } from "react";
import { useNavigation, useTable } from "@refinedev/core";
import { Asset } from "@/types/types";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef } from "material-react-table";
import AssetIcon from "@/assets/icons/asset.svg?icon";
import Loader from "@components/common/Loader";

const Page = () => {
  const {
    tableQueryResult: { data, isLoading },
  } = useTable<Asset>();
  const { show } = useNavigation();

  const columns = useMemo<MRT_ColumnDef<Asset>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Asset ID",
      },
      {
        accessorKey: "license_key",
        header: "Asset Number (LicKey/Srl#)",
      },
      {
        accessorKey: "organization",
        header: "Organization",
      },
      {
        accessorKey: "osc_product.osc_part_number",
        header: "Product Part Number",
      },
      {
        accessorKey: "osc_product.product_type",
        header: "Asset Type",
      },
      {
        accessorKey: "osc_product.vendor_name",
        header: "Vender Name",
      },
      {
        accessorKey: "osc_product.product_name",
        header: "Vendor Part",
      },
    ],
    []
  );

  const handleRowClick = (row: Asset) => {
    show("assets", row.id);
  };

  return (
    <div className="flex flex-col gap-10">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="rounded-xl shadow-md bg-white px-5 pt-6 pb-2.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          {/* <div className="flex justify-between">
            <div className="text-xl font-semibold text-black flex items-center gap-2">
              <AssetIcon />
              Assets
            </div>
          </div> */}
          <div className="max-w-full overflow-x-auto">
            <GenericTable
              title={
                <div className="flex items-center justify-center gap-2">
                  <AssetIcon />
                  Assets
                </div>
              }
              data={data?.data}
              columns={columns}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
