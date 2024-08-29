"use client";

import { Lookup, LookupValue } from "@/types/types";
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

  const { queryResult } = useShow<Lookup>({
    resource: "lookups",
    id: params?.id,
  });
  const { data, isLoading } = queryResult;

  const {
    tableQueryResult: { data: codeData, isLoading: codeIsLoading, refetch },
    setCurrent,
    setFilters,
    setSorters,
  } = useTable<LookupValue>({
    resource: `lookups/${params?.id}/values`,
    hasPagination: false,
  });
  const lookup: Lookup = data?.data as Lookup;

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [clickedReferenceCode, setClickedReferenceCode] = useState<LookupValue | null>(null);

  const handleCreate = () => {
    // setOpenDrawer(true);
    push(`/dashboard/lookups/values/create?id=${params?.id}`);
  }

  const handleEditClick = (row: LookupValue) => {
    // setClickedReferenceCode(row);
    // setOpenDrawer(true);
    push(`/dashboard/lookups/values/edit?lookup_id=${params?.id}&value_id=${row.value}`);
  };

  const { push } = useNavigation();

  const getButtonProps = (editButtonProps: any, refreshButtonProps: any) => {
    return (
      <div className="flex gap-2 px-12">
        <EditButton {...editButtonProps} onClick={() => push(`/dashboard/lookups/edit?id=${params?.id}`)} sx={editRefineBtnStyle} />
        <RefreshButton {...refreshButtonProps} sx={refreshRefineBtnStyle} />
      </div>
    );
  };
  const columns = useMemo<MRT_ColumnDef<LookupValue>[]>(
    () => [
      {
        accessorKey: "value",
        header: "Value",
        size: 200,
      },
      {
        accessorKey: "meaning",
        header: "Meaning",
        size: 200,
      },
      {
        accessorKey: "attribute1",
        header: "Attribute 1",
      },
      {
        accessorKey: "attribute2",
        header: "Attribute 2",
      },
      {
        accessorKey: "attribute3",
        header: "Attribute 3",
      },
      {
        accessorKey: "active",
        header: "Active",
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
            <div className="">Detailed Lookup</div>
            <span className={`mx-2 px-4 py-1 rounded-full text-xs ${lookup?.active ? "bg-[#11ba82] text-white" : "bg-[#c2c2c2] text-black"}`}>
              {lookup?.active ? "Active" : "Deactive"}
            </span>
          </div>
          <div className="flex">
            <div className="text-base font-normal text-[#808080]">{lookup?.lookup_id}</div>
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
              <div className="text-base font-semibold">Lookup Name</div>
              <div className="text-sm font-normal text-[#808080]">{lookup?.lookup_name}</div>
            </div>
            <div className="col-span-2">
              <div className="text-base font-semibold">Lookup Description</div>
              <div className="text-sm font-normal text-[#808080]">{lookup?.description}</div>
            </div>
          </div>
          <div className="bg-white">
            <GenericTable
              title="Lookup Codes"
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
