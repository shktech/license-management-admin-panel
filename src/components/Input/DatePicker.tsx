import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { InputProps } from "@mui/base";
import { TextField } from "@mui/material";
interface CustomizedInputProps {
  label: string;
  [key: string]: any;
}

type BaseInputProps = CustomizedInputProps & InputProps;

const CustomTextField = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof TextField>
>((props, ref) => (
  <TextField
    {...props}
    ref={ref}
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          border: "none", // Remove the outline
        },
      },
      borderRadius: "4px",
      width: "100%",
      p: "8px 16px 0 0",
      backgroundColor: "#dfe7ed",
      "& .MuiInputBase-root": {
        border: "none", // Remove border
      },
      "& .MuiInputLabel-root": {
        color: "#333", // Optional: change label color
      },
    }}
  />
));

const DatePicker = ({ label, onChange, ...props }: BaseInputProps) => {
  const handleChange = (newValue: Dayjs) => {
    if (onChange) {
      onChange({
        target: {
          name: props.name,
          value: newValue.format("YYYY-MM-DD"),
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };
  if (props.name == "end_date") {
    console.log(props);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="relative my-datepicker">
        <div className="mb-1.5 block text-[#0000009c] font-medium dark:text-white absolute z-10 text-sm left-4 top-2 flex items-center gap-1">
          {props.required && <span className="text-red-500">*</span>}
          {label}
          {!props.required && (
            <span className="text-gray-500 text-xs">(Optional)</span>
          )}
        </div>
        <DesktopDatePicker
          onChange={(newValue) => handleChange(newValue as Dayjs)}
          value={props.value ? dayjs(props.value as string) : null}
          disabled={props.disabled}
          slots={{
            textField: (textFieldProps) => (
              <CustomTextField {...textFieldProps} />
            ),
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DatePicker;
