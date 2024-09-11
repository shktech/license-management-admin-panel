import React, { useEffect } from "react";
import { Input } from "@mui/base/Input";
import { BaseInputProps } from "./InputProps";

const GeneralInput = ({ label, ...props }: BaseInputProps) => {
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
      <Input
        {...props}
        disabled={props.disabled}
        slotProps={{
          input: {
            className: `
              border border-transparent w-full rounded bg-[#dfe6ec] 
              ${props.disabled ? '!text-[#00000061]' : 'text-black'}
              hover:bg duration-200 focus:border-black
              pb-2 pt-8 px-4 outline-none focus-visible:shadow-none
            `,
          },
        }}
      />
      {props.icon && (
        <span className="absolute right-4 top-2.5">{props.icon}</span>
      )}
    </div>
  );
};

export default GeneralInput;
