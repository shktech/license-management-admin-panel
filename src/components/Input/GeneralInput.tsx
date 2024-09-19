import React, { useEffect } from "react";
import { Input } from "@mui/base/Input";
import { BaseInputProps } from "./InputProps";
import { NumberInput } from "@mui/base/Unstable_NumberInput/NumberInput";

const GeneralInput = ({ label, ...props }: BaseInputProps) => {
  console.log(props);
  return (
    <div className="relative">
      <label
        htmlFor={props.id}
        className="mb-1.5 block text-[#000000cc] dark:text-white absolute text-sm left-4 top-2 flex items-center gap-1"
      >
        {label}
        {props.required && <span className="text-red-500">*</span>}
        {!props.required && (
          <span className="text-gray-500 text-xs">(Optional)</span>
        )}
      </label>
      {props.type == "number" ? (
        <NumberInput
          component="input" // Add this line
          required={props.required}
          disabled={props.disabled}
          value={props.value as number | null} // Cast to number | null
          onChange={(event, value) => {
            if (props.onChange) {
              props.onChange(event as any); // Cast to any to bypass type checking
            }
          }}
          min={1}
          max={100}
          slotProps={{
            input: {
              className: `
            border border-transparent w-full rounded bg-[#dfe6ec] 
            ${props.disabled ? "!text-[#00000061]" : "text-black"}
            hover:bg duration-200 focus:border-black
            pb-2 pt-8 px-4 outline-none focus-visible:shadow-none
          `,
            },
          }}
        />
      ) : (
        <Input
          {...props}
          disabled={props.disabled}
          slotProps={{
            input: {
              className: `
            border border-transparent w-full rounded bg-[#dfe6ec] 
            ${props.disabled ? "!text-[#00000061]" : "text-black"}
            hover:bg duration-200 focus:border-black
            pb-2 pt-8 px-4 outline-none focus-visible:shadow-none
          `,
            },
          }}
        />
      )}
      {props.icon && (
        <span className="absolute right-4 top-2.5">{props.icon}</span>
      )}
    </div>
  );
};

export default GeneralInput;
