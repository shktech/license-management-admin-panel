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
    name: "address",
    type: "address",
  },
  {
    name: "postal_code",
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
    validation: 'phone'
  },
  {
    name: "contact_email",
    required: "email",
  },
];

export const InputCustomerFormFields = getRealFormFields(
  InitialCustomerFormFields
);
