import React, { useEffect } from 'react';
import { Input } from '@mui/base/Input';
import { BaseInputProps } from './InputProps';

const GeneralInput = ({ label, ...props }: BaseInputProps) => {
  // console.log(props);
  return (

    <div className="relative">
      <label
        htmlFor={props.id}
        className="mb-1.5 block text-[#0000009c] font-medium dark:text-white absolute text-sm left-4 top-2 flex items-center gap-1"
      >
        {props.required && <span className="text-red-500">*</span>}
        {label}
        {!props.required && <span className="text-gray-500 text-xs">(Optional)</span>}
      </label>
      <Input
        {...props}
        disabled={props.disabled}
        slotProps={{
          input: {
            className: "border border-transparent  w-full rounded-md bg-[#dfe6ec] hover:bg duration-200 focus:border-black pb-2 pt-8 px-4 text-black outline-none focus-visible:shadow-none"
          }
        }}
      />
      {props.icon && <span className="absolute right-4 top-2.5">{props.icon}</span>}
    </div>
  );
};

export default GeneralInput;
