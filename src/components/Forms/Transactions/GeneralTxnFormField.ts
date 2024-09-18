import { getRealFormFields } from "@utils/utilFunctions";
import { InitialFieldConfig } from "../InitialFieldConfig";

const InitialField: InitialFieldConfig[] = [
  {
    name: "transaction_source",
    type: "dropdown",
    size: 2,
    required: "text",
    options: [
      { value: "Oracle ERP", label: "Oracle ERP" },
      { value: "Prod Reg", label: "Prod Reg" },
      { value: "Manual", label: "Manual" },
      { value: "Salesforce", label: "Salesforce" },
    ],
  },
  {
    name: "transaction_action",
    type: "dropdown",
    disabled: true,
    required: "text",
    options: [
      { value: "New", label: "New" },
      { value: "Renewal", label: "Renewal" },
      { value: "Revoke", label: "Revoke" },
      { value: "Update", label: "Update" },
    ],
  },
  {
    name: "source_reference_number",
    type: "autocomplete",
    required: 'special',
    size: 1,
    resource: "references/reference-codes",
    valueKey: "reference_code",
    labelKey: "reference_code",
  },
  { name: "source_reference_date", type: "date" },
  { name: "source_reference_id" },
  { name: "license_key", size: 2  },
];

const getFields = (fields: any[], disabledName: string[]) => {
  return fields.map((field) => {
    if (disabledName.includes(field.name)) {
      return { ...field, disabled: true };
    }
    return field;
  });
};

export const getRequiredFields = (fields: any[], requiredName: string[]) => {
  return fields.map((field) => {
    if (requiredName.includes(field.name)) {
      return { ...field, required: "text" };
    }
    return field;
  });
};

export const GeneralTxnFormFields = {
  New: (InitialField),
  Renewal: (getFields(InitialField, ["license_key"])),
  Revoke: (getFields(InitialField, ["license_key"])),
  Edit: (InitialField),
  Update: (InitialField),
};
