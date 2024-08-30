import { FieldConfig } from "../FormControlWrapper";
import { InputCustomerFormFields } from "./InputCustomerFormFields";

// const BillingPartnerInformationFormFields: FieldConfig[] = InputCustomerFormFields.map(field => ({
//   name: "bill_" + field.name,
//   label: "Bill " + field.label,
//   placeholder: field.placeholder,
//   rules: field.rules,
//   type: field.type,
// }))

// const ShippingPartnerInformationFormFields: FieldConfig[] = InputCustomerFormFields.map(field => ({
//   name: "ship_" + field.name,
//   label: "Ship " + field.label,
//   placeholder: field.placeholder,
//   rules: field.rules,
//   type: field.type,
// }))
// const ResellerPartnerInformationFormFields: FieldConfig[] = InputCustomerFormFields.map(field => ({
//   name: "reseller_" + field.name,
//   label: "Reseller " + field.label,
//   placeholder: field.placeholder,
//   rules: field.rules,
//   type: field.type,
// }))

// export default {
//   BillingPartnerInformationFormFields,
//   ShippingPartnerInformationFormFields,
//   ResellerPartnerInformationFormFields
// };

import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
  { name: "account_id", size: 2 },
  { name: "name", size: 2 },
  {
    name: "type",
    required: 'text',
    type: "dropdown",
    size: 2,
    options: [
      { value: "Billing", label: "Billing" },
      { value: "Shipping", label: "Shipping" },
      { value: "Reseller", label: "Reseller" },
    ],
  },
];


export default getRealFormFields(InitialField);
