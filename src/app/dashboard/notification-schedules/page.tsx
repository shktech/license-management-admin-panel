"use client";
import React, { useMemo } from "react";
import { useTable , useDelete, useNavigation  } from "@refinedev/core";
import { Email_Schedule, Product } from "@/types/types";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef, MRT_SortingState } from "material-react-table";
import Loader from "@components/common/Loader";
import { Box } from "@mui/material";
import ProductDetailDrawer from "@components/Products/ProductDetailDrawer";
import { ScheduleActiveColor } from "@data/ColorData";
import { tagStyle } from "@data/MuiStyles";
import DeleteModal from "@components/Products/DeleteModal";
import { convertSortingStateToCrudSort } from "@utils/utilFunctions";

const Page = () => {
  const {
    tableQueryResult: { data, isLoading, refetch },
    setCurrent,
    setFilters,
    setSorters,
  } = useTable<Product>();

  const { push } = useNavigation();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  
  const [clickedProduct, setClickedProduct] = React.useState<Product | null>(null);

  const handleCreate = () => {
    // setOpenDrawer(true);
    push(`/dashboard/notification-schedules/create`)
  }

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);


  const handleEditClick = (row: Product) => {
    // setClickedProduct(row);
    // setOpenDrawer(true);
    push(`/dashboard/notification-schedules/edit?id=${row.id}`)
  };

  const handleRowClick = (row: Product) => {
    push(`/dashboard/notification-schedules/show?id=${row.id}`)
  }

  const handlePage = (value: number) => setCurrent(value);

  const handleSorting = (sorting: MRT_SortingState) => setSorters(convertSortingStateToCrudSort(sorting));

  const handleSearch = (value: string) => setFilters([{ field: 'searchKey', operator: 'contains', value: value }])

  const handleClose = () => {
    refetch();
    setClickedProduct(null);
    setOpenDrawer(false);
  }

  const { mutate: deleteProduct } = useDelete();

  const handleDeleteBtn = (product: Product) => {
    handleOpenDeleteModal();
    setClickedProduct(product);
  }
  const formatTime=(_date:any)=>{
    var date =  new Date(_date);
    return  date.getDate() + "-" +  (date.getMonth()+1) + "-" + date.getFullYear() + " " +date.getHours() + ":" +  date.getMinutes();
  } 
  const formatDate=(_date:any)=>{
    var date =  new Date(_date);
    return date.getDate() + "-" +  (date.getMonth()+1) + "-" + date.getFullYear();
  } 
  const handleDelete = () => {
    deleteProduct(
      { resource: "products", id: `${(clickedProduct?.product_id)}` },
      {
        onError: (error) => { console.log(error); },
        onSuccess: () => { console.log("Success"); },
      }
    )
    handleCloseDeleteModal();
  }

  const columns = useMemo<MRT_ColumnDef<Email_Schedule>[]>(
    () => [
      {
        accessorKey: "email",
        header: "Email",
        size: 200
      },
      {
        accessorKey: "subject",
        header: "Subject",
        size: 150,
      },
      {
        accessorKey: "scheduled_time",
        header: "Scheduled Time",
        size: 150,
        Cell: ({ renderedCellValue }) => (
       
          <>
          {formatTime(renderedCellValue)}
          </>
   
        )
      },
      {
        accessorKey: "recurring_task",
        header: "Recurring",
        size: 180,
      },
      {
        accessorKey: "created",
        header: "Creation Date",
        size: 220,
        Cell: ({ renderedCellValue }) => (
       
          <>
          {formatDate(renderedCellValue)}
          </>
   
        )
      },
      {
        accessorKey: "is_active",
        header: "Active",
        size: 100,
        Cell: ({ renderedCellValue }) => (
     
        
          <Box component="span" sx={{ backgroundColor: ScheduleActiveColor(renderedCellValue as boolean), ...tagStyle }} >
            {renderedCellValue ? "Active" : "Stopped"}
          </Box>
        
        ),
      },
      // {
      //   accessorKey: "actions",
      //   header: "Action",
      //   size: 100,
      //   enableSorting: false,
      //   pin: 'right',
      //   Cell: ({ row }) => (
      //     <div className="w-full h-full">
      //       <div className="flex gap-4">
      //         <EditOutlinedIcon onClick={() => handleEditClick(row.original)} fontSize="small" className="text-[#818f99] hover:text-black cursor-pointer" />
      //         <DeleteIcon onClick={() => handleDeleteBtn(row.original)} fontSize="small" className="text-[#818f99] hover:text-black cursor-pointer" />
      //       </div>
      //     </div>
      //   ),
      // },
    ],
    []
  );

  return (
    <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto">
      {
        isLoading ?
          <Loader /> :
          <GenericTable
            title={
              <div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
                Notification Schedules
              </div>
            }
            data={data?.results}
            columns={columns}
            canCreate={true}
            totalCount={data?.count}
            handlePage={handlePage}
            onRowClick={handleRowClick}
            handleSorting={handleSorting}
            handleSearch={handleSearch}
            handleCreate={handleCreate} />
      }

      <ProductDetailDrawer
        open={openDrawer}
        onClose={() => handleClose()}
        product={clickedProduct}
      />
      <DeleteModal
        openModal={openDeleteModal}
        handleDelete={handleDelete}
        handleCloseModal={handleCloseDeleteModal}
        selectedProduct={clickedProduct}
      />
    </div>
  );
};

export default Page;
