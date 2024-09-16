export interface InitialFieldConfig {
  name: string;
  name2?: string;
  label?: string;
  required?: "text" | "email" | "phone" | "password" | "number";
  type?:
    | "text"
    | "date"
    | "dropdown"
    | "number"
    | "switch"
    | "autocomplete"
    | "password"
    | "address"
    | "vender";
  options?: { value: string; label: string }[];
  resource?: string;
  valueKey?: string;
  labelKey?: string;
  size?: number;
  disabled?: boolean;
  prefix?: string;
  dependency?: string;
}
