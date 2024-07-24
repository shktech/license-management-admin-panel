"use client";

import React, { useEffect, useState } from "react";
import {
  Select as BaseSelect,
  SelectProps,
  SelectRootSlotProps,
} from "@mui/base/Select";
import {
  Option as BaseOption,
  OptionProps,
  OptionOwnerState,
} from "@mui/base/Option";
import clsx from "clsx";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import { BaseInputProps } from "./InputProps";
import { useFetchOptions } from "@hooks/useFetchOptions";
import { useList } from "@refinedev/core";

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
        const options =
          data?.data.map((item: any) => ({
            value: item[valueKey],
            label: item[labelKey],
          })) || [];
        setDropdownOptions(options);
      }
      setLoading(isLoading);
    }, [data, isLoading, valueKey, labelKey]);
  }

  const handleChange = (event: any, newValue: any) => {
    onChange &&
      onChange({
        target: {
          name: props.name,
          value: newValue,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div>
      <label
        htmlFor={props.id}
        className="mb-1.5 block font-medium text-black dark:text-white"
      >
        {label}
      </label>
      <Select
        value={value}
        disabled={props.disabled}
        placeholder={props.placeholder}
        onChange={handleChange}
      >
        {loading ? (
          <option>Loading...</option>
        ) : (
          dropdownOptions.map((option, index) => (
            <Option key={index} value={option.value}>
              {option.label}
            </Option>
          ))
        )}
      </Select>
    </div>
  );
};

const Option = React.forwardRef<HTMLLIElement, OptionProps<string>>(
  (props, ref) => {
    return (
      <BaseOption
        ref={ref}
        {...props}
        slotProps={{
          root: ({ selected, highlighted, disabled }) => ({
            className: `list-none p-2 rounded-lg cursor-default last-of-type:border-b-0 ${getOptionColorClasses(
              { selected, highlighted, disabled }
            )}`,
          }),
        }}
      />
    );
  }
);

const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean,
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </button>
  );
});

const getOptionColorClasses = ({
  selected,
  highlighted,
  disabled,
}: Partial<OptionOwnerState<number>>) => {
  let classes = "";
  if (disabled) {
    classes += "text-slate-400 dark:text-slate-700";
  } else {
    if (selected || highlighted) {
      classes +=
        " bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-300";
    }
    classes +=
      " hover:dark:bg-slate-800 hover:bg-slate-100 hover:dark:text-slate-300 hover:text-slate-900";
    classes +=
      " focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:dark:outline-purple-300";
  }
  return classes;
};

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === "function" ? fn(args) : fn;

const Select = React.forwardRef(function CustomSelect<
  TValue extends {},
  Multiple extends boolean,
>(
  props: SelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <BaseSelect
      ref={ref}
      {...props}
      className={clsx("CustomSelect", props.className)}
      slots={{
        root: Button,
      }}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `relative w-full text-left rounded-lg border border-stroke bg-transparent disabled:bg-whiter py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary [&>svg]:text-base	[&>svg]:absolute [&>svg]:h-full [&>svg]:top-0 [&>svg]:right-2.5`,
              resolvedSlotProps?.className
            ),
          };
        },
        listbox: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.listbox,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `text-sm font-sans p-1.5 my-3 w-80 rounded-xl overflow-auto outline-0 bg-white dark:bg-neutral-900 border border-solid border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-neutral-300 shadow shadow-slate-200 dark:shadow-neutral-900`,
              resolvedSlotProps?.className
            ),
          };
        },
        popup: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.popup,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(resolvedSlotProps?.className),
          };
        },
      }}
    />
  );
});

export default Dropdown;
