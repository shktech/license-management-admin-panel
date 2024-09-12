export interface InitialFieldConfig {
  name: string;
  name2?: string;
  required?: "text" | "email" | "phone";
  type?: "text" | "date" | "dropdown" | "number" | "switch" | "autocomplete";
  options?: { value: string; label: string }[];
  resource?: string;
  valueKey?: string;
  labelKey?: string;
  size?: number;
  disabled?: boolean;
}
