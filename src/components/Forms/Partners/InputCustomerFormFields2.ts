import { getRealFormFields } from "@utils/utilFunctions";
import { InitialFieldConfig } from "../InitialFieldConfig";

const InitialCustomerFormFields: InitialFieldConfig[] = [
  {
    name: "account",
    required: "text"
  },
  {
    name: "name",
  },
  {
    name: "first_name",
  },
  {
    name: "last_name"
  },
  {
    name: "phone",
  },
  {
    name: "email",
    required: 'email'
  },
  {
    name: "address1",
  },
  {
    name: "address2",
  },
  {
    name: "city",
  },
  {
    name: "state",
  },
  {
    name: "postal_code",
  },
  {
    name: "country",
  },
];
export const InputCustomerFormFields2 = getRealFormFields(InitialCustomerFormFields);

