"use client";

import { useDelete, useNavigation, useParse, useParsed, useTable } from "@refinedev/core";
import { Address, Customer } from "../../types/types";
import React, { useMemo } from "react";
import { MRT_ColumnDef, MRT_SortingState } from "material-react-table";
import GenericTable from "@components/Table/GenericTable";
import Loader from "@components/common/Loader";
import CustomerDetailDrawer from "./CustomerDetailDrawer";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { convertSortingStateToCrudSort } from "@utils/utilFunctions";
import CommonDeleteModal from "@components/common/CommonDeleteModal";

interface AddressTableProps {
    data: Partial<Address[]>,
    partner_id: string
}

const AddressTable: React.FC<AddressTableProps> = ({ data, partner_id }) => {
    const { push } = useNavigation();
    const columns = useMemo<MRT_ColumnDef<Address>[]>(
        () => [
            {
                accessorKey: 'active',
                header: 'Active',
                size: 50,
                Cell: ({ renderedCellValue }) => <div className={`rounded-full h-4 w-4 ${renderedCellValue ? 'bg-[#11ba82]' : 'bg-[#929ea8]'}`}></div>
            },
            {
                accessorKey: 'address1',
                header: 'Address1',
                size: 50,
            },
            {
                accessorKey: 'address2',
                header: 'Address2',
                size: 50,
            },
            {
                accessorKey: 'city',
                header: 'City',
                size: 50,
            },
            {
                accessorKey: 'state',
                header: 'State',
                size: 50,
            },
            {
                accessorKey: 'postal_code',
                header: 'Postal Code',
                size: 50,
            },
            {
                accessorKey: 'country',
                header: 'Country',
                size: 50,
            },
        ],
        [],
    );
    const filteredData = data.filter((item): item is Address => item !== undefined);

    const handleRowClick = (row: Address) => {
        console.log(partner_id);
        push(`/dashboard/partners/show/addresses/edit?partner_id=${partner_id}&address_id=${row.address_id}`);
    }
    const handleCreate = () => {
        push(`/dashboard/partners/show/addresses/create?partner_id=${partner_id}`);
    }
    return (
        <GenericTable
            title={
                <div className="!font-satoshi text-2xl font-semibold text-[#515f72] flex items-center gap-2">
                    Data
                </div>
            }
            data={filteredData}
            columns={columns}
            canCreate={true}
            totalCount={data?.length || 0}
            onRowClick={handleRowClick}
            noSearchNeed
            handleCreate={handleCreate}
        />
    );
}

export default AddressTable;
