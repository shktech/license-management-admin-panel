"use client";

import { useDelete, useTable } from "@refinedev/core";
import { Customer } from "../../types/types";
import React, { useMemo } from "react";
import { MRT_ColumnDef, MRT_SortingState } from "material-react-table";
import GenericTable from "@components/Table/GenericTable";
import Loader from "@components/common/Loader";
import CustomerDetailDrawer from "./CustomerDetailDrawer";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { convertSortingStateToCrudSort } from "@utils/utilFunctions";
import CommonDeleteModal from "@components/common/CommonDeleteModal";

interface CustomerTableProps {
    resource: string
}

const CustomerTable: React.FC<CustomerTableProps> = ({ resource }) => {
    const {
        tableQueryResult: { data, isLoading, refetch },
        setCurrent,
        setFilters,
        setSorters,
    } = useTable<Customer>({
        resource: `customers/${resource}`,
        hasPagination: false
    });

    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

    const [clickedCustomer, setClickedCustomer] = React.useState<Customer | null>(null);

    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const handleEditClick = (row: Customer) => {
        setClickedCustomer(row);
        console.log(row);
        setOpenDrawer(true);
    };

    const handleClose = () => {
        refetch();
        setClickedCustomer(null);
        setOpenDrawer(false);
    }

    const handleDeleteBtn = (customer: Customer) => {
        handleOpenDeleteModal();
        setClickedCustomer(customer);
    }

    const handleCreate = () => setOpenDrawer(true);

    const handlePage = (value: number) => setCurrent(value);

    const handleSorting = (sorting: MRT_SortingState) => setSorters(convertSortingStateToCrudSort(sorting));

    const handleSearch = (value: string) => setFilters([{ field: 'searchKey', operator: 'contains', value: value }])


    const { mutate: deleteProduct } = useDelete();

    const handleDelete = () => {
        deleteProduct(
            { resource: `customers/${resource}`, id: `${(clickedCustomer?.account_id)}` },
            {
                onError: (error) => { console.log(error); },
                onSuccess: () => { console.log("Success"); },
            }
        )
        handleCloseDeleteModal();
    }

    const columns = useMemo<MRT_ColumnDef<Customer>[]>(
        () => [
            {
                accessorKey: 'account',
                header: 'Account',
                size: 50,
            },
            {
                accessorKey: 'name',
                header: 'Name',
                size: 50,
            },
            {
                accessorKey: 'contact.address.address1',
                header: 'Address1',
                size: 50,
            },
            {
                accessorKey: 'contact.address.address2',
                header: 'Address2',
                size: 50,
            },
            {
                accessorKey: 'contact.address.city',
                header: 'City',
                size: 50,
            },
            {
                accessorKey: 'contact.address.state',
                header: 'State',
                size: 50,
            },
            {
                accessorKey: 'contact.address.postal_code',
                header: 'Postal Code',
                size: 50,
            },
            {
                accessorKey: 'contact.address.country',
                header: 'Country',
                size: 50,
            },
            {
                accessorKey: 'contact.first_name',
                header: 'First Name',
                size: 50,
            },
            {
                accessorKey: 'contact.last_name',
                header: 'Last Name',
                size: 50,
            },
            {
                accessorKey: 'contact.phone',
                header: 'Phone',
                size: 50,
            },
            {
                accessorKey: 'contact.email',
                header: 'Email',
                size: 50,
            },
            {
                accessorKey: "actions",
                header: "Action",
                size: 100,
                enableSorting: false,
                pin: 'right',
                Cell: ({ row }) => (
                    <div className="w-full h-full">
                        <div className="flex gap-4">
                            <EditOutlinedIcon onClick={() => handleEditClick(row.original)} fontSize="small" className="text-[#818f99] hover:text-black cursor-pointer" />
                            <DeleteIcon onClick={() => handleDeleteBtn(row.original)} fontSize="small" className="text-[#818f99] hover:text-black cursor-pointer" />
                        </div>
                    </div>
                ),
            },
        ],
        [],
    );

    return (
        <>
            {
                isLoading ?
                    <Loader /> :
                    <GenericTable
                        title={
                            <div className="!font-satoshi text-2xl font-semibold text-[#515f72] flex items-center gap-2">
                                Customers
                            </div>
                        }
                        data={data?.data}
                        columns={columns}
                        handleCreate={handleCreate}
                        canCreate={true}
                        totalCount={data?.data.length}
                        handlePage={handlePage}
                        handleSorting={handleSorting}
                        handleSearch={handleSearch}
                    // canDelete={false}
                    // canEdit={permissionsData?.update} 
                    />
            }
            <CustomerDetailDrawer
                resource={resource}
                open={openDrawer}
                onClose={() => handleClose()}
                customer={clickedCustomer}
            />
            <CommonDeleteModal
                openModal={openDeleteModal}
                handleDelete={handleDelete}
                handleCloseModal={handleCloseDeleteModal}
            />
        </>
    );
}

export default CustomerTable;
