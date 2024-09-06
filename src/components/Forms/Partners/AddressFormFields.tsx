import { FieldConfig } from "../FormControlWrapper";
import { InputCustomerFormFields } from "./InputCustomerFormFields";

import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
  { name: "address1", required: "text" },
  { name: "address2" },
  { name: "city", required: "text" },
  { name: "state", required: "text" },
  { name: "postal_code", required: "text" },
  { name: "country", required: "text" },
  { name: "active", type: "switch", required: "text" },
];


export default getRealFormFields(InitialField);
