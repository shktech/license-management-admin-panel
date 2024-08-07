"use client";
import React, { useMemo } from "react";
import { useNavigation, usePermissions, useTable } from "@refinedev/core";
import { Asset, Permission } from "@/types/types";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef } from "material-react-table";
import AssetIcon from "@/assets/icons/asset.svg?icon";
import Loader from "@components/common/Loader";

const Page = () => {
  const {
    tableQueryResult: { data, isLoading },
  } = useTable<Asset>();
  const { show } = useNavigation();

  const { data: permissionsData } = usePermissions<Permission>({ params: { codename: "asset" } });

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
    <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <GenericTable
          title={
            <div className="!font-satoshi text-2xl font-semibold text-[#515f72] flex items-center gap-2">
              <AssetIcon />
              Assets
            </div>
          }
          data={data?.data}
          columns={columns}
          onRowClick={handleRowClick}
          canCreate={permissionsData?.create}
          canEdit={permissionsData?.update}
        />
      )}
    </div>
  );
};

export default Page;
