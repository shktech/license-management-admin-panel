"use client";

import { Reference, ReferenceCode } from "@/types/types";
import Loader from "@components/common/Loader";
import ReferenceCodeDetailDrawer from "@components/References/ReferenceCodeDetailDrawer";
import ReferenceDetailDrawer from "@components/References/ReferenceDetailDrawer";
import GenericTable from "@components/Table/GenericTable";
import { editRefineBtnStyle, refreshRefineBtnStyle } from "@data/MuiStyles";
import { useDelete, useNavigation, useParsed, usePermissions, useShow, useTable } from "@refinedev/core";
import { EditButton, RefreshButton, Show } from "@refinedev/mui";
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
  } = useTable<ReferenceCode>({
    resource: `references/${params?.id}/codes`,
  });
  const reference: Reference = data?.data as Reference;

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [clickedReferenceCode, setClickedReferenceCode] = useState<ReferenceCode | null>(null);

  const handleCreate = () => {
    // setOpenDrawer(true);
    push(`/dashboard/references/codes/create?id=${params?.id}`);
  }

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleEditClick = (row: ReferenceCode) => {
    // setClickedReferenceCode(row);
    // setOpenDrawer(true);
    push(`/dashboard/references/codes/edit?reference_id=${params?.id}&code_id=${row.id}`);
  };

  const handleClose = () => {
    refetch();
    setClickedReferenceCode(null);
    setOpenDrawer(false);
  }

  const { push } = useNavigation();

  const getButtonProps = (editButtonProps: any, refreshButtonProps: any) => {
    return (
      <div className="flex gap-2 px-12">
        <EditButton {...editButtonProps} onClick={() => push(`/dashboard/references/edit?id=${params?.id}`)} sx={editRefineBtnStyle} />
        <RefreshButton {...refreshButtonProps} sx={refreshRefineBtnStyle} />
      </div>
    );
  };
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
        accessorKey: "osc_product.product_id",
        header: "OSC Product ID",
      },
      {
        accessorKey: "transaction_line_id",
        header: "Transaction Line ID",
      },
      {
        accessorKey: "start_date",
        header: "Start Date",
        Cell: ({ cell }) => {
          return <div>{new Date(cell.getValue() as string).toLocaleDateString()}</div>
        }
      },
      {
        accessorKey: "end_date",
        header: "End Date",
        Cell: ({ cell }) => {
          return <div>{new Date(cell.getValue() as string).toLocaleDateString()}</div>
        }
      },
    ],
    []
  );
  return (
    <Show
      goBack={null}
      isLoading={isLoading}
      breadcrumb={false}
      wrapperProps={{
        className: "rounded-none bg-[#f2f6fa] shadow-none p-0",
      }}
      contentProps={{
        className: "p-0",
      }}
      title={
        <div className="px-8 pt-4 !font-satoshi text-2xl font-semibold text-[#515f72] gap-2">
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
      }
      headerButtons={({ editButtonProps, refreshButtonProps }) =>
        getButtonProps(editButtonProps, refreshButtonProps)
      }
    >
      {isLoading ? <Loader /> :
        <div>
          <div className="px-12 grid grid-cols-3 gap-4 pb-8">
            <div className="">
              <div className="text-base font-semibold">Reference Name</div>
              <div className="text-sm font-normal text-[#808080]">{reference?.reference_name}</div>
            </div>
            <div className="col-span-2">
              <div className="text-base font-semibold">Reference Description</div>
              <div className="text-sm font-normal text-[#808080]">{reference?.reference_description}</div>
            </div>
          </div>
          <div className="bg-white">
            <GenericTable
              title="Reference Codes"
              columns={columns}
              handleCreate={handleCreate}
              data={codeData?.data}
              totalCount={codeData?.total}
              onRowClick={handleEditClick}
              canCreate={true}
            />
          </div>
        </div>
      }
    </Show>
  );
};

export default Page;
