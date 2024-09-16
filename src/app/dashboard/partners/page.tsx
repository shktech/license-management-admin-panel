"use client";

import { useNavigation, useTable } from "@refinedev/core";
import React, { useMemo } from "react";
import { MRT_ColumnDef, MRT_SortingState } from "material-react-table";
import GenericTable from "@components/Table/GenericTable";
import Loader from "@components/common/Loader";
import { convertSortingStateToCrudSort } from "@utils/utilFunctions";
import { Partner } from "@/types/types";
import StateComponent from "@components/common/StateComponent";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { partnerTypes } from "@data/PartnerTypeData";

const Page = () => {
  const { push } = useNavigation();
  const {
    tableQueryResult: { data, isLoading, refetch },
    setCurrent,
    setFilters,
    setSorters,
  } = useTable<Partner>({
    pagination: {
      pageSize: 15,
    },
  });

  const handleRowClick = (row: Partner) => {
    push(`/dashboard/partners/show?id=${row.partner_id}`);
  };

  const handleCreate = () => {
    push("/dashboard/partners/create");
  };

  const [partnerType, setPartnerType] = React.useState("");

  const handleChangePartnerType = (event: SelectChangeEvent) => {
    setPartnerType(event.target.value);
    setFilters([{ field: "type", operator: "eq", value: event.target.value }]);
  };

  const handlePage = (value: number) => setCurrent(value);

  const handleSorting = (sorting: MRT_SortingState) =>
    setSorters(convertSortingStateToCrudSort(sorting));

  const handleSearch = (value: string) =>
    setFilters([{ field: "searchKey", operator: "contains", value: value }]);

  const columns = useMemo<MRT_ColumnDef<Partner>[]>(
    () => [
      {
        accessorKey: "account_id",
        header: "Account ID",
        size: 30,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 300,
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 300,
        Cell: ({ renderedCellValue }) => (
          <span
            className={`text-xs text-white w-full px-6 py-1 rounded-full text-center font-semibold`}
            style={{
              backgroundColor:
                partnerTypes.find((type) => type.value === renderedCellValue)
                  ?.color || "#ff3838",
            }}
          >
            {renderedCellValue}
          </span>
        ),
      },
      {
        accessorKey: "active",
        header: "Active",
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <div className="flex items-center justify-center">
            <StateComponent active={renderedCellValue as boolean} />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <GenericTable
          title={
            <div className="flex gap-4 items-center py-3">
              <div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
                <FontAwesomeIcon icon={faUsers} />
                Partners
              </div>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={partnerType}
                  onChange={handleChangePartnerType}
                  displayEmpty
                  size="small"
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderWidth: "0 0 1px 0",
                      borderRadius: 0,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderWidth: "0 0 1px 0",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderWidth: "0 0 2px 0",
                    },
                  }}
                >
                  {partnerTypes.map((type) => (
                    <MenuItem value={type.value} key={type.label}>
                      <span
                        className={`text-xs text-white w-full px-2 py-1 rounded-full text-center font-semibold`}
                        style={{ backgroundColor: type.color }}
                      >
                        {type.label}
                      </span>
                    </MenuItem>
                  ))}
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
        />
      )}
    </>
  );
};

export default Page;
