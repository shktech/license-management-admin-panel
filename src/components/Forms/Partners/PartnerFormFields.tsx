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

const InitialCreateField: InitialFieldConfig[] = [
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
  { name: "address1" },
  { name: "address2" },
  { name: "city" },
  { name: "state" },
  { name: "postal_code" },
  { name: "country" },
  { name: "first_name" },
  { name: "last_name" },
  { name: "phone" },
  { name: "email" },
];

export const PartnerFormFields = {
  edit: getRealFormFields(InitialField),
  create: getRealFormFields(InitialCreateField)
};
