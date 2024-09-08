import { getRealFormFields } from "@utils/utilFunctions";
import { InitialFieldConfig } from "../InitialFieldConfig";

const InitialCustomerFormFields: InitialFieldConfig[] = [
  {
    name: "customer_account",
    required: "text",
  },
  {
    name: "customer_name",
    required: "text",
  },
  {
    name: "address1",
    // required: "text",
  },
  {
    name: "address2",
  },
  {
    name: "city",
    // required: "text",
  },
  {
    name: "state",
    // required: "text",
  },
  {
    name: "postal_code",
    // required: "text",
  },
  {
    name: "country",
    // required: "text",
  },
  {
    name: "contact_first_name",
    required: "text",
  },
  {
    name: "contact_last_name",
    required: "text",
  },
  {
    name: "contact_phone",
    required: "text",
  },
  {
    name: "contact_email",
    required: "email",
  },
];

export const InputCustomerFormFields = getRealFormFields(
  InitialCustomerFormFields
);
