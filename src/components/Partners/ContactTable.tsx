"use client";

import { useDelete, useTable } from "@refinedev/core";
import { Contact, Customer } from "../../types/types";
import React, { useMemo } from "react";
import { MRT_ColumnDef, MRT_SortingState } from "material-react-table";
import GenericTable from "@components/Table/GenericTable";
import Loader from "@components/common/Loader";
import CustomerDetailDrawer from "./CustomerDetailDrawer";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { convertSortingStateToCrudSort } from "@utils/utilFunctions";
import CommonDeleteModal from "@components/common/CommonDeleteModal";

interface ContactTableProps {
    data: Partial<Contact[]>
}

const ContactTable: React.FC<ContactTableProps> = ({ data }) => {

    const columns = useMemo<MRT_ColumnDef<Contact>[]>(
        () => [
            {
                accessorKey: 'active',
                header: 'Active',
                size: 50,
                Cell: ({ renderedCellValue }) => <div className={`rounded-full h-4 w-4 ${renderedCellValue ? 'bg-[#11ba82]' : 'bg-[#929ea8]'}`}></div>
            },
            {
                accessorKey: 'first_name',
                header: 'First Name',
                size: 50,
            },
            {
                accessorKey: 'last_name',
                header: 'Last Name',
                size: 50,
            },
            {
                accessorKey: 'email',
                header: 'Email',
                size: 50,
            },
            {
                accessorKey: 'phone',
                header: 'Phone',
                size: 50,
            },
        ],
        [],
    );
    const filteredData = data.filter((item): item is Contact => item !== undefined);

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

            noSearchNeed
        />
    );
}

export default ContactTable;
