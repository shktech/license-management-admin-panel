import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
  { name: "first_name", required: "text" },
  { name: "last_name", required: "text" },
  { name: "phone", required: "text" },
  { name: "email", required: "text" },
];

export const ContactFormFields = {
  create: getRealFormFields(InitialField),
  edit: getRealFormFields([
    ...InitialField,
    { name: "active", type: "switch" },
  ]),
};
