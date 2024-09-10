"use client";
import React, { useMemo } from "react";
import { useNavigation, useTable, useDelete } from "@refinedev/core";
import { Reference } from "@/types/types";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef, MRT_SortingState } from "material-react-table";
import Loader from "@components/common/Loader";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { tagStyle } from "@data/MuiStyles";
import ReferenceDetailDrawer from "@components/References/ReferenceDetailDrawer";
import ConfirmModal from "@components/common/ConfirmModal";
import { convertSortingStateToCrudSort } from "@utils/utilFunctions";
import StateComponent from "@components/common/StateComponent";
import FindInPageRoundedIcon from "@mui/icons-material/FindInPageRounded";

const Page = () => {
  const {
    tableQueryResult: { data, isLoading, refetch },
  } = useTable<Reference>({
    hasPagination: false,
  });

  const { push } = useNavigation();

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const [clickedReference, setClickedReference] =
    React.useState<Reference | null>(null);

  const handleCreate = () => {
    // setOpenDrawer(true);
    push("/dashboard/references/create");
  };

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleEditClick = (row: Reference) => {
    setClickedReference(row);
    setOpenDrawer(true);
  };

  const handleClose = () => {
    refetch();
    setClickedReference(null);
    setOpenDrawer(false);
  };

  const handleRowClick = (row: Reference) => {
    push(`/dashboard/references/show?id=${row.reference_id}`);
  };
  const columns = useMemo<MRT_ColumnDef<Reference>[]>(
    () => [
      {
        accessorKey: "reference_name",
        header: "Name",
        size: 200,
      },
      {
        accessorKey: "reference_type",
        header: "Type",
        size: 200,
      },
      {
        accessorKey: "reference_description",
        header: "Description",
      },
      {
        accessorKey: "active",
        header: "Active",
        Cell: ({ renderedCellValue }) => (
          <StateComponent active={renderedCellValue as boolean} />
        ),
      },
    ],
    []
  );

  return (
    <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <GenericTable
          title={
            <div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
              <FindInPageRoundedIcon />
              References
            </div>
          }
          data={data?.data}
          columns={columns}
          canCreate={true}
          totalCount={data?.total}
          onRowClick={handleRowClick}
          handleCreate={handleCreate}
          noSearchNeed={true}
          noSortNeed={true}
        />
      )}
    </div>
  );
};

export default Page;
