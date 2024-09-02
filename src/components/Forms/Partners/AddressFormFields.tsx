import { FieldConfig } from "../FormControlWrapper";
import { InputCustomerFormFields } from "./InputCustomerFormFields";

import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
  { name: "address1" },
  { name: "address2" },
  { name: "city" },
  { name: "state" },
  { name: "postal_code" },
  { name: "country" },
  { name: "active", type: "switch" },
];


export default getRealFormFields(InitialField);
