import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { InputProps } from "react-select";
import { FormControl } from "@mui/material";
interface CustomizedInputProps {
  label: string;
  [key: string]: any;
}

type BaseInputProps = CustomizedInputProps & InputProps;

const PhoneInput = ({ label, onChange, value, error, name, trigger, ...props }: BaseInputProps) => {
  const handleChange = (newValue: string) => {
    const isValid = matchIsValidTel(newValue);
    if (onChange) {
      onChange({
        target: {
          name: props.name,
          value: newValue,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
    console.log(isValid);
  };

  return (
    <div className="relative">
      <FormControl className="w-full relative">
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
        <MuiTelInput
          value={value ? (value as string) : ""}
          onChange={handleChange}
          defaultCountry="US"
          onlyCountries={["US", "CA", "JP"]}
          size="small"
          error={error}
          sx={{
            pt: "26px",
            backgroundColor: "#dfe6ec",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: 0,
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: 1,
                color: "black",
              },
          }}
        />
      </FormControl>
    </div>
  );
};

export default PhoneInput;
