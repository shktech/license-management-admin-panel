import { FieldConfig } from "../FormControlWrapper";
import { InputCustomerFormFields } from "./InputCustomerFormFields";

import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
  { name: "first_name" },
  { name: "last_name" },
  { name: "phone" },
  { name: "email" },
];


export default getRealFormFields(InitialField);
