"use client";

import { useDelete, useNavigation, useTable } from "@refinedev/core";
import React, { useMemo } from "react";
import { MRT_ColumnDef, MRT_SortingState } from "material-react-table";
import GenericTable from "@components/Table/GenericTable";
import Loader from "@components/common/Loader";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { convertSortingStateToCrudSort } from "@utils/utilFunctions";
import CommonDeleteModal from "@components/common/CommonDeleteModal";
import { Partner } from "@/types/types";
import StateComponent from "@components/common/StateComponent";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

const partnerColors = {
  All: '#4A90E2',
  Shipping: '#FFCC00',
  Billing: '#34C759',
  Reseller: '#8E44AD',
}

const Page = () => {
  const { push } = useNavigation()
  const {
    tableQueryResult: { data, isLoading, refetch },
    setCurrent,
    setFilters,
    setSorters,
  } = useTable<Partner>();

  const handleRowClick = (row: Partner) => {
    push(`/dashboard/partners/show?id=${row.partner_id}`);
  };

  const handleCreate = () => {
    push('/dashboard/partners/create');
  }

  const [partnerType, setPartnerType] = React.useState('');

  const handleChangePartnerType = (event: SelectChangeEvent) => {
    setPartnerType(event.target.value);
    setFilters([{ field: 'type', operator: 'eq', value: event.target.value }])
  };

  const handlePage = (value: number) => setCurrent(value);

  const handleSorting = (sorting: MRT_SortingState) => setSorters(convertSortingStateToCrudSort(sorting));

  const handleSearch = (value: string) => setFilters([{ field: 'searchKey', operator: 'contains', value: value }])

  const columns = useMemo<MRT_ColumnDef<Partner>[]>(
    () => [
      {
        accessorKey: 'account_id',
        header: 'Account ID',
        size: 50,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 50,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        size: 50,
        Cell: ({ renderedCellValue }) => <span className={`text-xs bg-[${partnerColors[renderedCellValue as keyof typeof partnerColors]}] text-white w-full px-6 py-1 rounded-full text-center font-semibold`}>{renderedCellValue}</span>
      },
      {
        accessorKey: 'active',
        header: 'Active',
        size: 50,
        Cell: ({ renderedCellValue }) => <StateComponent active={renderedCellValue as boolean} />
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
              <div className="flex gap-4 items-center py-3">
                <div className="!font-satoshi text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
                  Partners
                </div>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={partnerType}
                    onChange={handleChangePartnerType}
                    displayEmpty
                    size="small"
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '0 0 1px 0',
                        borderRadius: 0,
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '0 0 1px 0',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '0 0 2px 0',
                      },
                    }}
                  >
                    <MenuItem value={''}><span className="text-xs bg-[#4A90E2] text-white w-full px-6 py-1 rounded-full text-center font-semibold">All</span></MenuItem>
                    <MenuItem value={'shipping'}><span className="text-xs bg-[#FFCC00] text-white w-full px-2 py-1 rounded-full text-center font-semibold">Shipping</span></MenuItem>
                    <MenuItem value={'billing'}><span className="text-xs bg-[#34C759] text-white w-full px-2 py-1 rounded-full text-center font-semibold">Billing</span></MenuItem>
                    <MenuItem value={'reseller'}><span className="text-xs bg-[#8E44AD] text-white w-full px-2 py-1 rounded-full text-center font-semibold">Reseller</span></MenuItem>
                  </Select>
                </FormControl>
              </div>
            }
            data={data?.data}
            columns={columns}
            onRowClick={handleRowClick}
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
    </>
  );
}

export default Page;
