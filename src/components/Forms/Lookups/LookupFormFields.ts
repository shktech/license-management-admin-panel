import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
  { name: "lookup_name", size: 2, required: "text" },
  { name: "lookup_code", size: 2, required: "text" },
  { name: "description", size: 2 },
  {
    name: "type",
    type: "dropdown",
    size: 1,
    required: "text",
    options: [
      { value: "Text", label: "Text" },
      { value: "Duration", label: "Duration" },
      { value: "Number", label: "Number" },
      { value: "Date", label: "Date" },
    ],
  },
  {
    name: "parent_lookup",
    type: 'dropdown',
    resource: "lookups",
    valueKey: "lookup_id",
    labelKey: "lookup_name",
    disabled: true
  },
];

export const LookupFormFields = {
  create: getRealFormFields(InitialField),
  edit: getRealFormFields([
    ...InitialField,
    { name: "active", type: "switch" },
  ]),
};
// export default getRealFormFields(InitialField);
