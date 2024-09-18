import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
  { name: "first_name", required: "text" },
  { name: "last_name", required: "text" },
  { name: "phone", required: "phone" },
  { name: "email", required: "text" },
  { name: "job_title", required: "text", size: 2 },
  { name: "renewal_notification", type: "switch" },
  { name: "primary", type: "switch" },
];

export const ContactFormFields = {
  create: getRealFormFields(InitialField),
  edit: getRealFormFields([
    ...InitialField,
    { name: "active", type: "switch" },
  ]),
};
