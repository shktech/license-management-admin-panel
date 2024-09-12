import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
  { name: "account_id", size: 2, required: "text" },
  { name: "name", size: 2, required: "text" },
  {
    name: "type",
    type: "dropdown",
    size: 2,
    required: "text",
    options: [
      { value: "Direct End User", label: "Direct End User" },
      { value: "Channel", label: "Channel" },
    ],
  },
];

const InitialCreateField: InitialFieldConfig[] = [
  { name: "account_id", size: 2, required: "text" },
  { name: "name", size: 2, required: "text" },
  {
    name: "type",
    type: "dropdown",
    size: 2,
    required: "text",
    options: [
      { value: "Direct End User", label: "Direct End User" },
      { value: "Channel", label: "Channel" },
    ],
  },
  { name: "address1", required: "text" },
  { name: "address2" },
  { name: "city", required: "text" },
  { name: "state", required: "text" },
  { name: "postal_code", required: "text" },
  { name: "country", required: "text" },
  { name: "first_name", required: "text" },
  { name: "last_name", required: "text" },
  { name: "phone", required: "phone" },
  { name: "email", required: "email" },
];

export const PartnerFormFields = {
  edit: getRealFormFields(InitialField),
  create: getRealFormFields(InitialCreateField),
};
