import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
  {
    name: "reference_code",
    size: 2,
    required: "text",
  },
  {
    name: "product_part_number",
    size: 2,
    required: "text",
  },
  {
    name: "product_part_id",
    required: "text",
    size: 2,
  },
  {
    name: "osc_part_number",
    label: "Software Part Nubmer",
    type: "autocomplete",
    resource: "products",
    required: "text",
    valueKey: "product_part_number",
    labelKey: "product_part_number",
    elseKey: "product_name",
    size: 2,
  },
  {
    name: "transaction_line_id",
    size: 2,
  },
];

export const ReferenceCodeFormFields = {
  create: getRealFormFields(InitialField),
  edit: getRealFormFields([
    ...InitialField,
    { name: "active", type: "switch"  },
  ]),
};
