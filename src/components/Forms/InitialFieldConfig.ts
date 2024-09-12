export interface InitialFieldConfig {
  name: string;
  name2?: string;
  label?: string;
  required?: "text" | "email" | "phone" | "password";
  type?: "text" | "date" | "dropdown" | "number" | "switch" | "autocomplete" | "password";
  options?: { value: string; label: string }[];
  resource?: string;
  valueKey?: string;
  labelKey?: string;
  size?: number;
  disabled?: boolean;
}
