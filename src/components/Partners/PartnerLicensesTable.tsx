'use client'

import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { Asset, Transaction } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useTable } from '@refinedev/core';
import GenericTable from '@components/Table/GenericTable';

interface PartnerLicensesTableProps {
    partner_id?: string;
}

const PartnerLicensesTable: React.FC<PartnerLicensesTableProps> = ({ partner_id }) => {
    const {
        tableQueryResult: { data: transactions, isLoading: codeIsLoading, refetch },
        setCurrent,
        setFilters,
        setSorters,
    } = useTable<Asset>({
        syncWithLocation: false,
        resource: "assets",
        initialFilter: [
            { field: "partner", operator: "eq", value: partner_id },
        ],
    });

    const router = useRouter();

    const columns = useMemo<MRT_ColumnDef<Asset>[]>(
        () => [
            {
                accessorKey: "asset_id",
                header: "License ID",
            },
            {
                accessorKey: "license_key",
                header: "License Number (LicKey/Srl#)",
            },
            {
                accessorKey: "organization.organization_name",
                header: "Organization",
            },
            {
                accessorKey: "osc_product.product_part_number",
                header: "Product Part Number",
            },
            {
                accessorKey: "osc_product.product_type",
                header: "License Type",
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
        [],
    );

    const handleRowClick = (row: Asset) => {
        router.push(`/dashboard/assets/show?id=${row.asset_id}`);
    };

    return (
        <GenericTable
            title="Transactions"
            data={transactions?.data}
            columns={columns}
            onRowClick={handleRowClick}
        />
    );
};

export default PartnerLicensesTable;
