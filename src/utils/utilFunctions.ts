import { FieldConfig } from "@components/Forms/FormControlWrapper";
import { InitialFieldConfig } from "@components/Forms/InitialFieldConfig";
import { CrudSort } from "@refinedev/core";
import { Customer } from "../types/types";
import { format } from "date-fns";
import { MRT_SortingState } from "material-react-table";

export const getFormattedDate = (timestamp: any) => {
  if (timestamp === null || timestamp === undefined) {
    return "";
  }
  const date = new Date(timestamp);
  if (!isNaN(date.getTime())) {
    const formattedDate = format(date, "d-MMM-yyyy"); // Updated format to "9-May-2025"
    return formattedDate;
  }
  return timestamp;
};

export const getReadableDate = (dateString: any) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

export const getTitleCase = (inputString: string) => {
  // Extract the substring after the last dot
  const lastPart = inputString.split(".").pop();

  // Convert the extracted substring to title case
  return lastPart
    ?.split("_") // Split the string by underscores
    .map(
      (
        word // Capitalize each word
      ) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" "); // Join the words with spaces
};
export const getRealFormFields = (
  InitialCustomerFormFields: InitialFieldConfig[]
) => {
  return InitialCustomerFormFields.map((field) => {
    const value: FieldConfig = {
      label: field.label || (getTitleCase(field.name) as string),
      placeholder: getTitleCase(field.name),
      ...field,
    };
    if (!field.type) {
      value.type = "text";
    }
    if (field.required) {
      value.rules = {
        required: `This field is required`,
      };
      
      if (field.required == "special") {
        value.rules = {};
      }

      if (field.required == "website") {
        value.rules.pattern = {
          value:
            /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/\S*)?$/, // Updated regex for website URL validation
          message: "Invalid website URL",
        };
      }
      if (field.required == "number") {
        value.rules.pattern = {
          value: /^(0|[1-9]\d*)$/, // Updated regex to allow only non-negative numbers
          message: "This must be a non-negative number",
        };
      }
      if (field.required == "email") {
        value.rules.pattern = {
          value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: "Invalid email address",
        };
      }
      if (field.required == "phone") {
        value.rules.pattern = {
          value: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g, // Updated regex to allow 10-digit and 11-digit numbers
          message:
            "Invalid phone number. Please use a valid US or Canada number.",
        };
      }
      if (field.required == "password") {
        value.rules.validate = (value: string) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters long";
          }
          if (!/\d/.test(value)) {
            return "Password must include at least 1 number";
          }
          if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            return "Password must include at least 1 special character";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must include at least 1 uppercase letter";
          }
          return true;
        };
      }
    }
    return value;
  });
};

export const getNestedValue = (obj: any, key: string) => {
  if (!obj) return "";
  return key.split(".").reduce((acc, part) => acc && acc[part], obj);
};

export const convertSortingStateToCrudSort = (
  sortingState: MRT_SortingState
): CrudSort[] => {
  return sortingState.map((sort) => ({
    field: sort.id,
    order: sort.desc ? "desc" : "asc",
  }));
};

export const truncateString = (str: string, maxLength: number) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
};

export const getDurationFromString = (str: string) => {
  switch (str) {
    case "EA":
      return 0;
    case "1YR":
      return 1;
    case "2YR":
      return 2;
    case "3YR":
      return 3;
    default:
      return 0;
  }
};

export const getInputCustomer = (data: any, type: string) => {
  let value: { [key: string]: any } = {};
  Object.keys(data).forEach((key) => {
    value[type + key] = data[key] ? data[key] : "";
  });
  return value;
};

export const getDisabledFields = (fields: FieldConfig[]) => {
  return fields.map((field) => {
    return {
      ...field,
      disabled: true,
    };
  });
};

export const getPasswordValidationMessage = (password: string) => {
  if (password === "") {
    return "This field is required";
  }

  // Individual password validations
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  if (!/\d/.test(password)) {
    return "Password must include at least 1 number";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must include at least 1 special character";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must include at least 1 uppercase letter";
  }
  return "";
};
