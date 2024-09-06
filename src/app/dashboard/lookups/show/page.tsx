"use client";

import { Lookup, LookupValue } from "@/types/types";
import Loader from "@components/common/Loader";
import GenericTable from "@components/Table/GenericTable";
import { editRefineBtnStyle, refreshRefineBtnStyle, tableCancelButton, tableSaveButton } from "@data/MuiStyles";
import { Button, FormControl, MenuItem, Select, TextField } from "@mui/material";
import { useCreate, useNavigation, useParsed, useShow, useTable } from "@refinedev/core";
import { EditButton, RefreshButton, Show } from "@refinedev/mui";
import { MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Page = () => {

  const { params } = useParsed();

  const { queryResult } = useShow<Lookup>({
    resource: "lookups",
    id: params?.id,
  });

  const { data, isLoading } = queryResult;

  const {
    tableQueryResult: { data: codeData, isLoading: codeIsLoading, refetch },
  } = useTable<LookupValue>({
    resource: `lookups/${params?.id}/values`,
    hasPagination: false,
  });

  const [codes, setCodes] = useState<LookupValue[]>([]);
  useEffect(() => {
    if (codeData) {
      setCodes(codeData.data);
    }
  }, [codeData, codeIsLoading]);

  const lookup: Lookup = data?.data as Lookup;

  const [isEditMode, setIsEditMode] = useState(false);

  const { push } = useNavigation();

  const getButtonProps = (editButtonProps: any, refreshButtonProps: any) => {
    return (
      <div className="flex gap-2 px-12">
        <EditButton {...editButtonProps} onClick={() => push(`/dashboard/lookups/edit?id=${params?.id}`)} sx={editRefineBtnStyle} />
        <RefreshButton {...refreshButtonProps} sx={refreshRefineBtnStyle} />
      </div>
    );
  };
  const handleCancelEdit = () => {
    setIsEditMode(false);
    setCodes(codeData?.data as LookupValue[]);
  }
  const handleEditChange = (index: number, id: string, value: any) => {
    setCodes(prevCodes => {
      const newCodes = [...prevCodes];
      newCodes[index] = { ...newCodes[index], [id]: value };
      return newCodes;
    });
  };
  const handleEditAdd = () => {
    if (isEditMode) {
      setCodes(prevCodes => [
        ...prevCodes,
        {
          value: "",
          meaning: "",
          attribute1: "",
          attribute2: "",
          attribute3: "",
          active: true,
        }
      ]);
    } else {
      setIsEditMode(true);
    }
  }
  const { mutate } = useCreate();
  const handleSave = () => {
    mutate(
      {
        resource: `lookups/${lookup.lookup_code}/values`,
        values: codes,
      },
      {
        onError: (error) => { },
        onSuccess: () => {
          setIsEditMode(false);
          refetch();
        },
      }
    );
  }
  const baseColumns = useMemo<MRT_ColumnDef<LookupValue>[]>(
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
        size: 50,
      },
    ],
    []
  );

  const columns = useMemo<MRT_ColumnDef<LookupValue>[]>(
    () => baseColumns.map(column => {
      if (column.accessorKey == "active") {
        return {
          ...column,
          Cell: ({ renderedCellValue, cell, row, column }) =>
            isEditMode ? (
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={renderedCellValue}
                  onChange={(e) => handleEditChange(row.index, column.id as string, (e.target.value == "true"))}
                  label="Age"
                >
                  <MenuItem value={"true"}>
                    <div className="flex items-center gap-2">
                      <div className={`rounded-full text-white py-1 text-xs px-3 bg-[#11ba82]`}>
                        Active
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem value={"false"}>
                    <div className="flex items-center gap-2">
                      <div className={`rounded-full text-white py-1 text-xs px-3 bg-[#929ea8]`}>
                        Inactive
                      </div>
                    </div>
                  </MenuItem>
                </Select>
              </FormControl>
            ) : (
              <div className="flex items-center gap-2">
                <div className={`rounded-full text-white py-1 text-xs px-3 ${renderedCellValue ? 'bg-[#11ba82]' : 'bg-[#929ea8]'}`}>
                  {renderedCellValue ? "Active" : "Inactive"}
                </div>
              </div>
            ),
        }
      } else if (column.accessorKey == "value") {
        switch (lookup?.type) {
          case "Number":
            return {
              ...column,
              Cell: ({ renderedCellValue, cell, row, column }) =>
                isEditMode ? (
                  <TextField
                    variant="standard"
                    type="number"
                    value={renderedCellValue}
                    onChange={(e) => handleEditChange(row.index, column.id as string, e.target.value)}
                  />
                ) : renderedCellValue,
            }
          case "Date":
            return {
              ...column,
              Cell: ({ renderedCellValue, cell, row, column }) =>
                isEditMode ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={dayjs(renderedCellValue as string)}
                      onChange={(newValue) => handleEditChange(row.index, column.id as string, newValue?.format('YYYY-MM-DD'))}
                      slotProps={{
                        textField: {
                          variant: "standard",
                        }
                      }}
                    />
                  </LocalizationProvider>
                ) : renderedCellValue,
            }
          case "Duration":
            return {
              ...column,
              Cell: ({ renderedCellValue, cell, row, column }) =>
                isEditMode ? (
                  <div className="flex gap-2">
                    <TextField
                      variant="standard"
                      type="number"
                      value={renderedCellValue === "EA" ? 0 : parseInt(renderedCellValue as string, 10)}
                      sx={{ width: '50%' }}
                      onChange={(e) => {
                        const numValue = e.target.value;
                        const unit = renderedCellValue?.toString().match(/[A-Za-z]+/)?.[0] || 'D';
                        handleEditChange(row.index, column.id as string, numValue === "0" ? "EA" : `${numValue}${unit}`);
                      }}
                    />
                    <FormControl variant="standard" sx={{ width: '50%' }}>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={typeof renderedCellValue === 'string' ? renderedCellValue.match(/[A-Za-z]+/)?.[0] || '' : ''}
                        onChange={(e) => {
                          const numValue = parseInt(renderedCellValue as string, 10) || 0;
                          handleEditChange(row.index, column.id as string, `${numValue}${e.target.value}`);
                        }}
                      >
                        <MenuItem value={"D"}>Day</MenuItem>
                        <MenuItem value={"MO"}>Month</MenuItem>
                        <MenuItem value={"YR"}>Year</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                ) : renderedCellValue,
            }
        }
      }
      return {
        ...column,
        Cell: ({ renderedCellValue, cell, row, column }) =>
          isEditMode ? (
            <TextField
              variant="standard"
              value={renderedCellValue}
              onChange={(e) => handleEditChange(row.index, column.id as string, e.target.value)}
            />
          ) : renderedCellValue,
      }
    }),
    [isEditMode, baseColumns]
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
        <div className="px-8 pt-6 !font-satoshi text-2xl font-semibold text-[#1f325c] gap-2">
          <div className="flex items-center gap-2">
            <div className="">Detailed Lookup</div>
            <span className={`mx-2 px-4 py-1 rounded-full text-xs ${lookup?.active ? "bg-[#11ba82] text-white" : "bg-[#c2c2c2] text-black"}`}>
              {lookup?.active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      }
      headerButtons={({ editButtonProps, refreshButtonProps }) =>
        getButtonProps(editButtonProps, refreshButtonProps)
      }
    >
      {isLoading ? <Loader /> :
        <div>
          <div className="px-12 grid grid-cols-4 gap-4  pt-4 pb-12">
            <div className="">
              <div className="text-[#778599]">Lookup Name</div>
              <div className="text-[#515f72] text-xl font-semibold">{lookup?.lookup_name}</div>
            </div>
            <div className="">
              <div className="text-[#778599]">Lookup Type</div>
              <div className="text-[#515f72] text-xl font-semibold">{lookup?.type}</div>
            </div>
            <div className="col-span-2">
              <div className="text-[#778599]">Lookup Description</div>
              <div className="text-[#515f72] text-xl font-semibold">{lookup?.description}</div>
            </div>
          </div>
          <div className="bg-white">
            <GenericTable
              title={<div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#1f325c] flex items-center gap-2">Lookup Codes</div>}
              columns={columns}
              handleCreate={handleEditAdd}
              data={codes}
              addText={<div className="flex gap-2"><EditOutlinedIcon fontSize="small" /> {isEditMode ? "Add" : "Edit"}</div>}
              noSearchNeed={true}
              canCreate={true}
            />
            {isEditMode && (
              <div className="flex justify-end px-12 py-4 gap-2">
                <Button onClick={handleSave} variant="contained" sx={tableSaveButton}> Save</Button>
                <Button onClick={handleCancelEdit} variant="contained" sx={tableCancelButton}> Cancel</Button>
              </div>
            )}
          </div>
        </div>
      }
    </Show>
  );
};

export default Page;
