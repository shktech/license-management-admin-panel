import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
  { name: "reference_name", size: 2, required: "text" },
  { name: "reference_description", size: 2, required: "text" },
  {
    name: "reference_type",
    type: "dropdown",
    size: 2,
    required: "text",
    options: [
      { value: "Unique", label: "Unique" },
      { value: "Common", label: "Common" },
    ],
  },
  {
    name: "start_date",
    type: "date",
    required: "text",
  },
  {
    name: "end_date",
    type: "date",
    required: "text",
  },
  {
    name: "data_source",
    size: 2,
  },
  {
    name: "transaction_source",
    type: "dropdown",
    size: 2,
    options: [
      { value: "Oracle ERP", label: "Oracle ERP" },
      { value: "Prod Reg", label: "Prod Reg" },
      { value: "Manual", label: "Manual" },
      { value: "Salesforce", label: "Salesforce" },
    ],
  },
];

export const ReferenceFormFields = {
  create: getRealFormFields(InitialField),
  edit: getRealFormFields([
    ...InitialField,
    { name: "active", type: "switch", required: "text" },
  ]),
};

