import { InputProps } from "@mui/base/Input";

export interface CustomizedInputProps {
    label: string;
    [key: string]: any;
  }
  
export type BaseInputProps = CustomizedInputProps & InputProps