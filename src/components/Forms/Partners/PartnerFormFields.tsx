import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
  { name: "account_id", size: 2 },
  { name: "name", size: 2 },
  {
    name: "type",
    type: "dropdown",
    size: 2,
    options: [
      { value: "Direct End User", label: "Direct End User" },
      { value: "Channel", label: "Channel" },
    ],
  },
];

const InitialCreateField: InitialFieldConfig[] = [
  { name: "account_id", size: 2 },
  { name: "name", size: 2 },
  {
    name: "type",
    type: "dropdown",
    size: 2,
    options: [
      { value: "Direct End User", label: "Direct End User" },
      { value: "Channel", label: "Channel" },
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
