import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
  { name: "reference_name", size: 2 },
  { name: "reference_description", size: 2 },
  {
    name: "reference_type",
    type: "dropdown",
    size: 2,
    
    options: [
      { value: "Unique", label: "Unique" },
      { value: "Common", label: "Common" },
    ],
  },
  {
    name: "start_date",
    
    type: "date",
  },
  {
    name: "end_date",
    type: "date",
    
  },
];

export default getRealFormFields(InitialField);
