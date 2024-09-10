"use client";

import React, { useEffect, useState } from "react";
import { BaseInputProps } from "./InputProps";
import { useList } from "@refinedev/core";
import {
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

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

const Dropdown: React.FC<DropdownProps> = ({
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

  const [loading, setLoading] = useState<boolean>(false);

  if (resource && valueKey && labelKey) {
    const { data, isLoading } = useList({
      resource: resource || "",
      queryOptions: {
        enabled: !!resource && !!valueKey && !!labelKey,
      },
    });
    useEffect(() => {
      if (data && valueKey && labelKey) {
        if (data?.data) {
          const options =
            data?.data?.filter((item: any) => item.active).map((item: any) => ({
              value: item[valueKey],
              label: item[labelKey],
            })) || [];
          setDropdownOptions(options);
        } else {
          const options =
            data?.map((item: any) => ({
              value: item[valueKey],
              label: item[labelKey],
            })) || [];
          setDropdownOptions(options);
        }
      }
      setLoading(isLoading);
    }, [data, isLoading, valueKey, labelKey]);
  }

  const handleChange = (event: SelectChangeEvent) => {
    onChange &&
      onChange({
        target: {
          name: props.name2 ? props.name2 : props.name,
          value: event.target.value as string,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="relative">
      <FormControl className="w-full relative">
        <label
          htmlFor={props.id}
          className="mb-1.5 block text-[#0000009c] font-medium z-10 absolute text-sm left-4 top-2 flex items-center gap-1"
        >
          {props.required && <span className="text-red-500">*</span>}
          {label}
          {!props.required && (
            <span className="text-gray-500 text-xs">(Optional)</span>
          )}
        </label>
        <Select
          value={value ? (value as string) : ""}
          onChange={handleChange}
          displayEmpty
          size="small"
          disabled={props.disabled}
          sx={{
            pt: 3,
            backgroundColor: "#dfe6ec",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: 0,
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: 1,
                color: "black", // Adjust this color as needed
              },
          }}
        >
          {loading ? (
            <MenuItem key="loading">Loading...</MenuItem>
          ) : (
            dropdownOptions.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
