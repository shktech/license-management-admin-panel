import { getRealFormFields } from "@utils/utilFunctions";
import { InitialFieldConfig } from "../InitialFieldConfig";

const InitialCustomerFormFields: InitialFieldConfig[] = [
  {
    name: "account",
    required: "text"
  },
  {
    name: "name",
    required: "text"
  },
  {
    name: "contact.first_name",
    required: "text"
  },
  {
    name: "contact.last_name",
    required: "text"
  },
  {
    name: "contact.phone",
    required: "text"
  },
  {
    name: "contact.email",
    required: "email"
  },
  {
    name: "contact.address.address1",
    required: "text"
  },
  {
    name: "contact.address.address2",
    required: "text"
  },
  {
    name: "contact.address.city",
    required: "text"
  },
  {
    name: "contact.address.state",
    required: "text"
  },
  {
    name: "contact.address.postal_code",
    required: "text"
  },
  {
    name: "contact.address.country",
    required: "text"
  },
];
export const InputCustomerFormFields2 = getRealFormFields(InitialCustomerFormFields);

