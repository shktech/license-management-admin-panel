"use client";

import { Lookup, LookupValue } from "@/types/types";
import Loader from "@components/common/Loader";
import GenericTable from "@components/Table/GenericTable";
import {
  editRefineBtnStyle,
  refreshRefineBtnStyle,
  tableAddButton,
  tableCancelButton,
  tableSaveButton,
} from "@data/MuiStyles";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  useCreate,
  useNavigation,
  useParsed,
  useShow,
  useTable,
  useUpdate,
} from "@refinedev/core";
import SaveIcon from "@mui/icons-material/Save";
import { EditButton, RefreshButton, Show } from "@refinedev/mui";
import { MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import CloseIcon from "@mui/icons-material/Close";

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

  const [selectedValue, setSelectedValue] = useState<LookupValue | null>(null);

  const getButtonProps = (editButtonProps: any, refreshButtonProps: any) => {
    return (
      <div className="flex gap-2 px-12">
        <EditButton
          {...editButtonProps}
          onClick={() => push(`/dashboard/lookups/edit?id=${params?.id}`)}
          sx={editRefineBtnStyle}
        />
        <RefreshButton {...refreshButtonProps} sx={refreshRefineBtnStyle} />
      </div>
    );
  };
  const handleCancelEdit = () => {
    // setIsEditMode(false);
    setCodes(codeData?.data as LookupValue[]);
    setSelectedValue(null);
  };
  const handleEditChange = (index: number, id: string, value: any) => {
    // setCodes((prevCodes) => {
    //   const newCodes = [...prevCodes];
    //   newCodes[index] = { ...newCodes[index], [id]: value };
    //   return newCodes;
    // });
  };
  const handleAdd = () => {
    const newCode: LookupValue = {
      id: "new",
      value: "",
      meaning: "",
      attribute1: "",
      attribute2: "",
      attribute3: "",
      active: true,
      is_new: true,
    };
    setCodes((prevCodes) => [...prevCodes, newCode]);
    setSelectedValue(newCode);
  };
  const { mutate: createLookup } = useCreate();
  const { mutate: updateLookup } = useUpdate();

  const handleEditLookupValue = (value: LookupValue) => {
    // console.log(codeData?.data);
    // setCodes(codes);.
    // console.log(codeData?.data);
    setSelectedValue(value);
  };

  const handleSaveValue = () => {
    if (selectedValue) {
      console.log(selectedValue);
      let updatedCode = [...codes];
      const selectedIndex = updatedCode.findIndex(
        (c) => c.id == selectedValue.id
      );
      updatedCode[selectedIndex] = selectedValue;
      console.log(updatedCode);
      createLookup(
        {
          resource: `lookups/${lookup.lookup_code}/values`,
          values: updatedCode,
        },
        {
          onError: (error) => {},
          onSuccess: () => {
            setSelectedValue(null);
            refetch();
          },
        }
      );
      // if (selectedValue.is_new) {
      //   createLookup(
      //     {
      //       resource: `lookups/${lookup.lookup_code}/values`,
      //       values: selectedValue,
      //     },
      //     {
      //       onError: (error) => {},
      //       onSuccess: () => {
      //         refetch();
      //         setSelectedValue(null);
      //       },
      //     }
      //   );
      // } else {
      //   updateLookup(
      //     {
      //       resource: `lookups/${lookup.lookup_code}/values`,
      //       id: selectedValue.id as string,
      //       values: selectedValue,
      //     },
      //     {
      //       onError: (error) => {},
      //       onSuccess: () => {
      //         refetch();
      //         setSelectedValue(null);
      //       },
      //     }
      //   );
      // }
    }
  };
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
        accessorKey: "dependency",
        header: "Dependency",
      },
      {
        accessorKey: "active",
        header: "Active",
        size: 50,
      },
      {
        accessorKey: "action",
        header: "Action",
        pin: "right",
        size: 100,
        enableSorting: false,
      },
    ],
    []
  );

  const columns = useMemo<MRT_ColumnDef<LookupValue>[]>(
    () =>
      baseColumns.map((column) => {
        if (column.accessorKey == "active") {
          return {
            ...column,
            Cell: ({ renderedCellValue, cell, row, column }) => {
              return (
                <>
                  {row.original.id == selectedValue?.id ? (
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        defaultValue={renderedCellValue}
                        onChange={(e) =>
                          setSelectedValue({
                            ...selectedValue,
                            active: e.target.value == "true",
                          })
                        }
                        label="Age"
                      >
                        <MenuItem value={"true"}>
                          <div className="flex items-center gap-2">
                            <div
                              className={`rounded-full text-white py-1 text-xs px-3 bg-[#11ba82]`}
                            >
                              Active
                            </div>
                          </div>
                        </MenuItem>
                        <MenuItem value={"false"}>
                          <div className="flex items-center gap-2">
                            <div
                              className={`rounded-full text-white py-1 text-xs px-3 bg-[#929ea8]`}
                            >
                              Inactive
                            </div>
                          </div>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div
                        className={`rounded-full text-white py-1 text-xs px-3 ${renderedCellValue ? "bg-[#11ba82]" : "bg-[#929ea8]"}`}
                      >
                        {renderedCellValue ? "Active" : "Inactive"}
                      </div>
                    </div>
                  )}
                </>
              );
            },
          };
        } else if (column.accessorKey == "value") {
          switch (lookup?.type) {
            case "Number":
              return {
                ...column,
                Cell: ({ renderedCellValue, cell, row, column }) =>
                  row.original.id == selectedValue?.id ? (
                    <TextField
                      variant="standard"
                      type="number"
                      // value={renderedCellValue}
                      // defaultValue={renderedCellValue}
                      // disabled={!row.original.is_new}
                      value={selectedValue?.value}
                      onChange={(e) =>
                        setSelectedValue({
                          ...selectedValue,
                          value: e.target.value,
                        })
                      }
                      onBlur={(e) => {
                        let numValue = parseInt(e.target.value);
                        if (numValue < 1) numValue = 1;
                        if (numValue > 99) numValue = 100;
                        setSelectedValue({
                          ...selectedValue,
                          value: `${numValue}`,
                        });
                      }}
                    />
                  ) : (
                    renderedCellValue
                  ),
              };
            case "Date":
              return {
                ...column,
                Cell: ({ renderedCellValue, cell, row, column }) =>
                  row.original.id == selectedValue?.id ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        // value={dayjs(renderedCellValue as string)}
                        defaultValue={dayjs(renderedCellValue as string)}
                        // disabled={!row.original.is_new}
                        onChange={(newValue) =>
                          setSelectedValue({
                            ...selectedValue,
                            value: newValue?.format("YYYY-MM-DD"),
                          })
                        }
                        slotProps={{
                          textField: {
                            variant: "standard",
                          },
                        }}
                      />
                    </LocalizationProvider>
                  ) : (
                    renderedCellValue
                  ),
              };
            case "Duration":
              return {
                ...column,
                Cell: ({ renderedCellValue, cell, row, column }) =>
                  row.original.id == selectedValue?.id ? (
                    <div className="flex gap-2">
                      <TextField
                        variant="standard"
                        type="number"
                        value={
                          selectedValue?.value === "EA"
                            ? 0
                            : parseInt(selectedValue?.value as string, 10)
                        }
                        sx={{ width: "50%" }}
                        onChange={(e) => {
                          const numValue = e.target.value;
                          const unit =
                            selectedValue?.value
                              ?.toString()
                              .match(/[A-Za-z]+/)?.[0] || "D";
                          setSelectedValue({
                            ...selectedValue,
                            value: `${numValue}${unit}`,
                          });
                        }}
                        onBlur={(e) => {
                          let numValue = parseInt(e.target.value);
                          if (numValue < 1) numValue = 1;
                          if (numValue > 99) numValue = 100;
                          const unit =
                            selectedValue?.value
                              ?.toString()
                              .match(/[A-Za-z]+/)?.[0] || "D";
                          setSelectedValue({
                            ...selectedValue,
                            value: `${numValue}${unit}`,
                          });
                        }}
                      />
                      <FormControl variant="standard" sx={{ width: "50%" }}>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          // disabled={!row.original.is_new}
                          defaultValue={
                            typeof renderedCellValue === "string"
                              ? renderedCellValue.match(/[A-Za-z]+/)?.[0] || ""
                              : ""
                          }
                          onChange={(e) => {
                            const numValue =
                              parseInt(selectedValue?.value as string, 10) || 0;
                            console.log(numValue, e.target.value);
                            setSelectedValue({
                              ...selectedValue,
                              value: `${numValue}${e.target.value}`,
                            });
                          }}
                        >
                          <MenuItem value={"D"}>Day</MenuItem>
                          <MenuItem value={"MO"}>Month</MenuItem>
                          <MenuItem value={"YR"}>Year</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  ) : (
                    renderedCellValue
                  ),
              };
          }
        } else if (column.accessorKey == "action") {
          return {
            ...column,
            Cell: ({ row }) => (
              <div className="flex gap-4">
                {row.original.id == selectedValue?.id ? (
                  <div className="flex gap-2">
                    <SaveIcon
                      onClick={() => handleSaveValue()}
                      fontSize="small"
                      className="text-[#818f99] hover:text-black cursor-pointer"
                    />
                    <CloseIcon
                      onClick={() => handleCancelEdit()}
                      fontSize="small"
                      className="text-[#818f99] hover:text-black cursor-pointer"
                    />
                  </div>
                ) : (
                  selectedValue == null && (
                    <EditOutlinedIcon
                      onClick={() => handleEditLookupValue(row.original)}
                      fontSize="small"
                      className="text-[#818f99] hover:text-black cursor-pointer"
                    />
                  )
                )}
              </div>
            ),
          };
        }
        return {
          ...column,
          Cell: ({ renderedCellValue, cell, row, column }) =>
            row.original.id == selectedValue?.id ? (
              <TextField
                variant="standard"
                defaultValue={renderedCellValue}
                // disabled={!row.original.is_new}
                onChange={(e) =>
                  setSelectedValue({
                    ...selectedValue,
                    [column.id as string]: e.target.value,
                  })
                }
              />
            ) : (
              renderedCellValue
            ),
        };
      }),
    [selectedValue, baseColumns]
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
            <div className="flex items-center gap-2">
              <DnsRoundedIcon />
              Detailed Lookup
            </div>
            <span
              className={`mx-2 px-4 py-1 rounded-full text-xs ${lookup?.active ? "bg-[#11ba82] text-white" : "bg-[#c2c2c2] text-black"}`}
            >
              {lookup?.active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      }
      headerButtons={({ editButtonProps, refreshButtonProps }) =>
        getButtonProps(editButtonProps, refreshButtonProps)
      }
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="px-12 grid grid-cols-4 gap-4  pt-4 pb-12">
            <div className="">
              <div className="text-[#515f72] font-semibold">Lookup Name</div>
              <div className="text-[#687991]">{lookup?.lookup_name}</div>
            </div>
            <div className="">
              <div className="text-[#515f72] font-semibold">Lookup Type</div>
              <div className="text-[#687991]">{lookup?.type}</div>
            </div>
            <div className="col-span-2">
              <div className="text-[#515f72] font-semibold">
                Lookup Description
              </div>
              <div className="text-[#687991]">{lookup?.description}</div>
            </div>
          </div>
          <div className="bg-white">
            <GenericTable
              title={
                <div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
                  Lookup Codes
                </div>
              }
              columns={columns}
              handleCreate={handleAdd}
              data={codes}
              addText={
                <div className="flex gap-2">
                  <EditOutlinedIcon fontSize="small" /> Add
                </div>
              }
              noSearchNeed={true}
              canCreate={!selectedValue?.is_new}
            />
          </div>
        </div>
      )}
    </Show>
  );
};

export default Page;
