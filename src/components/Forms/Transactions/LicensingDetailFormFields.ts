import { getRealFormFields } from "@utils/utilFunctions";
import { InitialFieldConfig } from "../InitialFieldConfig";
const InitialField: InitialFieldConfig[] = [
  {
    name: "osc_part_number",
    label: "Product Name",
    // type: "dropdown",
    type: "autocomplete",
    size: 2,
    resource: "products",
    valueKey: "product_part_number",
    labelKey: "product_name",
    elseKey: "product_part_number",
    required: "text",
    nested: true
  },
  {
    name: "license_type",
    type: "dropdown",
    size: 1,
    options: [
      { value: "Eval", label: "Eval" },
      { value: "Subscription", label: "Subscription" },
      { value: "NFR", label: "NFR" },
      { value: "Promotion", label: "Promotion" },
    ],
    required: "text",
  },
  {
    name: "quantity",
    type: "number",
    required: "number",
  },
  {
    name: "start_date",
    type: "date",
    required: "text",
  },
  {
    name: "end_date",
    type: "date",
    disabled: true,
    required: "text",
  },
];

export const getFields = (fields: any[], disabledName: string[]) => {
  return fields.map((field) => {
    if (disabledName.includes(field.name)) {
      return { ...field, disabled: true };
    }
    return field;
  });
};

export const LicensingDetailFormFields = {
  New: InitialField,
  Edit: InitialField,
  Update: InitialField,
  Renewal: getFields(InitialField, [
    "osc_part_number",
    "license_type",
    "end_date",
  ]),
  Revoke: getFields(InitialField, [
    "osc_part_number",
    "license_type",
    "start_date",
    "end_date",
  ]),
};
