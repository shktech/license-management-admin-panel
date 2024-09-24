"use client";

import React, { useEffect, useState } from "react";
import { BaseInputProps } from "./InputProps";
import { useTable } from "@refinedev/core";
import { Autocomplete, Box, TextField } from "@mui/material";
import { DefaultPageSize } from "@data/UtilData";

interface DropdownOption {
  value: string;
  label: string;
  elseKey?: string;
}

type DropdownProps = BaseInputProps & {
  resource?: string;
  valueKey?: string;
  labelKey?: string;
  options?: DropdownOption[];
};

const AutoComplete = React.forwardRef<HTMLInputElement, DropdownProps>(
  (
    { label, onChange, value, resource, valueKey, labelKey, elseKey, ...props },
    ref
  ) => {
    const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>(
      []
    );
    const [val, setVal] = useState<string>("");
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
      pagination: {
        pageSize: DefaultPageSize,
      },
    });

    useEffect(() => {
      if (data && valueKey && labelKey) {
        const options =
          data?.data.map((item: any) => ({
            value: item[valueKey],
            label: item[labelKey],
            elseKey: item[elseKey],
          })) || [];
        setDropdownOptions(options);
      }
    }, [data, isLoading, valueKey, labelKey]);

    const handleInputChange = (event: any, newInputValue: string) => {
      handleSearch(newInputValue);
    };

    const handleSearch = (value: string) => {
      setFilters([{ field: "searchKey", operator: "contains", value: value }]);
      setPageSize(DefaultPageSize);
    };

    useEffect(() => {
      if (value) {
        handleChange(value as string);
      }
    }, [value]);

    const handleChange = (newValue: string) => {
      setVal(newValue);
      onChange &&
        onChange({
          target: {
            name: props.name2 ? props.name2 : props.name,
            value: newValue,
          },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleLoadMore = () => {
      if (pageSize <= (data?.total ?? 0)) {
        setPageSize(pageSize + DefaultPageSize);
      }
    };

    const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
      const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
      if (scrollHeight - scrollTop <= clientHeight + 10) {
        handleLoadMore();
      }
    };

    return (
      <div className="relative">
        <Autocomplete
          disablePortal
          value={val}
          options={dropdownOptions.map((option) => option.value)}
          onChange={(event, value) => handleChange(value as string)}
          onInputChange={handleInputChange}
          filterOptions={(options) => options}
          ListboxProps={{
            onScroll: handleScroll,
          }}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box key={key} component="li" {...optionProps}>
                <div className="flex flex-col">
                  <div className="">{option}</div>
                  <div className="text-sm">
                    {dropdownOptions.find((op) => op.value == option)?.elseKey}
                  </div>
                </div>
              </Box>
            );
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
                inputRef={ref} // Pass ref to TextField
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
        />
      </div>
    );
  }
);

export default AutoComplete;
