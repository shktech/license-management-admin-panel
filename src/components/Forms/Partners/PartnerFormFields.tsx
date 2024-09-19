import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
  { name: "account_id", size: 2, required: "text" },
  { name: "name", required: "text" },
  {
    name: "type",
    type: "dropdown",
    required: "text",
    options: [
      { value: "End User", label: "End User" },
      { value: "Reseller", label: "Reseller" },
      { value: "Disty", label: "Disty" },
    ],
  },
  { name: "website", validation: "website", size: 2 },
  { name: "active", type: "switch" },
];

const InitialCreateField: InitialFieldConfig[] = [
  { name: "account_id", size: 2, required: "text" },
  { name: "name", required: "text" },
  {
    name: "type",
    type: "dropdown",
    required: "text",
    options: [
      { value: "End User", label: "End User" },
      { value: "Reseller", label: "Reseller" },
      { value: "Disty", label: "Disty" },
    ],
  },
  { name: "website", validation: 'website', size: 2 },
  { name: "address1", required: "text" },
  { name: "address2" },
  { name: "address", required: "text", type: "address", prefix: "" },
  { name: "postal_code", required: "text" },
  { name: "first_name", required: "text" },
  { name: "last_name", required: "text" },
  { name: "phone", validation: "phone" },
  { name: "email", required: "email" },
];

export const PartnerFormFields = {
  edit: getRealFormFields(InitialField),
  create: getRealFormFields(InitialCreateField),
};
