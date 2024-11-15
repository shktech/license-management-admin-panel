import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
  { name: "start_date", type: "date", required: "text" },
  { name: "end_date", type: "date", required: "text" },
  {
    name: "owner",
    type: "autocomplete",
    manualValidation: true,
    size: 1,
    resource: "partners",
    valueKey: "partner_id",
    labelKey: "contacts[0].email",
    nested: true,
  },
];

export const ReportFormFields = {
  create: getRealFormFields(InitialField),
};
// export default getRealFormFields(InitialField);
