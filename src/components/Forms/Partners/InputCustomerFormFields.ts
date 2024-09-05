import { getRealFormFields } from "@utils/utilFunctions";
import { InitialFieldConfig } from "../InitialFieldConfig";

const InitialCustomerFormFields: InitialFieldConfig[] = [
  {
    name: "customer_account",
    
  },
  {
    name: "customer_name",
    
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
  {
    name: "contact_first_name",
    
  },
  {
    name: "contact_last_name",
    
  },
  {
    name: "contact_phone",
    
  },
  {
    name: "contact_email",
    // required: 'email'
  },
];

export const InputCustomerFormFields = getRealFormFields(InitialCustomerFormFields);

