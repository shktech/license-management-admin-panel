"use client";

import { Reference, ReferenceCode } from "@/types/types";
import ReferenceCodeDetailDrawer from "@components/References/ReferenceCodeDetailDrawer";
import ReferenceDetailDrawer from "@components/References/ReferenceDetailDrawer";
import GenericTable from "@components/Table/GenericTable";
import { useDelete, useNavigation, useParsed, usePermissions, useShow, useTable } from "@refinedev/core";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo, useState } from "react";

const Page = () => {

  const { params } = useParsed();

  const { queryResult } = useShow<Reference>({
    resource: "references",
    id: params?.id,
  });
  const { data, isLoading } = queryResult;

  const {
    tableQueryResult: { data: codeData, isLoading: codeIsLoading, refetch },
    setCurrent,
    setFilters,
    setSorters,
  } = useTable<Reference>({
    resource: `references/${params?.id}/codes`,
  });
  const codes = codeData?.data as ReferenceCode[];
  const reference: Reference = data?.data as Reference;

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [clickedReferenceCode, setClickedReferenceCode] = useState<ReferenceCode | null>(null);

  const handleCreate = () => setOpenDrawer(true);

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);


  const handleEditClick = (row: ReferenceCode) => {
    setClickedReferenceCode(row);
    setOpenDrawer(true);
  };

  const handleClose = () => {
    refetch();
    setClickedReferenceCode(null);
    setOpenDrawer(false);
  }

  // const { mutate: deleteReferenceCode } = useDelete();

  // const handleDeleteBtn = (ReferenceCode: ReferenceCode) => {
  //   handleOpenDeleteModal();
  //   setClickedReferenceCode(ReferenceCode);
  // }

  // const handleDelete = () => {
  //   deleteReferenceCode(
  //     { resource: "ReferenceCodes", id: `${(clickedReferenceCode?.ReferenceCode_id)}` },
  //     {
  //       onError: (error) => { console.log(error); },
  //       onSuccess: () => { console.log("Success"); },
  //     }
  //   )
  //   handleCloseDeleteModal();
  // }

  const columns = useMemo<MRT_ColumnDef<ReferenceCode>[]>(
    () => [
      {
        accessorKey: "reference_code",
        header: "Code",
        size: 200,
      },
      {
        accessorKey: "product_part_number",
        header: "Product Part Number",
        size: 200,
      },
      {
        accessorKey: "product_part_id",
        header: "Product Part ID",
      },
      {
        accessorKey: "osc_product_id",
        header: "OSC Product ID",
      },
      {
        accessorKey: "transaction_line_id",
        header: "Transaction Line ID",
      },
      {
        accessorKey: "start_date",
        header: "Start Date",
      },
      {
        accessorKey: "end_date",
        header: "End Date",
      },
    ],
    []
  );
  return (
    <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto">
      <div className="px-12 py-4 !font-satoshi text-2xl font-semibold text-[#515f72] gap-2">
        <div className="flex items-center gap-2">
          <div className="">Detailed Reference</div>
          <span className={`mx-2 px-4 py-1 rounded-full text-xs text-white ${reference?.reference_type == "Unique" ? "bg-[#fac107]" : "bg-[#11ba82]"}`}>
            {reference?.reference_type}
          </span>
          <span className={`mx-2 px-4 py-1 rounded-full text-xs ${reference?.active ? "bg-[#11ba82] text-white" : "bg-[#c2c2c2] text-black"}`}>
            {reference?.active ? "Active" : "Deactive"}
          </span>
        </div>
        <div className="flex">
          <div className="text-base font-normal text-[#808080]">{reference?.reference_id}</div>
        </div>
      </div>
      <div className="px-12 grid grid-cols-3 gap-4">
        <div className="">
          <div className="text-base font-semibold">Reference Name</div>
          <div className="text-sm font-normal text-[#808080]">{reference?.reference_name}</div>
        </div>
        <div className="col-span-2">
          <div className="text-base font-semibold">Reference Description</div>
          <div className="text-sm font-normal text-[#808080]">{reference?.reference_description}</div>
        </div>
      </div>
      <div className="text-white">
        <GenericTable
          data={codes}
          columns={columns}
          totalCount={codes?.length}
          handleCreate={handleCreate}
          canCreate={true}
        />
      </div>
      <ReferenceCodeDetailDrawer
        open={openDrawer}
        reference_id={reference?.reference_id}
        onClose={() => handleClose()}
        referenceCode={clickedReferenceCode}
      />
    </div>
  );
};

export default Page;
