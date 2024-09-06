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
];

export default getRealFormFields(InitialField);
