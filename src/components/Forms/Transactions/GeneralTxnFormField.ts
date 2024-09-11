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
    ],
  },
  {
    name: "source_reference_number",
    type: "autocomplete",
    size: 1,
    resource: "references/reference-codes",
    valueKey: "reference_code",
    labelKey: "reference_code",
    required: "text",
  },
  { name: "source_reference_date", type: "date" },
  { name: "source_reference_id" },
  { name: "license_key", size: 2, disabled: true },
];

const getFields = (fields: any[], disabledName: string[]) => {
  return fields.map((field) => {
    if (disabledName.includes(field.name)) {
      return { ...field, disabled: true };
    }
    return field;
  });
};

export const GeneralTxnFormFields = {
  New: getRealFormFields(InitialField),
  Renewal: getRealFormFields(InitialField),
  Revoke: getRealFormFields(InitialField),
  Edit: getRealFormFields(InitialField),
};
