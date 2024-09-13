import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
  { name: "address1", required: "text" },
  { name: "address2" },
  { name: "address", required: "text", type: "address", prefix: "" },
  { name: "postal_code", required: "text" },
  { name: "active", type: "switch" },
];

export default getRealFormFields(InitialField);
