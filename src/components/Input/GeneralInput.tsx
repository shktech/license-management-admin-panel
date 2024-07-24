import React, { useEffect } from 'react';
import { Input } from '@mui/base/Input';
import { BaseInputProps } from './InputProps';

const GeneralInput = ({ label, ...props }: BaseInputProps) => {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="mb-1.5 block font-medium text-black dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <Input
          {...props}
          disabled={props.disabled}
          slotProps={{
            input: {
              className: "w-full rounded-lg border border-stroke bg-transparent disabled:bg-whiter py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            }
          }}
        />
        {props.icon && <span className="absolute right-4 top-2.5">{props.icon}</span>}
      </div>
    </div>
  );
};

export default GeneralInput;
