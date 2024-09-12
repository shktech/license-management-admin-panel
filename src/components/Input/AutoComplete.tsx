"use client";

import React, { useEffect, useState } from "react";
import { BaseInputProps } from "./InputProps";
import { useTable } from "@refinedev/core";
import { Autocomplete, TextField } from "@mui/material";

interface DropdownOption {
  value: string;
  label: string;
}

type DropdownProps = BaseInputProps & {
  resource?: string;
  valueKey?: string;
  labelKey?: string;
  options?: DropdownOption[];
};
const AutoComplete: React.FC<DropdownProps> = ({
  label,
  onChange,
  value,
  resource,
  valueKey,
  labelKey,
  ...props
}) => {
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>(
    props.options || []
  );

  const {
    tableQueryResult: { data, isLoading },
    setFilters,
    setPageSize,
    pageSize,
  } = useTable({
    resource: resource || "",
    syncWithLocation: false,
    filters: {
      initial: [{ field: "searchKey", operator: "contains", value: "" }],
    },
  });

  useEffect(() => {
    if (data && valueKey && labelKey) {
      const options =
        data?.data.map((item: any) => ({
          value: item[valueKey],
          label: item[labelKey],
        })) || [];
      setDropdownOptions(options);
    }
  }, [data, isLoading, valueKey, labelKey]);

  const handleInputChange = (event: any, newInputValue: string) => {
    handleSearch(newInputValue);
  };

  const handleSearch = (value: string) => {
    setFilters([{ field: "searchKey", operator: "contains", value: value }]);
    setPageSize(10);
  };

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: DropdownOption | null
  ) => {
    onChange &&
      onChange({
        target: {
          name: props.name2 ? props.name2 : props.name,
          value: newValue?.value || "",
        },
      } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleLoadMore = () => {
    if (pageSize <= (data?.total ?? 0)) {
      setPageSize(pageSize + 10);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    console.log(scrollHeight - scrollTop, clientHeight);
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      handleLoadMore();
    }
  };

  return (
    <div className="relative">
      <Autocomplete
        disablePortal
        options={dropdownOptions}
        onChange={handleChange}
        onInputChange={handleInputChange}
        filterOptions={(options) => options}
        ListboxProps={{
          onScroll: handleScroll,
        }}
        renderInput={(params) => (
          <div className="relative">
            <label
              htmlFor={props.id}
              className="mb-1.5 block text-[#000000cc] z-10 absolute text-sm left-4 top-2 flex items-center gap-1"
            >
              {label}
              {props.required && <span className="text-red-500">*</span>}
              {!props.required && (
                <span className="text-gray-500 text-xs">(Optional)</span>
              )}
            </label>
            <TextField
              {...params}
              sx={{
                "& .MuiInputBase-root": {
                  pt: "28px",
                  pb: "0px",
                  backgroundColor: "#dfe6ec",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: "none",
                  },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: "2px solid #1976d2", // Adjust color as needed for focus state
                  },
              }}
            />
          </div>
        )}
        renderOption={(props, option) => <li {...props}>{option.label}</li>}
      />
    </div>
  );
};

export default AutoComplete;
